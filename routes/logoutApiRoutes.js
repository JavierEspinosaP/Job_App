const express = require("express")
const router = express.Router()

// [POST] /api/logout Salir
router.post("/",(req,res,next)=>{
    try {
        return res.status(200).json("/api/logout Logout en la aplicación")
    } catch (error) {
     return next(error)   
    }
}) 



module.exports = router