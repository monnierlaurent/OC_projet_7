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

    if (reqBody.pseudo === undefined, reqBody.email === undefined, reqBody.password === undefined) {
        return res.status(400).json({ error: 'La syntaxe de la requête est erronée !' });
    };


    if (!emailValidator.validate(reqBody.email)) {
        return res.status(400).json({ error: 'L\'email ou le mot de passe est invalide !!!' });
    };

    if (schemaPassword.validate(reqBody.password)) {

        const sql = 'SELECT email,pseudo FROM users';
        db.query(sql, function(err, results) {
            if (err) throw err;

            const data1 = JSON.stringify(results);

            const hashEmail = crypto.createHmac('sha256', '@le&Petit%Chat#BoitDu&Laid%De#Poule&Tous%Les#Noel')
                .update(reqBody.email)
                .digest('hex');

            const hashpeseudo = crypto.createHmac('sha256', '@le&Petit%Chat#BoitDu&Laid%De#Poule&Tous%Les#Noel')
                .update(reqBody.pseudo)
                .digest('hex');

            if (data1.includes(hashpeseudo)) {
                res.status(400).json({ error: 'Pseudo déja utilisé !!!' });
            } else {
                if (data1.includes(hashEmail)) {
                    res.status(400).json({ error: 'Email déja utilisé !!!' });
                } else {

                    const email = reqBody.email;
                    const emailMask = mask(email);

                    bcrypt.hash(reqBody.password, 10)
                        .then(hash => {
                            const user = new User({

                                pseudo: hashpeseudo,
                                emailMask: emailMask,
                                email: hashEmail,
                                password: hash
                            });
                            const sqlSignup = `INSERT INTO users (pseudo, emailMask, email, password) VALUES ('${user.pseudo}', '${user.emailMask}','${user.email}','${user.password}')`;

                            db.query(sqlSignup, function(err, results) {
                                if (err) throw err;
                                console.log("UTilisateur enregisté !");
                            });
                        });

                    res.status(201).json({ message: 'Utilisateur enregistrée !!!' });
                }; //fin de else
            };
        });
    } else {
        res.status(400).json({ message: 'Le mot de passe doit comporter entre 4 et 8 caratheres maximum ,1 majuscule , 1 chiffre' });
    };
};



exports.loginUser = (req, res, next) => {

    const reqBody = sanitize(req.body);
    // vérification que la requête n'est pas vide
    if (reqBody.pseudo === undefined, reqBody.email === undefined, reqBody.password === undefined) {
        return res.status(400).json({ error: 'La syntaxe de la requête est erronée !' });
    };


    const hashpseudo = crypto.createHmac('sha256', '@le&Petit%Chat#BoitDu&Laid%De#Poule&Tous%Les#Noel')
        .update(reqBody.pseudo)
        .digest('hex');

    const sqlLogin = 'SELECT pseudo FROM  users';

    db.query(sqlLogin, function(err, results) {
        if (err) throw err;

        const resultData = JSON.stringify(results);

        if (resultData.includes(hashpseudo)) {

            const sqlLogin = `SELECT id, pseudo, password FROM  users WHERE pseudo = '${hashpseudo}'`;

            db.query(sqlLogin, function(err, results) {
                if (err) throw err;

                results.forEach(rep => {
                    bcrypt.compare(reqBody.password, rep.password)
                        .then(valid => {

                            if (!valid) {
                                return res.status(401).json({ error: 'L\'email ou le mot de passe est invalide !' });
                            };

                            res.status(200).json({
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