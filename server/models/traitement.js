const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const traitementSchema = new Schema({
    numMedecin: {
        type: String,
        required: true
    },
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    nbjour: {
        type: Number,
        required: true
    },
    dateCons: {
        type: Date,
        required: true
    }

});

module.exports = mongoose.model('Traitement', traitementSchema);