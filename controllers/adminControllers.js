
const users = require('../models/users')
const adminModel = require('../models/admin');
const apiSchema = require('../schemas/offers_admin');
require('../utils/db_sql')

const getUsersRegistered = async (req, res) => {
  let usersRegistered;
  try {
    usersRegistered = await adminModel.getAllUsers()
    console.log("Estos son todos los usuarios registrados");
    res.status(200).render('users', { results: usersRegistered })

  } catch (error) {
    console.log(error.message);
  }
}

const deleteUser = async (req, res) => {
  const userMail = req.query.email;
  try {
    const response = await adminModel.deleteUser(userMail);
    res.send("User deleted")

  } catch (error) {
    console.log(error.message)
    res.status(404).json({ "message": "user not deleted" });
  }
}

//[GET] Obtener un listado de todas las ofertas de mongo
const getOffers = async (req, res) => {
  try {
    const offers = await apiSchema.find();
    console.log("Holi desde getOffers");
    console.log(offers);
    res.render("dashboard", { offers });
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(404).json({ "message": "Offer not found" });
  }
}

// Obtener la oferta a editar
const getOffer = async (req, res) => {
  try {
    const offer = await apiSchema.find({ id: req.params.id });
    console.log("Holi desde getOffer controller");
    console.log(offer);
    res.render("updateOffer", { offer });
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(404).json({ "message": "Offer not found" });
  }
}

//[POST] /api/ads Crear una oferta (admin)
const createOffer = async (req, res) => {
  try {
    await adminModel.createOffer(req.body);
    console.log("Holi desde createOffer controller");
    console.log("Oferta creada: ", req.body);
    res.redirect('/api/dashboard');
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(404).json({ "message": "Offer not found" });
  }
}

//[PUT] /api/ads Editar datos de una oferta de trabajo o curso (admin)
const updateOffer = async (req, res) => {
  try {
    await adminModel.updateOffer(req.body);
    console.log("Holi desde updateOffer controller");
    console.log("Oferta edited: ", req.body);
    res.redirect('/api/dashboard');
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
    res.redirect('/api/dashboard');
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(404).json({ "message": "offer not found" });
  }
}

module.exports = {
  getOffers,
  getOffer,
  getUsersRegistered,
  createOffer,
  updateOffer,
  deleteOffer
}