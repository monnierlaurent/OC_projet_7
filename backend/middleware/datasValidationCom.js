const schema = require('../models/schemaValidationCom');
const fs = require('fs');

module.exports = async(req, res, next) => {

    try {
        // verification si un fichier et present dans la requête/ si oui convertion de la key :valeur en JSON
        const reqResult = req.file ? JSON.parse(req.body.coms) : req.body;
        //console.log(req.file);

        //console.log(req.file);
        // controle de chaque données du corps de la requête

        const valueComContenu = await schema.validateAsync({ comContenu: reqResult.comContenu });


        // si erreur de données
        if (valueComContenu.error) {

            res.status(400).json({ error: 'La syntaxe de la requête est erronée' });

        } else {
            // si données sont conforme au schema on passe au middelware suivant
            next();
        };
    } catch {
        //suppression du fichier image si erreur de modification
        res.status(404).json({ error: 'les champs ne sont pas conformes!' });

    };
};