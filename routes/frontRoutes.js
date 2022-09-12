const express = require('express')
const frontController = require("../controllers/frontControllers");
const adminController = require("../controllers/adminControllers");
const frontRouter = express.Router();
const authToken = require('../middlewares/authToken');


frontRouter.get('/', frontController.getHome);

// frontRouter.get('/singup', frontController.getSingup);
// frontRouter.get('/login', frontController.getLogin);


frontRouter.get('/dashboard_user', authToken, frontController.getDashboardUser);
frontRouter.get('/favorites', authToken, frontController.getFavorites);
frontRouter.get('/profile', authToken, frontController.getProfile);
frontRouter.post('/profile', authToken, frontController.updateUser);//en pug no funciona input(type='hidden' name='_method' value='PUT')

//Scraping
frontRouter.get('/api/search', frontController.getSearch)

//Vistas solo de admin
frontRouter.get('/users', authToken, frontController.getUsers);
frontRouter.get('/dashboard', authToken, adminController.getOffers);


//estas dos no llevan "/api" delante
frontRouter.get('/recoverpassword', frontController.recoverPassword);
frontRouter.get('/restorepassword', frontController.restorePassword);

module.exports = frontRouter;