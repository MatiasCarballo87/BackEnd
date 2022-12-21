import ContenedorArchivo from "../../contenedores/contenedorArchivo.js";

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super('src/DB/productos.json')
    }
};

export default ProductosDaoArchivo;