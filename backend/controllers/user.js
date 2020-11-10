const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mask = require('mask-email-phone');
const emailValidator = require("email-validator");
const jwt = require('jsonwebtoken');
const sanitize = require('mongo-sanitize');
const Cryptr = require('cryptr');

const schemaPassword = require('../models/shemaPassword');
const UserModel = require('../models/userModel')

let userModel = new UserModel();
const cryptr = new Cryptr('@le&Petit%Chat#BoitDu&Laid%De#Poule&Tous%Les#Noel');

exports.createUser = (req, res, next) => {

    const reqBody = sanitize(req.body);
    delete req.body._id;

    console.log(reqBody);

    const email = reqBody.email;
    const emailVerif = email.indexOf('@groupomania.fr');


    if (reqBody.nom === undefined, reqBody.prenom === undefined, reqBody.email === undefined, reqBody.password === undefined, reqBody.role === undefined, reqBody.avatar === undefined) {
        return res.status(400).json({ error: 'La syntaxe de la requête est erronée !' });
    };

    if (!emailValidator.validate(reqBody.email) || emailVerif === -1) {
        return res.status(400).json({ error: 'L\'email ou le mot de passe est invalide !!!' });
    };

    if (schemaPassword.validate(reqBody.password)) {

        userModel.findAll()
            .then((response) => {

                const hashEmail = crypto.createHmac('sha256', '@le&Petit%Chat#BoitDu&Laid%De#Poule&Tous%Les#Noel')
                    .update(reqBody.email)
                    .digest('hex');

                const tableEmail = [];
                response.forEach(rep => {

                    tableEmail.push(rep.email);
                });

                if (tableEmail.includes(hashEmail)) {
                    res.status(400).json({ error: 'Email déja utilisé !!!' });
                } else {

                    const encryptedEmail = cryptr.encrypt(reqBody.email); //const decryptedEmail = cryptr.decrypt(encryptedEmail);
                    const encryptedNom = cryptr.encrypt(reqBody.nom); //const decryptedNom = cryptr.decrypt(encryptedNom);
                    const encryptedPrenom = cryptr.encrypt(reqBody.prenom); //const decryptedPrenom = cryptr.decrypt(encryptedPrenom);

                    const email = reqBody.email;
                    const emailMask = mask(email);

                    bcrypt.hash(reqBody.password, 10)
                        .then(hash => {
                            userModel.save(encryptedNom, encryptedPrenom, hashEmail, emailMask, hash, reqBody.role, encryptedEmail, reqBody.avatar)
                                .then((response) => {
                                    res.status(200).json({ message: 'Utilisateur enregistré !' });
                                }).catch(() => res.status(500).json({ error: 'La syntaxe de la requête est erronée' }));
                        }).catch(() => res.status(500).json({ error: 'Erreur interne du serveur ' }));
                };
            }).catch(() => res.status(404).json({ error: 'cette resource n\'existe pas !' }));
    } else {
        res.status(400).json({ message: 'Le mot de passe doit comporter entre 4 et 8 caratheres maximum ,1 majuscule , 1 chiffre' });
    };
};

exports.loginUser = (req, res, next) => {

    const reqBody = sanitize(req.body);

    if (reqBody.nom === undefined, reqBody.prenom === undefined, reqBody.email === undefined, reqBody.password === undefined) {
        return res.status(400).json({ error: 'La syntaxe de la requête est erronée !' });
    };
    const hashEmail = crypto.createHmac('sha256', '@le&Petit%Chat#BoitDu&Laid%De#Poule&Tous%Les#Noel')
        .update(reqBody.email)
        .digest('hex');

    userModel.findAll()
        .then((response) => {

            const tableEmail = [];

            response.forEach(rep => {

                tableEmail.push(rep.email);
            });
            if (tableEmail.includes(hashEmail)) {

                userModel.findOneLog('email', hashEmail)
                    .then((response) => {

                        bcrypt.compare(reqBody.password, response[0].password)
                            .then(valid => {

                                if (valid === false) {
                                    return res.status(401).json({ error: 'L\'email ou le mot de passe est invalide !' });
                                };
                                res.status(200).json({
                                    avatar: response[0].avatar,
                                    role: response[0].role,
                                    userId: response[0].id,
                                    token: jwt.sign({ userId: response[0].id },
                                        'eyJhbGciOiJIUzI1NiIs@InR5cCI6IkpXVCJ9.eyJz#dWIiOiIxMjM0NTY3ODkwIiw/ibmFtZSI6IkpvaG4g&RG9lIiwiYWRtaW4iOnRydWV9.TJVA95Or/M7E2cBab30RM@HrHDcEfxjoYZgeFONFh7HgQ', { expiresIn: '24h' },
                                    )
                                });
                            }).catch(() => res.status(500).json({ error: 'Erreur interne du serveur ' }));
                    }).catch(() => res.status(404).json({ error: 'cette resource n\'existe pas !10' }));

            } else {
                res.status(400).json({ error: 'La syntaxe de la requête est erronée !' });
            };
        }).catch(() => res.status(404).json({ error: 'cette resource n\'existe pas !' }));
}; //fin login

exports.displayUsers = (req, res, next) => {
    userModel.findAll()
        .then((response) => {
            res.status(200).json(response);
        }).catch(() => res.status(404).json({ error: 'cette resource n\'existe pas !' }));
};


