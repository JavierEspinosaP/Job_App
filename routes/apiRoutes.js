const express = require("express")
const router = express.Router()
const adminController = require("../controllers/adminControllers");
const userController = require('../controllers/userControllers');
const frontController = require("../controllers/frontControllers");




router.get('/ads/open/:id?', adminController.openOffer);
router.post('/ads/create', adminController.createOffer);
router.post('/ads/update/:id?', adminController.updateOffer);
router.get('/ads/update/:id', adminController.getOffer);
router.get('/ads/delete/:id', adminController.deleteOffer);


router.post('/login', userController.loginUser);
router.post('/user', userController.signUpUser);
router.post('/logout', userController.logoutUser);
router.post('/passrest', userController.changePassword)
router.post('/passrecover', userController.recoverPassword)


router.get('/users', adminController.getUsersRegistered);
router.delete('/users', adminController.deleteUser);
router.post('/users', adminController.createUser);
router.put('/users', adminController.editUser);

router.post('/favorites', frontController.createFav);
router.post('/favorites/delete', frontController.deleteFav);
router.get('/favorites/delete/:url?', frontController.deleteFav);

router.get('/search', userController.getSearch)

module.exports = router