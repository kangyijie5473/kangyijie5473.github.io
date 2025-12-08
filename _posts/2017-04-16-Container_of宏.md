---
layout: post
title: "Container_of宏"
date: 2017-04-16
---

#### Container_of宏


```
#define offsetof(TYPE, MEMBER)  ((size_t)&((TYPE *)0)->MEMBER)
#define container_of(ptr, type, member) ({          \
    const typeof( ((type *)0)->member )*__mptr = (ptr); \
    (type *)( (char *)__mptr - offsetof(type,member) );})
```


这个宏是用来返回结构体首地址的。因为Linux的struct list_head相当于将链表节点做成一种通用的数据结构，我们只需操作它既可以完成链表的插入、删除等操作但是如何通过某个成员如(链表指针)找到首地址，完成对其他成员的访问呢？


container_of 需要一个成员的地址（ptr）成员变量名（member） 结构体类型（type）就可以得到首地址首先定义了一个常量指针__mptr，类型通过typeof进行推导（此处有疑问）。将__mptr减去member在type的偏移量就是首地址，再加上type*的强制类型转换。


##### 问题


在定义常量指针__mptr时,为什么要将类型通过typeof推导确定，我使用void *可以得到同样的结呀


##### 解答


使用_mptr的目的是在编译期间进行类型检测(第一句，赋值时如果类型不匹配会报警告)，保证传入的成员地址与成员类型是匹配的，而在运行期间则和忽略中间变量__mptr是一样的。


###### 广告


之前曾经遇到一个关于NULL指针的问题，是在一个开源项目里的，算是对container_of 的一种活学活用吧。强制类型转换–(type *)
