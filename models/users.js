//REQUIRES
require('dotenv').config();
const userQueries = require('../queries/userQueries')
const pool = require('../utils/db_sql')


//REGISTRO DE USUARIO

const registerUser = async (user) => {
    let client, result;

    try {
        client = await pool.connect();
        const data = await client.query(userQueries.registerUser, [user.name, user.surname, user.email, user.hash]);
        result = data.rows
        console.log(result);
    } catch (err) {
        console.log(err);
        throw err;
    }
    finally {
        client.release();
    }
    return result

}

//LOGIN DE USUARIO (ya registrado)
const signInUser = async (user) => {

    let client, result;
    try {
        client = await pool.connect();
        let data = await pool.query(userQueries.loginUser, [user.email])
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

//update status logged colum
const loggedStatus = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(userQueries.updateStatus, [email])
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}



//VISTA DE USUARIO: favoritos
const getFav = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(userQueries.favOffers, [email])
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}



//Guardar favorito - usuario
const createFav = async (newFav) => {
    let client, result;
    console.log("Estas en createFav users models ", newFav);
    try {
        client = await pool.connect();
        const data = await client.query(userQueries.saveFav, [newFav.email, newFav.url])
        result = data.rows

    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

//Borrar favorito - usuario
const deleteFav = async (url) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(userQueries.deleteFav, [url])
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
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
    } finally {
        client.release();
    }
    return result

}

//Get user by email
const userProfile = async (email) => {
    console.log("Holi desde users userProfile");
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(userQueries.profile, [email])

        result = data.rows
        return result
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }

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
    } finally {
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
    } finally {
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
    } finally {
        client.release();
    }
    return result
}


module.exports = {
    registerUser,
    signInUser,
    loggedStatus,
    getFav,
    createFav,
    deleteFav,
    editProfile,
    userProfile,
    logoutUser,
    recoveredPassword,
    changedPassword
}