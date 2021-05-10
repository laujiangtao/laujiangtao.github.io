---
title: Jekins构建Flutter项目
pathsuffix: jekins-build-flutter-project
comments: false
date: 2021-02-24 10:55:42
tags: jekins
category: 技术
---

+ 构建面板
![img1](img1.png)

+ 构建命令
> 以登录方式执行bash命令，进入项目目录下，清除flutter缓存，构建对应服务器的Android apk，构建完成，将apk复制到tomcat公开目录下，发送钉钉消息。其他同Android项目构建
```
#!/bin/sh -l
cd ~/.jenkins/workspace/Flutter
flutter clean
flutter build apk --obfuscate --split-debug-info=/Flutter/build --target lib/main_${FLAVOR_NAME}.dart
```