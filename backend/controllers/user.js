const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mask = require('mask-email-phone');
const emailValidator = require("email-validator");
const jwt = require('jsonwebtoken');
const sanitize = require('mongo-sanitize');

const schemaPassword = require('../models/shemaPassword');
const db = require('../request');
const User = require('../models/user');


exports.createUser = (req, res, next) => {

    const reqBody = sanitize(req.body);
    delete req.body._id;

    const email = reqBody.email;
    const emailVerif = email.indexOf('@groupomania.fr');


    if (reqBody.nom === undefined, reqBody.prenom === undefined, reqBody.email === undefined, reqBody.password === undefined, reqBody.role === undefined) {
        return res.status(400).json({ error: 'La syntaxe de la requête est erronée !' });
    };

    if (!emailValidator.validate(reqBody.email) || emailVerif === -1) {
        return res.status(400).json({ error: 'L\'email ou le mot de passe est invalide !!!' });
    };

    if (schemaPassword.validate(reqBody.password)) {

        const sql = 'SELECT email FROM users';
        db.query(sql, function(err, results) {
            if (err) throw err;

            const data1 = JSON.stringify(results);

            const hashEmail = crypto.createHmac('sha256', '@le&Petit%Chat#BoitDu&Laid%De#Poule&Tous%Les#Noel')
                .update(reqBody.email)
                .digest('hex');

            const hashNom = crypto.createHmac('sha256', '@le&Petit%Chat#BoitDu&Laid%De#Poule&Tous%Les#Noel9')
                .update(reqBody.nom)
                .digest('hex');

            const hashPrenom = crypto.createHmac('sha256', '@le&Petit%Chat#BoitDu&Laid%De#Poule&Tous%Les#Noel10')
                .update(reqBody.prenom)
                .digest('hex');


            if (data1.includes(hashEmail)) {
                res.status(400).json({ error: 'Email déja utilisé !!!' });
            } else {

                const email = reqBody.email;
                const emailMask = mask(email);

                bcrypt.hash(reqBody.password, 10)
                    .then(hash => {
                        const user = new User({
                            nom: hashNom,
                            prenom: hashPrenom,
                            emailMask: emailMask,
                            email: hashEmail,
                            password: hash,
                            role: req.body.role
                        });

                        const sqlSignup = `INSERT INTO users (nom, prenom, emailMask, email, password,dateInscrip,dateModif,role) VALUES ('${user.nom}','${user.prenom}','${user.emailMask}','${user.email}','${user.password}',NOW(),NOW(),'${user.role}')`;

                        db.query(sqlSignup, function(err, results) {
                            if (err) throw err;
                            console.log("UTilisateur enregisté !");
                        });
                    }); //

                res.status(201).json({ message: 'Utilisateur enregistrée !!!' });
            }; //fin de else

        });
    } else {
        res.status(400).json({ message: 'Le mot de passe doit comporter entre 4 et 8 caratheres maximum ,1 majuscule , 1 chiffre' });
    };
};



exports.loginUser = (req, res, next) => {

    const reqBody = sanitize(req.body);
    // vérification que la requête n'est pas vide
    if (reqBody.nom === undefined, reqBody.prenom === undefined, reqBody.email === undefined, reqBody.password === undefined) {
        return res.status(400).json({ error: 'La syntaxe de la requête est erronée !' });
    };
    const hashEmail = crypto.createHmac('sha256', '@le&Petit%Chat#BoitDu&Laid%De#Poule&Tous%Les#Noel')
        .update(reqBody.email)
        .digest('hex');
    const sqlLogin = 'SELECT email FROM  users';

    db.query(sqlLogin, function(err, results) {
        if (err) throw err;

        const resultData = JSON.stringify(results);

        if (resultData.includes(hashEmail)) {

            const sqlLogin = `SELECT id, email, password, role FROM  users WHERE email = '${hashEmail}'`;

            db.query(sqlLogin, function(err, results) {
                if (err) throw err;

                results.forEach(rep => {
                    bcrypt.compare(reqBody.password, rep.password)
                        .then(valid => {

                            if (!valid) {
                                return res.status(401).json({ error: 'L\'email ou le mot de passe est invalide !' });
                            };

                            res.status(200).json({
                                role: rep.role,
                                userId: rep.id,
                                token: jwt.sign({ userId: rep.id },
                                    'eyJhbGciOiJIUzI1NiIs@InR5cCI6IkpXVCJ9.eyJz#dWIiOiIxMjM0NTY3ODkwIiw/ibmFtZSI6IkpvaG4g&RG9lIiwiYWRtaW4iOnRydWV9.TJVA95Or/M7E2cBab30RM@HrHDcEfxjoYZgeFONFh7HgQ', { expiresIn: '24h' },
                                )
                            });
                        }).catch(() => res.status(500).json({ error: 'Erreur interne du serveur ' }));
                });
            }); //fin db
        } else {
            res.status(400).json({ error: 'La syntaxe de la requête est erronée !' });
        };
    }); //fin de db

}; //fin function login user

