var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var util = require('util');

var routes = require('./routes/index');
var users = require('./routes/users');
var about = require('./routes/about');
var list = require('./routes/list');
var listInfo = require('./routes/listInfo');
var helper = require('./routes/helper');

var app = express();

// view engine setup参数设置
app.set('views', path.join(__dirname, 'views'));//视图文件目录
app.set('view engine', 'ejs');//设置引擎类型


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(partials());

app.use('/', routes);
app.use('/users', users);
app.use('/about', about);
app.use('/list', list);
app.use('/listInfo', listInfo);

app.use('/helper', helper);

app.locals.inspect = function(obj) {
  return util.inspect(obj, true) + '----静态文件视图助手解析成功----';
}

app.locals.headers = function(req, res) {
  return util.inspect(req.headers, true) + '!!!!动态视图助手 解析成功!!!!';
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

console.log( 'dirname: ' + __dirname);

// app.locals({
//   _layoutFile: true
// })

module.exports = app;
