const schema = require('../models/schemaValidationPost');
const fs = require('fs');

module.exports = async(req, res, next) => {

    try {
        // verification si un fichier et present dans la requête/ si oui convertion de la key :valeur en JSON
        const reqResult = req.file ? JSON.parse(req.body.posts) : req.body;

        // controle de chaque données du corps de la requête
        const valueTitre = await schema.validateAsync({ titre: reqResult.titre });
        const valueContenu = await schema.validateAsync({ contenu: reqResult.contenu });


        // si erreur de données
        if (valueTitre.error) {

            return res.status(400).json({ status: 400, message: '*champ obligatoire, le titre doit contenir au minimum 2 caractères<br>sans caractères spéciaux !' });

        } else if (valueContenu.error) {

            return res.status(400).json({ status: 400, message: 'Le contenu doit contenir au minimum 2 caractères !' });

        } else {
            // si données sont conforme au schema on passe au middelware suivant
            next();
        };
    } catch {
        //suppression du fichier image si erreur de modification
        if (req.file) {
            const file = req.file.path;
            fs.unlink(`${file}`, () => { res.status(404).json({ status: 404, message: 'L\'image est bien supprimée !' }); });
        } else {
            return res.status(400).json({ status: 400, message: 'Un des champs n\'est pas conforme !' });
        };
    };
};