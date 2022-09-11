//REQUIRES

require('dotenv').config();
const userQueries = require('../queries/userQueries')
const pool = require('../utils/db_sql')

//queries para los Endpoints web

//REGISTRO DE USUARIO

const registerUser = async(user) => {
    let client, result;
    
    try {
        client = await pool.connect();
        const data = await client.query(userQueries.registerUser,[user.name,user.surname, user.email, user.hash]);
        result = data.rows
        console.log(result);
    } catch (err) {
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
    
}

//LOGIN DE USUARIO (ya registrado)
const signInUser = async(user) => {
    
    let client, result;
    try {
        client = await pool.connect();
        let data = await client.query(userQueries.loginUser, [user.email])
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    }finally{
        client.release();
    }
    return result
}

        //update status logged colum
const loggedStatus= async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(userQueries.updateStatus, [email])
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}



//VISTA DE USUARIO: favoritos
const getFavorites = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(userQueries.favOffers)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
    
}

//Guardar favorito - usuario
const saveFavorite = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data =  await client.query(userQueries.saveFav)
        result = data.rows
        
    } catch (err) {
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}

//editar perfil
const editProfile = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(userQueries.editDataProfile)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
    
}


//Borrar favorito - usuario
const deleteFavorites = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(userQueries.deleteFav)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
    
}


//Datos de perfil del usuario/admin
const userProfile = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(userQueries.profile)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}

// Salir de la app: logout
const logoutUser = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(userQueries.logoutUser, [email])
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}


//recuperar contraseña
const recoveredPassword = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(userQueries.recoverPassword)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}


//cambiar contraseña
const changedPassword = async (user) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(userQueries.changePassword, [user.password, user.email])
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}


module.exports = {
    registerUser,
    signInUser,
    loggedStatus,
    getFavorites,
    saveFavorite,
    editProfile,
    deleteFavorites,
    userProfile,
    logoutUser,
    recoveredPassword,
    changedPassword
}