const apiModel = require('../models/admin');

//[POST] /api/ads Crear una oferta (admin)
const createOffer = async (req, res) => {
    try {
        let newOffer = await apiModel.createOffer(req.body);
        res.status(200).json(newOffer);
        console.log("Offer created: ", req.body);
        // res.send("Offer created");
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(404).json({ "message": "error creating an offer" });
    }
}

// // [PUT] /api/ads Editar datos de una oferta de trabajo o curso (admin)
const updateOffer = async (req, res) => {
    try {
        await apiModel.updateOffer(req.body);
        console.log("Oferta edited: ", req.body);
        // res.send("User edited");
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(404).json({ "message": "Offer not found" });
    }
}


// const updateOffer = async (req, res) => {
//     try {
//         let id = req.param.id;
//         let { title, company, date, location, description } = req.body;
//         await apiModel.updateOffer(
//             { title, company, date, location, description },
//             {
//                 where: {
//                     id,
//                 }
//             });
//         console.log("Oferta edited: ", req.body);
//         // res.send("User edited");
//     } catch (error) {
//         console.log(`ERROR: ${error.stack}`);
//         res.status(404).json({ "message": "Offer not found" });
//     }
// }

//[DELETE] /api/ads Borrar una oferta de trabajo o curso de la base de datos (admin)
const deleteOffer = async (req, res) => {
    try {
        await apiModel.deleteOffer(req.body);
        console.log("Offer deleted: ", req.body);
        // res.send("Offer deleted");
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(404).json({ "message": "offer not found" });
    }
}

// const updateOffer = async (req, res) => {
//     try {
//         await apiModel.updateOffer(req.body);
//         console.log("Oferta edited: ", req.body);
//         // res.send("User edited");
//     } catch (error) {
//         console.log(`ERROR: ${error.stack}`);
//         res.status(404).json({ "message": "Offer not found" });
//     }
// }

// router.put("/", (req, res, next) => {
//     try {
//         return res.status(200).json("/api/ads Editar datos de una oferta")
//     } catch (error) {
//         return next(error)
//     }
// })


// router.post("/", (req, res, next) => {
//     try {
//         return res.status(200).json("/api/ads Crear una oferta")
//     } catch (error) {
//         return next(error)
//     }
// })

//[PUT] /api/ads Editar datos de una oferta de trabajo o curso (admin)




// // [GET] /restorepassword Cambiar password

// // [POST] /api/ads Crear una oferta de trabajo o curso (admin)
// router.post("/", (req, res, next) => {
//     try {
//         return res.status(200).json("/api/ads Crear una oferta")
//     } catch (error) {
//         return next(error)
//     }
// })



// // [DELETE] /api/ads Borrar una oferta de trabajo o curso de
// //la base de datos (admin)
// router.delete("/", (req, res, next) => {
//     try {
//         return res.status(200).json("/api/ads Borrar una oferta")
//     } catch (error) {
//         return next(error)
//     }
// })

// //[GET] /api/search Listado de resultados de la búsqueda
// router.get("/", (req, res, next) => {
//     try {
//         return res.status(200).json("/api/search Listado de resultados")
//     } catch (error) {
//         return next(error)
//     }
// })

// // [POST] /api/logout Salir
// router.post("/", (req, res, next) => {
//     try {
//         return res.status(200).json("/api/logout Logout en la aplicación")
//     } catch (error) {
//         return next(error)
//     }
// })

// // [POST] /api/login Hacer login en la aplicación
// router.post("/", (req, res, next) => {
//     try {
//         return res.status(200).json("/api/login Login en la aplicación")
//     } catch (error) {
//         return next(error)
//     }
// })


// [POST] /api/user Registrarse en la aplicación
// usersApiRouter.post("/",(req,res,next)=>{
//     try {
//         return res.status(200).json("/api/user Registrarse en la aplicación")
//     } catch (error) {
//      return next(error)
//     }
// })

// [PUT] /api/user Editar datos del perfil del usuario o
//administrador
// usersApiRouter.put("/", (req, res, next) => {
//     try {
//         return res.status(200).json("/api/user Editar datos del perfil")
//     } catch (error) {
//         return next(error)
//     }
// })

//[DELETE] /api/user Borrar un usuario de
//la base de datos (admin)
// usersApiRouter.delete("/", (req, res, next) => {
//     try {
//         return res.status(200).json("/api/user Borrar un usuario")
//     } catch (error) {
//         return next(error)
//     }
// })

module.exports = {
    createOffer,
    updateOffer,
    deleteOffer
};

// module.exports = {
//     search,
//     recoverpassword,
//     restorepassword,
//     singup,
//     login,
//     logout,
//     createOffer,
//     addFavorite,
//     updateUser,
//     updateOffer,
//     deleteUser,
//     deleteOffer,
//     deleteFavorite
// };