class Usuario {
    constructor(nombre, apellido, libros, mascotas ) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return (`${this.nombre} ${this.apellido}`)
    };

    addMascota(pet) {
        this.mascotas.push(pet)
        return (this.mascotas)
    };

    countMascotas() {
        return this.mascotas.length;
    };

    addBook(nombre, autor) {
        this.libros.push({nombre, autor});
        return (this.libros);
    };

    getBookNames() {
        const names = this.libros.map((element) => element.nombre)
        return(names)
    };

}

const usuario = new Usuario("Matias", "Carballo", [{nombre: "el visitante", autor: "Stephen King"}], ["perro", "gato"]);


console.log(usuario.getFullName());
console.log(usuario.addMascota('loro'));
console.log(usuario.countMascotas());
console.log(usuario.addBook('invisible,', 'Eloy Moreno'));
console.log(usuario.getBookNames());
