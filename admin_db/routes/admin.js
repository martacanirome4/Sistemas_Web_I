let express = require('express');
let router = express.Router();
const database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Admin',usuarios:database.users.data ,logged_user: req.session.user});
});

router.post('/deleteUser',function(req, res, next) {
    
   //si logeas como admin, puedes borrar el usuario recibido que esta en body  
        if(req.session.user.role == 'admin'){
            delete database.users.data[req.body.username];
            res.redirect("/admin");
          } else {
            req.session.error = "Unauthorized access";
            res.redirect("/");
          }
    }


  );

module.exports = router;
