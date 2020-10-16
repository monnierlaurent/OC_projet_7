const express = require('express');

const db = require('../request');
const Post = require('../models/post');

//----enregister un post sur la table POSTS la  BDD----
exports.createPost = (req, res, next) => {

    const post = new Post({
        titre: req.body.titre,
        auteur: req.body.auteur,
        contenu: req.body.contenu,

    });

    const sqlPost = `INSERT INTO posts (titre, auteur, contenu) VALUES ('${post.titre}', '${post.auteur}','${post.contenu}')`;

    db.query(sqlPost, function(err, results) {
        if (err) throw err;
        console.log("message non posté");
    });

    res.status(201).json({ message: 'message enregistré !!!' });

};


//----recuperer tous post de la BDD----
exports.displayPost = (req, res, next) => {
    const sqlGet = 'SELECT * FROM posts';

    db.query(sqlGet, function(err, results) {
        if (results.length > 0) {
            return res.status(200).json({ results });
        } else {
            return res.status(403).json({ message: "Aucun message présent !" });
        }
    });

}; ////fin exports

//----recuperer un post par son ID----

exports.displayPostId = (req, res, next) => {

    const sqlGetId = `SELECT * FROM posts WHERE ID='${req.params.id}' `;

    db.query(sqlGetId, function(err, results) {
        if (results) {
            // console.log(results)
            return res.status(200).json({ results });

        } else {
            return res.status(403).json({ message: "Aucun message présent !" });
        }
    });


}; //fin exports

/*exports.updatePostId = (req, res, next) => {


    const sqlGetId = `SELECT * FROM posts WHERE ID='${req.params.id}' `;

    db.query(sqlGetId, function(err, results) {
        if (results) {
            // console.log(results)
            return res.status(200).json({ results });

        } else {
            return res.status(403).json({ message: "Aucun post présent !" });
        }
    });


}; //fin exports*/

exports.deletePostId = (req, res, next) => {

    const sqlGetId = `DELETE FROM posts WHERE ID='${req.params.id}' `;

    db.query(sqlGetId, function(err, results) {

        res.status(200).json({ message: "Message supprimé !" });
    });

}; //fin exports