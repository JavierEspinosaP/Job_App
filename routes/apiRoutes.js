const express = require("express")
const router = express.Router()
const passwordController = require("../controllers/passwordControllers")

// [GET] /restorepassword Cambiar password

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

//[GET] /api/search Listado de resultados de la búsqueda
router.get("/",(req,res,next)=>{
    try {
        return res.status(200).json("/api/search Listado de resultados")
    } catch (error) {
     return next(error)   
    }
}) 

// [POST] /api/logout Salir
router.post("/",(req,res,next)=>{
    try {
        return res.status(200).json("/api/logout Logout en la aplicación")
    } catch (error) {
     return next(error)   
    }
}) 

// [POST] /api/login Hacer login en la aplicación
router.post("/",(req,res,next)=>{
    try {
        return res.status(200).json("/api/login Login en la aplicación")
    } catch (error) {
     return next(error)   
    }
}) 


// [POST] /api/user Registrarse en la aplicación
usersApiRouter.post("/",(req,res,next)=>{
    try {
        return res.status(200).json("/api/user Registrarse en la aplicación")
    } catch (error) {
     return next(error)   
    }
}) 

// [PUT] /api/user Editar datos del perfil del usuario o 
//administrador
usersApiRouter.put("/",(req,res,next)=>{
    try {
        return res.status(200).json("/api/user Editar datos del perfil")
    } catch (error) {
     return next(error)   
    }
}) 

//[DELETE] /api/user Borrar un usuario de 
//la base de datos (admin)
usersApiRouter.delete("/",(req,res,next)=>{
    try {
        return res.status(200).json("/api/user Borrar un usuario")
    } catch (error) {
     return next(error)   
    }
}) 


router.delete("/:reference_offer",favoritesController.deleteFavorite)
router.get("/api",passwordController.recoverPassword)
router.get("/api",passwordController.restorePassword) 

module.exports = router