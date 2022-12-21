import ProductosDaoArchivo from "./productos/ProductosDaoArchivo.js";
import CarritosDaoArchivo from "./carritos/CarritosDaoArchivo.js";
import { config } from "dotenv";
import CarritosDaoMemoria from "./carritos/CarritosDaoMemoria.js";
import ProductosDaoMemoria from "./productos/ProductosDaoMemoria.js";

config();

const instancias = [
    {
        nombre: ProductosDaoArchivo,
        id: "archivo",
        descripcion: "producto"
    },
    {
        nombre: CarritosDaoArchivo,
        id: "archivo",
        descripcion: "carrito"
    },
    {
        nombre: ProductosDaoMemoria,
        id: "memoria",
        descripcion: "producto"
    },
    {
        nombre: CarritosDaoMemoria,
        id: "memoria",
        descripcion: "carrito"
    }
];

const instancia = instancias.filter(i => i.id == process.env.INSTANCIA);

const resultado = {
    [instancia[0].descripcion]: instancia[0].nombre,
    [instancia[1].descripcion]: instancia[1].nombre,
};

export default resultado;
