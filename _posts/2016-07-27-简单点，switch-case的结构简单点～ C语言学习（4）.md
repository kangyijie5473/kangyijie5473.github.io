---
layout: post
title: 简单点，switch-case的结构简单点～ C语言学习（4）
date: 2016-07-27
---

##### 前言


最近将进程看完了，但是感觉自己理解的还不是很全面，线程看不进去，就无聊看了后面的信号，看到了里面要用函数指针，自己对它一直是一知半解，翻看《C和指针》，想到了一些很有趣的东西。简化繁复的switch-case结构。


#### 函数指针


C程序在调用函数时，都有一个函数入口，怎么找到这个入口呢，通过指针，每个函数名在被使用时都是由编译器转化为函数指针，从而找到函数的位置。


#### switch-case的麻烦


书上举了一个例子，一个使用switch-case结构的计算器的程序


```
#include<stdio.h>

double add(double a, double b){
    return a+b;    
}
double sub(double a,double b){
    return a-b;
}
double mul(double a, double b){
    return a*b;    
}
double my_div(double a, double b){
    return a/b;
}
int main(void){

    double a,b,result;
    char opera;

    scanf("%lf%c%lf",&a,&opera,&b);

    switch(opera)
    {
        case '+':
            result = add(a,b);
            break;
        case '-':
            result = sub(a,b);
            break;
        case '*':
            result = mul(a,b);
            break;
        case '/':
            result = my_div(a,b);
            break;
    }
    printf("%lf %c %lf = %lf\n",a,opera,b,result);
    return 0;
}
```


执行四种运算就要有4个case，然而实际程序要实现的功能往往很多，有没有更简洁的形式呢？书上使用了转换表，通过函数指针数组实现


```
//函数指针数组初始化
double (*oper_fun[])(double a, double b) = {add, sub, mul, my_div};
//从键盘读入要运算的a，b只后直接计算结果
result = oper_fun[i](a,b);
```


问题在于通过数组元素，即函数与下标是一一对应的，比如上边+就对应0，减就对应1，如何建立这样的映射呢？我的解决方法是通过一个字符串常量来实现。这个常量与之前的指针数组是相同的，完整代码如下


```
#include<stdio.h>
#include<string.h>

double add(double a, double b){
    return a+b;    
}
double sub(double a,double b){
    return a-b;
}
double mul(double a, double b){
    return a*b;    
}
double my_div(double a, double b){
    return a/b;
}

double (*oper_fun[])(double a, double b) = {add, sub, mul, my_div};

int main(void){

    double a,b,result;
    char opera;
    int i;

    scanf("%lf%c%lf",&a,&opera,&b);
    /* 使用一个与指针数组一一对应的字符串常量，遍历字符串，找到调用函数的下标*/
    for(i = 0; "+-*/"[i] != opera && i < strlen("+-*/"); i++);

    if(i == strlen("+-*/")){
        printf("error\n");
        return 0;
    }
    result = oper_fun[i](a,b);

    printf("%lf %c %lf = %lf\n",a,opera,b,result);
    return 0;
}
```


#### 不足


函数指针数组中的所指向的函数类型要相同，返回值与形参都要相同，所以对执行的函数要做到结构同一。
