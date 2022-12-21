import { promises as fs } from 'fs';
import  moment  from 'moment';
const timestamp = moment().format('h:mm a');

class ContenedorArchivo {
    constructor(ruta) {
        this.ruta = ruta;
    };

    getAll = async () => {
        try {
            const archivo = await fs.readFile(this.ruta);
            const productos = JSON.parse(archivo);
            return (productos);
        } catch (e) {
            console.log(e);
        }
    };

    save = async (producto) => {
        try {
            const productos = await this.getAll();
            const id = productos.length === 0
                    ? 1
                    : productos[productos.length - 1].id + 1;
            producto.id = id;
            productos.push(producto);
            await fs.writeFile(
                this.ruta,
                JSON.stringify(productos, null, 3)
            );
        } catch (e) {}
    };

    getById = async (id) => {
        try {
            const dataRecuperada = await this.getAll();
            const dataNueva = dataRecuperada.find((data) => data.id == id);
            return dataNueva;
        } catch (e) {
            console.log(e);
        }  
    };

    async deleteById(id) {
        try {
            const productos = await this.getAll();
            const productoEncontrado = productos.find((e) => e.id == id);
            if (!productoEncontrado) return console.log("el id no existe");
            const productosFiltrados = productos.filter((e) => e.id != id);
            await fs.writeFile(
                this.ruta,
                JSON.stringify(productosFiltrados, null)
            );
            console.log("producto borrado");
        } catch (e) {
            console.log(e);
        }
    }; 
    
    deleteAll = async () => {
        try {
            await fs.writeFile(
                this.ruta,
                JSON.stringify([], null)
            );
            console.log("se borraron todos los productos");
        } catch (e) {
            console.log(e);
        }
    };

    updateCartById = async (id, timestamp, productos) => {
        try {
            const products = await this.getAll();
            const isInProductsList = products.find(prod => Number(prod.id) === Number(id));
            const indexItem = products.findIndex((prod) => Number(prod.id) === Number(id));
            if (isInProductsList != undefined) {
                const objeto = { timestamp: timestamp, productos: productos, id: id };
                products[indexItem] = objeto;
                console.log(objeto);
                fs.writeFileSync(this.ruta, JSON.stringify(products, null, 2));
                return true;
            } else {
                return false;
            }
        }catch ( error ) {
            console.log("error");
        }
    };

    updateById = async (id, nombre, precio, foto, stock, descripcion, codigo) => {
        try {
            const productos = await this.getAll();
            const item = productos.find((prod) => prod.id == id);
            if (item) {
                item.nombre = nombre;
                item.precio = precio;
                item.foto = foto;
                item.stock = stock;
                item.descripcion = descripcion;
                item.codigo = codigo;
                await fs.writeFile(
                    this.ruta,
                    JSON.stringify(productos, null, 2)
                );
                return item;
            } else {
                return { error: "Producto no encontrado" };
            }
        } catch (error) {
            console.log(error);
        }
    };
    
};

export default ContenedorArchivo;
