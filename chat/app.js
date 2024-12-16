const createError = require('http-errors');
const express = require('express');
const path = require('path');
const http = require('http');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const { Server } = require('socket.io');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const chatRouter = require('./routes/chat');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.locals.title = "Simple Chat";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chat', chatRouter);

// Socket.IO Configuration
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for 'chat' events from clients
  socket.on('chat', (msg) => {
      console.log('Message received:', msg);
      io.emit('chat', msg); // Broadcast the message to all clients
  });

  socket.on('disconnect', () => {
      console.log('A user disconnected');
  });
});

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
