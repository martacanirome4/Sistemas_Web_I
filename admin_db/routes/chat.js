const express = require('express');
const router = express.Router();
const database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('chat', { title: 'Chat', logged_user: req.session.user});
});



module.exports = router;
