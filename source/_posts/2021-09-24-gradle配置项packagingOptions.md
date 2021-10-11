---
title: gradle配置项packagingOptions
comments: false
toc: true
date: 2021-09-24 09:30:14
pathsuffix: gradle-configuration-item-packaging-options
updated:
tags: gradle
categories: 技术
---
packagingOptions常见的设置项有exclude、pickFirst、doNotStrip、merge。

1. exclude，过滤掉某些文件或者目录不添加到APK中，作用于APK，不能过滤aar和jar中的内容。
比如：
```groovy
packagingOptions {
    exclude 'META-INF/**'
    exclude 'lib/arm64-v8a/libmediaplayer.so'
}
```
2. pickFirst，匹配到多个相同文件，只提取第一个。只作用于APK，不能过滤aar和jar中的文件。
比如：
```groovy
packagingOptions {
    pickFirst "lib/armeabi-v7a/libaaa.so"
    pickFirst "lib/armeabi-v7a/libbbb.so" 
}
```
3. doNotStrip，可以设置某些动态库不被优化压缩。
比如：
```groovy
packagingOptions{
    doNotStrip "*/armeabi/*.so"
    doNotStrip "*/armeabi-v7a/*.so"
}
```
4. merge，将匹配的文件都添加到APK中，和pickFirst有些相反，会合并所有文件。
比如：
```groovy
packagingOptions {
    merge '**/LICENSE.txt'
    merge '**/NOTICE.txt'
}
```