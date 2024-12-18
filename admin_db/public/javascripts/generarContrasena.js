let letras = ['Palo', 'Hola', 'Pablo', 'Casa', 'Perro', 'Pedro', 'Mono', 'Pelota', 'Planta', 'Telefono', 'Arquitectura', 'Escribir', 'Pelo'];


function contra() {
  let numero = prompt("¿Cuantas palabras quieres?", "");
  console.log(numero);
  let aleatorio = "";
  //document.write("Su contraseña es: ");
  for (let i = 0; i < numero; i++) {
    aleatorio += letras[Math.floor(Math.random() * (letras.length - 1)) + 1];
    console.log(i);
    console.log(aleatorio);


  }
  console.log(aleatorio);
  let contrasena = document.createElement("p");
  contrasena.textContent = `Su contraseñas recomendada es: ${aleatorio}`;
  let body = document.getElementsByTagName("body")[0];
  body.appendChild(contrasena);
}
