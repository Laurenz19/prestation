const Traitement = require('../models/traitement');

/* Get All traitements */
exports.getAllTraitements = async(next) => {
    await Traitement.find()
        .then((results) => {
            return next(results);
        })
        .catch(err => console.log(err));
}