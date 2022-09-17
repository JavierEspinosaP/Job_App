const mongoose = require('mongoose');

const offersAdmin = {
    id: {
        type: Number,
        unique: true
    },
    url: {
        type: String,
        unique: true
    },
    proyect_name: {
        type: String,
    },
    published: {
        type: Date,
    },
    budget: {
        type: Number,
    },
    description: {
        type: String,
    }
};
// Crear el esquema
const offerAdminSchema = mongoose.Schema(offersAdmin);
// Crear el modelo --> Colección
const offers = mongoose.model('offers', offerAdminSchema);

module.exports = offers;