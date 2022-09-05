const express = require("express")
const router = express.Router()

// [POST] /api/ads Crear una oferta de trabajo o curso (admin)
router.post("/", (req, res, next) => {
    try {
        return res.status(200).json("/api/ads Crear una oferta")
    } catch (error) {
        return next(error)
    }
})

// [PUT] /api/ads Editar datos de una oferta de trabajo o curso (admin)
router.put("/", (req, res, next) => {
    try {
        return res.status(200).json("/api/ads Editar datos de una oferta")
    } catch (error) {
        return next(error)
    }
})

// [DELETE] /api/ads Borrar una oferta de trabajo o curso de 
//la base de datos (admin)
router.delete("/", (req, res, next) => {
    try {
        return res.status(200).json("/api/ads Borrar una oferta")
    } catch (error) {
        return next(error)
    }
})


module.exports = router