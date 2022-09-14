// const pg = require('pg');
require('dotenv').config()


//ELEPHANT
const pgUrl = process.env.DATABASE_URL
// const client = new pg.Client(pgUrl)


const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.USER_ELEPHANT,
    host: process.env.HOST_ELEPHANT,
    database: process.env.DATABASE_ELEPHANT,
    password: process.env.PASSWORD_ELEPHANT,
    port: process.env.PORT_ELEPHANT
});
module.exports = pool


// const client = new ClientClass(pgUrl)
// clientConnected = client.connect(), //se conecta a la bd
// console.log("Estamos conectados a Elephant", clientConnected)

// //LOCAL



// module.exports = client