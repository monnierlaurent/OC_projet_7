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

    const email = reqBody.email;
    const emailVerif = email.indexOf('@groupomania.fr');

    if (reqBody.nom === undefined) {
        return res.status(400).json({ status: 400, message: '*Champ obligatoire le NOM doit comporter au moins 2 caractères sans chiffre ni caractères spéciaux !' });
    };

    if (reqBody.prenom === undefined) {
        return res.status(400).json({ status: 400, message: '*Champ obligatoire le PRENOM doit comporter au moins 2 caractères sans chiffre ni caractères spéciaux !' });
    };
    if (reqBody.email === undefined) {
        return res.status(400).json({ status: 400, message: '*Champ obligatoire l\'EMAIL doit contenir le nom de domaine @groupomania.fr !' });
    };
    if (reqBody.password === undefined) {
        return res.status(400).json({ status: 400, message: '*Champ obligatoire<br>le mot de passe doit contenir au mois 8 characteres 1 majuscule et 1 charactere spécial !' });
    };

    if (reqBody.avatar === undefined) {
        return res.status(400).json({ status: 400, message: 'Vous devez choisir un avatar !' });
    };

    if (!emailValidator.validate(reqBody.email) || emailVerif === -1) {
        return res.status(400).json({ status: 400, message: 'L\'email ou le mot de passe est invalide !!!' });
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
                    return res.status(400).json({ status: 400, message: 'Cette adresse email est déjà utilisée !' });
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
                                    userModel.findOneLog('email', hashEmail)
                                        .then((response) => {

                                            bcrypt.compare(reqBody.password, response[0].password)
                                                .then(valid => {

                                                    if (valid === false) {
                                                        return res.status(400).json({ status: 400, message: 'L\'email ou le mot de passe est invalide !' });
                                                    };
                                                    res.status(200).json({
                                                        status: 200,
                                                        message: 'Utilisateur enregistré !',
                                                        avatar: response[0].avatar,
                                                        role: response[0].role,
                                                        userId: response[0].id,
                                                        token: jwt.sign({ userId: response[0].id },
                                                            'eyJhbGciOiJIUzI1NiIs@InR5cCI6IkpXVCJ9.eyJz#dWIiOiIxMjM0NTY3ODkwIiw/ibmFtZSI6IkpvaG4g&RG9lIiwiYWRtaW4iOnRydWV9.TJVA95Or/M7E2cBab30RM@HrHDcEfxjoYZgeFONFh7HgQ', { expiresIn: '24h' },
                                                        )
                                                    });
                                                }).catch(() => res.status(500).json({ status: 500, message: 'Le serveur a eu problème réessayez dans un moment !' }));
                                        }).catch(() => res.status(404).json({ status: 404, message: 'Cette ressource n\'existe pas !' }));
                                }).catch(() => res.status(400).json({ status: 400, message: 'La syntaxe de la requête est erronée' }));
                        }).catch(() => res.status(500).json({ status: 500, message: 'Le serveur a rencontré un problème réessayez dans un moment !' }));
                };
            }).catch(() => res.status(404).json({ status: 404, message: 'Cette ressource n\'existe pas !' }));
    } else {
        res.status(400).json({ status: 400, message: 'Le mot de passe doit comporter minimum 8 caractères 1, majuscule ,1 chiffre' });
    };
};

exports.loginUser = (req, res, next) => {

    const reqBody = sanitize(req.body);

    if (reqBody.nom === undefined, reqBody.prenom === undefined, reqBody.email === undefined, reqBody.password === undefined) {
        return res.status(400).json({ status: 400, message: 'Tous les champs sont obligatoires !' });
    };

    if (schemaPassword.validate(reqBody.password)) {

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
                                        return res.status(400).json({ status: 400, message: 'L\'email ou le mot de passe est invalide !' });
                                    };
                                    res.status(200).json({
                                        status: 200,
                                        avatar: response[0].avatar,
                                        role: response[0].role,
                                        userId: response[0].id,
                                        token: jwt.sign({ userId: response[0].id },
                                            'eyJhbGciOiJIUzI1NiIs@InR5cCI6IkpXVCJ9.eyJz#dWIiOiIxMjM0NTY3ODkwIiw/ibmFtZSI6IkpvaG4g&RG9lIiwiYWRtaW4iOnRydWV9.TJVA95Or/M7E2cBab30RM@HrHDcEfxjoYZgeFONFh7HgQ', { expiresIn: '24h' },
                                        )
                                    });
                                }).catch(() => res.status(500).json({ status: 500, message: 'Le serveur a rencontré un problème réessayez dans un moment !' }));
                        }).catch(() => res.status(404).json({ status: 404, message: 'Cette ressource n\'existe pas !' }));

                } else {
                    return res.status(400).json({ status: 400, message: 'L\'email ou le mot de passe est invalide !' });
                };
            }).catch(() => res.status(404).json({ status: 404, message: 'Cette ressource n\'existe pas !' }));
    } else {
        res.status(400).json({ status: 400, message: 'L\'email ou le mot de passe est invalide !' });
    };
}; //fin login

