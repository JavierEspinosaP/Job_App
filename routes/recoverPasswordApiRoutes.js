const express = require("express")
const router = express.Router()

// [GET] /recoverpassword Recuperar password
router.get("/",(req,res,next)=>{
    try {
        return res.status(200).json("/recoverpassword Recuperar password")
    } catch (error) {
     return next(error)   
    }
}) 

module.exports = router