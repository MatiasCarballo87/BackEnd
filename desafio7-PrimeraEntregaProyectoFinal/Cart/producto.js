const moment = require('moment');
const timestamp = moment().format('h:mm a');

class ProductoFormato {
    constructor(nombre, description, thumbnail, precio, stock, codigo) {
        this.timestamp = timestamp;
        this.nombre = nombre || "";
        this.description = description || "";
        this.thumbnail = thumbnail || "";
        this.precio = precio || "";
        this.stock = stock || "";
        this.codigo = codigo || "";
    }
}

module.exports = ProductoFormato;