const schema = require('../models/schemaValidationCom');
const fs = require('fs');

module.exports = async(req, res, next) => {

    try {
        // verification si un fichier et present dans la requête/ si oui convertion de la key :valeur en JSON
        const reqResult = req.file ? JSON.parse(req.body.coms) : req.body;

        // controle de chaque données du corps de la requête

        const valueComContenu = await schema.validateAsync({ comContenu: reqResult.comContenu });


        // si erreur de données
        if (valueComContenu.error) {

            return res.status(400).json({ status: 400, message: 'Le contenu doit contenir au minimum 2 caractères !' });

        } else {
            // si données sont conforme au schema on passe au middelware suivant
            next();
        };
    } catch {
        //suppression du fichier image si erreur de modification
        return res.status(400).json({ status: 400, message: 'Le contenu doit contenir au minimum 2 caractères !' });

    };
};