const { Router } = require("express");
const Contenedor = require('../class/contenedor');
const productos = new Contenedor("productos");
const ProductoFormato = require("../Cart/producto")
const rutaProductos = Router();

let admin = true;

rutaProductos.get('/', async (req, res) => {
    const todos = await productos.getAll();
    res.json(todos);
});

rutaProductos.get('/:id', async (req, res) => {
    const { id } = req.params;
    const productoEncontrado = await productos.getById(id);
    if (productoEncontrado){
        res.json(productoEncontrado);
    }else {
        res.json({ error: 'Producto no encontrado' });
    }
});

rutaProductos.post('/', (req, res, next) => {
    if (admin == true) {
        next();
    } else {
        return res.status(401).json({
            error: true, description: 'no autorizado', metodo: 'solo para administradores',
        });
    }
    }, 
    async (req, res) => {
        const { body } = req;
        let productoFormato = new ProductoFormato(
            body.nombre,
            body.precio,
            body.foto,
            body.descripcion,
            body.codigo,
            body.stock
        );
        try {
            await productos.save(productoFormato);
            res.json("Producto guardado correctamente")
        }catch {
            res.json({ error: 'No se pudo agregar el producto'});
        }
        
});

rutaProductos.put('/:id', (req, res, next) => {
        if (admin == true) {
            next();
        } else {
            return res.status(401).json({
                error: true, description: 'no autorizado', metodo: 'solo para administradores',
            });
        }
    }, 
    async (req, res) => {
    try{ 
        const id = req.params.id;
        const { nombre, precio, foto, stock, descripcion, codigo }= req.body;
        await productos.updateById(id, nombre, precio, foto, stock, descripcion, codigo);
        res.json('producto actualizado');
    }catch (error){
        res.json({ error: 'Producto no encontrado' });
    }
});

rutaProductos.delete('/:id', (req, res, next) => {
        if (admin == true) {
            next();
        } else {
            return res.status(401).json({
                error: true, description: 'no autorizado', metodo: 'solo para administradores',
            });
        }
    }, 
    async (req, res) => {
        const { id } = req.params;
        await productos.deleteById(id);
        res.json('Producto borrado correctamente');
});


module.exports = rutaProductos;