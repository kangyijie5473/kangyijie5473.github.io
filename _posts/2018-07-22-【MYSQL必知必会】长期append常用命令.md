---
layout: post
title: "【MYSQL必知必会】长期append常用命令"
date: 2018-07-22
---

#### 好久不用就会忘系列


查看表结构DESC table_name


简单的更新语句UPDATE table_name SET field_name1=value1 ... where xxx=xxx


重命名表RENAME TABLE old_name TO new_name


重命名数据库(这个比较鸡贼)适合于innoDB,并且没有什么触发器之类 比较简单的表CREATE DATABASE new_dbRENAME TABLE old_db.old_table1 TO new_db.new_table1…DROP DATABASE old_db


设置远程访问权限GRANT ALL PRIVILEGES ON *.* TO 'user'@'%' IDENTIFIED BY 'passwd' WITH GRANT OPTION;


查看指定数据库有多少张表SELECT COUNT(*) TABLES, table_schema FROM information_schema.TABLES WHERE table_schema = 'db_name' GROUP BY table_schema;查看数据库当前的连接show processlist查看数据库的配置，可以配合like关键词查询show variables设置某个变量的值set global var=xx查看db的使用容量，索引使用容量select sum(data_length)/1024/1024/1024,sum(index_length)/1024/1024/1024 from information_schema.tables where TABLE_SCHEMA='db_name';
