---
layout: post
title: Redis的embstr与raw编码方式不再以39字节为界了！
date: 2017-09-20
---

引言
从“中国软件杯”回来之后，一直对项目中没用到Redis以至于在存储上坑爹而耿耿于怀，心想一定要学一下Redis然后把之前的项目再改进一下，一边学习基本使用，一边对照《Redis设计与实现》深入，不禁感慨数据结构之美妙。。。
正文
结论
Redis的embstr编码方式和raw编码方式在3.0版本之前是以39字节为分界的，也就是说，如果一个字符串值的长度小于等于39字节，则按照embstr进行编码，否则按照raw进行编码。  而在3.2版本之后，则变成了44字节为分界。
起因：一次失败的实验
在《Redis设计与实现》第八章对象中，有这样一段话

如果字符串对象保存的是一个字符串值，并且这个字符串值的长度小于等于39字节，那么字符串对象将使用embstr编码的方式来保存这个字符串值。 

于是我就在自己的Redis上测试了一下  
这和书上说的不太对啊。。。而且为什么是39这个数字呢？？
继续探究
根据知乎上的回答 怀疑在3.0和3.2版本之间的改动导致了39字节不再适用，于是直接在github查看object.c的改动。同时也希望能找到为什么是39而不是其他数。
源码面前，了无秘密
首先“为什么是39”这个问题的答案很清楚，来自这个commit  
作者大大的说明如下

REDIS_ENCODING_EMBSTR_SIZE_LIMIT set to 39.  The new value is the limit for the robj + SDS header + string +  null-term to stay inside the 64 bytes Jemalloc arena in 64 bits  systems.

这里具体的分析可以参考@lhcpig的回答 ,非常的清晰，我就不再赘述。
而为什么现在39个字节不适用了呢？  粗暴地回答，因为现在REDIS_ENCODING_EMBSTR_SIZE_LIMIT不再是39而是44了。  那么为什么这个宏要变化呢？  则是来自这个commit  
commit地址
这个commit改动相当大，主要就是对sds进行了内存优化。  我们知道对于每个sds都有一个sdshdr，里面的len和free记录了这个sds的长度和空闲空间，但是这样的处理十分粗糙，使用的unsigned int可以表示很大的范围，但是对于很短的sds有很多的空间被浪费了(两个unsigned int 8个字节)。而这个commit则将原来的sdshdr改成了sdshdr16，sdshdr32，sdshdr64，里面的unsigned int 变成了uint8_t,uint16_t.。。。（还加了一个char flags）这样更加优化小sds的内存使用。
相信聪明的看官看到这里已经明白了为什么39变成了44.
本身就是针对短字符串的embstr自然会使用最小的sdshdr8，而sdshdr8与之前的sdshdr相比正好减少了5个字节（sdsdr8 = uint8_t * 2 + char = 1*2+1 = 3, sdshdr = unsigned int * 2 = 4 * 2 = 8）,所以其能容纳的字符串长度增加了5个字节变成了44.
所以
看书还是要亲手实践一下，如果有问题，直接看源码~
相关链接
为什么redis小等于39字节的字符串是embstr编码，大于39是raw编码？  Redis源码
