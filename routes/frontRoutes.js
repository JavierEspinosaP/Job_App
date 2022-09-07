const express = require('express')
const frontController = require("../controllers/frontControllers");
const frontRouter = express.Router();

frontRouter.get('/', frontController.getHome);
frontRouter.get('/singup', frontController.getSingup);
frontRouter.get('/login', frontController.getLogin);
frontRouter.get('/favorites', frontController.getFavorites);
frontRouter.get('/profile', frontController.getProfile);

//Prueba scraping

//Vistas solo de admin
frontRouter.get('/users', frontController.getUsers);
frontRouter.get('/dashboard', frontController.getDashboard);

//estas dos no llevan "/api" delante
router.get('/recoverpassword', frontController.recoverPassword);
router.get('/restorepassword', frontController.restorePassword);


module.exports = frontRouter;