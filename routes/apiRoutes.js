const express = require("express")
const router = express.Router()
const adminController = require("../controllers/adminControllers");
const userController = require('../controllers/frontControllers');

//funciones MONGO (admin)
router.get('/dashboard/', adminController.getOffers);
router.post('/ads/create', adminController.createOffer);
router.post('/ads/update/:id?', adminController.updateOffer);//Modificar form para que envie como PUT
router.get('/ads/update/:id', adminController.getOffer);//Te lleva a updateOffer
router.get('/ads/delete/:id', adminController.deleteOffer);//Modificar form para que envie como DELETE

//endpoinds /API/

// router.post('/login', userController.loginUser);
// router.post('/logout',userController.logoutUser);
// router.post('/user',userController.signinUser);
// router.put('/user', userController.editProfile);

router.get('/users', adminController.getUsersRegistered);
router.delete('/users', adminController.deleteUser); //Borrar un usuario de la base de datos (admin)
// router.post('/favorites', userController.saveFavorite);
// router.delete('/favorites', userController.deleteFavorite);

module.exports = router