const { options } = require("../options/mysql");
const knex = require("knex")(options.sqlite);

knex.schema
    .createTable("mensajes", (table) => {
        table.increments("id"),
            table.string("email"),
            table.string("timestamp"),
            table.string("mensaje");
            table.string("socketid");
        })
    .then(() => {
        console.log("La tabla se creo correctamente");
    })
    .catch((err) => {
        console.log(err);
        throw new Error(err);
    })
    .finally(() => {
        knex.destroy();
    });

    knex("mensajes")
        .insert([])
        .then(() => {
            console.log("Se insertaron los mensajes");
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            knex.destroy();
        });