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
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.locals.title = "Chat with users";

// middleware para conectar al socket --------------------------------------------
io.use((socket, next) => {
  const session = socket.request.headers.cookie ? socket.request.headers.cookie : '';
  const sessionID = session.split('=')[1]; // Assuming 'connect.sid' as default session cookie name
  socket.request.sessionID = sessionID; // Attach session ID to socket request
  next();
});

io.on("connection", (socket) => {
  console.log("A new user has connected");

  // Access session data using socket.request.sessionID
  socket.on("chat", (msg) => {
    const session = socket.request.session || {}; // Get session from request
    const user = session.user ? session.user.username : 'Unknown User'; // Get username from session
    const messageWithUser = { username: user, message: msg };
    io.emit("chat", messageWithUser);
  });
  socket.on("disconnect",()=>{
    console.log("A user has disconnected");
  });
});
// ------------------------------------------------------------------------------

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

// ------------------------------------------------------------------------------
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/chat', isAuthenticated, chatRouter);
app.use('/logout', function(req, res, next){
  req.session.destroy(function(){
    res.redirect("/");
  })
})

function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
      return next();
  }
  res.redirect('login');
}

// ----------------------------------- END ----------------------------------------
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
