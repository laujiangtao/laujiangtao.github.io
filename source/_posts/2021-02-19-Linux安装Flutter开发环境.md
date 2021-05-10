---
title: Linux安装Flutter开发环境
pathsuffix: linux-install-flutter-development-environment
comments: false
date: 2021-02-19 11:13:53
tags: flutter
category: 技术
---

[转到下载页](https://flutter.dev/docs/development/tools/sdk/releases?tab=linux)

> 在Windows电脑上通过ssh连接局域网内Linux打包服务器，在命令行安装flutter开发环境

## 获取Flutter SDK

```
wget https://storage.googleapis.com/flutter_infra/releases/stable/linux/flutter_linux_1.22.5-stable.tar.xz
```

![下载flutterSDK](img1.png)

## 将文件解压到合适目录下

```
tar xf flutter_linux_1.22.5-stable.tar.xz
```

![解压](img2.png)


如果你不想安装安装包的补丁，你可以跳过步骤 1 或步骤 2，直接获取 Github 上 Flutter 仓库 的源码并执行以下命令：

```
git clone https://github.com/flutter/flutter.git
```

你也可以按你的需要切换分支或者tag。例如，你可以使用 stable 版本的分支：

```
git clone https://github.com/flutter/flutter.git -b stable --depth 1
```

## 配置环境变量

+ 编辑`.profile`文件

```
vi .profile
```

+ 添加以下行并

```
export PUB_HOSTED_URL=https://pub.flutter-io.cn //国内用户需要设置
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn //国内用户需要设置
export PATH=[flutter dir]/flutter/bin:$PATH
```

![环境变量](img3.png)

+ 运行`source .profile`使得环境变量生效

## 执行命令初始化环境

+ 运行flutter自动下载dart SDK
  ![初始化环境](img4.png)

+ 运行`flutter doctor`检查工具链
  ![检查工具链](img5.png)

+ 运行`flutter doctor --android-licenses`同意相关协议
  ![相关协议](img6.png)