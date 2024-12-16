# Sistemas Web I

## Credenciales
- martacaninoromero
- martacaninoromero@usp.ceu.es
- NI: 191941

## Configuración de git
```bash
git config credential.helper "cache --timeout=7200"
```
```bash
git config --global user.name "martacaninoromero"
````
```bash
git config --global user.email martacaninoromero@usp.ceu.es
```

### Para harcodear el título
En **app.js** incluir:
```js
app.locals.title = "Titulo";
```
Y eliminar en cada archivo de 'routes' el param 'title' en la línea de 'render'

### Para cambiar el puerto por defecto o indicarlo
En **/bin/www**, buscar la linea:
```javascript
var port = normalizePort(process.env.PORT || '3000');
```
Por ejemplo, para cambiar el puerto a 400:
```javascript
var port = normalizePort(process.env.PORT || process.argv[2] || '4000');
```
Selecciona el puerto en el que se ejecutará la aplicación, priorizando:
1. El puerto definido en la variable de entorno process.env.PORT.
2. Un puerto pasado como argumento en la línea de comandos (process.argv[2]).
3. Un valor predeterminado ('4000') si no se especifica ninguno de los anteriores.

### Para añadir un script para iniciar proyecto con npm start 
En **package.json**, debajo de la linea 'private'
```js
"scripts": {
    "start": "node ./bin/www"
},
```


### Para modificar dónde se encuentra el fichero main del proyecto 
En **package.json**:
```js
"main": "app.js",
```


### Para indicar puerto al levantar el proyecto
En **/bin/www**:
```js
// PORT=3200 npm start
let port = normalizePort("3000");
if(process.env.PORT) {
    port = normalizePort(process.env.PORT)
}
```

