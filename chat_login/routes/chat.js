var express = require('express');
var router = express.Router();
const database = require('../database');


router.get('/', function(req, res, next) {
  res.render('chat', { user: req.session.user });
});

module.exports = router;
