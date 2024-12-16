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

## Harcodear título
En **app.js** incluir:
```js
app.locals.title = "Titulo";
```
Y eliminar en cada archivo de 'routes' el param 'title' en la línea de 'render'

## Cambiar el puerto
En **/bin/www**, buscar la linea:
```javascript
var port = normalizePort(process.env.PORT || '3000');
```
Por ejemplo, para cambiar el puerto a 400:
```javascript
var port = normalizePort(process.env.PORT || process.argv[2] || '4000');
```

## Añadir script para iniciar proyecto con npm start 
En **package.json**, debajo de la linea 'private'
```js
"scripts": {
    "start": "node ./bin/www"
},
```

## Indicar donde se encuentra el fichero main del proyecto 
En **package.json**:
```js
"main": "app.js",
```

### Indicar puerto al levantar el proyecto
En **/bin/www**:
```js
// PORT=3200 npm start
let port = normalizePort("3000");
if(process.env.PORT) {
    port = normalizePort(process.env.PORT)
}
```

