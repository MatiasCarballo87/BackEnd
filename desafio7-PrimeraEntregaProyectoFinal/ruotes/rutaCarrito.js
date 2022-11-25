const { Router } = require("express");
const rutaCarrito = Router();
const Cart = require("../Cart/cart");
const Contenedor = require('../class/contenedor');
const productosGuardados = new Contenedor("productos");
const carrito = new Contenedor("carrito");


rutaCarrito.post('/', (req, res) => {
    let cart = new Cart();
    carrito.save(cart)
    res.json("Carrito creado con éxito");
});

rutaCarrito.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await carrito.deleteById(id);
    res.json('Carrito borrado');
});

rutaCarrito.get('/:id/productos', async (req, res) => {
    const { id } = req.params;
    const cart = await carrito.getById(id);
    if(cart.productos == undefined) {
        res.json('No hay productos');
    } else {
        res.json({ id: cart.id, productos: cart.productos });
    }
});

rutaCarrito.post('/:id/productos', (req, res) => {
    const { id } = req.params;
    const cart = carrito.getById(id);
    const body = req.body.id_prod;
    const products = body.forEach((id_prod) => {
        const prod = productosGuardados.getById(id_prod);
        cart.productosGuardados.push(prod)
    })
    const newCart = carrito.update(cart);
    res.json({res: "Producto añadido al carrito", cart: newCart});
});

rutaCarrito.delete('/:id/productos/:id_prod', (req, res) => {
    const { id, id_prod } = req.params;
    const cart = carrito.getById(id);
    cart.productos.findIndex((el, ind) => {
        if(el.id == id_prod) {
            return true;
        }
    });

    const productoBorrado = cart.productos.filter((prod, ind) => prod.id != id_prod);
    cart.productos = productoBorrado;
    carrito.update(cart);
    res.json("Producto eliminado");
});

module.exports = rutaCarrito;