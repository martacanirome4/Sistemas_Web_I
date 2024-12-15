var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.locals.title = "Ejercicio Login";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware de sesión
app.use(session({
  secret: "Mi secreto",
  resave: false,
  saveUninitialized: true
}));

// Middleware manejo de mensajes y errores en la sesion
app.use( (req, res, next) => {
  const message = req.session.message;
  const error = req.session.error;

  delete req.session.message;
  delete req.session.error;

  res.locals.message = "";
  res.locals.error = "";

  if(message){
    res.locals.message = '<p>${message}</p>'
  };
  if(error){
    res.locals.error = '<p>${error}</p>'
  };

  next();
});

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

module.exports = app;
