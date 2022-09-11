const express = require("express")
const router = express.Router()
const adminController = require("../controllers/adminControllers");
const frontController = require('../controllers/frontControllers');
const userController = require('../controllers/userControllers');


// //endpoinds /API/
router.post('/login', userController.loginUser);
router.post('/user', userController.signUpUser);
router.put('/logout', userController.logoutUser);
// router.post('/user', userController.signinUser);
// router.put('/user', userController.editProfile);

// router.delete('/user', adminController.deleteUser); //Borrar un usuario de la base de datos (admin)
// router.post('/favorites', userController.saveFavorite);
// router.delete('/favorites', userController.deleteFavorite);

//funciones MONGO (admin)
router.post('/ads/create', adminController.createOffer);
router.post('/ads/update/', adminController.updateOffer);
router.post('/ads/delete/', adminController.deleteOffer);

module.exports = router