---
title: Code Tools
pathsuffix: code-tools
comments: false
date: 2021-01-07 15:16:45
updated: 2021-05-11
tags: Code
category: 技术
---

### 扫描文件

<details>
<summary>点我展开</summary>

```java
import java.io.File;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Set;

/**
 * @author Kavan
 */
public final class ScanFileHelper {
    private static ScanFileHelper scanFileHelper;

    public static ScanFileHelper getInstance() {
        if (scanFileHelper == null) {
            scanFileHelper = new ScanFileHelper();
        }
        return scanFileHelper;
    }

    private ScanFileHelper() {
    }

    private OnFileScanListener fileScanListener;

    public void setOnFileScanListener(OnFileScanListener fileScanListener) {
        this.fileScanListener = fileScanListener;
    }

    interface OnFileScanListener {
        void onFileScan(String path);
    }

    public void traverseFolderBFS(File node) {
        Set<File> visited = new HashSet<>();
        Queue<File> q = new LinkedList<>();
        q.offer(node);
        while (!q.isEmpty()) {
            File currNode = q.poll();
            if (visited.contains(currNode) || null == currNode) {
                continue;
            }
            if (fileScanListener != null) {
                fileScanListener.onFileScan(currNode.getAbsolutePath());
            } else {
                throw new IllegalArgumentException("FileScanListener should be not null");
            }
            visited.add(currNode);
            File[] files = currNode.listFiles();
            if (null == files) {
                continue;
            }
            for (File file : files) {
                q.offer(file);
            }
        }
    }

    public void traverseFolderBFS(File node, OnFileScanListener l) {
        setOnFileScanListener(l);
        traverseFolderBFS(node);
    }
}
```

</details>

### 读取assets文件

<details>
<summary>点我展开</summary>
```kotlin
/**
 * 读取assets📁下json📃
 * @param fileName
 * @param context
 * @return
 */
fun getJsonStringFromAssetsFile(context: Context, fileName: String?): String {
    val stringBuilder = StringBuilder()
    try {
        val assetManager: AssetManager = context.assets
        val bf = BufferedReader(
                InputStreamReader(
                        assetManager.open(fileName!!)
                )
        )
        var line: String?
        while (bf.readLine().also { line = it } != null) {
            stringBuilder.append(line)
        }
    } catch (e: IOException) {
        e.printStackTrace()
    }
    return stringBuilder.toString()
}
```
</details>


### 获取应用签名
<details>
<summary>点我展开</summary>
```java
/**
 * 获取应用签名
 * @param pkgname
 * @param context
 * @return
 */
public String getSignature(Context context, String pkgname) {
    boolean isEmpty = TextUtils.isEmpty(pkgname);
    if (isEmpty) {
        Toast.makeText(this, "应用程序的包名不能为空！", Toast.LENGTH_SHORT).show();
    } else {
        try {
            @SuppressLint("PackageManagerGetSignatures")
            PackageInfo packageInfo = context.getPackageManager().getPackageInfo(pkgname, PackageManager.GET_SIGNATURES);
            Signature[] signatures = packageInfo.signatures;
            StringBuilder builder = new StringBuilder();
            for (Signature signature : signatures) {
                builder.append(signature.toCharsString());
            }
            return builder.toString();
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }
    }
    return null;
}
```
</details>


### SPHelper.java
<details>
<summary>点我展开</summary>

```java
import android.content.Context;
import android.content.SharedPreferences;

/**
 * Created by jiangtao on 2016/12/25 12:22
 * E-mail：3305727299@qq.com
 */

public class SPHelper {
    /**
     * 保存在手机里面的文件名
     */
    private static final String FILE_NAME = "share_date";


    /**
     * 保存数据的方法，我们需要拿到保存数据的具体类型，然后根据类型调用不同的保存方法
     *
     * @param context
     * @param key
     * @param object
     */
    public static void setParam(Context context, String key, Object object) {

        String type = object.getClass().getSimpleName();
        SharedPreferences sp = context.getSharedPreferences(FILE_NAME, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sp.edit();

        if ("String".equals(type)) {
            editor.putString(key, (String) object);
        } else if ("Integer".equals(type)) {
            editor.putInt(key, (Integer) object);
        } else if ("Boolean".equals(type)) {
            editor.putBoolean(key, (Boolean) object);
        } else if ("Float".equals(type)) {
            editor.putFloat(key, (Float) object);
        } else if ("Long".equals(type)) {
            editor.putLong(key, (Long) object);
        }

        editor.apply();
    }


    /**
     * 得到保存数据的方法，我们根据默认值得到保存的数据的具体类型，然后调用相对于的方法获取值
     *
     * @param context
     * @param key
     * @param defaultObject
     * @return
     */
    public static Object getParam(Context context, String key, Object defaultObject) {
        String type = defaultObject.getClass().getSimpleName();
        SharedPreferences sp = context.getSharedPreferences(FILE_NAME, Context.MODE_PRIVATE);

        if ("String".equals(type)) {
            return sp.getString(key, (String) defaultObject);
        } else if ("Integer".equals(type)) {
            return sp.getInt(key, (Integer) defaultObject);
        } else if ("Boolean".equals(type)) {
            return sp.getBoolean(key, (Boolean) defaultObject);
        } else if ("Float".equals(type)) {
            return sp.getFloat(key, (Float) defaultObject);
        } else if ("Long".equals(type)) {
            return sp.getLong(key, (Long) defaultObject);
        }

        return null;
    }
}
```

</details>


### Logger.java
<details>
<summary>点我展开</summary>

```java
import android.util.Log;

/**
 * Created by jiangtao on 2017/2/7.
 */
public class Logger {

    private static boolean isDebug = true;
    private static String TAG = "TAG";

    public static void v(String msg) {
        if (isDebug) {
            Log.v(TAG, msg);
        }
    }

    public static void d(String msg) {
        if (isDebug) {
            Log.d(TAG, msg);
        }
    }

    public static void i(String msg) {
        if (isDebug) {
            Log.i(TAG, msg);
        }
    }

    public static void w(String msg) {
        if (isDebug) {
            Log.w(TAG, msg);
        }
    }

    public static void e(String msg) {
        if (isDebug) {
            Log.e(TAG, msg);
        }
    }
}
```

</details>


### 键盘覆盖WebView输入框
<details>
<summary>点我展开</summary>

```java
import android.app.Activity;
import android.graphics.Rect;
import android.view.View;
import android.view.ViewTreeObserver;
import android.widget.FrameLayout;

/**
 * Created by jiangtao on 2017/4/26 16:36
 * E-mail：3305727299@qq.com
 */
public class KeyBoardListener {
    private Activity activity;

    private View mChildOfContent;
    private int usableHeightPrevious;
    private FrameLayout.LayoutParams frameLayoutParams;

    private static KeyBoardListener keyBoardListener;


    public static KeyBoardListener getInstance(Activity activity) {
        keyBoardListener = new KeyBoardListener(activity);
        return keyBoardListener;
    }

    public KeyBoardListener(Activity activity) {
        super();
        this.activity = activity;
    }

    public void init() {


        FrameLayout content = (FrameLayout) activity
                .findViewById(android.R.id.content);
        mChildOfContent = content.getChildAt(0);
        mChildOfContent.getViewTreeObserver().addOnGlobalLayoutListener(
                new ViewTreeObserver.OnGlobalLayoutListener() {
                    public void onGlobalLayout() {
                        possiblyResizeChildOfContent();
                    }
                });
        frameLayoutParams = (FrameLayout.LayoutParams) mChildOfContent
                .getLayoutParams();


    }

    private void possiblyResizeChildOfContent() {
        int usableHeightNow = computeUsableHeight();
        if (usableHeightNow != usableHeightPrevious) {
            int usableHeightSansKeyboard = mChildOfContent.getRootView()
                    .getHeight();
            int heightDifference = usableHeightSansKeyboard - usableHeightNow;
            if (heightDifference > (usableHeightSansKeyboard / 4)) {
                frameLayoutParams.height = usableHeightSansKeyboard
                        - heightDifference;
            } else {
                frameLayoutParams.height = usableHeightSansKeyboard;
            }
            mChildOfContent.requestLayout();
            usableHeightPrevious = usableHeightNow;
        }
    }

    private int computeUsableHeight() {
        Rect r = new Rect();
        mChildOfContent.getWindowVisibleDisplayFrame(r);
        return (r.bottom - r.top);
    }
}
```