exports.displayIdUser = (req, res, next) => {
    const reqParamsId = sanitize(req.params.id);
    const userIdAuth = sanitize(req.userIdAuth);
    const reqBody = sanitize(req.body);

    userModel.findOne('id', userIdAuth)
        .then((response) => {

            const role = response.role; // role du recuperateur
            const userIdRec = response.id; //  id du recuperateur

            userModel.findOne('id', reqParamsId)
                .then((response) => {

                    if (userIdRec === response.id || role === 1) {
                        res.status(200).json(response);
                    } else {
                        res.status(403).json({ error: 'vous n\'êtes pas autoridé a accéder a cette page !' });
                    };
                }).catch(() => res.status(404).json({ error: 'cette resource n\'existe pas !' }));
        }).catch(() => res.status(404).json({ error: 'cette resource n\'existe pas !' }));
};


exports.deleteUser = (req, res, next) => {
    const reqParamsId = sanitize(req.params.id);
    const userIdAuth = sanitize(req.userIdAuth);

    userModel.findOne('id', userIdAuth)
        .then((response) => {

            const role = response.role; // role du recuperateur

            const userIdRec = response.id; //  id du recuperateur  
            userModel.findOne('id', reqParamsId)
                .then((response) => {
                    if (userIdRec === response.id || role === 1) {
                        userModel.deleteOne(reqParamsId)
                            .then(() => {
                                res.status(200).json({ message: "Utilisateur supprimé !" });
                            }).catch(() => res.status(400).json({ error: 'La syntaxe de la requête est erronée' }));
                    } else {
                        res.status(403).json({ error: 'vous n\'êtes pas autoridé a supprimer un utilisateur !' });
                    };
                }).catch(() => res.status(404).json({ error: 'cette resource n\'existe pas !' }));
        }).catch(() => res.status(404).json({ error: 'cette resource n\'existe pas !' }));
};

exports.updateUser = (req, res, next) => {
    const reqParamsId = sanitize(req.params.id);
    const reqBody = sanitize(req.body);
    const userIdAuth = sanitize(req.userIdAuth);


    userModel.findOne('id', userIdAuth)
        .then((response) => {

            const role = response.role; // role du recuperateur
            const userIdRec = response.id; //  id du recuperateur

            userModel.findOne('id', reqParamsId)
                .then((response) => {

                    if (userIdRec === response.id || role === 1) {

                        const hashEmail = crypto.createHmac('sha256', '@le&Petit%Chat#BoitDu&Laid%De#Poule&Tous%Les#Noel')
                            .update(reqBody.email)
                            .digest('hex');

                        const encryptedEmail = cryptr.encrypt(reqBody.email); //const decryptedEmail = cryptr.decrypt(encryptedEmail);
                        const encryptedNom = cryptr.encrypt(reqBody.nom); //const decryptedNom = cryptr.decrypt(encryptedNom);
                        const encryptedPrenom = cryptr.encrypt(reqBody.prenom); //const decryptedPrenom = cryptr.decrypt(encryptedPrenom);

                        const email = reqBody.email;
                        const emailMask = mask(email);

                        const hash = response.password;

                        userModel.updateOne(encryptedNom, encryptedPrenom, emailMask, hashEmail, hash, response.role, encryptedEmail, reqBody.avatar, reqParamsId)

                        .then((response) => {
                            res.status(200).json({ message: "Utilisateur mis a jour !" });

                        }).catch(() => { res.status(400).json({ error: 'La syntaxe de la requête est erronée' }); });

                    } else {
                        return res.status(403).json({ message: "Vous n'êtes pas autorisé a mettre a jour les utilsateurs !" });
                    };
                }).catch(() => res.status(404).json({ error: 'cette resource n\'existe pas !' }));
        }).catch(() => res.status(404).json({ error: 'cette resource n\'existe pas !' }));
};


exports.updatePassword = (req, res, next) => {
    const reqParamsId = sanitize(req.params.id);
    const reqBody = sanitize(req.body);
    const userIdAuth = sanitize(req.userIdAuth);

    userModel.findOne('id', userIdAuth)
        .then((response) => {

            const encryptedNom = cryptr.encrypt(response.nom); //const decryptedNom = cryptr.decrypt(encryptedNom);
            const encryptedPrenom = cryptr.encrypt(response.prenom); //const decryptedPrenom = cryptr.decrypt(encryptedPrenom);
            const emailMask = response.emailMask;
            const hashEmail = response.email
            const role = response.role; // role du recuperateur
            const encryptedEmail = cryptr.encrypt(response.emailRec); //const decryptedEmail = cryptr.decrypt(encryptedEmail);
            const userIdRec = response.id; //  id du recuperateur

            userModel.findOne('id', reqParamsId)
                .then((response) => {
                    if (userIdRec === response.id || role === 1) {
                        bcrypt.compare(reqBody.holdPassword, response.password)
                            .then(valid => {
                                bcrypt.hash(reqBody.newPassword, 10)
                                    .then(hash => {
                                        userModel.updateOne(encryptedNom, encryptedPrenom, emailMask, hashEmail, hash, response.role, encryptedEmail, reqParamsId)
                                            .then((response) => {
                                                res.status(200).json({ message: "Utilisateur mis a jour !" });

                                            }).catch(() => { res.status(400).json({ error: 'La syntaxe de la requête est erronée' }); });

                                    }).catch(() => res.status(500).json({ error: 'Erreur interne du serveur ' }));
                            }).catch(() => res.status(500).json({ error: 'Erreur interne du serveur ' }));
                    } else {
                        return res.status(403).json({ message: "Vous n'êtes pas autorisé a mettre a jour les utilsateurs !" });
                    };
                }).catch(() => res.status(404).json({ error: 'cette resource n\'existe pas !' }));
        }).catch(() => res.status(404).json({ error: 'cette resource n\'existe pas !' }));
};