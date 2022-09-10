require('dotenv').config();
const db = require('pg');
const queries = require('../queries/userQueries')
const pool = require('../utils/db_sql')


//ADMIN: VISTA USUARIOS REGISTRADOS 

const getAllUsers = async()=>{
    let client,result;
    try{
        client = await pool.connect();
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


//Crear usuario por Admin
const createNewUser = async() => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.registerUser, [name, surname, email, password, role])
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
    
}

//Borrar usuario de la bd
const deleteUser = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteUser, [email])
        result = data.rowCount
        return result
    } catch (err) {
        console.log(err);
        throw err;
    }
    
}

module.exports = {
    getAllUsers,
    createNewUser,
    deleteUser
}