</details>


### 根据经纬度计算两点间的距离
<details>
<summary>点我展开</summary>

```java
/**
 * Created by jiangtao on 2017/4/19 15:01
 * E-mail：3305727299@qq.com
 */
public static double getDistance(double long1, double lat1, double long2, double lat2) {
    double a, b, R;
    R = 6378137;
    lat1 = lat1 * Math.PI / 180.0;
    lat2 = lat2 * Math.PI / 180.0;
    a = lat1 - lat2;
    b = (long1 - long2) * Math.PI / 180.0;
    double d;
    double sa2, sb2;
    sa2 = Math.sin(a / 2.0);
    sb2 = Math.sin(b / 2.0);
    d = 2 * R * Math.asin(Math.sqrt(sa2 * sa2 + Math.cos(lat1) * Math.cos(lat2) * sb2 * sb2));
    return d;
}
```

</details>

### Base64Utils.java
<details>
<summary>点我展开</summary>

```java

import java.nio.charset.StandardCharsets;
import java.util.Base64;

/**
 * @version Base64Utils, v0.1 2020/7/7 10:28
 */
public class Base64Utils {

    final static Base64.Encoder encoder = Base64.getEncoder();
    final static Base64.Decoder decoder = Base64.getDecoder();

    /**
     * 给字符串加密
     *
     * @param text
     * @return
     */
    public static String encode(String text) {
        byte[] textByte = text.getBytes(StandardCharsets.UTF_8);
        return encoder.encodeToString(textByte);
    }

    /**
     * 将加密后的字符串进行解密
     *
     * @param encodedText
     * @return
     */
    public static String decode(String encodedText) {
        return new String(decoder.decode(encodedText), StandardCharsets.UTF_8);
    }
}

```

</details>

### File2Base64.java
<details>
<summary>点我展开</summary>

```java
import android.util.Base64;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;

/**
 * Created by jiangtao on 2017/3/20 11:10
 * E-mail：3305727299@qq.com
 */
public class File2Base64 {

    /**
     * 将文件转成base64 字符串
     *
     * @param path 文件路径
     * @return 编码后的字符串
     * @author 3305727299@qq.com
     */
    public static String encodeBase64File(String path) throws Exception {
        File file = new File(path);
        FileInputStream inputFile = new FileInputStream(file);
        byte[] buffer = new byte[(int) file.length()];
        inputFile.read(buffer);
        inputFile.close();
        return Base64.encodeToString(buffer, Base64.DEFAULT);
    }

    /**
     * 将base64字符解码保存文件
     *
     * @param base64Code 编码后的字串
     * @param savePath   文件保存路径
     * @author 3305727299@qq.com
     */
    public static void decoderBase64File(String base64Code, String savePath) throws Exception {
        byte[] buffer = Base64.decode(base64Code, Base64.DEFAULT);
        FileOutputStream out = new FileOutputStream(savePath);
        out.write(buffer);
        out.close();
    }
}
```

</details>

### Apk下载
<details>
<summary>点我展开</summary>

```java
import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Environment;
import android.support.v7.app.NotificationCompat;
import android.util.Log;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Created by jiangtao on 2017/3/13 13:04
 * E-mail：3305727299@qq.com
 */

public final class Download extends AsyncTask<String, Integer, String> {
    private File file;
    private Context context;
    private String fileName;
    private NotificationCompat.Builder builder;
    private NotificationManager notificationManager;

    public Download(Context context) {
        this.context = context;
        notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        builder = new NotificationCompat.Builder(context);
        builder.setTicker("下载开始了...")
                .setContentTitle("Download")
                .setSmallIcon(R.mipmap.ic_launcher);
    }

    @Override
    protected String doInBackground(String... params) {
        URL url;
        HttpURLConnection conn;
        BufferedInputStream bis = null;
        FileOutputStream fos = null;

        try {
            url = new URL(params[0]);
            Log.i("TAG", url.toString());
            conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setConnectTimeout(5000);

            int fileLength = conn.getContentLength();
            bis = new BufferedInputStream(conn.getInputStream());

            fileName = getFileName(params[0]);
            builder.setContentTitle(fileName);
            String fileDir = Environment.getExternalStorageDirectory().getPath() + "/Download/" + fileName;
            file = new File(fileDir);
            if (!file.exists()) {
                if (!file.getParentFile().exists()) {
                    if (file.getParentFile().mkdirs()) {
                        file.createNewFile();
                    }
                }
            } else {
                return "文件已存在";
            }
            fos = new FileOutputStream(file);
            byte data[] = new byte[4 * 1024];
            long total = 0;
            int count;
            while ((count = bis.read(data)) != -1) {
                total += count;
                Log.i("TAG", "total:" + total);
                publishProgress((int) (total * 100 / fileLength));
                fos.write(data, 0, count);
                fos.flush();
            }
            fos.flush();
            return "下载成功";
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (fos != null) {
                    fos.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                if (bis != null) {
                    bis.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return "网络错误";
    }

    @Override
    protected void onProgressUpdate(Integer... progress) {
        super.onProgressUpdate(progress);
        if (progress[0] == 100) {
            builder.setTicker("下载完成！");
        }
        builder.setProgress(100, progress[0], false);
        builder.setContentText("正在下载..." + progress[0] + "%");
        notificationManager.notify(1, builder.build());
    }

    @Override
    protected void onPostExecute(String s) {
        super.onPostExecute(s);
        builder.setContentText(s);
        builder.setProgress(0, 0, false);
        notificationManager.notify(1, builder.build());
        if (fileName.endsWith(".apk")) {
            openFile(file);
        }
    }

    public static String getFileName(String url) {
        String filename = "";
        boolean isOk = false;
        // 从UrlConnection中获取文件名称
        try {
            URL myURL = new URL(url);
            URLConnection conn = myURL.openConnection();
            if (conn == null) {
                return null;
            }
            Map<String, List<String>> hf = conn.getHeaderFields();
            if (hf == null) {
                return null;
            }
            Set<String> key = hf.keySet();
            if (key == null) {
                return null;
            }
            for (String stringKey : key) {
                List<String> values = hf.get(stringKey);
                for (String value : values) {
                    String result;
                    try {
                        result = new String(value.getBytes("ISO-8859-1"), "GBK");
                        int location = result.indexOf("filename");
                        if (location >= 0) {
                            result = result.substring(location + "filename".length());
                            filename = result.substring(result.indexOf("=") + 1);
                            isOk = true;
                        }
                    } catch (UnsupportedEncodingException e) {
                        e.printStackTrace();
                    }// ISO-8859-1 UTF-8 gb2312
                }
                if (isOk) {
                    break;
                }
            }
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        // 从路径中获取
        if (filename == null || "".equals(filename)) {
            filename = url.substring(url.lastIndexOf("/") + 1);
        }
        return filename;
    }

    private void openFile(File file) {
        Intent intent = new Intent();
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.setAction(Intent.ACTION_VIEW);
        intent.setDataAndType(Uri.fromFile(file), "application/vnd.android.package-archive");
        context.startActivity(intent);
    }
}
```

</details>

### 根据日期和经纬度，计算日出日落时间
<details>
<summary>点我展开</summary>

