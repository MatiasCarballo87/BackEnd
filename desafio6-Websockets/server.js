//https://socket.io/docs/v4/server-initialization/
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const Contenedor = require('./contenedor');
const contenedor = new Contenedor();
const ContenedorMsg = require('./contenedorMsg');
const contenedorMsg = new ContenedorMsg();

//IMPLEMENTACION
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

httpServer.listen(PORT, () => 
console.log("SERVER ON http://localhost:" + PORT));

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

/* app.post("/", async (req, res) => {
    const { body } = req;
    await contenedor.save(body);
    res.sendFile(__dirname + "/index.html");
}); */

//cuando se conecta un cliente

io.on("connect", async (socket) => {

  console.log(`nuevo cliente conectado ${socket.id}`)

  // se muestra la lista completa de productos
  socket.emit("productList", await contenedor.getAll());
  // se muestra el historial completo de mensajes
  socket.emit("msgList", await contenedorMsg.getAll());

  // recibe productos del cliente
  socket.on("product", async (data) => {
    // guarda los productos en el json products
    await contenedor.save(data);
    // muestra el mensaje por consola
    console.log("Se recibio un producto nuevo", "producto: ", data);
    //devuelve el historial completo con el nuevo producto
    io.emit("productList", await contenedor.getAll());
  });

  socket.on("msg", async (data) => {
    //guarda el mensaje nuevo en el chat.json
    await contenedorMsg.save({ socketid: socket.id, timestamp: timestamp, ...data});
    //muestra el mensaje por consola
    console.log("se recibio un msg nuevo", "mensaje: ", data);
    //devuelve el historial completo al cliente con el nuevo msg
    io.emit("msgList", await contenedorMsg.getAll());
  });


});