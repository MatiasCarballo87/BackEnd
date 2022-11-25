const express = require('express');
const app = express();
const rutaProductos = require("./ruotes/rutaProductos");
const rutaIndex = require("./ruotes/rutaIndex");
const rutaCarrito = require('./ruotes/rutaCarrito');
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});


app.use('/api/productos', rutaProductos);
app.use('/api/carrito', rutaCarrito);
app.use('/', rutaIndex);
app.use('/public', express.static(__dirname + '/public'));

app.get('/*', (req, res) => {
    res.json({
        error: true,
        description: "ruta no encontrada"
    });
});