```c++
#include<iostream>
#include<math.h>
#include<sstream>

#define PI 3.1415926

using namespace std;

//定义全局变量
int days_of_month_1[]= {31,28,31,30,31,30,31,31,30,31,30,31};
int days_of_month_2[]= {31,29,31,30,31,30,31,31,30,31,30,31};
long double h=-0.833;

//判断是否为闰年:若为闰年,返回1；若非闰年,返回0
int leap_year(int year)
{
    if(((year%400==0) || (year%100!=0) && (year%4==0))) return 1;
    else return 0;
}


//求从格林威治时间公元2000年1月1日到计算日天数days
int days(int year, int month, int date)
{
    int i,a=0;
    for(i=2000; i<year; i++)
    {
        if(leap_year(i)) a=a+366;
        else a=a+365;
    }
    if(leap_year(year))
    {
        for(i=0; i<month-1; i++)
        {
            a=a+days_of_month_2[i];
        }
    }
    else
    {
        for(i=0; i<month-1; i++)
        {
            a=a+days_of_month_1[i];
        }
    }
    a=a+date;
    return a;
}


//求格林威治时间公元2000年1月1日到计算日的世纪数t
long double t_century(int days, long double UTo)
{
    return ((long double)days+UTo/360)/36525;
}


//求太阳的平黄径
long double L_sun(long double t_century)
{
    return (280.460+36000.770*t_century);
}

//求太阳的平近点角
long double G_sun(long double t_century)
{
    return (357.528+35999.050*t_century);
}

//求黄道经度
long double ecliptic_longitude(long double L_sun,long double G_sun)
{
    return (L_sun+1.915*sin(G_sun*PI/180)+0.02*sin(2*G_sun*PI/180));
}

//求地球倾角
long double earth_tilt(long double t_century)
{
    return (23.4393-0.0130*t_century);
}

//求太阳偏差
long double sun_deviation(long double earth_tilt, long double ecliptic_longitude)
{
    return (180/PI*asin(sin(PI/180*earth_tilt)*sin(PI/180*ecliptic_longitude)));
}

//求格林威治时间的太阳时间角GHA
long double GHA(long double UTo, long double G_sun, long double ecliptic_longitude)
{
    return  (UTo-180-1.915*sin(G_sun*PI/180)-0.02*sin(2*G_sun*PI/180)+2.466*sin(2*ecliptic_longitude*PI/180)-0.053*sin(4*ecliptic_longitude*PI/180));
}

//求修正值e
long double e(long double h, long double lat, long double sun_deviation)
{
    return  180/PI*acos((sin(h*PI/180)-sin(lat*PI/180)*sin(sun_deviation*PI/180))/(cos(lat*PI/180)*cos(sun_deviation*PI/180)));
}

//求日出时间
long double UT_rise(long double UTo, long double GHA, long double lng, long double e)
{
    return (UTo-(GHA+lng+e));
}

//求日落时间
long double UT_set(long double UTo, long double GHA, long double lng, long double e)
{
    return (UTo-(GHA+lng-e));
}

//判断并返回结果（日出）
long double result_rise(long double UT, long double UTo, long double lng, long double lat, int year, int month, int date)
{
    long double d;
    if(UT>=UTo) d=UT-UTo;
    else d=UTo-UT;
    if(d>=0.1)
    {
        UTo=UT;
        UT=UT_rise(UTo,
                   GHA(UTo,
                       G_sun(t_century(days(year,
                                            month,
                                            date),
                                       UTo)
                            ),ecliptic_longitude(L_sun(t_century(days(year,
                                    month,
                                    date),
                                    UTo)
                                                      ),
                                    G_sun(t_century(days(year,
                                            month,
                                            date),
                                            UTo)
                                         )
                                                )
                      ),
                   lng,
                   e(h,
                     lat,
                     sun_deviation(earth_tilt(t_century(days(year,
                                              month,
                                              date),
                                              UTo)
                                             ),
                                   ecliptic_longitude(L_sun(t_century(days(year,
                                           month,
                                           date),
                                           UTo)
                                                           ),
                                           G_sun(t_century(days(year,
                                                   month,
                                                   date),
                                                   UTo)
                                                )
                                                     )
                                  )
                    )
                  );
        result_rise(UT,UTo,lng,lat,year,month,date);
    }
    return UT;
}


//判断并返回结果（日落）
long double result_set(long double UT, long double UTo, long double lng, long double lat, int year, int month, int date)
{
    long double d;
    if(UT>=UTo) d=UT-UTo;
    else d=UTo-UT;
    if(d>=0.1)
    {
        UTo=UT;
        UT=UT_set(UTo,
                  GHA(UTo,
                      G_sun(t_century(days(year,
                                           month,
                                           date),
                                      UTo)),
                      ecliptic_longitude(L_sun(t_century(days(year,
                                               month,
                                               date),
                                               UTo)),
                                         G_sun(t_century(days(year,
                                                 month,
                                                 date),
                                                 UTo)
                                              )
                                        )
                     ),
                  lng,
                  e(h,
                    lat,
                    sun_deviation(earth_tilt(t_century(days(year,
                                             month,
                                             date),
                                             UTo)
                                            ),
                                  ecliptic_longitude(L_sun(t_century(days(year,
                                          month,
                                          date),
                                          UTo)
                                                          ),
                                          G_sun(t_century(days(year,
                                                  month,
                                                  date),
                                                  UTo)
                                               )
                                                    )
                                 )
                   )
                 );
        result_set(UT,UTo,lng,lat,year,month,date);
    }
    return UT;
}


//求时区
int Zone(long double lng)
{
    if(lng>=0)
        return (int)((int)(lng/15.0)+1);
    else return (int)((int)(lng/15.0)-1);
}

//打印结果
string output(long double rise, long double set, long double lng)
{
    string hour;
    string mine;
    string sunrise_result;
    string sunset_result;

    if((int)(60*(rise/15+Zone(lng)-(int)(rise/15+Zone(lng))))<10)
    {
        stringstream ss_hour;
        ss_hour<<(int)(rise/15+Zone(lng));
        ss_hour>>hour;

        stringstream ss_mine;
        ss_mine<<(int)(60*(rise/15+Zone(lng)-(int)(rise/15+Zone(lng))));
        ss_mine>>mine;

        sunrise_result = hour + ":0" + mine;
        //cout<<"The time at which the sun rises is "<<(int)(rise/15+Zone(lng))<<":0"<<(int)(60*(rise/15+Zone(lng)-(int)(rise/15+Zone(lng))))<<" .\n";
    }
    else
    {
        stringstream ss_hour;
        ss_hour<<(int)(rise/15+Zone(lng));
        ss_hour>>hour;

        stringstream ss_mine;
        ss_mine<<(int)(60*(rise/15+Zone(lng)-(int)(rise/15+Zone(lng))));
        ss_mine>>mine;

        sunrise_result = hour + ":" + mine;
        //cout<<"The time at which the sun rises is "<<(int)(rise/15+Zone(lng))<<":"<<(int)(60*(rise/15+Zone(lng)-(int)(rise/15+Zone(lng))))<<" .\n";
    }
    if((int)(60*(set/15+Zone(lng)-(int)(set/15+Zone(lng))))<10)
    {
        stringstream ss_hour;
        ss_hour<<(int)(set/15+Zone(lng));
        ss_hour>>hour;

        stringstream ss_mine;
        ss_mine<<(int)(60*(set/15+Zone(lng)-(int)(set/15+Zone(lng))));
        ss_mine>>mine;

        sunset_result = hour + ": " + mine;
        //cout<<"The time at which the sun sets is "<<(int)(set/15+Zone(lng))<<": "<<(int)(60*(set/15+Zone(lng)-(int)(set/15+Zone(lng))))<<" .\n";
    }

    else
    {
        stringstream ss_hour;
        ss_hour<<(int)(set/15+Zone(lng));
        ss_hour>>hour;

        stringstream ss_mine;
        ss_mine<<(int)(60*(set/15+Zone(lng)-(int)(set/15+Zone(lng))));
        ss_mine>>mine;

        sunset_result = hour + ":" + mine;
        //cout<<"The time at which the sun sets is "<<(int)(set/15+Zone(lng))<<":"<<(int)(60*(set/15+Zone(lng)-(int)(set/15+Zone(lng))))<<" .\n";
    }

    return sunrise_result + "," + sunset_result;
}


string get_sunrise_and_sunset_time(int year,int month,int date,double lat,double lng)
{
    long double UTo=180.0;

    int c[3] = {year,month,date};

    long double rise,set;
    rise=result_rise(UT_rise(UTo,GHA(UTo,G_sun(t_century(days(year,month,date),UTo)),ecliptic_longitude(L_sun(t_century(days(year,month,date),UTo)),G_sun(t_century(days(year,month,date),UTo)))),lng,e(h,lat,sun_deviation(earth_tilt(t_century(days(year,month,date),UTo)),ecliptic_longitude(L_sun(t_century(days(year,month,date),UTo)),G_sun(t_century(days(year,month,date),UTo)))))),UTo,lng,lat,year,month,date);
    set=result_set(UT_set(UTo,GHA(UTo,G_sun(t_century(days(year,month,date),UTo)),ecliptic_longitude(L_sun(t_century(days(year,month,date),UTo)),G_sun(t_century(days(year,month,date),UTo)))),lng,e(h,lat,sun_deviation(earth_tilt(t_century(days(year,month,date),UTo)),ecliptic_longitude(L_sun(t_century(days(year,month,date),UTo)),G_sun(t_century(days(year,month,date),UTo)))))),UTo,lng,lat,year,month,date);

    return output(rise,set,lng);
}

int main()
{
    string s;
    s = get_sunrise_and_sunset_time(2017,12,12,36.01666,106.2833);
    cout << "日出日落时间：" << s;
    return 0;
}
```
```java
/**
 *
 * @author jiangtao
 * @date 2017/12/13
 */

public class SunriseAndSunsetTime {
    //定义全局变量
    private double PI = 3.1415926;
    private int daysOfMonth1[] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    private int daysOfMonth2[] = {31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    private double h = -0.833;

    private String sunrise;
    private String sunset;

    public SunriseAndSunsetTime() {
    }

    public SunriseAndSunsetTime(int year, int month, int date, double lat, double lng) {
        setTimeAndLoc(year,month,date,lat,lng);
    }

    public String getSunrise() {
        return sunrise;
    }

    public String getSunset() {
        return sunset;
    }

    //判断是否为闰年:若为闰年,返回1；若非闰年,返回0
    private boolean leapYear(int year) {
        return ((year % 400 == 0) || (year % 100 != 0) && (year % 4 == 0));
    }


    //求从格林威治时间公元2000年1月1日到计算日天数days
    private int days(int year, int month, int date) {
        int i, a = 0;
        for (i = 2000; i < year; i++) {
            if (leapYear(i)) {
                a = a + 366;
            } else {
                a = a + 365;
            }
        }
        if (leapYear(year)) {
            for (i = 0; i < month - 1; i++) {
                a = a + daysOfMonth2[i];
            }
        } else {
            for (i = 0; i < month - 1; i++) {
                a = a + daysOfMonth1[i];
            }
        }
        a = a + date;
        return a;
    }


    //求格林威治时间公元2000年1月1日到计算日的世纪数t
    private double tCentury(int days, double uto) {
        return ((double) days + uto / 360) / 36525;
    }


    //求太阳的平黄径
    private double lSun(double tCentury) {
        return (280.460 + 36000.770 * tCentury);
    }

    //求太阳的平近点角
    private double gSun(double tCentury) {
        return (357.528 + 35999.050 * tCentury);
    }

    //求黄道经度
    private double eclipticLongitude(double lSun, double gSun) {
        return (lSun + 1.915 * Math.sin(gSun * PI / 180) + 0.02 * Math.sin(2 * gSun * PI / 180));
    }

    //求地球倾角
    private double earthTilt(double tCentury) {
        return (23.4393 - 0.0130 * tCentury);
    }

    //求太阳偏差
    private double sunDeviation(double earthTilt, double eclipticLongitude) {
        return (180 / PI * Math.asin(Math.sin(PI / 180 * earthTilt) * Math.sin(PI / 180 * eclipticLongitude)));
    }

    //求格林威治时间的太阳时间角GHA
    private double gha(double uto, double gSun, double eclipticLongitude) {
        return (uto - 180 - 1.915 * Math.sin(gSun * PI / 180) - 0.02 * Math.sin(2 * gSun * PI / 180) +
                2.466 * Math.sin(2 * eclipticLongitude * PI / 180) -
                0.053 * Math.sin(4 * eclipticLongitude * PI / 180));
    }

    //求修正值e
    private double e(double h, double lat, double sunDeviation) {
        return 180 / PI *
                Math.acos((Math.sin(h * PI / 180) - Math.sin(lat * PI / 180) * Math.sin(sunDeviation * PI / 180)) /
                        (Math.cos(lat * PI / 180) * Math.cos(sunDeviation * PI / 180)));
    }

    //求日出时间
    private double utRise(double uto, double gha, double lng, double e) {
        return (uto - (gha + lng + e));
    }

    //求日落时间
    private double utSet(double uto, double gha, double lng, double e) {
        return (uto - (gha + lng - e));
    }

    //判断并返回结果（日出）
    private double
    resultRise(double ut, double uto, double lng, double lat, int year, int month,
               int date) {
        double d;
        if (ut >= uto) {
            d = ut - uto;
        } else {
            d = uto - ut;
        }
        if (d >= 0.1) {
            uto = ut;
            ut = utRise(uto, gha(uto, gSun(tCentury(days(year, month, date), uto)),
                    eclipticLongitude(lSun(tCentury(days(year, month, date), uto)),
                            gSun(tCentury(days(year, month, date), uto)))),
                    lng, e(h, lat,
                            sunDeviation(earthTilt(tCentury(days(year, month, date), uto)),
                                    eclipticLongitude(
                                            lSun(tCentury(days(year, month, date), uto)),
                                            gSun(tCentury(days(year, month, date),
                                                    uto))))));
            resultRise(ut, uto, lng, lat, year, month, date);
        }
        return ut;
    }


    //判断并返回结果（日落）
    private double
    resultSet(double ut, double uto, double lng, double lat, int year, int month,
              int date) {
        double d;
        if (ut >= uto) {
            d = ut - uto;
        } else {
            d = uto - ut;
        }
        if (d >= 0.1) {
            uto = ut;
            ut = utSet(uto, gha(uto, gSun(tCentury(days(year, month, date), uto)),
                    eclipticLongitude(lSun(tCentury(days(year, month, date), uto)),
                            gSun(tCentury(days(year, month, date), uto)))),
                    lng, e(h, lat,
                            sunDeviation(earthTilt(tCentury(days(year, month, date), uto)),
                                    eclipticLongitude(
                                            lSun(tCentury(days(year, month, date), uto)),
                                            gSun(tCentury(days(year, month, date), uto))))));
            resultSet(ut, uto, lng, lat, year, month, date);
        }
        return ut;
    }


    //求时区
    private int zone(double lng) {
        if (lng >= 0) {
            return ((int) (lng / 15.0) + 1);
        } else {
            return ((int) (lng / 15.0) - 1);
        }
    }

    //打印结果
    private void output(double rise, double set, double lng) {
        int hour;
        int min;
        if ((int) (60 * (rise / 15 + zone(lng) - (int) (rise / 15 + zone(lng)))) < 10) {
//        cout << "the sun rises is " << (int) (rise / 15 + zone(lng)) << ":0"
//             << (int) (60 * (rise / 15 + zone(lng) - (int) (rise / 15 + zone(lng)))) << " .\n";
            hour = (int) (rise / 15 + zone(lng));
            min = (int) (60 * (rise / 15 + zone(lng) - (int) (rise / 15 + zone(lng))));
            sunrise = hour + ":0" + min;
        } else {
//        cout << "the sun rises is " << (int) (rise / 15 + zone(lng)) << ":"
//             << (int) (60 * (rise / 15 + zone(lng) - (int) (rise / 15 + zone(lng)))) << " .\n";
            hour = (int) (rise / 15 + zone(lng));
            min = (int) (60 * (rise / 15 + zone(lng) - (int) (rise / 15 + zone(lng))));
            sunrise = hour + ":" + min;
        }
        if ((int) (60 * (set / 15 + zone(lng) - (int) (set / 15 + zone(lng)))) < 10) {
//        cout << "the sun sets is " << (int) (set / 15 + zone(lng)) << ": "
//             << (int) (60 * (set / 15 + zone(lng) - (int) (set / 15 + zone(lng)))) << " .\n";
            hour = (int) (set / 15 + zone(lng));
            min = (int) (60 * (set / 15 + zone(lng) - (int) (set / 15 + zone(lng))));
            sunset = hour + ": " + min;
        } else {
//        cout << "the sun sets is " << (int) (set / 15 + zone(lng)) << ":"
//             << (int) (60 * (set / 15 + zone(lng) - (int) (set / 15 + zone(lng)))) << " .\n";
            hour = (int) (set / 15 + zone(lng));
            min = (int) (60 * (set / 15 + zone(lng) - (int) (set / 15 + zone(lng))));
            sunset = hour + ":" + min;
        }
    }


    public void setTimeAndLoc(int year, int month, int date, double lat, double lng) {
        double uto = 180.0;

        int[] c = {year, month, date};

        double rise, set;
        rise = resultRise(utRise(uto, gha(uto, gSun(tCentury(days(year, month, date), uto)),
                eclipticLongitude(
                        lSun(tCentury(days(year, month, date), uto)),
                        gSun(tCentury(days(year, month, date), uto)))),
                lng, e(h, lat, sunDeviation(
                        earthTilt(tCentury(days(year, month, date), uto)),
                        eclipticLongitude(lSun(tCentury(days(year, month, date), uto)),
                                gSun(tCentury(days(year, month, date), uto)))))), uto, lng,
                lat, year, month, date);
        set = resultSet(utSet(uto, gha(uto, gSun(tCentury(days(year, month, date), uto)),
                eclipticLongitude(
                        lSun(tCentury(days(year, month, date), uto)),
                        gSun(tCentury(days(year, month, date), uto)))), lng,
                e(h, lat,
                        sunDeviation(earthTilt(tCentury(days(year, month, date), uto)),
                                eclipticLongitude(
                                        lSun(tCentury(days(year, month, date), uto)),
                                        gSun(tCentury(days(year, month, date),
                                                uto)))))), uto, lng, lat, year,
                month, date);

        output(rise, set, lng);
    }
}
```

