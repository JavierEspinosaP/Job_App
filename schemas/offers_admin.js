const mongoose = require('mongoose');

const offersAdmin = {
    id: {
        type: Number,
        unique: true
    },
    title: {
        type: String,
    },
    date: {
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