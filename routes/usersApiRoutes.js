const express = require('express')
const usersApiControllers = require("../controllers/usersApiControllers");
const usersApiRouter = express.Router();



usersApiRouter.get('/', usersApiControllers.getUsers)



module.exports = usersApiRouter;