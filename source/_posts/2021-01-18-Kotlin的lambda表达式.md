---
title: Kotlin的lambda表达式
pathsuffix: kotlin-lambda-expression
comments: false
date: 2021-01-18 10:19:22
tags: Kotlin
category: 技术
---
**在lambda表达式，只支持单抽象方法模型，即设计的接口里面只有一个抽象的方法，才符合lambda表达式的规则，多个回调方法不支持。**

- 1、用Java代码实现一个接口的回调。

  ```java
   mView.setEventListener(new EventListener(){
   
      public void onSuccess(Data data){
        //TODO
      }
   });
  ```

- 2、在Kotlin中的实现一个接口的回调,不使用lambda表达式(这种方式非常适用于kotlin中对于一个接口中含有多个回调方法)。

  ```kotlin
  mView.setEventListener(object: EventListener{
       
      public void onSuccess(Data data){
        //TODO
      }
  });
  ```

- 3、如果在Kotlin中的对于**接口只有一个回调的方法**，就符合使用lambda函数，我们可以把以上代码简化成这样。

  ```kotlin
  mView.setEventListener({
     data: Data ->
        //TODO
  })
  
  //或者可以直接省略Data,借助kotlin的智能类型推导
  
  mView.setEventListener({
     data ->
     //TODO
  })
  ```

- 4、如果以上代码中的**data参数没有使用**到的话，可以直接把data去掉

  ```kotlin
  mView.setEventListener({
    //TODO
  })
  ```

- 5、以上代码还可以做个调整，由于setEventListener函数**最后一个参数是一个函数**的话，可以直接把括号的实现提到圆括号外面

  ```kotlin
  mView.setEventListener(){
     //TODO
  }
  ```

- 6、由于setEventListener这个函数**只有一个参数**，可以直接省略圆括号

  ```kotlin
  mView.setEventListener{
    //TODO
  }
  ```