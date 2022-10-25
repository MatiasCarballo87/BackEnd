const productos = [
    { id: 1, nombre: "Escuadra", precio: 323.45 },
    { id: 2, nombre: "Calculadora", precio: 234.56 },
    { id: 3, nombre: "Globo Terráqueo", precio: 45.67 },
    { id: 4, nombre: "Paleta Pintura", precio: 456.78 },
    { id: 5, nombre: "Reloj", precio: 67.89 },
    { id: 6, nombre: "Agenda", precio: 78.9 },
];



  
let total = 0;

for (let i = 0; i < productos.length; i++) {
    total = total + productos[i].precio;
}