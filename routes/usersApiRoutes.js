const express = require('express')
// const usersApiControllers = require("../controllers/usersApiControllers");
// Comentado porque archivo no se encuentra
const usersApiRouter = express.Router();
// usersApiRouter.get('/', usersApiControllers.getUsers)
// Comentado porque archivo no se encuentra

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

module.exports = usersApiRouter;