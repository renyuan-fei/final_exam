var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//database
var dbConnectionPool = mysql.createPool({
  host: 'localhost',
  database: 'final_exam',
  user: 'root',
  password: '159753',
  port: '3306',
});

app.use(function (req, res, next)
{
  req.pool = dbConnectionPool;
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//session
app.use(session({
  name: "EXAM",
  secret: "b706835de79a2b4e80506f582af3676ac8361638",
  cookie:
      {
        maxAge: 5000 * 60,

        //'false' only for local test

        //true
        secure: false,
        //true
        httpOnly: false,
      },
  resave: false,
  saveUninitialized: false,
}))

app.use(function (req, res, next)
{
  if (req.url.includes("login") || req.url.includes("js") || req.url.includes("css"))
  {
    console.log(req.session.cookie)
    next();
  } else
  {
    if (req.session.cookie)
    {
      console.log(req.session.cookie)
      next()
    }
    else
    {
      res.redirect('/')
    }
  }
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  res.render('error');
});

app.listen(8080,function ()
{
  console.log('http://localhost:8080/')
})

module.exports = app;