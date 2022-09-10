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
    }catch(error){
        console.log(error);
        throw error;
    }finally{
        client.release();    
    }
    return result
}


//Crear usuario por Admin
const createNewUser = async (newUser) => {
    const{name, surname, email, password, role} = newUser
    let result;
    try {
        const data = await pool.query(queries.createUser,[name, surname, email, password, role])
        result = data.rows
        return result
    } catch (error) {
        console.log(error);
        throw error;
    }
}


//edit user
const editUser = async (editedUser) => {
    const {name, surname, email} = editedUser;
    let client,result;
    try{
        const data = await pool.query(queries.editDataProfile,[name,surname, email])
        result = data.rowCount
        return result
    }catch(err){
        console.log(err);
        throw err;
    }
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
    editUser,
    deleteUser
}