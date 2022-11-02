const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    nom: {
        type: String,
        required: true
    },
    prenoms: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: true,
    }
});
module.exports = mongoose.model('Patient', patientSchema);