#### 1.1 v-model 作用

~~~
v-model本质上不过是语法糖，真正的实现靠的还是 1.v-bind:绑定响应式数据 2.触发oninput 事件并传递数据。
1. 它会根据控件类型自动选取正确的方法来更新元素
2. 它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理
3. v-model会忽略所有表单元素的value、checked、selected特性的初始值,而总是将 Vue 实例的数据作为数据来源，因此我们应该通过 JavaScript 在组件的data选项中声明初始值

v-model在内部为不同的输入元素使用不同的属性并抛出不同的事件：
1. text 和 textarea 元素使用value属性和input事件；
2. checkbox 和 radio 使用checked属性和change事件；
3. select 字段将value作为 prop 并将change作为事件。
~~~

#### 1.3 Vue2.0 双向绑定的缺陷？

~~~
Vue2.0的数据响应是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty() 来劫持各个属性的setter、getter，但是它并不算是实现数据的响应式的完美方案，某些情况下需要对其进行修补或者hack这也是它的缺陷，主要表现在两个方面：
1. vue 实例创建后，无法检测到对象属性的新增或删除，只能追踪到数据是否被修改(Object.defineProperty只能劫持对象的属性)。
当创建一个Vue实例时，将遍历所有DOM对象，并为每个数据属性添加了get和set。get和set 允许Vue观察数据的更改并触发更新。但是，如果你在Vue实例化后添加（或删除）一个属性，这个属性不会被vue处理，改变get和set。
2. 不能监听数组的变化
vue在实现数组的响应式时，它使用了一些hack，把无法监听数组的情况通过重写数组的部分方法来实现响应式，这也只限制在数组的push / pop / shift / unshift / splice / sort / reverse七个方法，其他数组方法及数组的使用则无法检测到
~~~

#### 1.4 Vue3.0 实现数据双向绑定的方法

~~~
vue3.0 实现数据双向绑定是通过Proxy
Proxy是 ES6 中新增的一个特性，翻译过来意思是"代理"，用在这里表示由它来“代理”某些操作。 Proxy 让我们能够以简洁易懂的方式控制外部对对象的访问。其功能非常类似于设计模式中的代理模式。
Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
使用 Proxy 的核心优点是可以交由它来处理一些非核心逻辑（如：读取或设置对象的某些属性前记录日志；设置对象的某些属性值前，需要验证；某些属性的访问控制等）。 从而可以让对象只需关注于核心逻辑，达到关注点分离，降低对象复杂度等目的。
~~~

#### 1.5 Vuex是什么，每个属性是干嘛的，如何使用

~~~
Vuex是专门为Vuejs应用程序设计的状态管理工具。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化

具体工作：vuex是一种状态管理机制，将全局组件的共享状态抽取出来为一个store，以一个单例模式存在，应用任何一个组件中都可以使用，vuex更改state的唯一途径是通过mutation，mutation需要commit触发, action实际触发是mutation，其中mutation处理同步任务，action处理异步任务。
1）State是存储的单一状态，是存储的基本数据。
2）Getters 是store的计算属性，对state的加工，是派生出来的数据。就像computed计算属性一样，getter返回的值会根据它的依赖被缓存起来，且只有当它的依赖值发生改变才会被重新计算。
3）Mutations提交更改数据，使用store.commit方法更改state存储的状态。（mutations同步函数）
4）Actions像一个装饰器，提交mutation，而不是直接变更状态。（actions可以包含任何异步操作）
5）Module是store分割的模块，每个模块拥有自己的state、getters、mutations、actions。
6）辅助函数:Vuex提供了mapState、MapGetters、MapActions、mapMutations等辅助函数给开发在vm中处理store。
~~~

```js
Vuex的使用方法
import Vuex from 'vuex';
Vue.use(Vuex); // 1. vue的插件机制，安装vuex
let store = new Vuex.Store({ // 2.实例化store，调用install方法
    state,
    getters,
    modules,
    mutations,
    actions,
    plugins
});
new Vue({ // 3.注入store, 挂载vue实例
    store,
    render: h=>h(app)
}).$mount('#app');
```

#### 1.6 Vuex实现原理

