//src/app.js
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// AGREGADOS DESPUÉS, INSTALAR!!
const session = require('express-session');
const http = require('http');
const {Server} = require("socket.io");

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let loginRouter = require('./routes/login');
let chatRouter = require('./routes/chat');

const app = express();

// titulo harcodeado
app.locals.title = "Chat with users";

const httpServer = http.createServer(app);
const io = new Server(httpServer);

// middleware para conectar al socket 
io.on("connection", (socket) => {
  console.log("A new user has connected");
  socket.on("chat", (msg) => {
    console.log(msg);
    io.emit("chat", msg);
  });
  socket.on("disconnect",()=>{
    console.log("A user has disconnected");
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'El secreto que queramos nosotros'
}));

// Middleware manejo errores y mensajes en la sesión
app.use(function(req, res, next){
  let error = req.session.error;
  let message = req.session.message;
  delete req.session.error;
  delete req.session.message;
  res.locals.error = "";
  res.locals.message = "";
  if (error) res.locals.error = `<p>${error}</p>`;
  if (message) res.locals.message = `<p>${message}</p>`;
  next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/chat', restrict, chatRouter);
app.use('/logout', function(req, res, next){
  req.session.destroy(function(){
    res.redirect("/");
  })
})

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = "Unauthorized access";
    res.redirect("/login");
  }
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



// ---------- OJO!!!! CAMBIA, IMPORTANTE --------------------------------------------
module.exports = {app, httpServer};
