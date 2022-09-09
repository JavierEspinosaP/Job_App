require('dotenv').config();
const userQueries = require('../queries/userQueries')
const apiSchema = require('../schemas/offers_admin');
const pool = require('../utils/db_sql')

//ADMIN: VISTA USUARIOS REGISTRADOS 
const getAllUsers = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(userQueries.getAllUsers)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}


//por mail
const getUsersByEmail = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(userQueries.getAllUsers)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

//Borrar usuario de la bd
const deleteUser = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(userQueries.deleteUser)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

//Ofertas en MONGODB
//[GET] Obtener todas las ofertas en mongo
const getOffers = async (req, res) => {
    try {
        const offers = await apiSchema.find({});
        console.log('ofertas ', offers);
        res.render('/dashboard');
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "Offer not found" });
    }
}

//Obtener usuario por id (_id NO)
const getOffer = async (req, res) => {
    try {
        const offers = await apiSchema.find({ id: req.params.id });
        console.log('oferta ', offers);
        res.render('/dashboard');
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "Offer not found" });
    }
}

// const getOffers = async () => {
//     try {
//         const getOffers = await apiSchema.find({}, "-_id");
//         return getOffers;
//     }
//     catch (error) {
//         console.log(`ERROR: ${error.stack}`)
//         res.status(404).json({ "message": "Offer not found" });
//     }
// }

//[POST] /api/ads Crear una oferta de trabajo o curso (admin)
const createOffer = async (req, res) => {
    try {
        let newOffer = new apiSchema(req.body);
        console.log(newOffer);
        let answer = await newOffer.save();
        console.log(answer);
        redirect('/dashboard');
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "Offer not found" });
    }
}

//[PUT] /api/ads Editar datos de una oferta de trabajo o curso (admin)
const updateOffer = async (offer) => {
    try {
        const { id, title, company, date, location, description } = offer;
        await apiSchema.findOneAndUpdate(offer.id, { id, title, company, date, location, description });
        console.log("Edited");
        return {
            answer: "edited",
        }
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "offer not found" });
    }
}

//[DELETE] /api/ads Borrar una oferta de trabajo o curso de la base de datos (admin)
const deleteOffer = async (offer) => {
    try {

        await apiSchema.findOneAndDelete(offer.id);
        console.log("Deleted");
        return {
            answer: "Deleted",
        }
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "offer not found" });
    }
}

module.exports = {
    getAllUsers,
    getUsersByEmail,
    deleteUser,
    getOffers,
    getOffer,
    createOffer,
    updateOffer,
    deleteOffer
}