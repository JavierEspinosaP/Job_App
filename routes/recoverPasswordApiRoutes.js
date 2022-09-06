const express = require("express")
const router = express.Router()
const passwordController = require("../controllers/passwordControllers")

// [GET] /recoverpassword Recuperar password
router.get("/",passwordController.recoverPassword)
module.exports = router