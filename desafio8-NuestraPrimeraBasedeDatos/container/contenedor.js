const { options } = require("../options/mysql");
const knex = require("knex")(options.mysql);


class Contenedor {
    constructor(table) {
        this.table = table;
    };

    getAll = async () => {
        try {
            const archivoProducts = await knex(this.table).select("*");
            if (archivoProducts.length > 0) {
                return archivoProducts;
            }else {
                return [];
            }
        } catch (e) {
            console.log(e);
        }
    };

    save = async (producto) => {
        try {
            await knex(this.table).insert(producto)
            console.log("registro creado:", producto);
        } catch (e) {
            console.log(e);
        }
    };

}

module.exports = Contenedor;