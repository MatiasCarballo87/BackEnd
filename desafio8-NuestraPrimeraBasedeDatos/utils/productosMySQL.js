const { options } = require("../options/mysql");
const knex = require("knex")(options.mysql);

knex.schema
    .createTable("productos", (table) => {
        table.increments("id"),
            table.string("title"),
            table.string("price"),
            table.string("thumbnail");
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

    knex("productos")
        .insert([
            {"title":"camiseta","price":"100","thumbnail":"https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/de18f39b42bd4e1ebb57aec901802be1_9366/Camiseta_Titular_Argentina_22_Blanco_HB9215_21_model.jpg","id":1},
            {"title":"short","price":"50","thumbnail":"https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/8a28f3eae70a4a63b491adb101354149_9366/Shorts_Titular_Argentina_21_Negro_FS6572_01_laydown.jpg","id":2},
            {"title":"medias","price":"25","thumbnail":"https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/e25cb3a035e740f3a220aed201047ac1_9366/Medias_Uniforme_Titular_Argentina_22_Blanco_HB9207_03_standard.jpg","id":3},
            {"title":"botines","price":"350","thumbnail":"https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/73ae953f119f46a8951bae9e00ec1e41_9366/Botines_Predator_3_Sin_Cordones_Terreno_Firme_Naranja_GW1000_22_model.jpg","id":4},
            {"title":"canilleras","price":"32","thumbnail":"https://redsport.vteximg.com.br/arquivos/ids/1113593-1000-1000/GA050004704.jpg?v=637922756979530000","id":5}
        ])
        .then(() => {
            console.log("Se insertaron los mensajes");
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            knex.destroy();
        });