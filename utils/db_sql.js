const pg = require('pg');
require('dotenv').config()
// const ClientClass = pg.Client
// const pgUrl = "postgres://asmlztcc:m_gSxwvBV_YOoJw_bbWfGRjYY6J5i8MY@tyke.db.elephantsql.com/asmlztcc"
// const client = new ClientClass(pgUrl)

//SQL Local
// const { Pool } = require('pg');
// const pool = new Pool({
//     host: process.env.HOST_LOCAL,
//     user: process.env.USER_LOCAL,
//     database: process.env.DB_LOCAL,
//     password: process.env.PASSWORD_LOCAL
//   })

const ClientClass = pg.Client
const pgUrl = `postgres://${process.env.USER_LOCAL}:${process.env.PASSWORD_LOCAL}@${process.env.HOST_LOCAL}/${process.env.DB_LOCAL}`
const client = new ClientClass(pgUrl)



async function getAllUsers() {
  try {
    await client.connect()
    console.log('Client connected')

    const {rows} = await client.query('SELECT * FROM users;')
    return rows
  }
  catch (ex){
    console.log("Some error" +  ex);
  }

finally {
  await client.end()
}

}

module.exports = {
  getAllUsers
}
