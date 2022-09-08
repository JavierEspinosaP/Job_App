const users = require('../models/users')
const adminModel = require('../models/admin');
require('../utils/db_sql')


const getUsersRegistered = async (req, res) => {
  let usersRegistered;
  if (req.query.email) {
    usersRegistered = await users.getUsersByEmail(req.query.email)
    console.log("Estos son los mails de usuarios registrados: ", usersRegistered);
  } else {
    usersRegistered = await admin.getAllUsers()
    console.log("Estos son todos los usuarios registrados");
  }
}

//[POST] /api/ads Crear una oferta (admin)
const createOffer = async (req, res) => {
  try {
    let newOffer = await adminModel.createOffer(req.body);
    res.status(200).json(newOffer);
    console.log("Offer created: ", req.body);
    // res.send("Offer created");
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(404).json({ "message": "error creating an offer" });
  }
}

//[PUT] /api/ads Editar datos de una oferta de trabajo o curso (admin)
const updateOffer = async (req, res) => {
  try {
    await adminModel.updateOffer(req.body);
    console.log("Oferta edited: ", req.body);
    res.redirect('/dashboard');
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(404).json({ "message": "Offer not found" });
  }
}

//[DELETE] /api/ads Borrar una oferta de trabajo o curso de la base de datos (admin)
const deleteOffer = async (req, res) => {
  try {
    await adminModel.deleteOffer(req.body);
    console.log("Offer deleted: ", req.body);
    res.redirect('/dashboard');
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(404).json({ "message": "offer not found" });
  }
}

module.exports = {
  getUsersRegistered,
  createOffer,
  updateOffer,
  deleteOffer
}