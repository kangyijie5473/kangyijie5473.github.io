---
layout: post
title: 【C++踩坑】说说g++的-fno-elide-constructors参数
date: 2017-12-30
---

前言
有时结果和你想的不一样，并不一定是你想错了。。。可能是编译器优化了。
正文
在给学弟讲题时遇到了这样一个问题，代码如下

```
class A{
    public:
        A() = default;
        A(const A &a): str(a.str){ cout << "copy" << endl; }
        A(const string &d):str(d){ cout << "str" << endl; }

        string str;
};
void func(A a)
{
    cout << a.str << endl;
}
int main()
{
    func(string(
```

