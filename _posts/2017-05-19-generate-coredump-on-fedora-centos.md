---
layout: post
title: 【无脑教程】Fedora & CentOS下coredump文件生成方法
date: 2017-05-19
tags: [C/C++, AI, Linux]
description: 介绍在Fedora和CentOS系统下如何生成和配置coredump文件。解释了段错误的原因，以及如何设置ulimit和修改 `/proc/sys/kernel/core_pattern` 来控制core文件的生成路径和命名。
---
介绍在Fedora和CentOS系统下如何生成和配置coredump文件。解释了段错误的原因，以及如何设置ulimit和修改 `/proc/sys/kernel/core_pattern` 来控制core文件的生成路径和命名。

<!-- more -->

#### 背景


测试环境 Fedora 25&24 CentOS 7目测 Deepin 并没有坑 而Ubuntu可能也存在这个问题(也有类似abrt的二进制文件)


#### 前言


从Windows平台下转到到Linux下的C/C++开发可能第一个接触到的新名词就是段错误


也就是这样


首先是一段神秘代码


```
#include <stdio.h>
int main(void)
{
    char a[1];
    char *b = a[20];
    printf("%c",*b);
}
```


然后编译运行
