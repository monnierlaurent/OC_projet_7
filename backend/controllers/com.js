const express = require('express');

const db = require('../request');
const Com = require('../models/com');

//------logique métier commentaires------

exports.createCom = (req, res, next) => {
    //console.log(req.body);
    if (req.body.comAuteur === undefined || req.body.comContenu === undefined) {
        return res.status(400).json({ error: 'La syntaxe de la requête est erronée !' });
    };

    const com = new Com({
        id: null,
        userId: req.userIdAuth,
        postId: req.params.id,
        comAuteur: req.body.comAuteur,
        comContenu: req.body.comContenu,
        comLikes: 0,
        comDislikes: 0

    });
    console.log(com);

    const sqlPost = `INSERT INTO coms (userId ,postId, comAuteur, comContenu, comDateCrea, comDateModif, comLikes ,comDislikes) VALUES ('${com.userId}','${com.postId}','${com.comAuteur}','${com.comContenu}',now(),now(),'${com.comLikes}','${com.comDislikes}')`;

    db.query(sqlPost, function(err, results) {
        if (err) throw err;
        console.log("commentaire posté");
    });

    res.status(201).json({ message: 'message enregistré !!!' });

};


//----recuperer tous post de la BDD----
exports.displayCom = (req, res, next) => {
    const sqlGet = `SELECT * FROM coms WHERE postId='${req.params.id}'`;

    db.query(sqlGet, function(err, results) {
        if (results.length > 0) {
            return res.status(200).json({ results });
        } else {
            return res.status(403).json({ message: "Aucun message présent !" });
        }
    });

}; ////fin exports

//----recuperer un post par son ID----

exports.displayComId = (req, res, next) => {


    const sqlGetId = `SELECT * FROM coms WHERE comId='${req.params.comId}'`;
    db.query(sqlGetId, function(err, results) {
        if (results) {
            // console.log(results)
            return res.status(200).json({ results });

        } else {
            return res.status(403).json({ message: "Aucun message présent !" });
        }
    });
}; //fin exports

//----suppresion  d'un post par son ID----
exports.deleteComId = (req, res, next) => {

    const sqlGetId = `DELETE FROM coms WHERE comId='${req.params.comId}'`;

    db.query(sqlGetId, function(err, results) {

        res.status(200).json({ message: "Message supprimé !" });
    });

}; //fin exports

exports.updateComId = (req, res, next) => {
    //console.log(req.body)

    const sqlGetId = `UPDATE coms SET comAuteur='${req.body.comAuteur}',comContenu='${req.body.comContenu}',comDateModif=now()  WHERE comId='${req.params.comId}'`;

    db.query(sqlGetId, function(err, results) {
        if (results) {
            // console.log(results)
            return res.status(200).json({ message: "Message modifié !" });

        } else {
            return res.status(403).json({ message: "Aucun post présent !" });
        };
    });
}; //fin exports