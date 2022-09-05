const express = require("express")
const router = express.Router()

// [POST] /api/login Hacer login en la aplicación
router.post("/",(req,res,next)=>{
    try {
        return res.status(200).json("/api/login Login en la aplicación")
    } catch (error) {
     return next(error)   
    }
}) 



module.exports = router
