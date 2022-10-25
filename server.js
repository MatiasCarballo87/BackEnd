const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const Contenedor = require('./contenedor')

app.get("/productos", async (req, res) => {
    const contenedor = new Contenedor();
    const todos = await contenedor.getAll();
    res.json(todos);
});

app.get("/productoRandom", async (req, res) => {
    const contenedor = new Contenedor();
    const todos = await contenedor.getAll();
    let itemRandom = todos[Math.ceil(Math.random() * todos.length)];
    res.json(itemRandom);
});

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});