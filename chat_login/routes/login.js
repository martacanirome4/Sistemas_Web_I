const express = require('express');
const router = express.Router();
const database = require('../database');

router.get('/', function(req, res, next) {
  res.render('login', { user: req.session.user});
});

router.post('/', async function(req, res, next) {
  const user = req.body.user;
  //Comprobación si el usuario es correcto
  if(await database.users.isLoginRight(user, req.body.pass)){
    req.session.message = "Login successful!";
    req.session.user = {username: user};
    res.redirect('/');
  } else {
    req.session.error = "User or password incorrect";
    res.redirect('login');
  }
});

module.exports = router;
