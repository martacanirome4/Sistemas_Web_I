let express = require('express');
let router = express.Router();
const users = require('../users'); //importamos mçobjeto, NO MODULO


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(users);
  res.render('admin', { title: 'Admin', usuarios:users ,logged_user: req.session.user});
});

router.post('/deleteUser',function(req, res, next) {
    
   //si logeas como admin, puedes borrar el usuario recibido que esta en body  
        if(req.session.user.role == 'admin'){
            delete users[req.body.username];
            res.redirect("/admin");
          } else {
            req.session.error = "Unauthorized access";
            res.redirect("/");
          }
    }


  );

module.exports = router;
