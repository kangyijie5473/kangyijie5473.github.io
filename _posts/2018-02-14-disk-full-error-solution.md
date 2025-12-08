---
layout: post
title: "[踩坑]\" 磁盘满了\"的解决思路"
date: 2018-02-14
---

#### 前言


半夜登到云服务器上测代码，结果一个tab补全  bash: 无法为立即文档创建临时文件: 设备上没有空间


行了，代码也不测了，先改bug吧。


### 正文


出现的问题就是tab无法正常补全


这里也很明显，就是磁盘空间不足。  于是用df 命令查看


额。。。GG


#### 磁盘满了


之前暑假的时候就遇到过这种问题，当时是学姐的电脑，开机无图形界面（我这云服务器不需要图形），查看了一下磁盘就是写满了，当时解决的不好，这次赶紧记下来。


最简单的方式就是排除法，顺着目录树从/开始找大文件。


我们切换到root用户然后到/下看看哪个目录占用空间比较大  # du -h --max-depth=1  --max-depth=1就是递归查看深度为1，我感觉也可以不加直接筛选大文件，但是一开始思路比较简单，就是看看哪个目录占用的空间大。


找了几次之后成功定位某大文件，6个多G，rm之。


可是问题依然没有解决。  在/下du查看只有14G    但是df查看依然是20G满了


#### 文件删除的原理


这里的原理涉及到文件系统，我对这里也不是很清楚，只说大概的理解，相信探究文件是怎样删除的足够再写一篇很不错的博客了。


当我们使用rm删除文件时，会调用unlink/unlinkat系统调用。  man如下


The unlink() function shall remove a link to a file.  …………  When the file’s link count becomes 0 and no process has the file open,  the space occupied by the file shall be freed and the file shall no  longer be accessible. If one or more processes have the file open when  the last link is removed, the link shall be removed before unlink()  returns, but the removal of the file contents shall be postponed until  all references to the file are closed.


大意  unlink是移除一个对目标文件的link，当这个link的计数到0，并且没有进程打开着这个文件，文件占用的空间会被释放，这个文件也不再能被访问了。  当最后一个link被移除时，如果有一个以上的进程打开着这个文件，那么这个文件内容的移除会直到所有引用（reference）关闭。


#### 所以


我们删除大文件之后，还要确保打开它的进程也关闭才行，才能真正的释放磁盘空间。（没错这是个大日志文件）


#### 相关阅读


删除正在被打开的文件/正在运行的可执行文件/正在被使用的动态链接库会怎样


Linux 文件系统中元数据使用计数的机制
