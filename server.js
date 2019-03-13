const Koa = require ('Koa');
const app = new Koa();
const fs = require('fs');
const path = require('path');

const promisify =  require('util').promisify;
const readFile = promisify(fs.readFile);

const webpack = require('webpack'); // webpack模块
const config = require('./webpack.config.js');
//加载webpack 热加载服务器模块
const webpackDevMiddleware = require('koa-webpack-dev-middleware');
const webpackHotMiddleware = require('koa-webpack-hot-middleware');

const compiler = webpack(config);

const historyFallback = require('koa2-history-api-fallback')
const router = require('./server/controller/api.js');

app.use(router.routes());

app.use(historyFallback({ whiteList: ['/api'] }));

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    hot: true,
    publicPath: '/',
    stats: {
      colors: true
    }
}));

app.use(webpackHotMiddleware(compiler));


// app.use(router.routes())

app.listen(3000, () => {
    console.log('app listen at 3000')
});