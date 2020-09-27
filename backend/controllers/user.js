const express = require('express');
//const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');

const db = require('../request');
const User = require('../models/user');


exports.createUser = (req, res, next) => {
    const user = new User({

        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: req.body.password
    });

    const sql = `INSERT INTO users (nom, prenom, email, password) VALUES ('${user.nom}', '${user.prenom}','${user.email}','${user.password}')`;

    db.query(sql, function(err, results) {
        if (err) throw err;
        console.log("Table messages NOT CREATE");
    });

    res.status(201).json({ message: 'Utilisateur enregistrée !!!' });
};