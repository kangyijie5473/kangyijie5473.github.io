---
layout: post
title: Redis-cluster集群傻瓜配置+Python操作集群小demo
date: 2017-04-30
---

##### 致谢


首先感谢提供机器让我测试的Sequin_YF、Paranoid同学，没有你们，没有本文。以及友好的redis.cn的各种中文教程，本文主要来自redis cluster教程


### 正文


#### Redis-cluster简介


Redis作为大火的K-V NoSQL自然不用细说。Redis的集群方案可以参照这个Redis集群怎么做问题的回答而关于本篇中的集群我引用了redis cluster教程的叙述


Redis 集群是一个提供在多个Redis间节点间共享数据的程序集。Redis集群并不支持处理多个keys的命令,因为这需要在不同的节点间移动数据,从而达不到像Redis那样的性能,在高负载的情况下可能会导致不可预料的错误.Redis 集群通过分区来提供一定程度的可用性,在实际环境中当某个节点宕机或者不可达的情况下继续处理命令. Redis 集群的优势:自动分割数据到不同的节点上。整个集群的部分节点失败或者不可达的情况下能够继续处理命令。


#### 傻瓜配置


主要需要Redis (version > 3，我用的3.2.8)、 Ruby、 Rubygems,其他的便是一些简单重复的操作了。正所谓懒惰即美德，我
