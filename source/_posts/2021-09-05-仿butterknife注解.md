---
title: 仿butterknife注解
comments: false
toc: true
date: 2021-09-05 12:14:01
pathsuffix: my-butter-knife
updated:
tags: java
categories: 技术
---
# View注解

1、声明变量上面的注解，约束注解使用范围
2、添加注解保留级别为运行时，使得注解能被JVM或其他使用反射机制的代码所读取和使用

```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface BindView {
    int value() default -1;
}
```
注入方法实现
1、创建注解类，传入当前activity，后续会使用到activity里面的findviewbyid方法
2、获取到activity里面的所有变量属性并遍历（注解消耗性能就在这里）
3、判断变量属性上面是否存在上面声明的注解
4、判断变量是否为public，不为public
5、如果存在则取出注解并获取注解里面的值
6、获取到findViewById方法，通过反射给属性赋值

```java
import android.app.Activity;

import java.lang.reflect.Field;
import java.lang.reflect.Method;

public class InjectView {

    public static void inject(Activity activity) {
        if (null == activity) return;

        Class<? extends Activity> activityClass = activity.getClass();
        Field[] declaredFields = activityClass.getDeclaredFields();
        for (Field field : declaredFields) {
            if (field.isAnnotationPresent(BindView.class)) {
                //public 1  private 2  protected 4  不写是0
                if (field.getModifiers() != 1) {
                    throw new IllegalArgumentException(field + " should be public.");
                }

                BindView bindView = field.getAnnotation(BindView.class);
                int value = bindView.value();

                try {
                    Method findViewById = activityClass.getMethod("findViewById", int.class);
                    findViewById.setAccessible(true);
                    Object view = findViewById.invoke(activity, value);
                    field.set(activity, view);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
```

# onClick注解

点击时间常用的有两种，onClick和onLongClick，所以要区分这两种注解，需要给注解添加原注解以区分

```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.ANNOTATION_TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface ClickType {
    Class clickType();
    String methodNameString();
}
```

然后声明两个点击时间的注解

```java
import android.view.View;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@ClickType(clickType = View.OnClickListener.class, methodNameString = "setOnClickListener")
public @interface OnClick {
    int[] value();
}

import android.view.View;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@ClickType(clickType = View.OnLongClickListener.class, methodNameString = "setOnLongClickListener")
public @interface OnLongClick {
    int[] value();
}
```
注入方法实现
1、获取activity内的方法
2、获取方法上面的注解
3、判断注解类型是否为ClickType
4、如果是，则取出注解内的值（点击事件类型和需要反射的方法名）
5、判断方法是否为onLongClickListener，如果是，方法返回值必须为boolean型
6、获取直接内的value方法，并获取里面的值
7、声明点击事件动态代理，并为每一个注解中元素对应的view设置点击代理

```java
import android.app.Activity;
import android.view.View;

import java.lang.annotation.Annotation;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class InjectClick {
    public static void inject(Activity activity) {
        Class<? extends Activity> activityClass = activity.getClass();
        Method[] declaredMethods = activityClass.getDeclaredMethods();

        for (Method method : declaredMethods) {
            Annotation[] annotations = method.getAnnotations();
            for (Annotation annotation : annotations) {
                Class<? extends Annotation> annotationType = annotation.annotationType();
                if (annotationType.isAnnotationPresent(ClickType.class)) {
                    ClickType eventType = annotationType.getAnnotation(ClickType.class);
                    Class clickType = eventType.clickType();
                    String methodNameString = eventType.methodNameString();

                    if (clickType == View.OnLongClickListener.class && method.getReturnType() != boolean.class) {
                        throw new RuntimeException(method + " returned value should be boolean.");
                    }

                    try {
                        //生命的注解值必须为values才能匹配
                        Method valueMethod = annotationType.getDeclaredMethod("value");
                        //获取注解是ClickType类型的注解的值
                        int[] viewIds = (int[]) valueMethod.invoke(annotation);
                        //没有添加注解值（响应点击时间的id没有设置）
                        if (viewIds == null || viewIds.length == 0) {
                            return;
                        }

                        method.setAccessible(true);
                        //点击时间的动态代理
                        Object clickProxy = Proxy.newProxyInstance(clickType.getClassLoader(),
                                new Class[]{clickType}, new ClickInvocationHandler(activity, method));
                        for (int viewId : viewIds) {
                            View view = activity.findViewById(viewId);
                            Method setter = view.getClass().getMethod(methodNameString, clickType);
                            setter.invoke(view, clickProxy);
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }

    static class ClickInvocationHandler implements InvocationHandler {

        private final Method method;
        private final Activity activity;

        public ClickInvocationHandler(Activity activity, Method method) {
            this.activity = activity;
            this.method = method;
        }

        @Override
        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
            return this.method.invoke(activity, args);
        }
    }
}
```

同理，可以使用这种思想应用到其他地方，比如activity之间的intent传值

# 值传递
定义存放key的注解
```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Autowired {
    String value() default "";
}
```

注入实现
```java
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Parcelable;

import java.lang.reflect.Field;
import java.util.Arrays;

public class InjectValues {
    public static void inject(Activity activity) {
        Class<? extends Activity> activityClass = activity.getClass();
        Bundle extras = activity.getIntent().getExtras();
        if (extras == null) {
            return;
        }

        Field[] declaredFields = activityClass.getDeclaredFields();
        for (Field field : declaredFields) {
            if (field.isAnnotationPresent(Autowired.class)) {
                Autowired autowired = field.getAnnotation(Autowired.class);
                String key;
                if ("".equals(autowired.value())) {
                    key = field.getName();
                } else {
                    key = autowired.value();
                }

                if (extras.containsKey(key)) {
                    Object o = extras.get(key);

                    //特殊处理Parcelable
                    o = getParcelableObject(o, field);

                    field.setAccessible(true);
                    try {
                        field.set(activity, o);
                    } catch (IllegalAccessException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }

    private static Object getParcelableObject(Object o, Field field) {
        Class<?> componentType = field.getType().getComponentType();
        if (field.getType().isArray() && Parcelable.class.isAssignableFrom(componentType)) {
            Object[] objs = (Object[]) o;
            o = Arrays.copyOf(objs, objs.length, (Class<? extends java.lang.Object[]>) field.getType());
        }
        return o;
    }
}
```
