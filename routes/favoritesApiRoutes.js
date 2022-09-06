const express = require("express")
const router = express.Router()
const favoritesController = require("../controllers/favoritesControllers")
// [POST] /api/favorites Guardar favorito del usuario
router.post("/",favoritesController.saveFavorite)

// [DELETE] /api/favorites Borrar favorito del usuario
router.delete("/:reference_offer",favoritesController.deleteFavorite)

module.exports = router