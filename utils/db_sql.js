
const { Pool } = require('pg');
require('dotenv').config()
// const ClientClass = pg.Client
// const pgUrl = process.env.DATABASE_URL,
// const client = new ClientClass(pgUrl)

//ELEPHANT
// const ClientClass = pg.Client
// const pgUrl = process.env.DATABASE_URL
// // const pgUrl = `postgres://${process.env.USER_LOCAL}:${process.env.PASSWORD_LOCAL}@${process.env.HOST_LOCAL}/${process.env.DB_LOCAL}`
// const client = new ClientClass(pgUrl)
// clientConnected = client.connect(), //se conecta a la bd
// console.log("Estamos conectados a Elephant", clientConnected)

//LOCAL
const pool = new Pool({
  host: process.env.HOST_LOCAL,
  user: process.env.USER_LOCAL,
  database: process.env.DB_LOCAL,
  password: process.env.PASSWORD_LOCAL,
  port: process.env.PORT_LOCAL
})


module.exports = pool