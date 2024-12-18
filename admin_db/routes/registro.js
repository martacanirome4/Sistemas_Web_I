var express = require('express');
const database = require('../database');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('registro.ejs', { title: 'Armazón', logged_user: req.session.user });
});

router.post("/", function (req, res, next) {


  const user = req.body.user;
  const pass = req.body.pass; //agarrar name de input
  const pass1 = req.body.pass1;
  const roles = req.body.roles;
  





  if (!database.users[user]) {
    req.session.users = database.users[user];
    if (pass != pass1) {

      req.session.error = "Passwords don't match";
      res.redirect("/registro");
    } else if (pass.length < 5 && pass1.length < 5) {
      req.session.error = "Passwords need to be 5 characters long";
      res.redirect("/registro");

    } else if (!/^[A-Z]{1}[a-z0-9A-Z\._-]+$/.test(pass)) {  //EXPRESION REGULAR
      req.session.error = "formato incorrecto de contraseña: Primera letra Mayuscula, + 4 caracteres";
      res.redirect("/registro");

    }

    else if (pass === pass1) {

      if (roles == "usuario") {
        database.users.register(user, pass, "user", function () {
          console.log("rol:" + roles);
          console.log("Se ha registrado con exito");
          req.session.message = "You have just registered please enter new account to log in!";

          res.redirect("/login");
        });
      } else {

        database.users.register(user, pass, "admin", function () {
          console.log("Se ha registrado con exito");
          req.session.message = "You have just registered please enter new account to log in!";
          res.redirect("/login");
        });

      }

    }
  } else {
    req.session.error = "User already exists";
    res.redirect("/registro");
  }
});

router.post("/contrasena", function (req, res, next) {
  const num_palabras= req.body.num_palabras;
  
let letras= ['Palo','Hola','Pablo','Casa','Perro','Pedro','Mono','Pelota','Planta','Telefono','Arquitectura','Escribir','Pelo'];
 

  
  for(let i=0; i < num_palabras ;i++){
  let aleatorio =  letras[Math.floor(Math.random() * (letras.length -1)) +1];
  console.log(i); 
  console.log(aleatorio);
  alert("Sus contraseña es: "+aleatorio);
}
  
  }
  
);



module.exports = router;