exports.displayUsers = (req, res, next) => {
    userModel.findAll()
        .then((response) => {
            res.status(200).json(response);
        }).catch(() => res.status(404).json({ status: 404, message: 'Cette ressource n\'existe pas !' }));
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
                        res.status(403).json({ status: 403, message: 'Vous n\'êtes pas autorisé à accéder à ces données !' });
                    };
                }).catch(() => res.status(404).json({ status: 404, message: 'Cette ressource n\'existe pas !' }));
        }).catch(() => res.status(404).json({ status: 404, message: 'Cette ressource n\'existe pas !' }));
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
                                res.status(200).json({ status: 200, message: "Utilisateur supprimé !" });
                            }).catch(() => res.status(400).json({ status: 400, message: 'Utilisateur non supprimé !' }));
                    } else {
                        res.status(403).json({ status: 403, message: 'Vous n\'êtes pas autorisé à supprimer un utilisateur !' });
                    };
                }).catch(() => res.status(404).json({ status: 404, message: 'Cette ressource n\'existe pas !' }));
        }).catch(() => res.status(404).json({ status: 404, message: 'Cette ressource n\'existe pas !' }));
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
                            res.status(200).json({ status: 200, message: "Utilisateur mis a jour !" });

                        }).catch(() => { res.status(400).json({ status: 400, message: 'Utilisateur n\'a pas été mis à jour !' }); });

                    } else {
                        return res.status(403).json({ status: 403, message: "Vous n'êtes pas autorisé à modifier les utilisateurs !" });
                    };
                }).catch(() => res.status(404).json({ status: 404, message: 'Cette ressource n\'existe pas !' }));
        }).catch(() => res.status(404).json({ status: 404, message: 'Cette ressource n\'existe pas !' }));
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

                                if (valid === false) {
                                    return res.status(400).json({ status: 400, message: 'Votre ancien mot de passe n\'est pas le bon !' });
                                };
                                if (schemaPassword.validate(reqBody.newPassword)) {
                                    bcrypt.hash(reqBody.newPassword, 10)
                                        .then(hash => {
                                            userModel.updateOne(encryptedNom, encryptedPrenom, emailMask, hashEmail, hash, response.role, encryptedEmail, reqParamsId)
                                                .then((response) => {
                                                    res.status(200).json({ status: 200, message: "Le mot de passe mis à jour !" });

                                                }).catch(() => { res.status(400).json({ status: 400, message: 'Le mot de passe n\'a pas été mis à jour !' }); });

                                        }).catch(() => res.status(500).json({ status: 500, message: 'Le serveur a eu problème réessayez dans un moment !' }));
                                } else {
                                    res.status(400).json({ status: 400, message: 'Le nouveau mot de passe doit comporter minimum 8 caratères ,1 majuscule , 1 chiffre' });
                                };
                            }).catch(() => res.status(500).json({ status: 500, message: 'Le serveur a eu problème réessayez dans un moment !' }));
                    } else {
                        return res.status(403).json({ status: 403, message: "Vous n'êtes pas autorisé à mettre à jour les utilisateurs !" });
                    };
                }).catch(() => res.status(404).json({ status: 404, message: 'Cette ressource n\'existe pas !' }));
        }).catch(() => res.status(404).json({ status: 404, message: 'Cette ressource n\'existe pas !' }));
};