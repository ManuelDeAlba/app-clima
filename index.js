const express = require('express');
const path = require('path');

const app = express();

//* Configuración
app.set('port', 3000);
app.set('view engine', 'ejs');

//* Rutas
app.use(require('./routes/index'));

//* Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//* Servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto 3000');
})