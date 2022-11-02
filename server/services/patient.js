const Patient = require('../models/patient');

exports.getAllPatient = async(next) => {
    await Patient.find()
        .then((results) => {
            return next(results);
        })
        .catch(err => console.log(err));
}