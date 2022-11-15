//https://socket.io/docs/v4/server-initialization/
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const Contenedor = require('./contenedor');
const contenedor = new Contenedor();

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

app.post("/", async (req, res) => {
    const { body } = req;
    await contenedor.save(body);
    res.sendFile(__dirname + "/index.html");
});

let chat = [];

io.on("connect", (socket) => {

  socket.on("msgChat", (data) => {
    chat.push({
        email: data.email,
        fecha: data.fecha,
        mensaje: data.mensaje,
    });
    contenedor.saveMsgs(chat);
    io.sockets.emit("msgChat", chat);
  });

//no funciona el products
  socket.on("products", (data) => {
    todos.push({
      title: data.title,
      price: data.price,
      thumbnail: data.thumbnail,
    })
    io.sockets.emit("products", todos);
  });
});