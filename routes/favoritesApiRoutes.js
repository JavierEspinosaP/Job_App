const express = require("express")
const router = express.Router()

// [POST] /api/favorites Guardar favorito del usuario
router.post("/", (req, res, next) => {
    try {
        return res.status(200).json("/api/favorites Guardar favorito")
    } catch (error) {
        return next(error)
    }
})

// [DELETE] /api/favorites Borrar favorito del usuario
router.delete("/", (req, res, next) => {
    try {
        return res.status(200).json("/api/favorites Borrar favorito")
    } catch (error) {
        return next(error)
    }
})

module.exports = router