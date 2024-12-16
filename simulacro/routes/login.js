const express = require('express');
const router = express.Router();
const database = require('../database');

router.get('/', function(req, res, next) {
  res.render('login', {user: req.session.user});
});

router.post('/', async (req, res) => {

  const user = req.body.user;

  if(await database.user.isLoginRight(user, req.body.pass)){

    req.session.user = {username: user};
    req.session.message = "¡Login correcto!"

    // SOLUCION --------------------------------------------------------------
    database.user.data[req.session.user.username].cookies = req.session.cookies;

    res.redirect("restricted");

  } else {
    req.session.error = "Incorrect username or password.";
    res.redirect("login");
  }
  
});

// SOLUCION ------------------------------------------
router.post('/cookies', async (req, res) => {
  req.session.cookies = req.body.cookiesAceptadas;   
  res.json({cookies: req.session.cookies});
});


module.exports = router;
