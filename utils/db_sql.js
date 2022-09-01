const pg = require('pg');
require('dotenv').config()
const ClientClass = pg.Client
const pgUrl = "postgres://asmlztcc:m_gSxwvBV_YOoJw_bbWfGRjYY6J5i8MY@tyke.db.elephantsql.com/asmlztcc"
const client = new ClientClass(pgUrl)

//SQL Local
const { Pool } = require('pg');
const pool = new Pool({
    host: process.env.HOST_LOCAL,
    user: process.env.USER_LOCAL,
    database: process.env.DB_LOCAL,
    password: process.env.PASSWORD_LOCAL
  })


module.exports = client

//SQL en la nube
// async function connect (client) {
//   try {
//     await client.connect()
//     console.log('Client connected')

//     const {rows} = await client.query('SELECT * FROM users')
//     console.table(rows)
//     await client.end()
//   }
//   catch (ex){
//     console.log("Some error" +  ex);
//   }

// finally {
//   await client.end()
// }
// }
// connect (client)