1. store是怎么注册的?

   ```js
   我们看到Vuex在vue 的生命周期中的初始化钩子前插入一段 Vuex 初始化代码。给 Vue 的实例注入一个$store的属性，这也就是为什么我们在 Vue 的组件中可以通过this.$store.xxx, 访问到 Vuex 的各种数据和状态
   export default function (Vue) {
     // 获取当前 Vue 的版本
     const version = Number(Vue.version.split('.')[0])
   
     if (version >= 2) {
       // 2.x 通过 hook 的方式注入
       Vue.mixin({ beforeCreate: vuexInit })
     } else {
       // 兼容 1.x
       //
         用自定义的 _init 方法并替换 Vue 对象原型的_init方法，实现注入
       const _init = Vue.prototype._init
       Vue.prototype._init = function (options = {}) {
         options.init = options.init
           ? [vuexInit].concat(options.init)
           : vuexInit
         _init.call(this, options)
       }
     }
   
     /**
      * Vuex init hook, injected into each instances init hooks list.
      */
   
     function vuexInit () {
       const options = this.$options
       // store 注入
       if (options.store) {
         this.$store = typeof options.store === 'function'
           ? options.store()
           : options.store
       } else if (options.parent && options.parent.$store) {
         // 子组件从其父组件引用 $store 属性
         this.$store = options.parent.$store
       }
     }
   }
   ```
   
2. mutations，commit 是怎么实现的

   ```js
   function registerMutation (store, type, handler, local) {
     // 获取 type(module.mutations 的 key) 对应的 mutations, 没有就创建一个空数组
     const entry = store._mutations[type] || (store._mutations[type] = [])
     // push 处理过的 mutation handler
     entry.push(function wrappedMutationHandler (payload) {
       // 调用用户定义的 hanler, 并传入 state 和 payload 参数
       handler.call(store, local.state, payload)
     })
   }
   ```

   registerMutation 是对 store 的 mutation 的初始化，它接受 4 个参数，store为当前 Store 实例，type为 mutation 的 key，handler 为 mutation 执行的回调函数，path 为当前模块的路径。

   mutation 的作用就是同步修改当前模块的 state ，函数首先通过 type 拿到对应的 mutation 对象数组， 然后把一个 mutation 的包装函数 push 到这个数组中，这个函数接收一个参数 payload，这个就是我们在定义 mutation 的时候接收的额外参数。这个函数执行的时候会调用 mutation 的回调函数，并通过 getNestedState(store.state, path) 方法得到当前模块的 state，和 playload 一起作为回调函数的参数。

   我们知道mutation是通过commit来触发的，这里我们也来看一下commit的定义

   ```js
   commit (_type, _payload, _options) {
       // 解析参数
       const {
         type,
         payload,
         options
       } = unifyObjectStyle(_type, _payload, _options)
   
       // 根据 type 获取所有对应的处理过的 mutation 函数集合
       const mutation = { type, payload }
       const entry = this._mutations[type]
       if (!entry) {
         if (process.env.NODE_ENV !== 'production') {
           console.error(`[vuex] unknown mutation type: ${type}`)
         }
         return
       }
       // 执行 mutation 函数
       this._withCommit(() => {
         entry.forEach(function commitIterator (handler) {
           handler(payload)
         })
       })
   
       // 执行所有的订阅者函数
       this._subscribers.forEach(sub => sub(mutation, this.state))
   
       if (
         process.env.NODE_ENV !== 'production' &&
         options && options.silent
       ) {
         console.warn(
       `[vuex] mutation type: ${type}. Silent option has been removed. ` +
           'Use the filter functionality in the vue-devtools'
     )
       }
   }
   ```

   commit 支持 3 个参数，type 表示 mutation 的类型，payload 表示额外的参数,根据 type 去查找对应的 mutation，如果找不到，则输出一条错误信息，否则遍历这个 type 对应的 mutation 对象数组，执行 handler(payload) 方法，这个方法就是之前定义的 wrappedMutationHandler(handler)，执行它就相当于执行了 registerMutation 注册的回调函数。

