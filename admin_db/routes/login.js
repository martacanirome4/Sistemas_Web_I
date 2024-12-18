let express = require('express');
let router = express.Router();
const database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login', logged_user: req.session.user});
});

router.post('/', async function(req, res, next){
    const username = req.body.user;
    if(await database.users.isLoginRight(username, req.body.pass)){
        req.session.user = database.users.data[username];
        req.session.user.last_login = new Date().toISOString();
        req.session.message = "Welcome!";
        res.redirect("/restricted");
    } else {
        req.session.error = "Incorrect user or password";
        res.redirect("/login");
    }
});

module.exports = router;
