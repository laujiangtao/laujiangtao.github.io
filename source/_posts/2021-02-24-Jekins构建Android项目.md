---
title: Jekins构建Android项目
pathsuffix: jekins-build-android-project
comments: false
date: 2021-02-24 10:21:33
tags: jekins
category: 技术
toc: true
---

+ 构建面板
![img1](img1.png)

+ 属性配置
![img2](img2.jpeg)
![img3](img3.jpeg)
![img4](img4.jpeg)

+ gradle task任务
```
app:clean
app:assemble${PRODUCT_FLAVORS}${BUILD_TYPE}
```

+ 构建完成，复制apk包到tomcat配置的公开目录下
```
cp /home/androidserver/.jenkins/workspace/Android/app/build/outputs/apk/${PRODUCT_FLAVORS}/${BUILD_TYPE}/${APP_NAME}-${PRODUCT_FLAVORS}-${BUILD_TYPE}-${APP_BUILD_TIME}.apk /home/androidserver/Public/mmmiddle/${APP_NAME}-${PRODUCT_FLAVORS}-${BUILD_TYPE}-${APP_BUILD_TIME}.apk
```

+ 钉钉消息配置，发送tomcat公开目录下的新apk文件地址
> http://192.168.2.98:8080/public/mmmiddle/${APP_NAME}-${PRODUCT_FLAVORS}-${BUILD_TYPE}-${APP_BUILD_TIME}.apk
> 
> ${DESCRIPTION}

+ 钉钉消息样式
![钉钉消息样式](img6.png)


## 插件
![安装的插件](img5.jpeg)