</details>

### android 5 新 UI
<details>
<summary>点我展开</summary>

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="ljt.appbarlayout.MainActivity"
    tools:layout_editor_absoluteY="81dp">

    <!-- 对LinearLayout的封装，方向为垂直方向 -->
    <android.support.design.widget.AppBarLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:theme="@style/ThemeOverlay.AppCompat.Dark.ActionBar">

        <!-- android.support.v7.widget.Toolbar 的扩展，layout_scrollFlags设置滚动样式 -->
        <!--
             CollapsingToolbarLayout是用来对Toolbar进行再次包装的ViewGroup，主要是用于实现折叠（其实就是看起来像伸缩~）的App Bar效果。它需要放在AppBarLayout布局里面，并且作为AppBarLayout的直接子View。CollapsingToolbarLayout主要包括几个功能（参照了官方网站上内容，略加自己的理解进行解释）：

            (1) 折叠Title（Collapsing title）：当布局内容全部显示出来时，title是最大的，但是随着View逐步移出屏幕顶部，title变得越来越小。你可以通过调用setTitle函数来设置title。

            (2)内容纱布（Content scrim）：根据滚动的位置是否到达一个阀值，来决定是否对View“盖上纱布”。可以通过setContentScrim(Drawable)来设置纱布的图片.

            (3)状态栏纱布（Status bar scrim)：根据滚动位置是否到达一个阀值决定是否对状态栏“盖上纱布”，你可以通过setStatusBarScrim(Drawable)来设置纱布图片，但是只能在LOLLIPOP设备上面有作用。

            (4)视差滚动子View(Parallax scrolling children):子View可以选择在当前的布局当时是否以“视差”的方式来跟随滚动。（PS:其实就是让这个View的滚动的速度比其他正常滚动的View速度稍微慢一点）。将布局参数app:layout_collapseMode设为parallax

            (5)将子View位置固定(Pinned position children)：子View可以选择是否在全局空间上固定位置，这对于Toolbar来说非常有用，因为当布局在移动时，可以将Toolbar固定位置而不受移动的影响。 将app:layout_collapseMode设为pin。
         -->
        <!--
        app:layout_scrollFlags：
        （1） scroll:值设为scroll的View会跟随滚动事件一起发生移动。
        （2） enterAlways:值设为enterAlways的View,当ScrollView往下滚动时，该View会直接往下滚动。而不用考虑ScrollView是否在滚动。
        （3） exitUntilCollapsed：值设为exitUntilCollapsed的View，当这个View要往上逐渐“消逝”时，会一直往上滑动，直到剩下的的高度达到它的最小高度后，再响应ScrollView的内部滑动事件。
        （4） enterAlwaysCollapsed：是enterAlways的附加选项，一般跟enterAlways一起使用，它是指，View在往下“出现”的时候，首先是enterAlways效果，当View的高度达到最小高度时，View就暂时不去往下滚动，直到ScrollView滑动到顶部不再滑动时，View再继续往下滑动，直到滑到View的顶部结束。
        -->
        <android.support.design.widget.CollapsingToolbarLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:background="?attr/colorPrimary"
            app:expandedTitleMarginEnd="64dp"
            app:expandedTitleMarginStart="48dp"
            app:layout_scrollFlags="scroll|enterAlways|enterAlwaysCollapsed"
            app:statusBarScrim="@android:color/transparent">

            <!-- 头部差值滚动图片 -->
            <ImageView
                android:layout_width="match_parent"
                android:layout_height="300dp"
                android:scaleType="centerCrop"
                android:src="@mipmap/title_bar"
                app:layout_collapseMode="parallax" />

            <!-- 真实的toolbar -->
            <android.support.v7.widget.Toolbar
                android:id="@+id/toolbar"
                android:layout_width="match_parent"
                android:layout_height="?attr/actionBarSize"
                app:layout_collapseMode="pin" />
        </android.support.design.widget.CollapsingToolbarLayout>
    </android.support.design.widget.AppBarLayout>

    <!--
     把ScrollView和AppBarLayout作为CoordinateLayout的子View，然后编写一个Behavior，在这个Behavior里面判断当前的操作是应该让ScrollView时刻保持在AppBarLayout之下（即只要改变AppBarLayout的位置就可以一起滑动），还是应该让ScrollView内部滚动而不让AppBarLayout位置发生变化等等这些需求，都是可以在Behavior里面处理的。你可以去针对你的ScrollView编写Behavior。然而，我们看到我们的AppBarLayout事先的功能比较复杂，如果我们自己去定义这样的效果，代码非常复杂，还要考虑很多方面，好在Android帮我们写好啦，我们直接用就是了，这个ScrollView就是NestedScrollView，请注意，它并没有继承ScrollView，它继承的是FrameLayout，但是它实现的效果把它可以看成是ScrollView。
     -->
    <android.support.v4.widget.NestedScrollView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:layout_behavior="@string/appbar_scrolling_view_behavior">

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="@string/test_str" />

    </android.support.v4.widget.NestedScrollView>

