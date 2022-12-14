import { Router } from "express";
import Carrito from "../utils/carrito.js";
import instancia from "../daos/index.js";
const productosGuardados = new instancia.producto;
const carrito = new instancia.carrito;
const rutaCarrito = Router();


rutaCarrito.post('/', (req, res) => {
    let cart = new Carrito();
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

    const carritoActual = await carrito.updateCartById(id, cart.timestamp, cart.productos);
    res.json({cart: carritoActual});
});
 
export default rutaCarrito;