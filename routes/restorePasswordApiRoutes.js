const express = require("express")
const router = express.Router()

// [GET] /restorepassword Cambiar password
router.get("/",(req,res,next)=>{
    try {
        return res.status(200).json("/restorepassword Cambiar password")
    } catch (error) {
     return next(error)   
    }
}) 

module.exports = router