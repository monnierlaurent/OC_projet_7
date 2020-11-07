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
        if (valueTitre.error, valueContenu.error) {

            res.status(400).json({ error: 'La syntaxe de la requête est erronée' });

        } else {
            // si données sont conforme au schema on passe au middelware suivant
            next();
        };
    } catch {
        //suppression du fichier image si erreur de modification
        if (req.file) {
            const file = req.file.path;
            fs.unlink(`${file}`, () => { res.status(404).json({ error: 'les champs ne sont pas conformes!' }); });
        } else {
            res.status(404).json({ error: 'les champs ne sont pas conformes!' });
        };
    };
};