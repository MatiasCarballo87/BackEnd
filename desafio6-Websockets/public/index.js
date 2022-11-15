const socket = io();

socket.on("connect", () => {
    console.log("conectado!!");
});

socket.on("msgChat", (data) => {
    console.log(data);
});

socket.on("msgChat", (data) => {
    let html = "";
    data.forEach((element) => {
        html += `
            <div>
                ${element.email} dijo: ${element.mensaje}
            </div>
        `;
    });
    document.getElementById("chatContainer").innerHTML = html;
});

function sendMsg() {
    const email = document.getElementById("input-email").value;
    const msgParaEnvio = document.getElementById("input-msg").value;
    socket.emit("msgChat", { email: email, mensaje: msgParaEnvio });
};

socket.on("products", (data) => {
    let productos = "";
    data.forEach((element) => {
        productos += `
        <table>
            <tbody>
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Foto</th>
                </tr>
                <tr>
                    <td><strong>${element.title}</strong></td>
                    <td>$ ${element.price}</td>
                    <td><img src="${element.thumbnail}"/></td>
                </tr>
            </tbody>
        </table>
        `
    })
    document.getElementById("productosContainer").innerHTML = productos;
});

function sendProduct() {
    const nombre = document.getElementById("title").value;
    const precio = document.getElementById("price").value;
    const foto = document.getElementById("thumbnail").value;
    socket.emit("products", { Title: nombre, Price: precio, URL: foto });
};