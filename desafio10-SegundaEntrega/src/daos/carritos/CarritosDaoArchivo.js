import ContenedorArchivo from "../../contenedores/contenedorArchivo.js";

class CarritosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super('src/DB/carrito.json')
    }
};

export default CarritosDaoArchivo;