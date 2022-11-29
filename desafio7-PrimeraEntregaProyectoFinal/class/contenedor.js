const fs = require("fs");
const moment = require('moment');
const timestamp = moment().format('h:mm a');

class Contenedor {
    constructor(name) {
        this.filePath = `./JSON/${name}.json`;
    };

    getAll = async () => {
        try {
            const archivo = await fs.promises.readFile(this.filePath);
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
            await fs.promises.writeFile(
                this.filePath,
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
            await fs.promises.writeFile(
                this.filePath,
                JSON.stringify(productosFiltrados, null)
            );
            console.log("producto borrado");
        } catch (e) {
            console.log(e);
        }
    }; 
    
    deleteAll = async () => {
        try {
            await fs.promises.writeFile(
                this.filePath,
                JSON.stringify([], null)
            );
            console.log("se borraron todos los productos");
        } catch (e) {
            console.log(e);
        }
    };

/*     update(element) {
        try {
            let one = this.elements.find((el) => el.id == element.id);

            let newElement = { ...one, ...element };

            let index = this.elements.findIndex((el, ind) => {
                if (el.id == newElement.id) {
                    return true;
                }
            });
            this.elements[index] = newElement;

            fs.promises
                .writeFile(this.name, JSON.stringify(this.elements, null, "\t"))
                .then(() => console.log("Actualizado"))
                .catch((e) => console.log(e));

            return { response: "Actualizado", element: newElement };
        } catch (error) {
            console.log(error);
            return { response: "Error!", error };
        }
    } */

    updateCartById = async (id, timestamp, productos) => {
        try {
            const products = await this.getAll();
            const isInProductsList = products.find(prod => Number(prod.id) === Number(id));
            const indexItem = products.findIndex((prod) => Number(prod.id) === Number(id));
            if (isInProductsList != undefined) {
                const objeto = { timestamp: timestamp, productos: productos, id: id };
                products[indexItem] = objeto;
                console.log(objeto);
                fs.writeFileSync(this.filePath, JSON.stringify(products, null, 2));
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
                await fs.promises.writeFile(
                    this.filePath,
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

/* const contenedor = new Contenedor(); */

module.exports = Contenedor;
