---
layout: post
title: linux积累（1）--root用户切换
date: 2016-06-02
tags: [Network, Linux]
description: "本文记录了作者在Linux小组学习初期的心得，主要解决了如何切换到 root 用户的问题。介绍了 `sudo su` 和 `su root` 的区别，以及 `sudo` 命令的便利性，并简要提及了 root 用户切换回普通用户无需密码的特性。"
---
本文记录了作者在Linux小组学习初期的心得，主要解决了如何切换到 root 用户的问题。介绍了 `sudo su` 和 `su root` 的区别，以及 `sudo` 命令的便利性，并简要提及了 root 用户切换回普通用户无需密码的特性。

<!-- more -->

http://www.cnblogs.com/weiweiqiao99/archive/2010/11/10/1873761.html


看到这篇博文学习到了很多，本文算是对这篇的个人感悟。


在小组学习linux也有半个多月了，今天才知道还有小伙伴不知道怎么切换到root，作为linux系统权限最高的用户（对，权限狗！），在Ubuntu上安装时只设置了一个用户和密码，并没设置root密码，root密码是动态变化的，那怎么进入root呢，可以通过sudo su 输入用户密码进入root，也可以通过 password 设置root密码 然后su root进入。退出时用exit或者ctrl + d


sudo 也可以完成一些root用户做的事，前提root将权限赋予了相应的用户，而root每次登陆时都需要输入密码，而sudo输入一次后5分钟之内再次使用sudo命令就不需要再输入了。


从root切换到其他用户时并不需要密码。
