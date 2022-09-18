const express = require("express")
const router = express.Router()
const adminController = require("../controllers/adminControllers");
const userController = require('../controllers/userControllers');



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


router.get('/search', userController.getSearch)


module.exports = router