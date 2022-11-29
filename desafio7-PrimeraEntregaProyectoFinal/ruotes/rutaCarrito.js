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

rutaCarrito.post('/:id/productos/:id_prod', async (req, res) => {
    const { id, id_prod } = req.params;
    const productoPedido = await productosGuardados.getById(id_prod);
    const allCarts = await carrito.getAll();
    const carritoPedido = allCarts.find((item) => Number(item.id) == Number(id));
    const nuevoProducto = [...carritoPedido.productos, productoPedido];
    carrito.updateCartById(carritoPedido.id, carritoPedido.timestamp, nuevoProducto);
    res.json({ succes: true, msg: "Producto añadido" });
});

rutaCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
    const { id, id_prod } = req.params;
    const cart = await carrito.getById(id);
    const elementIndex = cart.productos.findIndex((el) => el.id == id_prod);
    cart.productos.splice(elementIndex, 1);
    res.json( `Se elimino del carrito ${id} el producto con el Id ${id_prod}`);

    const carritoActual = await carrito.updateCartById(id, cart.productos, cart.timestamp);
    res.json({cart: carritoActual});
});

module.exports = rutaCarrito;