const express = require('express');

const db = require('../request');
const Post = require('../models/post');

exports.creatPost = (req, res, next) => {

    const post = new Post({
        titre: req.body.titre,
        auteur: req.body.auteur,
        contenu: req.body.contenu,

    });

    const sqlPost = `INSERT INTO posts (titre, auteur, contenu) VALUES ('${post.titre}', '${post.auteur}','${post.contenu}')`;

    db.query(sqlPost, function(err, results) {
        if (err) throw err;
        console.log("Table post pas creer");
    });

    res.status(201).json({ message: 'Post enregistrée !!!' });

};

exports.displayPost = (req, res, next) => {
    const sqlGet = 'SELECT * FROM posts';

    db.query(sqlGet, function(err, results) {
        if (results.length > 0) {
            return res.status(200).json({ results });
        } else {
            return res.status(403).json({ message: "Aucun post présent !" });
        }
    });

}; ////fin exports