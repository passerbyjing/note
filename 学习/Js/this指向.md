#### 4.1 call appy bind的作用和区别

~~~javascript
都可以改变函数内部的this指向。但
1. call 和 apply 会调用函数，并且改变函数内部this指向，返回值是函数的返回值。
2. fun.call(thisArg, arg1, arg3, ...)
   fun.apply(thisArg, [argsArray])
   fun.bind(thisArg, arg1, arg2, ...)      
3. bind 不会调用函数，可以改变函数内部this指向，返回由指定的this值和初始化参数改造的原函数拷贝。
~~~

#### 4.2 this指向（普通函数、箭头函数）

~~~
普通函数中的this,谁调用了函数或者方法，那么这个函数或者对象中的this就指向谁
匿名函数中的this：匿名函数的执行具有全局性，则匿名函数中的this指向是window，而不是调用该匿名函数的对象；

箭头函数中的this
1. 箭头函数中的this是在函数定义的时候就确定下来的，而不是在函数调用的时候确定的；
2. 箭头函数中的this指向父级作用域的执行上下文；（技巧：因为javascript中除了全局作用域，其他作用域都是由函数创建出来的，所以如果想确定this的指向，则找到离箭头函数最近的function，与该function平级的执行上下文中的this即是箭头函数中的this）
3. 箭头函数无法使用apply、call和bind方法改变this指向，因为其this值在函数定义的时候就被确定下来。
~~~

#### 4.3 循环i，setTimeout 中输出什么，如何解决（块级作用域，函数作用域）

~~~javascript
for循环setTimeout输出1-10解决方式问题来源
for (var i = 0; i< 10; i++){
   setTimeout((i) => {
   		console.log(i);
   }, 0)
}

JavaScript引擎开始执行任务队列中的代码时，会开始在当前的作用域中开始找变量i，但是当前作用域中并没有对变量i进行定义。这个时候就会在创造该函数的作用域中寻找i。创建该函数的作用域就是全局作用域，这个时候就找到了for循环中的变量i，这时的i是全局变量，并且值已经确定：10。十个console.log“共享”i的值。这就是作用域链的问题。

方法一: 最简单
for (var i = 0; i< 10; i++){
   setTimeout((i) => {
      console.log(i)
   }, 1000,i);
}

方法二: 最优解决方案，利用let形成块级作用域
for (let i = 0; i< 10; i++){
   setTimeout(() => {
      console.log(i) 
   }, 1000);
}

方法三：IIFE(立即执行函数)，类似于let生成了块级作用域。
for (var i = 0; i< 10; i++){
      ((i)=>{
        setTimeout(() => {
          console.log(i)
        },1000);
      })(i)
    }

方法四：直接输出，没有延迟
for (var i = 0; i< 10; i++){
   setTimeout(console.log(i),1000);
}

方法五
for (var i = 0; i< 10; i++){
   setTimeout((()=>console.log(i))(),1000);
}

方法六
for (var i = 0; i< 10; i++){
      try{
        throw i
      }catch(i){
        setTimeout(() => {
          console.log(i)
        }, 1000)
      }
}
~~~

