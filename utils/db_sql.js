// const pg = require('pg');
require('dotenv').config()


//ELEPHANT
const pgUrl = process.env.DATABASE_URL
// const client = new pg.Client(pgUrl)


const { Pool } = require('pg');
const pool = new Pool({
    user: "asmlztcc",
    host: "tyke.db.elephantsql.com",
    database: "asmlztcc",
    password: "m_gSxwvBV_YOoJw_bbWfGRjYY6J5i8MY",
    port: 5432
});
module.exports = pool


// const client = new ClientClass(pgUrl)
// clientConnected = client.connect(), //se conecta a la bd
// console.log("Estamos conectados a Elephant", clientConnected)

// //LOCAL



// module.exports = client