---
layout: post
title: 《EffectiveC++》读书笔记（三）--- 尽量延后变量的定义
date: 2017-11-04
---

#### 前言


心情不好就跑步，跑完步就写写博客，反正看到哪就写哪.


### 正文


#### Item 26 ： Postpone variable definitions as long as possible


尽量延后变量的定义，感觉有一种“惰性求值”的味道？


当我们定义的变量具有析构&构造函数时，一旦定义它我们就需要承担析构和构造的成本，但是，如果并没有用上它，或者在定义之后，发生某种错误，而直接return了，那么就白白耗费了时间。


```
string cmd；
string name；
while(cin >> cmd){
    if(cmd == "get")
        cin >> name;
    if(cmd == "quit")// 直接退出，name完全没用上，却要构造和析构
        return;
}
```


同时，当我们需要必须要定义时，这表明我们已经为这个对象的“出生”准备好了条件，否则，要先调用default构造函数，再copy构造，白白耗费一次default构造。


```
string cmd；
string name；//先default构造
while(cin >> cmd){
    if(cmd == "get")
        name = "kangkang"; //再copy构造
    if(cmd == "quit")
        return;
```


```
string cmd；
while(cin >> cmd){
    if(cmd == "get")
        string name("kangkang"); //直接copy构造
    if(cmd == "quit")
        return;
}
```


看到上面的代码，可能会想到这样一个问题：是在循环内每次定义一个变量，还是应该在循环外定义，然后直接赋值呢？


A方案.在循环内定义，进行N次循环，我们就要耗费N**次构造+N次析构**。B方案.在循环外定义，同样N次循环，则是1次构造，1次析构,N次copy 赋值。


很明显，我们可以进行这样的考虑：对于作用域：A保证这个变量只作用于这个循环。而B则会将变量的作用域扩大。对于效率：如果一次 构造+析构 的成本高于一次 copy赋值并且N很大，那么B的效率更高。但如果，N值没那么大，或者构造+析构和copy赋值成本相近，那么效率上并不会差很多。


所以，针对我们的程序，在对效率不敏感时，或者效率相差不大时，而且只在循环内需要用到变量，那么我们就用A方案。而反之则B更加优先。
