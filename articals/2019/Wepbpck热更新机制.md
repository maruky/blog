### 简介
----------

* webpack-hot-middleware + webpack-dev-middleware可实现页面热替换，替代了webpack-dev-server中HMR功能。

* 该模块更新机制，仅涉及浏览器端与webpack服务器的连接并接受更新。


### express热替换 ###
----------
#### webpack文件配置(webpack.config.js)
1.plugins中加入配置

```js
plugins: [
    // OccurrenceOrderPlugin is needed for webpack 1.x only
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // Use NoErrorsPlugin for webpack 1.x
    new webpack.NoEmitOnErrorsPlugin()
]
```

2.在entry中加入'webpack-hot-middleware/client'。

```js
entry: {
    index: ['webpack-hot-middleware/client', path.resolve(__dirname, './client/index.jsx')],
}
```
    
这样加入的目的是为了连接webpack服务器接受bundle重新构建的通知，然后更新客户端的bundle。
    
    
### express sever ###
----------
express中间件加入webpack-dev-middleware和webpack-hot-middleware。

```js
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var compiler = webpack(webpackConfig);

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler));

```


### 源码解析 ###
----------

line7 ~ 10

```js
  opts = opts || {};
  opts.log = typeof opts.log == 'undefined' ? console.log.bind(console) : opts.log;
  opts.path = opts.path || '/__webpack_hmr';
  opts.heartbeat = opts.heartbeat || 10 * 1000;
```

初始化opts配置。

line12 ~ 14

创建EventStream


line 16 ~ 22
Compiler暴露了和webpack整个生命周期相关的钩子。
```js
if (compiler.hooks) {
    compiler.hooks.invalid.tap("webpack-hot-middleware", onInvalid);
    compiler.hooks.done.tap("webpack-hot-middleware", onDone);
  } else {
    compiler.plugin("invalid", onInvalid);
    compiler.plugin("done", onDone);
  }
  
```

* 在compiler的生命周期钩子上注册回调函数-onInvalid, onDone。


line23 ~ 34

onInvalid和onDone回调函数功能：

* 构建中和构建完成后均通过eventStream向client发送了通知。






  