</android.support.design.widget.CoordinatorLayout>
```

</details>

### MD5
<details>
<summary>点我展开</summary>

```java
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.security.MessageDigest;

import org.apache.commons.codec.binary.Hex;
import org.apache.commons.codec.digest.DigestUtils;

/**
 * MD5计算工具
 */
public class Md5CaculateUtil {

    /**
     * 获取一个文件的md5值(可处理大文件)
     *
     * @return md5 value
     */
    public static String getMD5(File file) {
        FileInputStream fileInputStream = null;
        try {
            MessageDigest MD5 = MessageDigest.getInstance("MD5");
            fileInputStream = new FileInputStream(file);
            byte[] buffer = new byte[102400];
            int length;
            while ((length = fileInputStream.read(buffer)) != -1) {
                MD5.update(buffer, 0, length);
            }
            return new String(Hex.encodeHex(MD5.digest()));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            try {
                if (fileInputStream != null) {
                    fileInputStream.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 求一个字符串的md5值
     *
     * @param target 字符串
     * @return md5 value
     */
    public static String MD5(String target) {
        return DigestUtils.md5Hex(target);
    }

    public static void main(String[] args) {
        long beginTime = System.currentTimeMillis();
        File file = new File("D:/1/pdi-ce-7.0.0.0-24.zip");
        String md5 = getMD5(file);
        long endTime = System.currentTimeMillis();
        System.out.println("MD5:" + md5 + "\n 耗时:" + ((endTime - beginTime) / 1000) + "s");
    }
}
```

</details>

### 文件重命名
<details>
<summary>点我展开</summary>

```java
import java.io.File;

public class ChangeFileName {
    public static String[] getFileName(String path) {
        File file = new File(path);
        String[] fileName = file.list();
        return fileName;
    }

    public static void renameFile(String path, String oldname) {
        System.out.println(path + "\\" + oldname);
        String newname = oldname;
        newname = newname.replace("[在线]", "");
        newname = newname.replace("+", "");
        newname = newname.replace("~", "");
        if (!oldname.equals(newname)) {//新的文件名和以前文件名不同时,才有必要进行重命名
            File oldfile = new File(path + "\\" + oldname);
            File newfile = new File(path + "\\" + newname);
            if (!oldfile.exists()) {
                return;//重命名文件不存在
            }
            if (newfile.exists())//若在该目录下已经有一个文件和新文件名相同，则不允许重命名
                System.out.println(newname + "已经存在！");
            else {
                boolean b = oldfile.renameTo(newfile);
                if (b) {
                    System.out.println("更名成功");
                } else {
                    System.out.println("更名失败");
                }
            }
        } else {
            System.out.println("新文件名和旧文件名相同...");
        }
    }

    public static void main(String[] args) {
        int page = 111;
        while (page <= 130) {

            String[] fileName = getFileName("G:\\slb\\" + page);//<span style="font-family: Arial, Helvetica, sans-serif;">此处修改为你的本地路径</span>
            for (int i = 0; i < fileName.length; i++) {
                renameFile("G:\\slb\\" + page, fileName[i]);//cx修改为你要修改的文件名格式
            }
            page++;
        }
    }
}
```

</details>

### okhttp3上传图片
<details>
<summary>点我展开</summary>

```java
import android.content.Context;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import okhttp3.Headers;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

/**
 * @Created by jiangtao on 2019/8/26
 */
public class UpLoadImgThread {
    private static UpLoadImgThread sImgThread;
    private Context mContext;

    private UpLoadImgThread(Context context) {
        mContext = context.getApplicationContext();
    }

    public static synchronized UpLoadImgThread getInstance(Context context) {
        if (sImgThread == null) {
            sImgThread = new UpLoadImgThread(context);
        }
        return sImgThread;
    }

    public void upLoad(String url, String fileKey, List<String> pathList, Map<String, String> header, Map<String, Object> params, final CallBackListener mCallBackListener) {
        MyHandler handler = new MyHandler();
        handler.setCallBackListener(mCallBackListener, pathList.size());
        ExecutorService singlePool = Executors.newSingleThreadExecutor();
        for (int i = 0; i < pathList.size(); i++) {
            singlePool.execute(new UploadTask(url, fileKey, pathList.get(i), header, params, handler));
        }
    }

    public void upLoadNet(String url, String fileKey, List<String> pathList, List<Boolean> isNet, Map<String, Object> params, final CallBackListener mCallBackListener) {
        MyHandler handler = new MyHandler();
        handler.setCallBackListener(mCallBackListener, pathList.size());
        ExecutorService singlePool = Executors.newSingleThreadExecutor();
        for (int i = 0; i < pathList.size(); i++) {
            singlePool.execute(new UploadNetTask(url, fileKey, pathList.get(i), isNet.get(i), params, handler));
        }
    }

    /**
     * 图片上传线程
     */
    public class UploadTask implements Runnable {

        private String fileKey;
        private String filePath;
        private String url;
        private Map<String, String> header;
        private Map<String, Object> params;
        private String[] values;
        private MyHandler mMyHandler;

        private UploadTask(String url, String fileKey, String filepath, Map<String, String> header, Map<String, Object> params, MyHandler handler) {
            this.fileKey = fileKey;
            this.filePath = filepath;
            this.url = url;
            this.header = header;
            this.params = params;
            mMyHandler = handler;
        }

        //发送返回的数据
        @Override
        public void run() {
            String[] values = upload(url, fileKey, filePath, header, params);
            if ("1".equals(values[0])) {
                Message message = Message.obtain();
                Bundle bundle = new Bundle();
                bundle.putString("info", values[1]);
                message.setData(bundle);
                message.what = 0;
                mMyHandler.sendMessage(message);
            } else {
                Message message = Message.obtain();
                Bundle bundle = new Bundle();
                bundle.putString("info", values[1]);
                message.setData(bundle);
                message.what = 1;
                mMyHandler.sendMessage(message);
            }
        }

        //上传图片并返回服务器返回的数据
        private String[] upload(String url, String fileKey, String filepath, Map<String, String> header, Map<String, Object> params) {
            try {
                OkHttpClient okHttpClient = new OkHttpClient();
                Headers headers = Headers.of(header);

                // form 表单形式上传
                MultipartBody.Builder requestBody = new MultipartBody.Builder().setType(MultipartBody.FORM);
                if (filepath != null) {
                    // MediaType.parse() 里面是上传的文件类型。
                    File file = new File(filepath);
                    RequestBody body = RequestBody.create(file, MediaType.parse("image/*"));
                    String filename = file.getName();
                    // 参数分别为， 请求key ，文件名称 ， RequestBody
                    requestBody.addFormDataPart(fileKey, filename, body);
                }
                if (params != null) {
                    // map 里面是请求中所需要的 key 和 value
                    for (Map.Entry entry : params.entrySet()) {
                        requestBody.addFormDataPart(String.valueOf(entry.getKey()), String.valueOf(entry.getValue()));
                    }
                }

                //创建RequestBody
                RequestBody body = requestBody.build();
                //创建Request
                final Request request = new Request.Builder().url(url).headers(headers).post(body).build();
                try (Response response = okHttpClient.newCall(request).execute()) {
                    if (response.body() != null && response.isSuccessful()) {
                        String jsonData = Objects.requireNonNull(response.body()).string();
                        values = new String[]{"1", jsonData};
                    } else {
                        values = new String[]{"0", "网络请求失败: " + response.toString()};
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
                values = new String[]{"0", "网络请求失败:" + e.toString()};
            }
            return values;
        }
    }

    /**
     * 网络图片上传线程
     */
    public class UploadNetTask implements Runnable {

        private String fileKey;
        private String filePath;
        private String url;
        private Map<String, Object> params;
        private boolean isNetPic;
        private String[] values;
        private MyHandler mMyHandler;

        private UploadNetTask(String url, String fileKey, String filepath, boolean isNetPic, Map<String, Object> params, MyHandler handler) {
            this.fileKey = fileKey;
            this.filePath = filepath;
            this.isNetPic = isNetPic;
            this.url = url;
            this.params = params;
            mMyHandler = handler;
        }

        //发送返回的数据
        @Override
        public void run() {
            String[] values = upload(url, fileKey, filePath, isNetPic, params);
            if ("1".equals(values[0])) {
                Message message = Message.obtain();
                Bundle bundle = new Bundle();
                bundle.putString("info", values[1]);
                message.setData(bundle);
                message.what = 0;
                mMyHandler.sendMessage(message);
            } else {
                Message message = Message.obtain();
                Bundle bundle = new Bundle();
                bundle.putString("info", values[1]);
                message.setData(bundle);
                message.what = 1;
                mMyHandler.sendMessage(message);
            }
        }

        //上传图片并返回服务器返回的数据
        public String[] upload(String url, String fileKey, String filepath, boolean isNetPic, Map<String, Object> params) {
//            try {
//                final StringRequest request = new StringRequest(url, RequestMethod.POST);
//                File glidePath = new File(filepath);
//                if (isNetPic) {
//                    glidePath = Glide.with(mContext).load(filepath).downloadOnly(Target.SIZE_ORIGINAL, Target.SIZE_ORIGINAL).get();
//                }
//                File tempPath = new Compressor(mContext).compressToFile(glidePath);
//                request.add(params).add(fileKey, tempPath);
//
//                Response<String> response = SyncRequestExecutor.INSTANCE.execute(request);
//                Log.e("返回值", response.toString());
//                if (response.isSucceed()) {
//                    Log.e("返回值", response.get());
//                    values = new String[]{"1", response.get()};
//                } else {
//                    // 请求失败，拿到错误：
//                    Exception e = response.getException();
//                    values = new String[]{"0", "网络请求失败:" + e.toString()};
//                }
//            } catch (Exception e) {
//                Log.e("try：", e.toString());
//                values = new String[]{"0", "图片上传失败"};
//            }
            return values;
        }
    }


    /**
     * 回调接口
     */
    public interface CallBackListener {
        void onFinish(List<String> values);

        void onError(String e);
    }

    /**
     * Handler传递消息
     */
    private class MyHandler extends Handler {
        private CallBackListener mCallBackListener;
        private int temp;
        private int total;
        private List<String> values;

        public void setCallBackListener(CallBackListener callBackListener, int size) {
            mCallBackListener = callBackListener;
            temp = 0;
            values = new ArrayList<>();
            total = size;
        }

        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);
            String info = msg.getData().getString("info");
            temp++;
            switch (msg.what) {
                case 0:
                    values.add(info);
                    if (temp == total) {
                        mCallBackListener.onFinish(values);
                    }
                    break;
                case 1:
                    Log.e("图片上传失败", "第" + temp + "张照片上传失败" + info);
                    mCallBackListener.onError(info);
                    break;
            }
        }
    }
}
```

</details>

### 权限申请
<details>
<summary>点我展开</summary>

```kotlin
import android.app.Activity
import android.content.pm.PackageManager
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import java.util.*

/**
 * @author kavan jiangtao on 2019/8/6
 */
object PermissionUtils {
    const val REQUEST_CODE = 10
    @JvmStatic
    fun applyPermission(activity: Activity, permissions: Array<String>) {
        val permissionList: MutableList<String> = ArrayList()
        for (permission in permissions) {
            if (ContextCompat.checkSelfPermission(activity, permission) != PackageManager.PERMISSION_GRANTED) {
                permissionList.add(permission)
            }
        }
        val permissionArray = permissionList.toTypedArray()
        if (permissionArray.isNotEmpty()) {
            ActivityCompat.requestPermissions(activity, permissionArray, REQUEST_CODE)
        }
    }

    @JvmStatic
    fun hasPermission(activity: Activity, permissions: Array<String>): Boolean {
        for (permission in permissions) {
            if (ContextCompat.checkSelfPermission(activity, permission) != PackageManager.PERMISSION_GRANTED) {
                return false
            }
        }
        return true
    }

    @JvmStatic
    fun isGrantedAll(grantResults: IntArray): Boolean {
        var isGranted = false
        for (grantResult in grantResults) {
            if (grantResult == PackageManager.PERMISSION_GRANTED) {
                isGranted = true
            } else {
                isGranted = false
                break
            }
        }
        return isGranted
    }
}
```

</details>

### content映射到文件路径
<details>
<summary>点我展开</summary>

```java
import android.annotation.SuppressLint;
import android.content.ContentUris;
import android.content.Context;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.DocumentsContract;
import android.provider.MediaStore;

/**
 * Created by Admin on 2018/11/27
 * Describe:
 */
public class FileUriUtils {
    public static String getRealPathFromURI(Context context, Uri contentUri) {
        String res = null;
        String[] proj = {MediaStore.Images.Media.DATA};
        Cursor cursor = context.getContentResolver().query(contentUri, proj, null, null, null);
        if (null != cursor && cursor.moveToFirst()) {
            ;
            int column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
            res = cursor.getString(column_index);
            cursor.close();
        }
        return res;
    }

    /**
     * 专为Android4.4设计的从Uri获取文件绝对路径，以前的方法已不好使
     */
    @SuppressLint("NewApi")
    public static String getPath(final Context context, final Uri uri) {

        final boolean isKitKat = Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT;

        // DocumentProvider
        if (isKitKat && DocumentsContract.isDocumentUri(context, uri)) {
            // ExternalStorageProvider
            if (isExternalStorageDocument(uri)) {
                final String docId = DocumentsContract.getDocumentId(uri);
                final String[] split = docId.split(":");
                final String type = split[0];

                if ("primary".equalsIgnoreCase(type)) {
                    return Environment.getExternalStorageDirectory() + "/" + split[1];
                }
            }
            // DownloadsProvider
            else if (isDownloadsDocument(uri)) {

                final String id = DocumentsContract.getDocumentId(uri);
                final Uri contentUri = ContentUris.withAppendedId(
                        Uri.parse("content://downloads/public_downloads"), Long.valueOf(id));

                return getDataColumn(context, contentUri, null, null);
            }
            // MediaProvider
            else if (isMediaDocument(uri)) {
                final String docId = DocumentsContract.getDocumentId(uri);
                final String[] split = docId.split(":");
                final String type = split[0];

                Uri contentUri = null;
                if ("image".equals(type)) {
                    contentUri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
                } else if ("video".equals(type)) {
                    contentUri = MediaStore.Video.Media.EXTERNAL_CONTENT_URI;
                } else if ("audio".equals(type)) {
                    contentUri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
                }

                final String selection = "_id=?";
                final String[] selectionArgs = new String[]{split[1]};

                return getDataColumn(context, contentUri, selection, selectionArgs);
            }
        }
        // MediaStore (and general)
        else if ("content".equalsIgnoreCase(uri.getScheme())) {
            return getDataColumn(context, uri, null, null);
        }
        // File
        else if ("file".equalsIgnoreCase(uri.getScheme())) {
            return uri.getPath();
        }
        return null;
    }

    /**
     * Get the value of the data column for this Uri. This is useful for
     * MediaStore Uris, and other file-based ContentProviders.
     *
     * @param context       The context.
     * @param uri           The Uri to query.
     * @param selection     (Optional) Filter used in the query.
     * @param selectionArgs (Optional) Selection arguments used in the query.
     * @return The value of the _data column, which is typically a file path.
     */
    public static String getDataColumn(Context context, Uri uri, String selection,
                                       String[] selectionArgs) {

        Cursor cursor = null;
        final String column = "_data";
        final String[] projection = {column};

        try {
            cursor = context.getContentResolver().query(uri, projection, selection, selectionArgs,
                    null);
            if (cursor != null && cursor.moveToFirst()) {
                final int column_index = cursor.getColumnIndexOrThrow(column);
                return cursor.getString(column_index);
            }
        } finally {
            if (cursor != null)
                cursor.close();
        }
        return null;
    }

    /**
     * @param uri The Uri to check.
     * @return Whether the Uri authority is ExternalStorageProvider.
     */
    public static boolean isExternalStorageDocument(Uri uri) {
        return "com.android.externalstorage.documents".equals(uri.getAuthority());
    }

    /**
     * @param uri The Uri to check.
     * @return Whether the Uri authority is DownloadsProvider.
     */
    public static boolean isDownloadsDocument(Uri uri) {
        return "com.android.providers.downloads.documents".equals(uri.getAuthority());
    }

    /**
     * @param uri The Uri to check.
     * @return Whether the Uri authority is MediaProvider.
     */
    public static boolean isMediaDocument(Uri uri) {
        return "com.android.providers.media.documents".equals(uri.getAuthority());
    }
}
```

</details>


### 圆角图片
<details>
<summary>点我展开</summary>

```java
import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Bitmap;
import android.graphics.BitmapShader;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.graphics.RectF;
import android.graphics.Shader;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.ColorDrawable;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.util.AttributeSet;
import android.widget.ImageView;

/**
 * Created by Administrator on 2016/10/19.
 */

public class CircleImageView extends ImageView {
    private static final ScaleType SCALE_TYPE = ScaleType.CENTER_CROP;

    private static final Bitmap.Config BITMAP_CONFIG = Bitmap.Config.ARGB_8888;
    private static final int COLORDRAWABLE_DIMENSION = 1;

    private static final int DEFAULT_BORDER_WIDTH = 0;
    private static final int DEFAULT_BORDER_COLOR = Color.BLACK;

    private final RectF mDrawableRect = new RectF();
    private final RectF mBorderRect = new RectF();

    private final Matrix mShaderMatrix = new Matrix();
    private final Paint mBitmapPaint = new Paint();
    private final Paint mBorderPaint = new Paint();

    private int mBorderColor = DEFAULT_BORDER_COLOR;
    private int mBorderWidth = DEFAULT_BORDER_WIDTH;

    private Bitmap mBitmap;
    private BitmapShader mBitmapShader;
    private int mBitmapWidth;
    private int mBitmapHeight;

    private float mDrawableRadius;
    private float mBorderRadius;

    private boolean mReady;
    private boolean mSetupPending;

    public CircleImageView(Context context) {
        super(context);

        init();
    }

    public CircleImageView(Context context, AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public CircleImageView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);

//        TypedArray a = context.obtainStyledAttributes(attrs, R.styleable.CircleImageView, defStyle, 0);
//
//        mBorderWidth = a.getDimensionPixelSize(R.styleable.CircleImageView_border_width, DEFAULT_BORDER_WIDTH);
//        mBorderColor = a.getColor(R.styleable.CircleImageView_border_color, DEFAULT_BORDER_COLOR);
//
//        a.recycle();

        init();
    }

    private void init() {
        super.setScaleType(SCALE_TYPE);
        mReady = true;

        if (mSetupPending) {
            setup();
            mSetupPending = false;
        }
    }

    @Override
    public ScaleType getScaleType() {
        return SCALE_TYPE;
    }

    @Override
    public void setScaleType(ScaleType scaleType) {
        if (scaleType != SCALE_TYPE) {
            throw new IllegalArgumentException(String.format("ScaleType %s not supported.", scaleType));
        }
    }

    @Override
    protected void onDraw(Canvas canvas) {
        if (getDrawable() == null) {
            return;
        }

        canvas.drawCircle(getWidth() / 2, getHeight() / 2, mDrawableRadius, mBitmapPaint);
        if (mBorderWidth != 0) {
            canvas.drawCircle(getWidth() / 2, getHeight() / 2, mBorderRadius, mBorderPaint);
        }
    }

    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(w, h, oldw, oldh);
        setup();
    }

    public int getBorderColor() {
        return mBorderColor;
    }

    public void setBorderColor(int borderColor) {
        if (borderColor == mBorderColor) {
            return;
        }

        mBorderColor = borderColor;
        mBorderPaint.setColor(mBorderColor);
        invalidate();
    }

    public int getBorderWidth() {
        return mBorderWidth;
    }

    public void setBorderWidth(int borderWidth) {
        if (borderWidth == mBorderWidth) {
            return;
        }

        mBorderWidth = borderWidth;
        setup();
    }

    @Override
    public void setImageBitmap(Bitmap bm) {
        super.setImageBitmap(bm);
        mBitmap = bm;
        setup();
    }

    @Override
    public void setImageDrawable(Drawable drawable) {
        super.setImageDrawable(drawable);
        mBitmap = getBitmapFromDrawable(drawable);
        setup();
    }

    @Override
    public void setImageResource(int resId) {
        super.setImageResource(resId);
        mBitmap = getBitmapFromDrawable(getDrawable());
        setup();
    }

    @Override
    public void setImageURI(Uri uri) {
        super.setImageURI(uri);
        mBitmap = getBitmapFromDrawable(getDrawable());
        setup();
    }

    private Bitmap getBitmapFromDrawable(Drawable drawable) {
        if (drawable == null) {
            return null;
        }

        if (drawable instanceof BitmapDrawable) {
            return ((BitmapDrawable) drawable).getBitmap();
        }

        try {
            Bitmap bitmap;

            if (drawable instanceof ColorDrawable) {
                bitmap = Bitmap.createBitmap(COLORDRAWABLE_DIMENSION, COLORDRAWABLE_DIMENSION, BITMAP_CONFIG);
            } else {
                bitmap = Bitmap.createBitmap(drawable.getIntrinsicWidth(), drawable.getIntrinsicHeight(), BITMAP_CONFIG);
            }

            Canvas canvas = new Canvas(bitmap);
            drawable.setBounds(0, 0, canvas.getWidth(), canvas.getHeight());
            drawable.draw(canvas);
            return bitmap;
        } catch (OutOfMemoryError e) {
            return null;
        }
    }

    private void setup() {
        if (!mReady) {
            mSetupPending = true;
            return;
        }

        if (mBitmap == null) {
            return;
        }

        mBitmapShader = new BitmapShader(mBitmap, Shader.TileMode.CLAMP, Shader.TileMode.CLAMP);

        mBitmapPaint.setAntiAlias(true);
        mBitmapPaint.setShader(mBitmapShader);

        mBorderPaint.setStyle(Paint.Style.STROKE);
        mBorderPaint.setAntiAlias(true);
        mBorderPaint.setColor(mBorderColor);
        mBorderPaint.setStrokeWidth(mBorderWidth);

        mBitmapHeight = mBitmap.getHeight();
        mBitmapWidth = mBitmap.getWidth();

        mBorderRect.set(0, 0, getWidth(), getHeight());
        mBorderRadius = Math.min((mBorderRect.height() - mBorderWidth) / 2, (mBorderRect.width() - mBorderWidth) / 2);

        mDrawableRect.set(mBorderWidth, mBorderWidth, mBorderRect.width() - mBorderWidth, mBorderRect.height() - mBorderWidth);
        mDrawableRadius = Math.min(mDrawableRect.height() / 2, mDrawableRect.width() / 2);

        updateShaderMatrix();
        invalidate();
    }

    private void updateShaderMatrix() {
        float scale;
        float dx = 0;
        float dy = 0;

        mShaderMatrix.set(null);

        if (mBitmapWidth * mDrawableRect.height() > mDrawableRect.width() * mBitmapHeight) {
            scale = mDrawableRect.height() / (float) mBitmapHeight;
            dx = (mDrawableRect.width() - mBitmapWidth * scale) * 0.5f;
        } else {
            scale = mDrawableRect.width() / (float) mBitmapWidth;
            dy = (mDrawableRect.height() - mBitmapHeight * scale) * 0.5f;
        }

        mShaderMatrix.setScale(scale, scale);
        mShaderMatrix.postTranslate((int) (dx + 0.5f) + mBorderWidth, (int) (dy + 0.5f) + mBorderWidth);

        mBitmapShader.setLocalMatrix(mShaderMatrix);
    }
}
```

</details>


### 解决ScrollView滑动粘滞
<details>
<summary>点我展开</summary>

```java
import android.content.Context;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.view.ViewConfiguration;
import android.widget.ScrollView;

/**
 * Created by jiangtao on 2017/2/12 16:10
 * E-mail：3305727299@qq.com
 */
public class SlideScrollview extends ScrollView {
    private int downX;
    private int downY;
    private int mTouchSlop;

    public SlideScrollview(Context context) {
        super(context);
        mTouchSlop = ViewConfiguration.get(context).getScaledTouchSlop();
    }

    public SlideScrollview(Context context, AttributeSet attrs) {
        super(context, attrs);
        mTouchSlop = ViewConfiguration.get(context).getScaledTouchSlop();
    }

    public SlideScrollview(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        mTouchSlop = ViewConfiguration.get(context).getScaledTouchSlop();
    }

    @Override
    public boolean onInterceptTouchEvent(MotionEvent e) {
        int action = e.getAction();
        switch (action) {
            case MotionEvent.ACTION_DOWN:
                downX = (int) e.getRawX();
                downY = (int) e.getRawY();
                break;
            case MotionEvent.ACTION_MOVE:
                int moveY = (int) e.getRawY();
                if (Math.abs(moveY - downY) > mTouchSlop) {
                    return true;
                }
        }
        return super.onInterceptTouchEvent(e);
    }
}
```

</details>