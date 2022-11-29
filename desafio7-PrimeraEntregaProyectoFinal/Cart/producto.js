const moment = require('moment');
const timestamp = moment().format('h:mm a');

class ProductoFormato {
    constructor( nombre, precio, foto, descripcion, codigo, stock ) {
        this.nombre = nombre || "";
        this.precio = precio || "";
        this.foto = foto || "";
        this.descripcion = descripcion || "";
        this.codigo = codigo || "";
        this.stock = stock || "";
        this.timestamp = timestamp;
    }
}

module.exports = ProductoFormato;