const express = require("express")
const router = express.Router()

//[GET] /api/search Listado de resultados de la búsqueda
router.get("/",(req,res,next)=>{
    try {
        return res.status(200).json("/api/search Listado de resultados")
    } catch (error) {
     return next(error)   
    }
}) 



module.exports = router