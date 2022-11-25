const { Router } = require("express");
const rutaIndex = Router();

rutaIndex.get('/', (req, res) => {
    res.json('Bienvenido, indique en la URL /api/productos para visualizar los articulos o /api/carrito para ver los articulos agregados');
});

module.exports = rutaIndex;