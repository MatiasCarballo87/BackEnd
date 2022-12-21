import moment from 'moment';
const timestamp = moment().format('h:mm a');

class Carrito {
    constructor(productos) {
        this.timestamp = timestamp;
        this.productos = productos || [];
    }
}

export default Carrito;