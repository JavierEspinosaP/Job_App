const express = require('express')
const frontController = require("../controllers/frontControllers");
const adminController = require("../controllers/adminControllers");
const frontRouter = express.Router();
const authToken = require('../middlewares/authToken');
const authAdmin = require('../middlewares/authAdmin');


frontRouter.get('/', frontController.getHome);


frontRouter.get('/dashboard_user', authToken, frontController.getDashboardUser);
frontRouter.get('/favorites', authToken, frontController.getFavorites);
frontRouter.get('/profile', authToken, frontController.getProfile);
frontRouter.post('/profile', authToken, frontController.updateUser);

frontRouter.get('/users',authToken, authAdmin, frontController.getUsers);
frontRouter.get('/dashboard', authToken, authAdmin,  adminController.getOffers);

frontRouter.get('/recoverpassword', frontController.recoverPasswordView);
frontRouter.get('/changepassword', frontController.changePasswordView);
frontRouter.get('/recoverpass/:token', frontController.resetPasswordView);

module.exports = frontRouter;