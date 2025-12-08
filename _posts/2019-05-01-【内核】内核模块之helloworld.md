---
layout: post
title: "【内核】内核模块之helloworld"
date: 2019-05-01
---

#### 前言


很早之前写过内核模块，前两天探究一个问题时又用到了，结果因为忘记了大部分知识又重新学了一遍，这次还是记录一下，以后就不用再查了。


### 正文


#### 准备工作


内核模块开发与普通应用开发完全不同，再也不是我们熟悉的stdio起手，main开写。而是单独的功能函数。


所以我们要先安装依赖的函数库（内核代码）。以我的Fedora 29（kenel version 4.18.16-300.fc29.x86_64）为例，自然要安装对应版本的代码库。sudo dnf install kernel-devel-4.18.16-300.fc29.x86_64然后在/usr/src/kernel就可以看到对应代码库了。


#### 开发流程


主要是一个源码文件（以test.c为例）和Makefile文件。Makefile文件格式相对固定


```
LINUX_KERNEL_PATH := /usr/src/kernels/$(shell uname -r)
obj-m += test.o
all:
	make -C /lib/modules/$(shell <
```
