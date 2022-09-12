
const pg = require('pg');
require('dotenv').config()


//ELEPHANT

const pgUrl = process.env.DATABASE_URL
const client = new pg.Client(pgUrl)
let clientConnected = client.connect() //se conecta a la bd
console.log("Estamos conectados a Elephant", clientConnected)


// const client = new ClientClass(pgUrl)
// clientConnected = client.connect(), //se conecta a la bd
// console.log("Estamos conectados a Elephant", clientConnected)

// //LOCAL
// const pool = new Pool({
//   host: process.env.HOST_LOCAL,
//   user: process.env.USER_LOCAL,
//   database: process.env.DB_LOCAL,
//   password: process.env.PASSWORD_LOCAL,
//   port: process.env.PORT_LOCAL
// })


module.exports = client