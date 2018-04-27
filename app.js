var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


//路由文件  安装路径分发的路由
var index = require('./routes/index');
var users = require('./routes/users');
var goods = require('./routes/goods');

//主应用 主程序 requestListener
var app = express();

//全局设置
// view engine setup
//path处理路径的模块  join方法可以将两个路径连接在一起 
// __dirname 值为当前文件所处目录的绝对路径  F:\1714\class\week1-nodeJS\day5\example\views


// 设置视图模板的路径
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎为ejs引擎
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//使用中间件、插件，app上绑定一些工具、设置
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//使用路由
// 当pathname 为/的时候  由index路由来处理
app.use('/', index);
// 当pathname 为/users的时候  由users路由来处理
app.use('/users', users);

app.use('/goods', goods);

// catch 404 and forward to error handler
//中间件
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

