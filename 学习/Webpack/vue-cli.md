#### 你知道什么是脚手架吗？

~~~
vue项目一般是使用webpack进行打包构建的，然而如果每一个项目都需要我们去配置loader和plugin的话，是很重复的劳动，并且vue项目需要使用到的最基本的webpack loader和webpack plugin是相同的。因此官方推出了vue-cli这个脚手架，使用它就可以快速的生成一份通用的webpack配置，并且帮我们安装好很多必定会用到的npm包。
~~~

#### vue-cli提供了的哪几种脚手架模板？

~~~
vue-cli2.x 好像有个simple和完整版的
vue-cli3.x 提供了自定义装箱配置 可以选装
    TypeScript
    PWA
    lint
    e2e
    css 预处理
    router
    vuex
~~~

#### 在使用vue-cli开发vue项目时，自动刷新页面的原理你了解吗？

~~~
自动刷新页面并不是vue-cli的功能，而是webpack的hot-module-replacement-plugin插件在做这件事，这个插件是webpack自带的插件，用来做hmr的。如果需要配置hmr只需要在webpack.config.js的devServer字段写 下面的配置即可。
{
	contentBase: 服务器可以访问的根目录,
	hot:true, //开启热模块替换也就是hmr
	hotOnly:true //不刷新页面，只做hmr
}
而由于vue-cli3集成了webpack的配置，所以vue.config.js里面也有这个属性，配置写法是一样的。
~~~

#### vue-cli生成的项目可以使用es6、es7的语法吗？为什么？

~~~
vue-cli 配置了babel,可以将es6,es7....etc在webpack打包的时候转换成es5的代码，所以上线的时候没有问题。但是脚手架只是配置了一些默认常见的用法， 可以根据babel官网配置一些尚在草案中的语法 
~~~

#### vue-cli怎么解决跨域的问题？

~~~
使用 Vue-cli 创建的项目，开发地址是 localhost:8080，需要访问非本机上的接口http://10.1.0.34:8000/queryRole。不同域名之间的访问，需要跨域才能正确请求。跨域的方法很多，通常都需要后台配置，不过 Vue-cli 创建的项目，可以直接利用 Node.js 代理服务器，通过修改vue proxyTable接口实现跨域请求。在vue-cli项目中的config文件夹下的index.js配置文件中，
~~~

#### 不用vue-cli，你自己有搭建过vue的开发环境吗？流程是什么？

~~~javascript
基本概念
首先先了解先webpack的基本概念，webpack属于一个构建工具，主要有mode、entry、output、loader、plugin这几部分组成。
目标
本文会带你实现一个简易的vue-cli

具备和官方几乎一样的功能
实现移动端适配
使用eslint进行语法检查
进行开发和生产环境区分

安装
首先先创建好以下目录
config是配置目录，src是vue的目录，其中src目录下的server.js、client.js、entry-server.js、router.js不需要，这些属于ssr的配置部分，不在本次范围内。

通过npm进行安装webpack
// 没有npm的请先安装node.js（百度or谷歌）
通过npm init创建好一个package.json
// 安装webpack webpack-cli
npm install webpack webpack-cli -D
// 或者使用yarn
yarn add webpack webpack-cli -D
复制代码编写基本配置

实现一个简单的打包
新建src/index.js， 作为我们的入口文件
// src/index.js
console.log('hello world')
复制代码// 首先现在config目录下创建webpack.base.config.js，这里放基础配置
// webpack.base.config.js
const path = require('path')
module.exports = {
    // webpack4新增，用于区分环境，有development、production、none三种
    mode: 'development',
    // entry接收一个字符串或者一个对象，作为webpack的入口，多页面的话，就是多个入口
    entry: {
        main: 'src/index.js'
    }，
    output: {
        path: path.join(__dirname, '../dist'),
        // [name]是一个命名模板，可以根据entry动态生成名字，hash是一个哈希值,默认32位，这里只截取8位
        filename: '[name].[hash:8].js'
    }
}

复制代码然后在package.json的scripts里面添加一条build命令
// package.json
{
  "name": "webpack",
  "version": "1.0.0",
  "description": "",
  "main": "",
  "dependencies": {
    "vue": "^2.6.10"
  },
  "scripts": {
    "build": "webpack --config config/webpack.base.config.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.34.0",
    "webpack-cli": "^3.3.4"
  }
}
复制代码然后就可以通过npm run build进行打包，一个最基础的配置就算完成了，当然这些还远远不够，距离要完成的部分还有很多。
配置开发环境
由于项目需要区分开发环境还是线上环境，我们需要一个环境变量去维护
// config/env.js
const process = require('process')
const env = process.env.NODE_ENV

module.exports = env
复制代码配置热更新
npm install webpack-dev-server webpack-merge html-webpack-plugin friendly-errors-webpack-plugin -D

/*
    webpack-dev-server 开启一个server 用于热更新，需要在插件配置webpack.HotModuleReplacementPlugin()
    html-webpack-plugin 让webpack支持html
    friendly-errors-webpack-plugin 用于输出错误
    webpack-merge 用于合并webpack配置
*/ 
复制代码// webpack.dev.config.js

const webpack = require('webpack')
const path = require('path')
const env = require('./env')
const webpackBaseConfig = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const devConfig = merge(webpackBaseConfig, {
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    host: 'localhost',
    port: 8080,
    hot: true,
    compress: true,
    noInfo: true,
    // 在浏览器显示错误和警告
    overlay: {
      warnings: true,
      errors: true
    },
    // 去除掉每次修改时，控制台的日志
    clientLogLevel: 'none'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // 注入到webpack，添加环境变量
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(env)
    }),
    // plugin的解析顺序是从前往后的
    new HtmlWebpackPlugin({
      title: 'hello world',
      filename: 'index.html',
      template: './src/page/index.html',
      inject: true
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['项目成功启动，地址是localhost:8080']
      }
    })
  ]
})

