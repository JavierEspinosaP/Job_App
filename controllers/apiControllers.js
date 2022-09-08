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

//[DELETE] /api/ads Borrar una oferta de trabajo o curso de la base de datos (admin)
const deleteOffer = async (req, res) => {
    try {
        await apiModel.deleteOffer(req.body);
        console.log("Offer deleted: ", req.body);
        res.redirect('/dashboard');
        // res.send("Offer deleted");
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(404).json({ "message": "offer not found" });
    }
}

module.exports = {
    createOffer,
    updateOffer,
    deleteOffer
};