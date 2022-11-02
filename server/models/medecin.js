const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medecinSchema = new Schema({
    numMedecin: {
        type: String,
        required: true,
        unique: true,
        maxlength: 7
    },
    nom: {
        type: String,
        required: true,
        minlength: 3
    },
    prenoms: {
        type: String,
        required: true,
        minlength: 3
    },
    tj: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Medecin', medecinSchema);