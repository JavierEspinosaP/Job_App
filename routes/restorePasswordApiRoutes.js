const express = require("express")
const router = express.Router()
const passwordController = require("../controllers/passwordControllers")

// [GET] /restorepassword Cambiar password
router.get("/",passwordController.restorePassword) 

module.exports = router