exports.displayUsers = (req, res, next) => {
    const sqlGet = 'SELECT * FROM users';

    db.query(sqlGet, function(err, results) {
        if (results.length > 0) {
            return res.status(200).json({ results });
        } else {
            return res.status(403).json({ message: "Aucun message présent !" });
        }
    });
};

exports.displayIdUser = (req, res, next) => {
    const reqParamsId = sanitize(req.params.id);
    const userIdAuth = sanitize(req.userIdAuth);
    const reqBody = sanitize(req.body);

    const sqlGetId = `SELECT * FROM users WHERE id='${userIdAuth}'`;
    db.query(sqlGetId, function(err, results) {
        if (err) throw err;

        const data1 = JSON.stringify(results);
        const role = '"role":1';

        if (reqBody.userId === userIdAuth || data1.includes(role)) {
            const sqlGetId = `SELECT * FROM users WHERE id='${reqParamsId}'`;
            db.query(sqlGetId, function(err, results) {
                if (results) {
                    return res.status(200).json({ results });

                } else {
                    return res.status(403).json({ message: "Aucun message présent !" });
                }
            });
        } else { //
            res.status(403).json({ error: 'vous n\'êtes pas autoridé a accéder a cette page !' });
        };
    });
};

exports.deleteUser = (req, res, next) => {
    const reqParamsId = sanitize(req.params.id);
    const userIdAuth = sanitize(req.userIdAuth);
    const reqBody = sanitize(req.body);

    const sqlGetId = `SELECT * FROM users WHERE id='${userIdAuth}'`;
    db.query(sqlGetId, function(err, results) {
        if (err) throw err;

        const data1 = JSON.stringify(results);
        const role = '"role":1';
        if (reqBody.userId === userIdAuth || data1.includes(role)) {
            const sqlGetId = `DELETE FROM users WHERE id='${reqParamsId}'`;

            db.query(sqlGetId, function(err, results) {

                res.status(200).json({ message: "Utilisateur supprimé !" });
            });
        } else {
            res.status(403).json({ error: 'vous n\'êtes pas autoridé a a faire des suppressions !' });
        };
    });
};

exports.updateUser = (req, res, next) => {
    const reqParamsId = sanitize(req.params.id);

    const reqBody = sanitize(req.body);

    const userIdAuth = sanitize(req.userIdAuth);

    const sqlGetId = `SELECT * FROM users WHERE id='${userIdAuth}'`;
    db.query(sqlGetId, function(err, results) {
        if (err) throw err;

        const data1 = JSON.stringify(results);

        const role = '"role":1';

        if (reqBody.userId === userIdAuth || data1.includes(role)) {
            const hashEmail = crypto.createHmac('sha256', '@le&Petit%Chat#BoitDu&Laid%De#Poule&Tous%Les#Noel')
                .update(reqBody.email)
                .digest('hex');

            const hashNom = crypto.createHmac('sha256', '@le&Petit%Chat#BoitDu&Laid%De#Poule&Tous%Les#Noel9')
                .update(reqBody.nom)
                .digest('hex');

            const hashPrenom = crypto.createHmac('sha256', '@le&Petit%Chat#BoitDu&Laid%De#Poule&Tous%Les#Noel10')
                .update(reqBody.prenom)
                .digest('hex');

            const email = reqBody.email;
            const emailMask = mask(email);

            bcrypt.hash(reqBody.password, 10)
                .then(hash => {
                    const hashPassword = hash;

                    const sqlUpdateId = `UPDATE users SET nom='${hashNom}',prenom='${hashPrenom}',emailMask='${emailMask}',email='${hashEmail}',password='${hashPassword}', dateModif=now(), role='${reqBody.role}' WHERE id='${reqParamsId}'`;

                    db.query(sqlUpdateId, function(err, results) {
                        if (err) throw err;

                        if (results) {
                            return res.status(200).json({ message: "Message modifié !" });
                        } else {
                            return res.status(403).json({ message: "Aucun utilsateur ne correspond !" });
                        };
                    });
                });
        } else {
            res.status(403).json({ error: 'Vous ne pouvez pas modifier cette utilisateur !' });
        };
    });

};