const express = require('express')
const frontController = require("../controllers/frontControllers");
const frontRouter = express.Router();

frontRouter.get('/', frontController.getHome);

module.exports = frontRouter;