3. 辅助函数

   辅助函数的实现都差不太多，在这里了解一下mapState

   ```js
   export const mapGetters = normalizeNamespace((namespace, getters) => {
     // 返回结果
     const res = {}
   
     // 遍历规范化参数后的对象
     // getters 就是传递给 mapGetters 的 map 对象或者数组
     normalizeMap(getters).forEach(({ key, val }) => {
       val = namespace + val
       res[key] = function mappedGetter () {
         // 一般不会传入 namespace 参数
         if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
           return
         }
         // 如果 getter 不存在则报错
         if (process.env.NODE_ENV !== 'production' && !(val in this.$store.getters)) {
           console.error(`[vuex] unknown getter: ${val}`)
           return
         }
         // 返回 getter 值, store.getters 可见上文 resetStoreVM 的分析
         return this.$store.getters[val]
       }
       // mark vuex getter for devtools
       res[key].vuex = true
     })
     return res
   })
   ```

   mapState在调用了 normalizeMap 函数后，把传入的 states 转换成由 {key, val} 对象构成的数组，接着调用 forEach 方法遍历这个数组，构造一个新的对象，这个新对象每个元素都返回一个新的函数 mappedState，函数对 val 的类型判断，如果 val 是一个函数，则直接调用这个 val 函数，把当前 store 上的 state 和 getters 作为参数，返回值作为 mappedState 的返回值；否则直接把 this.$store.state[val]作为 mappedState 的返回值。为了更直观的理解，我们看下最终mapState的效果

   ```js
   computed: mapState({
       name: state => state.name,
   })
   // 等同于
   computed: {
       name: this.$store.state.name
   }
   ```

#### 1.10 导航守卫

~~~
导航守卫主要用来通过跳转或取消的方式守卫导航。
简单的说，导航守卫就是路由跳转过程中的一些钩子函数。路由跳转是一个大的过程，这个大的过程分为跳转前中后等等细小的过程，在每一个过程中都有一函数，这个函数能让你操作一些其他的事儿的时机，这就是导航守卫。

每个守卫方法接收三个参数（往后的守卫都大同小异）：
1. to: Route: 即将要进入的目标 路由对象
2. from: Route: 当前导航正要离开的路由
3. next: Function: 一定要调用该方法将控制权交给下一个守卫，执行效果依赖 next 方法的参数。

next(): 进入下一个守卫。如果全部守卫执行完了。则导航的状态就是 confirmed (确认的)。
next(false): 中断当前的导航（把小明腿打断了）。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器 后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航（小 明被打断腿并且送回家了）。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。
next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递router.
onError() 注册过的回调。
注意：永远不要使用两次next，这会产生一些误会。

路由独享的守卫
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})

