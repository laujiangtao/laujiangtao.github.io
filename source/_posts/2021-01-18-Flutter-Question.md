---
title: Flutter Question
pathsuffix: flutter-question
comments: false
date: 2021-01-18 09:32:33
tags: flutter
category: Question
toc: true
---

安装完flutter环境，执行`flutter doctor`命令，检查flutter开发工具链。

![flutter doctor](flutter_doctor_terminal.png)

按照提示安装对应插件即可，但在Android Studio 4.1以上版本，插件目录更换，导致之前在Android Studio版本里面安装到饿插件找不到。

老版本插件目录：`/Library/Application\ Support/AndroidStudio4.1`

新版本插件目录：`/Library/Application Support/Google/AndroidStudio4.1/plugins`

flutter使用的老版本Android Studio插件目录查找插件，产生错误，虽然目前bug已经修复，但是还没有release出来。

我发现解决方法有两种：

第一种如网上所说，在终端执行`ln -s ~/Library/Application\ Support/Google/AndroidStudio4.1/plugins ~/Library/Application\ Support/AndroidStudio4.1`，在新的插件目录下创建之前插件目录的软连接，通过软连接找到插件。

第二种切换flutter sdk的分支到dev（dev分支已经修复此bug）。