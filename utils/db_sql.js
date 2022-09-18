require('dotenv').config()


const pgUrl = process.env.DATABASE_URL

const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.USER_ELEPHANT,
    host: process.env.HOST_ELEPHANT,
    database: process.env.DATABASE_ELEPHANT,
    password: process.env.PASSWORD_ELEPHANT,
    port: process.env.PORT_ELEPHANT
});


module.exports = pool