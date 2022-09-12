require('dotenv').config();
const apiSchema = require('../schemas/offers_admin');
const db = require('pg');
const queries = require('../queries/userQueries')
const pool = require('../utils/db_sql')


//ADMIN: VISTA USUARIOS REGISTRADOS 
const getAllUsers = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getAllUsers)
        result = data.rows
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        client.release();
    }
    return result
}

//Crear usuario por Admin
const createNewUser = async (newUser) => {
    const { name, surname, email, password, role } = newUser
    let result;
    try {
        const data = await pool.query(queries.createUser, [name, surname, email, password, role])
        result = data.rows
        return result
    } catch (error) {
        console.log(error);
        throw error;
    }
}


//edit user
const editUser = async (editedUser) => {
    const { name, surname, email } = editedUser;
    let result;
    try {
        const data = await pool.query(queries.editDataProfile, [name, surname, email])
        result = data.rowCount
        return result
    } catch (error) {
        console.log(error);
        throw error;
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

//Ofertas en MONGODB----------------------------------------------
//[GET] Obtener todas las ofertas en mongo
//No se volver a controllers con los parametros obtenidos
// const getOffers = async (req, res) => {
//     try {
//         const offers = await apiSchema.find({});
//         console.log('ofertas ', offers);
//         res.render('/dashboard');
//     }
//     catch (error) {
//         console.log(`ERROR: ${error.stack}`)
//         res.status(404).json({ "message": "Offer not found" });
//     }
// }

//Obtener oferta por id (_id NO)
//No se volver a controllers con los parametros obtenidos
const getOffer = async (id) => {
    try {
        const offer = await apiSchema.find({id},"-__v -_id -id ");
        return offer
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "Offer not found" });
    }
}

//[POST] /api/ads Crear una oferta de trabajo o curso (admin)
const createOffer = async (offer) => {
    try {
        let newOffer = new apiSchema(offer);
        console.log(newOffer);
        console.log("Holi desde admin.js createOffer");
        let answer = await newOffer.save();
        console.log(answer);
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "Offer not found" });
    }
}

//[PUT] /api/ads Editar datos de una oferta de trabajo o curso (admin)
const updateOffer = async (offer) => {
    try {
        const { title, date, budget, description } = offer;
        await apiSchema.findOneAndUpdate({ id: offer.id }, { title, date, budget, description });
        console.log("Edited desde admin.js updateOffer");
        // return {
        //     answer: "edited",
        // }
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "offer not found" });
    }
}

//[DELETE] /api/ads Borrar una oferta de trabajo o curso de la base de datos (admin)
const deleteOffer = async (id) => {
    try {
        console.log(id);
        await apiSchema.findOneAndRemove({ id: id });
        console.log("Deleted from admin.js");
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "offer not found" });
    }
}

module.exports = {
    getAllUsers,
    createNewUser,
    editUser,
    deleteUser,
    getOffer,
    createOffer,
    updateOffer,
    deleteOffer
}