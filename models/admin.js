require('dotenv').config();
const apiSchema = require('../schemas/offers_admin');
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
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}


 //por mail - EXTRA!!
// const getUsersByEmail = async () => {
//     let client,result;
//     try{
//         client = await pool.connect();
//         const data = await client.query(queries.getUsersByEmail)
//         result = data.rows
//     }catch(err){
//         console.log(err);
//         throw err;
//     }finally{
//         client.release();    
//     }
//     return result
// }

//Borrar usuario de la bd
const deleteUser = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteUser, [email])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

//Ofertas en MONGODB
//[POST] /api/ads Crear una oferta de trabajo o curso (admin)
const createOffer = async (offer) => {
    try {
        let newOffer = new apiSchema(offer);
        console.log(newOffer);
        let answer = await newOffer.save();
        console.log(answer);
        return {
            answer: "Offer created",
            apiSchema: answer
        };
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "Offer not found" });
    }
}

//[PUT] /api/ads Editar datos de una oferta de trabajo o curso (admin)
// const updateOffer = async (offer) => {
//     try {
//         const editOffer = {
//             "id": offer.id,
//             "title": offer.title,
//             "company": offer.company,
//             "date": offer.date,
//             "location": offer.location,
//             "description": offer.description
//         }
//         console.log(editOffer);
//         const genuineOffer = await offerSchema.edit({ id: offer.id }, editOffer);
//         genuineOffer.overwrite(editOffer);
//         console.log("Edited", genuineOffer);
//         await genuineOffer.save();
//         return {
//             answer: "edited",
//             offerSchema: genuineOffer
//         }
//     }
//     catch (error) {
//         console.log(`ERROR: ${error.stack}`)
//         res.status(404).json({ "message": "offer not found" });
//     }
// }
// const updateOffer = async (offer) => {
//     try {
//         const genuineOffer = await apiSchema.updateOne({ id: offer.id }, offer);
//         genuineOffer.overwrite(offer);
//         console.log("Edited", genuineOffer);
//         await genuineOffer.save();
//         return {
//             answer: "edited",
//             apiSchema: genuineOffer
//         }
//     }
//     catch (error) {
//         console.log(`ERROR: ${error.stack}`)
//         res.status(404).json({ "message": "offer not found" });
//     }
// }

const updateOffer = async (offer) => {
    try {
        const { id, title, company, date, location, description } = offer;
        await apiSchema.findByIdAndUpdate(offer.id0, { id, title, company, date, location, description });
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

        await apiSchema.findByIdAndDelete(offer.id);
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
    deleteUser,
    createOffer,
    updateOffer,
    deleteOffer
}