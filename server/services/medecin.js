const Medecin = require('../models/medecin');

/* Get All traitements */
exports.getAllMedecins = async(next) => {
    await Medecin.find()
        .then((results) => {
            return next(results);
        })
        .catch(err => console.log(err));
}

/* Generate NumMed */
exports.generateNumMedecin = () => {
    let numMedecin = "Med" + (Math.floor(Math.random() * 100) + 1);
    return numMedecin;
}