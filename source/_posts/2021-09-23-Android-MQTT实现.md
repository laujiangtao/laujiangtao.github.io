---
title: Android MQTT实现
comments: false
toc: true
date: 2021-09-23 17:09:20
pathsuffix: android-mqtt
updated:
tags: MQTT
categories: 技术
---
#### 一、Apache Apollo服务器

下载Apache Apollo并解压

[下载地址](http://archive.apache.org/dist/activemq/activemq-apollo/)

 解压

```
tar -zxvf 压缩文件名.tar.gz
```

**服务搭建方式**

1、命令行进入解压后bin目录（例：E:>cd E:\MQTT\apache-apollo-1.7.1\bin）。

2、输入./apollo create xxx（xxx为创建的服务器实例名称，例：`./apollo create ~/apche-apollo/mybroker`），之后会在用户目录下创建名称文件夹。

> You can now start the broker by executing:  
>
> "/Users/kavan/apche-apollo/mybroker/bin/apollo-broker" run
>
> Or you can run the broker in the background using:
>
> "/Users/kavan/apche-apollo/mybroker/bin/apollo-broker-service" start

在bin目录下运行`./apollo-broker-service start`开启服务，在浏览器中输入`http://127.0.0.1:61680`打开登录页面

+ XXX文件夹下etc\apollo.xml文件下是配置服务器信息的文件。

+ etc\users.properties文件包含连接MQTT服务器时用到的用户名和密码，默认为admin=password，即账号为admin，密码为password，可自行更改。

#### 二、Android端实现

**添加mqtt依赖所在的maven仓库**

```groovy
maven { url "https://repo.eclipse.org/content/repositories/paho-releases/" }
```

**导入依赖**

```groovy
implementation 'org.eclipse.paho:org.eclipse.paho.android.service:1.1.1'
implementation 'org.eclipse.paho:org.eclipse.paho.client.mqttv3:1.1.1'
```

**AndroidManifest**

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
<!-- Mqtt Service -->
<service android:name="org.eclipse.paho.android.service.MqttService" />
<service android:name=".mqtt.MqttService" />
```

**Android Mqtt Service**

```java
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Binder;
import android.os.IBinder;
import android.util.Log;
import android.widget.Toast;

import org.eclipse.paho.android.service.MqttAndroidClient;
import org.eclipse.paho.client.mqttv3.IMqttActionListener;
import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.IMqttToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;

public class MqttService extends Service {
    public static final String TAG = MqttService.class.getSimpleName();
    public static MqttAndroidClient client;
    private MqttConnectOptions mqttConnectOptions;

    // 服务器地址（协议+地址+端口号）
    private String host = "tcp://10.0.2.2:61613";
    private String userName = "admin";
    private String passWord = "password";
    private static String topic = "MqttTestTopic";//要订阅的主题
    private String clientId = "AndroidId";//客户端标识
    private IMessageCallBack iMessageCallBack;

    public MqttService() {
    }

    @Override
    public void onCreate() {
        super.onCreate();
        Log.i(TAG, "onCreate");
        init();
    }

    public static void publish(String msg) {
        Integer qos = 0;
        Boolean retained = false;
        try {
            if (client != null) {
                client.publish(topic, msg.getBytes(), qos.intValue(), retained.booleanValue());
            }
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    private void init() {
        client = new MqttAndroidClient(this, host, clientId);
        // 设置MQTT监听并且接受消息
        client.setCallback(mqttCallback);
        mqttConnectOptions = new MqttConnectOptions();
        // 清除缓存
        mqttConnectOptions.setCleanSession(true);
        // 设置超时时间，单位：秒
        mqttConnectOptions.setConnectionTimeout(10);
        // 心跳包发送间隔，单位：秒
        mqttConnectOptions.setKeepAliveInterval(20);
        // 用户名
        mqttConnectOptions.setUserName(userName);
        // 密码
        mqttConnectOptions.setPassword(passWord.toCharArray());     //将字符串转换为字符串数组

        // last will message
        boolean doConnect = true;
        String message = "{\"clientId\":\"" + clientId + "\"}";
        Log.i(TAG, "message:" + message);
        Integer qos = 0;
        Boolean retained = true;
        // MQTT本身就是为信号不稳定的网络设计的，所以难免一些客户端会无故的和Broker断开连接。
        //当客户端连接到Broker时，可以指定LWT，Broker会定期检测客户端是否有异常。
        //当客户端异常掉线时，Broker就往连接时指定的topic里推送当时指定的LWT消息。
        try {
            mqttConnectOptions.setWill(topic, message.getBytes(), qos.intValue(), retained.booleanValue());
        } catch (Exception e) {
            e.printStackTrace();
            Log.e(TAG, e.toString());
            doConnect = false;
            iMqttActionListener.onFailure(null, e);
        }

        if (doConnect) {
            doConnection();
        }

    }


    @Override
    public void onDestroy() {
        stopSelf();
        try {
            client.disconnect();
        } catch (MqttException e) {
            e.printStackTrace();
        }
        super.onDestroy();
    }

    /**
     * 连接MQTT服务器
     */
    private void doConnection() {
        if (!client.isConnected() && isConnectIsNormal()) {
            try {
                client.connect(mqttConnectOptions, null, iMqttActionListener);
            } catch (MqttException e) {
                e.printStackTrace();
            }
        }

    }

    /**
     * MQTT连接状态监听
     */
    private final IMqttActionListener iMqttActionListener = new IMqttActionListener() {

        @Override
        public void onSuccess(IMqttToken arg0) {
            Log.i(TAG, "连接成功 ");
            try {
                // 订阅topic话题
                client.subscribe(topic, 1);
            } catch (MqttException e) {
                e.printStackTrace();
            }
        }

        @Override
        public void onFailure(IMqttToken arg0, Throwable arg1) {
            Log.i(TAG, "连接失败");
            arg1.printStackTrace();
            // 连接失败，重连
        }
    };

    /**
     * MQTT消息监听
     */
    private final MqttCallback mqttCallback = new MqttCallback() {

        @Override
        public void messageArrived(String topic, MqttMessage message) throws Exception {

            String str = new String(message.getPayload());
            Log.i(TAG, "messageArrived: " + str);
            if (iMessageCallBack != null) {
                iMessageCallBack.setMessage(str);
            }
            Toast.makeText(MqttService.this, str, Toast.LENGTH_SHORT).show();

            Log.i(TAG, topic + "\n qos: " + message.getQos() + "\n retained: " + message.isRetained());
        }

        @Override
        public void deliveryComplete(IMqttDeliveryToken arg0) {
            Log.i(TAG, "deliveryComplete: ");
        }

        @Override
        public void connectionLost(Throwable arg0) {
            // 失去连接，重连
            Log.i(TAG, "connectionLost: ");
        }
    };

    /**
     * 判断网络是否连接
     */
    private boolean isConnectIsNormal() {
        ConnectivityManager connectivityManager = (ConnectivityManager) this.getApplicationContext()
                .getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo info = connectivityManager.getActiveNetworkInfo();
        if (info != null && info.isAvailable()) {
            String name = info.getTypeName();
            Log.i(TAG, "当前网络名称：" + name);
            return true;
        } else {
            Log.i(TAG, "没有可用网络");
            return false;
        }
    }

    @Override
    public IBinder onBind(Intent intent) {
        Log.i(TAG, "onBind");
        return new MqttBinder();
    }

    public void setMessageCallBack(IMessageCallBack iMessageCallBack) {
        this.iMessageCallBack = iMessageCallBack;
    }

    public class MqttBinder extends Binder {
        public MqttService getService() {
            return MqttService.this;
        }
    }
}
```

**Android MqttServiceConnection**

```java
import android.content.ComponentName;
import android.content.ServiceConnection;
import android.os.IBinder;

/**
 * @author jiangtao on 2021/9/23
 */
public class MqttServiceConnection implements ServiceConnection {

    private MqttService mqttService;
    private IMessageCallBack iMessageCallBack;

    @Override
    public void onServiceConnected(ComponentName componentName, IBinder iBinder) {
        mqttService = ((MqttService.MqttBinder)iBinder).getService();
        mqttService.setMessageCallBack(iMessageCallBack);
    }

    @Override
    public void onServiceDisconnected(ComponentName componentName) {

    }

    public MqttService getMqttService(){
        return mqttService;
    }

    public void setMessageCallBack(IMessageCallBack iMessageCallBack){
        this.iMessageCallBack = iMessageCallBack;
    }
}
```

**消息回调接口**

```java
/**
 * @author jiangtao on 2021/9/23
 */
public interface IMessageCallBack {
    public void setMessage(String message);
}
```

**Android Activity实现**

```java
import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import cn.ljt.myapplication.R;
import cn.ljt.myapplication.inject.butterknife.BindView;
import cn.ljt.myapplication.inject.butterknife.InjectView;
import cn.ljt.myapplication.inject.click.InjectClick;
import cn.ljt.myapplication.inject.click.OnClick;

public class MqttTestActivity extends AppCompatActivity implements IMessageCallBack {

    @BindView(R.id.text)
    public TextView textView;
    @BindView(R.id.btn)
    public Button button;

    private MqttServiceConnection serviceConnection;
    private MqttService mqttService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_mqtt_test);
        InjectView.inject(this);
        InjectClick.inject(this);

        serviceConnection = new MqttServiceConnection();
        serviceConnection.setIGetMessageCallBack(this);

        Intent intent = new Intent(this, MqttService.class);

        bindService(intent, serviceConnection, Context.BIND_AUTO_CREATE);
    }

    @OnClick(R.id.btn)
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.btn:
                Log.i("TAG", "onClick: 测试");
                MqttService.publish("Android自己的消息");
                break;
        }
    }

    @Override
    public void setMessage(String message) {
        String trim = textView.getText().toString().trim() + "\n";
        textView.setText(trim + message);
        mqttService = serviceConnection.getMqttService();
    }

    @Override
    public void onPointerCaptureChanged(boolean hasCapture) {
        Log.i("TAG", "onPointerCaptureChanged: " + hasCapture);
    }

    @Override
    protected void onDestroy() {
        unbindService(serviceConnection);
        super.onDestroy();
    }
}
```



#### 三、Java服务端实现

**pom文件导入依赖**

```xml
<!-- https://repo.eclipse.org/content/repositories/paho-releases/org/eclipse/paho/org.eclipse.paho.client.mqttv3/ -->
<dependency>
    <groupId>org.eclipse.paho</groupId>
    <artifactId>org.eclipse.paho.client.mqttv3</artifactId>
    <version>1.1.1</version>
