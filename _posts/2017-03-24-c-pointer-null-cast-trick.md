---
layout: post
title: 强制类型（结构体）转换NULL-----C指针的黑科技
date: 2017-03-24
tags: [AI, C/C++]
description: 探讨C语言中通过强制类型转换NULL指针来获取结构体成员偏移量的技巧。以Tencent libco库中的一段代码为例，解释了 `(long)(((a *)NULL)->o)` 的原理及其在内存操作中的应用。
---
探讨C语言中通过强制类型转换NULL指针来获取结构体成员偏移量的技巧。以Tencent libco库中的一段代码为例，解释了 `(long)(((a *)NULL)->o)` 的原理及其在内存操作中的应用。

<!-- more -->

#### 一个头疼的例子（改写自Tencent—libco）


```
#include<stdio.h>
#include<string.h>
typedef struct aa{
    char a;
    int b;
    char o[3];
}a;
int main(void)
{
    a test;
    memset(&test, 0, (long)(((a *)NULL)->o));
}
```


这个memset想要干啥？？？


##### 测试


```
int main(void)
```
