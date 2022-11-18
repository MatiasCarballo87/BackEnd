const socket = io();

function sendProduct() {
    const nombre = document.getElementById("title").value;
    const precio = document.getElementById("price").value;
    const foto = document.getElementById("thumbnail").value;
    socket.emit("product", { title: nombre, price: precio, thumbnail: foto });
    return false;
};

socket.on("productList", (data) => {
    console.log(data)
    let productos = "";
    data.forEach(element => {
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
    document.getElementById("productosContainer").innerHTML = productos
});


function sendMsg() {
    const email = document.getElementById("input-email").value;
    const msgParaEnvio = document.getElementById("input-msg").value;
    socket.emit("msg", { email: email, mensaje: msgParaEnvio });
    return false;
}

socket.on("msgList", (data) => {
    let html = "";
    data.forEach(element => {
        html += `
            <div>
                <span class="chatMail"><strong>${element.email}</strong></span> <span class="chatTime">[${element.timestamp}]</span> <span class="chatMsg">${element.mensaje}</span>
            </div>
        `
    });
    document.getElementById("chatContainer").innerHTML = html;
});


