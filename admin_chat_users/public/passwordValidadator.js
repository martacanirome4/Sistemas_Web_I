const users = require("../users");

const form = document.getElementById('form')

form.addEventListener('submit', (event) => {
    if(!passwordConfirmation()){
        event.preventDefault();
    }
});

function passwordConfirmation() {
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("password1").value;
    let roles = document.getElementById("roles").value;

    if(password.length > 4 || (confirmPassword.length > 4)){
        //document.getElementById("form").append('<div class="alert alert-danger" role="alert">Password must be 8 characters or more! Please change password</div>');
        document.getElementById('Error').innerHTML = '<div class="alert alert-danger" role="alert">Contraseña puede tener como mucho 4 caracteres</div>';
        return false;
        //alert("Password must be 8 characters or more! Please change password");
    } else {
        
        if (password == confirmPassword) {

            if( roles == "usuario"){
                users.register(user, pass, "user", function () {
                    console.log("Se ha registrado con exito el usuario");
                    req.session.message = "You have just registered please enter new account to log in!";
                    res.redirect("/login");
                   
                  });
            }else{
                users.register(user, pass, "admin", function () {
                    console.log("Se ha registrado con exito el admin");
                    req.session.message = "You have just registered please enter new account to log in!";
                    res.redirect("/login");
                  });
            }


            
            
            //alert("Valid");
        } else {
            document.getElementById('Error').innerHTML = "<h3>Please make sure your passwords match.</h3>"
            return false;
            //alert("Please make sure your passwords match.");
        }

    }  
}

