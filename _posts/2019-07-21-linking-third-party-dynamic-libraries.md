---
layout: post
title: 【踩坑】链接第三方动态库
date: 2019-07-21
tags: [Redis, Network, C/C++]
description: "本文以Redis客户端hiredis为例，详细介绍了在C/C++项目中链接第三方动态库的方法。文章分析了Makefile的编译链接配置，讲解了如何解决运行时找不到库的问题（如设置 `LD_LIBRARY_PATH`），并分享了利用 `pkg-config` 生成的 `.pc` 文件来简化编译参数配置的技巧。"
---
本文以Redis客户端hiredis为例，详细介绍了在C/C++项目中链接第三方动态库的方法。文章分析了Makefile的编译链接配置，讲解了如何解决运行时找不到库的问题（如设置 `LD_LIBRARY_PATH`），并分享了利用 `pkg-config` 生成的 `.pc` 文件来简化编译参数配置的技巧。

<!-- more -->

#### 前言


每一个今天你绕过去不填的坑，都会在未来等着你。—哲·士沃硕德


### 正文


一个C/C++程序从源码到可执行文件都需要经过 预处理-编译-汇编-链接 这几个过程，当然现在只需要gcc x.c就可以了，而不需要我们去执行具体的cpp等程序了，非常的方便。回到今天的case上来，当我们需要编写一个依赖第三方库的程序时，该如何gcc x.c呢？


以Redis的C客户端hiredis为例，让我们看一下它的Makefile是怎控制编译链接的。


```
INSTALL?= cp -a

$(PKGCONFNAME): hiredis.h
        @echo "Generating $@ for pkgconfig..."
        @echo prefix=$(PREFIX) > $@
        @echo exec_prefix=\$${prefix} >> $@
        @echo libdir=$(PREFIX)/$(LIBRARY_PATH) >> $@
        @echo includedir=$(PREFIX)/$(INCLUDE_PATH) >> $@
        @echo >> $@
        @echo Name: hiredis >> $@
        @echo Description: Minimalistic C client library for Redis. >> $@
        @echo Version: $(HIREDIS_MAJOR).$(HIREDIS_MINOR).$(HIREDIS_PATCH) >> $@
        @echo Libs: -L\$${libdir} -lhiredis >> $@
        @echo Cflags: -I\$$
```