</dependency>
```

**Server 程序入口**

```java
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttPersistenceException;
import org.eclipse.paho.client.mqttv3.MqttTopic;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;

import java.util.Scanner;

public class Main {

    public static final String HOST = "tcp://localhost:61613";

    public static final String TOPIC = "MqttTestTopic";
    private static final String clientId = "kavan_server";

    private MqttClient client;
    private MqttTopic topic;
    private String userName = "admin";
    private String passWord = "password";

    private MqttMessage message;

    public Main() throws MqttException {
        //MemoryPersistence设置clientId的保存形式，默认为以内存保存
        client = new MqttClient(HOST, clientId, new MemoryPersistence());
        connect();
    }

    private void connect() {
        MqttConnectOptions options = new MqttConnectOptions();
        options.setCleanSession(true);
        options.setUserName(userName);
        options.setPassword(passWord.toCharArray());
        // 设置超时时间
        options.setConnectionTimeout(60);
        // 设置会话心跳时间
        options.setKeepAliveInterval(20);
        try {
            client.setCallback(new PushCallback());
            client.connect(options);
            topic = client.getTopic(TOPIC);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void publish(MqttMessage message) throws MqttPersistenceException, MqttException {
        MqttDeliveryToken token = topic.publish(message);
        token.waitForCompletion();
        System.out.println("isComplete: " + token.isComplete());
    }

    public static void main(String[] args) throws MqttException {
        // write your code here
        Main server = new Main();
        server.message = new MqttMessage();
        server.message.setQos(1);
        server.message.setRetained(true);
        server.message.setPayload("这是Server发送给Android的消息".getBytes());
        while (true) {
            System.out.println("输入send发送消息：\n");
            Scanner scanner = new Scanner(System.in);
            if (scanner.hasNext()) {
                String str1 = scanner.next();
                if ("send".equals(str1)) {
                    server.publish(server.message);
                    System.out.println("retained:" + server.message.isRetained());
                }
            }
        }
    }
}
```

**回调函数 PushCallback**

```java
import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttMessage;

public class PushCallback  implements MqttCallback {


    @Override
    public void connectionLost(Throwable arg0) {
        // 连接丢失后，一般在这里面进行重连
        System.out.println("连接断开，可以做重连");

    }

    @Override
    public void deliveryComplete(IMqttDeliveryToken token) {
        // publish后会执行到这里
        System.out.println("deliveryComplete: "+ token.isComplete());

    }

    @Override
    public void messageArrived(String topic, MqttMessage message) throws Exception {
        // subscribe后得到的消息会执行到这里面
        System.out.println("订阅的字符串："+topic);
        System.out.println("消息内容："+message.toString());
    }
}
```

#### 四、测试

启动Apollo服务

将Android App和Java后台程序启动，链接上服务器，如图：

![img](567705-20171120145735336-299198312.png)

启动服务端程序，发送信息，如图：

![img](567705-20171120145810868-203885925.png)

手机端接收到信息，如图：

![img](567705-20171120150451446-1645961685.png)