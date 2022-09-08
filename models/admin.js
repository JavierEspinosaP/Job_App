require('dotenv').config();
const db = require('pg');
const queries = require('../queries/userQueries')
const pool = require('../utils/db_sql')


//ADMIN: VISTA USUARIOS REGISTRADOS 

const getAllUsers = async()=>{
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllUsers)
        result = data.rows
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}


 //por mail
const getUsersByEmail = async () => {
    let client,result;
    try{
        client = await pool.connect();
        const data = await client.query(queries.getUsersByEmail)
        result = data.rows
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}

// //Borrar usuario de la bd
// const deleteUser = async () => {
//     let client, result;
//     try {
//         client = await pool.connect();
//         const data = await client.query(userQueries.deleteUser)
//         result = data.rows
//     } catch (err) {
//         console.log(err);
//         throw err;
//     }finally{
//         client.release();    
//     }
//     return result
// }

module.exports = {
    getAllUsers,
    getUsersByEmail
}