const { options } = require("../options/mysql");
const knex = require("knex")(options.sqlite);


class ContenedorMsg {
    constructor(table) {
        this.table = table;
    };

    getAll = async () => {
        try {
            const archivoMsg = await knex(this.table).select("*");
            if (archivoMsg.length > 0) {
                return archivoMsg;
            }else {
                return [];
            }
        } catch (e) {
            console.log(e);
        }
    };

    save = async (mensaje) => {
        try {
            await knex(this.table).insert(mensaje)
            console.log("registro creado:", mensaje);
        } catch (e) {
            console.log(e);
        }
    };

}

module.exports = ContenedorMsg;