module.exports = devConfig
复制代码
安装依赖

// 由于各个平台有些差异，我们需要安装cross-env
npm install cross-env -D
复制代码
添加命令，并修改package.json

/*
    cross-env 区分平台差异
    --open 打开浏览器
    --progress 显示进度
    --colors 区分颜色
    --config 需要运行的配置目录，默认webpack.config.js
![](https://user-gold-cdn.xitu.io/2019/8/1/16c4bd2c0d07585a?w=300&h=300&f=gif&s=48409)
    NODE_ENV 当前的环境变量
*/
"scripts": {
    "serve": "cross-env NODE_ENV=development webpack-dev-server --open --progress --colors --config config/webpack.dev.config.js",
    "build": "cross-env NODE_ENV=production webpack --config config/webpack.prod.config.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
复制代码然后运行npm run serve就可以看到如下效果，然后你就可以各种改了，不用自己手动刷新页面了

配置loader解析，并提取css
npm install css-loader style-loader postcss-loader url-loader babel-loader  @babel/preset-env @babel/core sass-loader node-sass responsive-loader vue-loader eslint-loader mini-css-extract-plugin autoprefixer VueLoaderPlugin @moohng/postcss-px2vw -D

css-loader style-loader 用于处理css
postcss-loader 可以使用
autoprefixer 通过postcss给浏览器不支持的css加前缀
@moohng/postcss-px2vw 处理移动端适配，使用px转vw 不支持的转rem
sass-loader node-sass 处理sass scss文件，因为我用的是这个，less换成less-loader即可
vue-loader 处理vue文件
mini-css-extract-plugin 提取项目中的css到一个单独的文件
babel-loader @babel/preset-env @babel/core 处理js兼容
url-loader responsive-loader 处理图片，小于一定大小转成base64
eslint-loader eslint-config-standard eslint-plugin-vue 对js vue进行语法检查，采用eslint-config-standard规范，不想要的可以忽略
复制代码修改之前的配置，改为下面的样子
// webpack.base.config.js

const path = require('path')
const env = require('./env')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: env,
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  module: {
    /**
     * webpack loader 加载顺序
     * mini/style,css,postcss,sass/less/stylus
     */
    rules: [
      {
        test: /\.css$/,
        // loader的解析顺序是从后往前的，所以mini要放前面
        use: [{
          loader: MiniCssExtractPlugin.loader
        }, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(sass|scss)/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        }, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              fallback: 'responsive-loader',
              limit: 4096,
              quality: 50,
              name: '[name].[hash:8].[ext]',
              outputPath: 'assets'
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        enforce: 'pre',
        test: /\.(js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  // 配置别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~': path.resolve(__dirname, 'src/assets')
    },
    // false可以不带扩展
    enforceExtension: false,
    // 自动解析确定的扩展
    extensions: ['.js', '.vue']
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contentHash:8].css'
    })
  ]
}

复制代码新建babel.config.js、postcss.config.js、.eslintrc.js
// 这边是babel7的配置
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/env'
    ]
  ],
  // 支持异步加载
  plugins: ['@babel/plugin-syntax-dynamic-import']
}

// postcss.config.js
module.exports = {
  plugins: {
    autoprefixer: {},
    '@moohng/postcss-px2vw': {
      viewportWidth: 750,
      rootValue: 750,
      unitPrecision: 6,
      minPixelValue: 1
    }
  }
}
// .eslintrc.js
module.exports = {
  root: true,
  extends: 'standard',
  env: {
    es6: true,
    node: true
  },
  plugins: ['vue']
}
复制代码新建router/router.js
// router.js
import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})
export default router

复制代码修改src/index.js
// App.vue 和vuecli一样，作为个入口文件
import Vue from 'vue'
import app from './App.vue'
import router from './router/router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(app)
}).$mount('#app')

复制代码至此 webpack开发版、基础配置就已经完成，现在可以运行npm run serve进行修改了
编写生产环境配置
生产环境需要做的就是打包页面生成dist文件，并对页面进行优化分包

继续安装依赖

npm install clean-webpack-plugin terser-webpack-plugin optimize-css-assets-webpack-plugin progress-bar-webpack-plugin cssnano -D

/*
clean-webpack-plugin 每次打包的时候清除掉之前打包的
terser-webpack-plgugin 对代码做混淆压缩，去掉console日志
optimize-css-assets-webpack-plugin 压缩css
progress-bar-webpack-plugin 以进度条的形式输出打包日志
*/
复制代码const webpack = require('webpack')
// const path = require('path')
// const glob = require('glob')
const env = require('./env')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const OptimizationCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const PurgecssPlugin = require('purgecss-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const prodConfig = merge(webpackBaseConfig, {
  optimization: {
    // 对代码进行代码分割，生成公共包
    splitChunks: {
      chunks: 'all',
      minSize: 0, // 生产块的最小大小
      maxSize: 0,
      name: true,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        sourceMap: env === 'development',
        terserOptions: {
          cache: true,
          compress: {
            drop_debugger: true,
            drop_console: true
          }
        }
      })
    ]
  },
  stats: {
    modules: false,
    source: false
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'hello world',
      filename: 'index.html',
      template: './src/page/index.html',
      inject: true
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(env)
    }),
    // 压缩css
    new OptimizationCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    // 去掉没用的css
    // new PurgecssPlugin({
    //   paths: glob.sync(path.join(__dirname, 'src'))
    // }),
    new ProgressBarPlugin({
      callback: function (res) {
        console.log('打包完成')
      }
    })
  ]
})

module.exports = prodConfig

~~~
