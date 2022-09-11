
const users = require('../models/users')
const adminModel = require('../models/admin');
const apiSchema = require('../schemas/offers_admin');
require('../utils/db_sql')

const getUsersRegistered = async (req, res) => {
  let usersRegistered;
  try {
    usersRegistered = await adminModel.getAllUsers()
    res.status(200).render('users', { results: usersRegistered })
  } catch (error) {
    console.log(error.message);
  }
}


const createUser = async(req,res) =>{
  const newUser = req.body;
  try {
      const response = await adminModel.createNewUser(newUser,
        { method: "POST",
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      res.status(201).json({"User created": response})

  } catch (error) {
      console.log(error);
    res.status(404).json({ "message": "user not created" });
    
  }
}



const editUser = async(req,res)=>{
  const editedUser= req.body
  try{
    const response = await adminModel.editUser(editedUser,
      { method: "PUT",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
    body: JSON.stringify(editedUser)})
    res.status(200).json({"User edited": response})
    }
  catch(error){
    res.status(400).json({"message":"User can not be edited"});
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
    await adminModel.deleteOffer(req.params.id);
    console.log("Offer deleted: ", req.params.id);
    res.redirect('/api/dashboard');
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(404).json({ "message": "offer not found" });
  }
}

module.exports = {
  getUsersRegistered,
  createUser,
  editUser,
  deleteUser,
  getOffers,
  getOffer,
  createOffer,
  updateOffer,
  deleteOffer
}