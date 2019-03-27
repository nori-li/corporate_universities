var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var logger = require('morgan');



// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginHpRouter = require('./routes/loginHp');
var sysDataRouter = require('./routes/sysData');
var mystaffRouter = require('./routes/mystaff');
var knowledgeRouter = require('./routes/knowledge');
var mystudyRouter = require('./routes/myStudy')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express);

app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//静态文件夹设置
app.use(express.static(path.join(__dirname, 'public')));


app.get('/',function(req,res){
  res.send('我是后端服务器')
})


// 这边添加的路由是一级路由
// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/users',loginHpRouter);
app.use('/sys',sysDataRouter);
app.use('/mystaff',mystaffRouter);
app.use('/knowledge',knowledgeRouter);
app.use('/mystudy',mystudyRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page

  res.status(err.status || 500);
  res.send("error");
  // res.render('error');
});

module.exports = app;
