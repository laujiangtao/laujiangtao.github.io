---
title: Windows VScode 配置 C++ 环境
pathsuffix: windows-vscode-configures-the-cpp-environment
comments: false
date: 2021-01-28 20:39:37
tags: C++
category: 技术
toc: true
---
**Windows 安装 MinGW-w64**

1. [官网下载地址](http://mingw-w64.org/doku.php/download)

   ![mingw-w64](img0.png)

   Windows点击 **[MingW-W64-builds](http://mingw-w64.org/doku.php/download/mingw-builds)** 选项下载

2. 下载后安装

   ![安装](img4.png)

3. 安装过程，下载文件

   ![安装过程](img5.png)

   在国内下载过程非常慢，我下载了两天，最终失败。所以直接去下载安装包了。

4. 下载安装包 [mingw64-x86_64-8.1.0-release-posix-seh-rt_v6-rev0.7z](mingw64-x86_64-8.1.0-release-posix-seh-rt_v6-rev0.7z "mingw64-x86_64-8.1.0-release-posix-seh-rt_v6-rev0.7z")

5. 解压文件到本地目录并复制`bin`的路径

   ![本地目录](img2.png)

6. 将路径添加到环境变量

   ![添加到环境变量](img1.png)

7. 在命令行检查环境变量是否配置成功

   ```
   gcc --version
   g++ --version
   gdb --version
   ```

   ![命令行](img3.png)

**VSCode 配置C++**

1. vscode 安装C++插件，在vscode插件中搜索`C++`

   ![安装C++插件](img6.png)

2. 配置编译器

   按快捷键`Ctrl+Shift+P`调出命令面板，输入`C/C++`，选择`Edit Configurations(UI)`进入配置。

   ![快捷进入C++配置](img7.png)

    ![配置页面面板](img8.png)

    配置两个选项：

- 编译器路径

- IntelliSense 模式

  ![编译器路径](img9.png)

    ![IntelliSense 模式](img10.png)

    配置完成后，此时在侧边栏可以发现多了一个`.vscode`文件夹，并且里面有一个`c_cpp_properties.json`文件，内容如下，说明上述配置成功。

    <details>
    <summary><font color='blue'>点我展开 c_cpp_properties.json</font></summary>

    ```json
    {
        "configurations": [
            {
                "name": "Win32",
                "includePath": [
                    "${workspaceFolder}/**"
                ],
                "defines": [
                    "_DEBUG",
                    "UNICODE",
                    "_UNICODE"
                ],
                "compilerPath": "D:/Program Files (x86)/mingw-w64/mingw64-x86_64-8.1.0-release-posix-seh-rt_v6-rev0/mingw64/bin/g++.exe",
                "cStandard": "gnu17",
                "cppStandard": "gnu++14",
                "intelliSenseMode": "gcc-x64"
            }
        ],
        "version": 4
    }
    ```

    </details>

4. 现在可以通过 Ctrl + < + ` 快捷键打开内置终端并进行编译运行了。

    ![终端运行程序](img11.png)

5. 配置构建任务

   使用vscode的默认构建任务工具，调用`g++`编译器，编译源代码，创建可执行文件。

   同样，按快捷键`Ctrl+Shift+P`调出命令面板，输入`tasks`，选择`Tasks:Configure Default Build Task`

   ![命令面板](img12.png)

   再选择`C/C++: g++.exe build active file`，会出现一个`tasks.json`配置文件：

    <details>
    <summary><font color='blue'>点我展开 tasks.json</font></summary>

    ```json
    {
        "version": "2.0.0",
        "tasks": [
            {
                "type": "cppbuild",
                "label": "C/C++: g++.exe build active file",
                "command": "D:/Program Files (x86)/mingw-w64/mingw64-x86_64-8.1.0-release-posix-seh-rt_v6-rev0/mingw64/bin/g++.exe",
                "args": [
                    "-g",
                    "${file}",
                    "-o",
                    "${fileDirname}\\${fileBasenameNoExtension}.exe"
                ],
                "options": {
                    "cwd": "D:/Program Files (x86)/mingw-w64/mingw64-x86_64-8.1.0-release-posix-seh-rt_v6-rev0/mingw64/bin"
                },
                "problemMatcher": [
                    "$gcc"
                ],
                "group": {
                    "kind": "build",
                    "isDefault": true
                },
                "detail": "compiler: \"D:/Program Files (x86)/mingw-w64/mingw64-x86_64-8.1.0-release-posix-seh-rt_v6-rev0/mingw64/bin/g++.exe\""
            }
        ]
    }
    ```

    </details>

6. 配置调试设置

   点击菜单`运行->启动调试`

   ![菜单](img13.png)

   选择`C++(GDB/LLDB)`

   ![C++(GDB/LLDB)](img14.png)

   在选择`g++.exe - 生成和调试活动文件`

   ![](img15.png)

   会在`.vscode`文件夹里面生成一个`launch.json`文件

    <details>
    <summary><font color='blue'>点我展开 launch.json</font></summary>

    ```json
    {
        // 使用 IntelliSense 了解相关属性。 
        // 悬停以查看现有属性的描述。
        // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
        "version": "0.2.0",
        "configurations": [
            {
                "name": "g++.exe - 生成和调试活动文件",
                "type": "cppdbg",
                "request": "launch",
                "program": "${fileDirname}\\${fileBasenameNoExtension}.exe",
                "args": [],
                "stopAtEntry": false,
                "cwd": "D:/Program Files (x86)/mingw-w64/mingw64-x86_64-8.1.0-release-posix-seh-rt_v6-rev0/mingw64/bin",
                "environment": [],
                "externalConsole": false,
                "MIMode": "gdb",
                "miDebuggerPath": "D:\\Program Files (x86)\\mingw-w64\\mingw64-x86_64-8.1.0-release-posix-seh-rt_v6-rev0\\mingw64\\bin\\gdb.exe",
                "setupCommands": [
                    {
                        "description": "为 gdb 启用整齐打印",
                        "text": "-enable-pretty-printing",
                        "ignoreFailures": true
                    }
                ],
                "preLaunchTask": "C/C++: g++.exe build active file"
            }
        ]
    }
    ```

    </details>

    然后，可以点击右下角`添加配置...`按钮，添加相应配置

    ![launch.json配置](img17.png)

    或者复制别人的配置进来。



至此，`.vscode`文件夹下共有三个文件`c_cpp_properties.json`、`launch.json`、`tasks.json`。

![.vscode](img16.png)

> 手动创建这三个文件，将上述相应内容复制进去，也可以完成相应配置。



现在可以按`F5`调试一下`hello.cpp`试试

![调试](img18.png)

