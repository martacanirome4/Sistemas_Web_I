//src/app.js
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// AGREGADOS DESPUÉS, INSTALAR!!
const http = require('http');
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const chatRouter = require('./routes/chat');

const app = express();

app.locals.title = "Chat with users";

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
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Cambia a true si se usa HTTPS
}));

// Middleware manejo errores y mensajes en la sesión
app.use((req, res, next) => {
  const message = req.session.message;
  const error = req.session.error;
  delete req.session.message;
  delete req.session.error;
  res.locals.message = "";
  res.locals.error = "";
  if(message){res.locals.message = `<p>${message}</p>`};
  if(error){res.locals.error = `<p>${error}</p>`};
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/chat', isAuthenticated, chatRouter);
app.use('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

function checkLogin(req, res, next){
  if(req.session.user){
    res.redirect('chat');
    next();
  } else {
    res.redirect('login');
  }
}

function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
      return next();
  }
  res.redirect('login');
}

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