组件内的守卫
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 路由被 confirm 前调用
    // 组件还未渲染出来，不能获取组件实例 `this`
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`，一般用来数据获取。
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
~~~

#### 1.11导航全过程

~~~
- 导航被触发。
- 在准备离开的组件里调用 beforeRouteLeave 守卫。
- 调用全局的 beforeEach 守卫。
- 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。（如果你的组件是重用的）
- 在路由配置里调用 beforeEnter。
- 解析即将抵达的组件。
- 在即将抵达的组件里调用 beforeRouteEnter。
- 调用全局的 beforeResolve 守卫 (2.5+)。
- 导航被确认。
- 调用全局的 afterEach 钩子。
- 触发 DOM 更新。
- 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。
~~~

#### 1.12 vue-router 实现懒加载

~~~~
懒加载：当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
1. 首先，可以将异步组件定义为返回一个 Promise 的工厂函数 (该函数返回的 Promise 应该 resolve 组件本身)：
   const Foo = () => Promise.resolve({ /* 组件定义对象 */ })

2. 在 Webpack 2 中，我们可以使用[动态 import](https://github.com/tc39/proposal-dynamic-import)语法来定义代码分块点 (split point)：
   import('./Foo.vue') // 返回 Promise
   
   结合这两者，这就是如何定义一个能够被 Webpack 自动代码分割的异步组件。
   const Foo = () => import('./Foo.vue')

   在路由配置中什么都不需要改变，只需要像往常一样使用Foo：
   const router = new VueRouter({
     routes: [
       { path: '/foo', component: Foo }
     ]
   })
~~~~

#### 1.13 js是如何监听HistoryRouter的变化的

~~~
通过浏览器的地址栏来改变切换页面，前端实现主要有两种方式：

1. 通过hash改变，利用window.onhashchange 监听。

2. HistoryRouter：通过history的改变，进行js操作加载页面，然而history并不像hash那样简单，因为history的改变，除了浏览器的几个前进后退（使用 history.back(), history.forward()和 history.go() 方法来完成在用户历史记录中向后和向前的跳转。）等操作会主动触发popstate 事件，pushState，replaceState 并不会触发popstate事件，要解决history监听的问题，方法是：

   首先完成一个订阅-发布模式，然后重写history.pushState, history.replaceState,并添加消息通知，这样一来只要history的无法实现监听函数就被我们加上了事件通知，只不过这里用的不是浏览器原生事件，而是通过我们创建的event-bus 来实现通知，然后触发事件订阅函数的执行。
~~~

具体操作如下：

1. 订阅-发布模式示例

```js
class Dep {                  // 订阅池
    constructor(name){
        this.id = new Date() //这里简单的运用时间戳做订阅池的ID
        this.subs = []       //该事件下被订阅对象的集合
    }
    defined(){              // 添加订阅者
        Dep.watch.add(this);
    }
    notify() {              //通知订阅者有变化
        this.subs.forEach((e, i) => {
            if(typeof e.update === 'function'){
                try {
                   e.update.apply(e)  //触发订阅者更新函数
                } catch(err){
                    console.warr(err)
                }
            }
        })
    }
}
Dep.watch = null;
class Watch {
    constructor(name, fn){
        this.name = name;       //订阅消息的名称
        this.id = new Date();   //这里简单的运用时间戳做订阅者的ID
        this.callBack = fn;     //订阅消息发送改变时->订阅者执行的回调函数     
    }
    add(dep) {                  //将订阅者放入dep订阅池
       dep.subs.push(this);
    }
    update() {                  //将订阅者更新方法
        var cb = this.callBack; //赋值为了不改变函数内调用的this
        cb(this.name);         
    }
}
```

1. 重写history方法，并添加window.addHistoryListener事件机制。

```js
var addHistoryMethod = (function(){
        var historyDep = new Dep();
        return function(name) {
            if(name === 'historychange'){
                return function(name, fn){
                    var event = new Watch(name, fn)
                    Dep.watch = event;
                    historyDep.defined();
                    Dep.watch = null;       //置空供下一个订阅者使用
                }
            } else if(name === 'pushState' || name === 'replaceState') {
                var method = history[name];
                return function(){
                    method.apply(history, arguments);
                    historyDep.notify();
                }
            }
        }
}())
window.addHistoryListener = addHistoryMethod('historychange');
history.pushState =  addHistoryMethod('pushState');
history.replaceState =  addHistoryMethod('replaceState');
```

#### 1.14 HashRouter 和 HistoryRouter的区别和原理

~~~
vue-router是Vue官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。vue-router默认 hash 模式，还有一种是history模式。

原理：
1. hash路由：hash模式的工作原理是hashchange事件，可以在window监听hash的变化。我们在url后面随便添加一个#xx触发这个事件。vue-router默认的是hash模式—使用URL的hash来模拟一个完整的URL,于是当URL改变的时候,页面不会重新加载,也就是单页应用了,当#后面的hash发生变化,不会导致浏览器向服务器发出请求,浏览器不发出请求就不会刷新页面,并且会触发hasChange这个事件,通过监听hash值的变化来实现更新页面部分内容的操作
   对于hash模式会创建hashHistory对象,在访问不同的路由的时候,会发生两件事:
   HashHistory.push()将新的路由添加到浏览器访问的历史的栈顶,和HasHistory.replace()替换到当前栈顶的路由

2. history路由：
   主要使用HTML5的pushState()和replaceState()这两个api结合window.popstate事件（监听浏览器前进后退）来实现的,pushState()可以改变url地址且不会发送请求,replaceState()可以读取历史记录栈,还可以对浏览器记录进行修改

区别：
1. hash模式较丑，history模式较优雅
2. pushState设置的新URL可以是与当前URL同源的任意URL；而hash只可修改#后面的部分，故只可设置与当前同文档的URL
3. pushState设置的新URL可以与当前URL一模一样，这样也会把记录添加到栈中；而hash设置的新值必须与原来不一样才会触发记录添加到栈中
4. pushState通过stateObject可以添加任意类型的数据到记录中；而hash只可添加短字符串
5. pushState可额外设置title属性供后续使用
6. hash兼容IE8以上，history兼容IE10以上
7. history模式需要后端配合将所有访问都指向index.html，否则用户刷新页面，会导致404错误
~~~

#### 1.16 组件通信的方式

~~~
1. props和$emit
2. attrs和listeners
3. v-model: 父组件通过v-model传递值给子组件时，会自动传递一个value的prop属性，在子组件中通过this.$emit(‘input',val)自动修改v-model绑定的值
4. provide和inject
5. 中央事件总线（eventBus）:新建一个Vue事件bus对象，然后通过bus.on监听触发的事件。 
6. parent和children
7. boradcast和dispatch
   vue1.0中提供了这种方式，但vue2.0中没有，但很多开源软件都自己封装了这种方式，比如min ui、element ui和iview等。 比如如下代码，一般都作为一个mixins去使用, broadcast是向特定的父组件，触发事件，dispatch是向特定的子组件触发事件，本质上这种方式还是on和on和emit的封装，但在一些基础组件中却很实用
8. vuex处理组件之间的数据交互
   如果业务逻辑复杂，很多组件之间需要同时处理一些公共的数据，这个时候才有上面这一些方法可能不利于项目的维护，vuex的做法就是将这一些公共的数据抽离出来，然后其他组件就可以对这个公共数据进行读写操作，这样达到了解耦的目的
~~~

#### 1.20 Vue生命周期

~~~
Vue生命周期经历哪些阶段：
1. 总体来说：初始化、运行中、销毁
2. 详细来说：开始创建、初始化数据、编译模板、挂载Dom、渲染→更新→渲染、销毁等一系列过程

生命周期经历的阶段和钩子函数:
1. 实例化vue(组件)对象：new Vue()
2. 初始化事件和生命周期 init events 和 init cycle
3. beforeCreate函数
4. 挂载数据（属性赋值）: (data属性，computed属性)
5. Created函数
6.1 检查是否有el属性
检查vue配置，即new Vue{}里面的el项是否存在，有就继续检查template项。没有则等到手动绑定调用 vm.$el的绑定。
6.2 检查是否有template属性
检查配置中的template项，如果没有template进行填充被绑定区域，则被绑定区域的el对outerHTML都作为被填充对象替换掉填充区域。
即：如果vue对象中有 template属性，那么，template后面的HTML会替换$el对应的内容。如果有render属性，那么render就会替换template。
即：优先关系时： render > template > el
1. beforeMount函数：
2. 模板编译：用vue对象的数据（属性）替换模板中的内容
3. Mounted函数：
4. beforeUpdate函数：
   组件更新之前执行的函数，只有数据更新后，才能调用（触发）beforeUpdate，注意：此数据一定是在模板上出现的数据，否则，不会，也没有必要触发组件更新（因为数据不出现在模板里，就没有必要再次渲染）
   数据更新了，但是，vue（组件）对象对应的dom中的内部（innerHTML）没有变，所以叫作组件更新前
5. updated函数：
   组件更新之后执行的函数
   vue（组件）对象对应的dom中的内部（innerHTML）改变了，所以，叫作组件更新之后
6. activated函数：keep-alive组件激活时调用
7. activated函数：keep-alive组件停用时调用
8. beforeDestroy：vue（组件）对象销毁之前
9. destroyed：vue组件销毁后


1. new Vue会调用 Vue 原型链上的_init方法对 Vue 实例进行初始化；
2. 首先是initLifecycle初始化生命周期，对 Vue 实例内部的一些属性（如 children、parent、isMounted）进行初始化；
3. initEvents，初始化当前实例上的一些自定义事件（Vue.$on）；
4. initRender，解析slots绑定在 Vue 实例上，绑定createElement方法在实例上；
5. 完成对生命周期、自定义事件等一系列属性的初始化后，触发生命周期钩子beforeCreate；
6. initInjections，在初始化data和props之前完成依赖注入（类似于 React.Context）；
7. initState，完成对data和props的初始化，同时对属性完成数据劫持内部，启用监听者对数据进行监听（更改）；
8. initProvide，对依赖注入进行解析；
9. 完成对数据（state状态）的初始化后，触发生命周期钩子created；
10. 进入挂载阶段，将 vue 模板语法通过vue-loader解析成虚拟 DOM 树，虚拟 DOM 树与数据完成双向绑定，触发生命周期钩子beforeMount；
11. 将解析好的虚拟 DOM 树通过 vue 渲染成真实 DOM，触发生命周期钩子mounted；

Vue 一共有8个生命阶段，分别是创建前、创建后、加载前、加载后、更新前、更新后、销毁前和销毁后，每个阶段对应了一个生命周期的钩子函数。
beforeCreate 钩子函数，在实例初始化之后，在数据监听和事件配置之前触发。因此在这个事件中我们是获取不到 data 数据的。
created 钩子函数，在实例创建完成后触发，此时可以访问 data、methods 等属性。但这个时候组件还没有被挂载到页面中去，所以这个时候访问不到 $el 属性。一般我们可以在这个函数中进行一些页面初始化的工作，比如通过 ajax 请求数据来对页面进行初始化。
beforeMount 钩子函数，在组件被挂载到页面之前触发。在 beforeMount 之前，会找到对应的 template，并编译成 render 函数。
mounted 钩子函数，在组件挂载到页面之后触发。此时可以通过 DOM API 获取到页面中的 DOM 元素。
beforeUpdate 钩子函数，在响应式数据更新时触发，发生在虚拟 DOM 重新渲染和打补丁之前，这个时候我们可以对可能会被移除的元素做一些操作，比如移除事件监听器。
updated 钩子函数，虚拟 DOM 重新渲染和打补丁之后调用。
beforeDestroy 钩子函数，在实例销毁之前调用。一般在这一步我们可以销毁定时器、解绑全局事件等。
destroyed 钩子函数，在实例销毁之后调用，调用后，Vue 实例中的所有东西都会解除绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
当我们使用 keep-alive 的时候，还有两个钩子函数，分别是 activated 和 deactivated 。用 keep-alive 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行 deactivated 钩子函数，命中缓存渲染后会执行 actived 钩子函数。
~~~

#### 1.21 vue keep-alive

~~~
keep-alive：keep-alive可以实现组件缓存，是Vue.js的一个内置组件。

作用：
1. 它能够把不活动的组件实例保存在内存中，而不是直接将其销毁
2. 它是一个抽象组件，不会被渲染到真实DOM中，也不会出现在父组件链中

使用方式：
1. 常用的两个属性include/exclude，允许组件有条件的进行缓存。
2. 两个生命周期activated/deactivated，用来得知当前组件是否处于活跃状态。
3. keep-alive的中还运用了LRU(Least Recently Used)算法。

原理：Vue 的缓存机制并不是直接存储 DOM 结构，而是将 DOM 节点抽象成了一个个 VNode节点，所以，keep- alive的缓存也是基于VNode节点的而不是直接存储DOM结构。
其实就是将需要缓存的VNode节点保存在this.cache中
在render时,如果VNode的name符合在缓存条件（可以用include以及exclude控制），则会从this.cache中取出之前缓存的VNode实例进行渲染。
~~~

#### 1.23 vue 中 $nextTick 作用与原理

~~~
作用：是为了可以获取更新后的DOM 。
由于Vue DOM更新是异步执行的，即修改数据时，视图不会立即更新，而是会监听数据变化，并缓存在同一事件循环中，等同一数据循环中的所有数据变化完成之后，再统一进行视图更新。为了确保得到更新后的DOM，所以设置了 Vue.nextTick()，就是在下次DOM更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的DOM。

原理：
在下次 DOM 更新循环结束之后执行延迟回调。nextTick主要使用了宏任务和微任务。根据执行环境分别尝试采用
- Promise
- MutationObserver
- setImmediate
- 如果以上都不行则采用setTimeout

定义了一个异步方法，多次调用nextTick会将方法存入队列中，通过这个异步方法清空当前队列。
~~~

#### 1.24 vue的特性

~~~
- 表单操作
- 自定义指令
- 计算属性
- 过滤器
- 侦听器
- 生命周期
~~~

#### 1.28 为什么选择用vue做页面展示

~~~
- MVVM 框架：
  Vue 正是使用了这种 MVVM 的框架形式，并且通过声明式渲染和响应式数据绑定的方式来帮助我们完全避免了对 DOM 的操作。

- 单页面应用程序
  Vue 配合生态圈中的 Vue-Router 就可以非常方便的开发复杂的单页应用

- 轻量化与易学习
  Vue 的生产版本只有 30.90KB 的大小，几乎不会对我们的网页加载速度产生影响。同时因为 Vue 只专注于视图层，单独的 Vue 就像一个库一样，所以使我们的学习成本变得非常低

- 渐进式与兼容性
  Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。Vue 只做界面，而把其他的一切都交给了它的周边生态（axios（Vue 官方推荐）、Loadsh.js、Velocity.js 等）来做处理，这就要求 Vue 必须要对其他的框架拥有最大程度的兼容性

- 视图组件化
  Vue 允许通过组件来去拼装一个页面，每个组件都是一个可复用的 Vue 实例，组件里面可以包含自己的数据，视图和代码逻辑。方便复用

- 虚拟 DOM（Virtual DOM）
  Vue 之所以可以完全避免对 DOM 的操作，就是因为 Vue 采用了虚拟 DOM 的方式，不但避免了我们对 DOM 的复杂操作，并且大大的加快了我们应用的运行速度。
~~~

#### 1.29 vue/angular区别

~~~
1. 体积和性能
   相较于vue，angular显得比较臃肿，比如一个包含了 Vuex + Vue Router 的 Vue 项目 (gzip 之后 30kB) ，而 angular-cli 生成的默认项目尺寸 (~65KB) 还是要小得多。
   在性能上，AngularJS依赖对数据做脏检查，所以Watcher越多越慢。Vue.js使用基于依赖追踪的观察并且使用异步队列更新。所有的数据都是独立触发的。 对于庞大的应用来说，这个优化差异还是比较明显的

2. Virtual DOM vs Incremental DOM
   在底层渲染方面，vue 使用的虚拟dom，而angular 使用的是Incremental DOM，Incremental DOM的优势在于低内开销

3. Vue 相比于 Angular 更加灵活，可以按照不同的需要去组织项目的应用代码。比如，甚至可以直接像引用jquery那样在HTML中引用vue，然后仅仅当成一个前端的模板引擎来用。
~~~

#### 1.30 双向数据绑定原理

~~~
目前几种主流的mvc(vm)框架都实现了单向数据绑定，而我所理解的双向数据绑定无非就是在单向绑定的基础上给可输入元素（input、textare等）添加了change(input)事件，来动态修改model和 view，并没有多高深。所以无需太过介怀是实现的单向或双向绑定。

实现数据绑定的做法有大致如下几种：

发布者-订阅者模式: 一般通过sub, pub的方式实现数据和视图的绑定监听，更新数据方式通常做法是vm.set('property', value)

这种方式现在毕竟太low了，我们更希望通过vm.property = value这种方式更新数据，同时自动更新视图，于是有了下面两种方式

脏值检查: angular.js 是通过脏值检测的方式比对数据是否有变更，来决定是否更新视图，最简单的方式就是通过setInterval()定时轮询检测数据变动，当然Google不会这么low，angular只有在指定的事件触发时进入脏值检测，大致如下：
- DOM事件，譬如用户输入文本，点击按钮等。( ng-click )
- XHR响应事件 ( $http )
- 浏览器Location变更事件 ( $location )
- Timer事件
- 执行 digest()或apply()

数据劫持: vue.js 则是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。
~~~

#### 1.34 vue首屏白屏如何解决？

~~~
1. 路由懒加载
2. vue-cli开启打包压缩 和后台配合 gzip访问
3. 进行cdn加速
4. 开启vue服务渲染模式
5. 用webpack的externals属性把不需要打包的库文件分离出去，减少打包后文件的大小
6. 在生产环境中删除掉不必要的console.log
 plugins: [
    new webpack.optimize.UglifyJsPlugin({ //添加-删除console.log
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      },
      sourceMap: true
    }),
7. 开启nginx的gzip ,在nginx.conf配置文件中配置
http {  //在 http中配置如下代码，
   gzip on;
   gzip_disable "msie6"; 
   gzip_vary on; 
   gzip_proxied any;
   gzip_comp_level 8; #压缩级别
   gzip_buffers 16 8k;
   #gzip_http_version 1.1;
   gzip_min_length 100; #不压缩临界值
   gzip_types text/plain application/javascript application/x-javascript text/css
    application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
 }
 8. 添加loading效果，给用户一种进度感受
~~~

#### 1.38 delete与vue.delete区别?

```js
delte会删除数组的值，但是它依然会在内存中占位置
而vue.delete会删除数组在内存中的占位

let arr1 = [1,2,3]
let arr2 = [1,2,3]
delete arr1[1]
this.$delete(arr2,2)
console.log(arr1)    //【1, empty, 3】
console.log(arr2)    //【1,2】
```

#### 1.40 vm.$set 的实现原理

```js
1. 如果目标是数组，直接使用数组的 splice 方法触发相应式；
2. 如果目标是对象，会先判读属性是否存在、对象是否是响应式，
3. 最终如果要对属性进行响应式处理，则是通过调用 defineReactive 方法进行响应式处理
```
