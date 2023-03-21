#### 7.1 Event Loop

~~~
Event Loop读取任务的先后顺序，取决于任务队列（Job queue）中对于不同任务读取规则的限定。在Job queue中的队列分为两种类型：
Macrotask 宏任务是指Event Loop在每个阶段执行的任务
script(主程序代码), setTimeout, setInterval, setImmediate, I/O, UI rendering、DOM事件回调、ajax回调
Microtask 微任务是指Event Loop在每个阶段之间执行的任务是process.nextTick, Promises, Object.observe, MutationObserver

举例来看执行顺序的规定，假设
宏任务队列包含任务: A1, A2, A3
微任务队列包含任务: B1, B2, B3
执行顺序为，首先执行宏任务队列开头的任务，也就是 A1 任务，执行完毕后，在执行微任务队列里的所有任务，也就是依次执行B1, B2 , B3，执行完后清空微任务队中的任务，接着执行宏任务中的第二个任务A2，依次循环。
~~~

#### 7.2 宏微队列执行顺序

下面这个例子可以看出Promise要先于setTimeout执行：

```js
　　setTimeout(() => { //立即放入宏队列
      console.log('timeout callback1（）')
      Promise.resolve(3).then(
        value => { //立即放入微队列
          console.log('Promise onResolved3()', value)
        }
      )
    }, 0)

    setTimeout(() => { //立即放入宏队列
      console.log('timeout callback2（）')
    }, 0)

    Promise.resolve(1).then(
      value => { //立即放入微队列
        console.log('Promise onResolved1()', value)
        setTimeout(() => {
          console.log('timeout callback3（）', value)
        }, 0)
      }
    )

    Promise.resolve(2).then(
      value => { //立即放入微队列
        console.log('Promise onResolved2()', value)
      }
    )

    // Promise onResolved1() 1
    // Promise onResolved2() 2
    // timeout callback1（）
    // Promise onResolved3() 3
    // timeout callback2（）
    // timeout callback3（） 1
```

#### 7.3 js执行顺序的题目，涉及到settimeout、console、process.nextTick、promise.then

```js
console.time('start');

setTimeout(function() {
  console.log(2);
}, 10);

setImmediate(function() {
  console.log(1);
});

new Promise(function(resolve) {
  console.log(3);
  resolve();
  console.log(4);
}).then(function() {
  console.log(5);
  console.timeEnd('start')
});

console.log(6);

process.nextTick(function() {
  console.log(7);
});

console.log(8);

3——>4——>6——>8——>7——>5——>start: 7.009ms——>1——>2

我们得到的执行顺序应该为：script(主程序代码)—>process.nextTick—>Promises...——>setTimeout——>setInterval——>setImmediate——> I/O——>UI rendering
```

#### 7.4 异步笔试题

```js
// 今日头条面试题
async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}

async function async2() {
    console.log('async2')
}

console.log('script start')
setTimeout(function () {
    console.log('settimeout')
})
async1()
new Promise(function (resolve) {
    console.log('promise1')
    resolve()
}).then(function () {
    console.log('promise2')
})
console.log('script end')

script start
async1 start
async2
promise1
script end
async1 end
promise2
settimeout
```
