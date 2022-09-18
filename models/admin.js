require('dotenv').config();
const apiSchema = require('../schemas/offers_admin');
const db = require('pg');
const queries = require('../queries/userQueries')
const pool = require('../utils/db_sql')


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


const updateOffer = async (offer) => {
    try {
        const { title, date, budget, description } = offer;
        await apiSchema.findOneAndUpdate({ id: offer.id }, { title, date, budget, description });
        console.log("Edited desde admin.js updateOffer");
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "offer not found" });
    }
}


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