//REQUIRES
require('dotenv').config();
const userQueries = require('../queries/userQueries')
const pool = require('../utils/db_sql')




// GETS
const getAllUsers = async () => {
    let client,result;
    try{
        client = await pool.connect();
        const data = await client.query(userQueries.getAllUsers)
        result = data.rows
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}


module.exports = {getAllUsers}