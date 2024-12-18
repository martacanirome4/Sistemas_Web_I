const form = document.getElementById('form')

form.addEventListener('submit', (event) => {
    if(!passwordConfirmation()){
        event.preventDefault();
    }
});

function passwordConfirmation() {
    let password = document.getElementById("pass").value;
    let confirmPassword = document.getElementById("pass1").value;

    if(password.length < 4 || (confirmPassword.length < 4)){
        //document.getElementById("form").append('<div class="alert alert-danger" role="alert">Password must be 8 characters or more! Please change password</div>');
        document.getElementById('Error').innerHTML = '<div class="alert alert-danger" role="alert">Password must be 8 characters or more! Please change password</div>';
        return false;
        //alert("Password must be 8 characters or more! Please change password");
    } else {
        
        if (password == confirmPassword) {
            document.getElementById('Error').innerHTML = "<h3>La contrasena es valida</h3>"
            return true;
            
            //alert("Valid");
        } else {
            document.getElementById('Error').innerHTML = "<h3>No coinciden las contraseñas.</h3>"
            return false;
            
        }

    }  
}