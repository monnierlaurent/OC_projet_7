const express = require('express');
const sanitize = require('mongo-sanitize');

const db = require('../request');
const Com = require('../models/com');

//------logique métier commentaires------

exports.createCom = (req, res, next) => {

    const reqBody = sanitize(req.body);
    const userIdAuth = sanitize(erq.userIdAuth);
    const reqParamsId = sanitize(req.params.id);

    if (reqBody.comAuteur === undefined || reqBody.comContenu === undefined) {
        return res.status(400).json({ error: 'La syntaxe de la requête est erronée !' });
    };

    const com = new Com({
        id: null,
        userId: userIdAuth,
        postId: reqParamsId,
        comAuteur: reqBody.comAuteur,
        comContenu: reqBody.comContenu,
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

    const reqParamsId = sanitize(req.params.id);

    const sqlGet = `SELECT * FROM coms WHERE postId='${reqParamsId}'`;

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

    const reqParamsComId = sanitize(req.params.comId);

    const sqlGetId = `SELECT * FROM coms WHERE comId='${reqParamsComId}'`;
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

    const reqParamsComId = sanitize(req.params.comId);
    const reqBody = sanitize(req.body);
    const userIdAuth = sanitize(erq.userIdAuth);

    if (reqBody.userId === userIdAuth) {
        const sqlGetId = `DELETE FROM coms WHERE comId='${reqParamsComId}'`;

        db.query(sqlGetId, function(err, results) {

            res.status(200).json({ message: "Message supprimé !" });
        });

    } else {
        res.status(403).json({ error: 'suppression impossible ,vous n\'êtes pas sont auteur !' });
    };

}; //fin exports

exports.updateComId = (req, res, next) => {
    const reqBody = sanitize(req.body);
    const reqParamsComId = sanitize(req.params.comId);
    const userIdAuth = sanitize(erq.userIdAuth);

    if (reqBody.comAuteur === undefined || reqBody.comContenu === undefined) {
        return res.status(400).json({ error: 'La syntaxe de la requête est erronée !' });
    };


    if (reqBody.userId === userIdAuth) {

        const sqlGetId = `UPDATE coms SET comAuteur='${reqBody.comAuteur}',comContenu='${reqBody.comContenu}',comDateModif=now()  WHERE comId='${reqParamsComId}'`;

        db.query(sqlGetId, function(err, results) {
            if (results) {
                // console.log(results)
                return res.status(200).json({ message: "Message modifié !" });

            } else {
                return res.status(403).json({ message: "Aucun post présent !" });
            };
        });
    } else {
        res.status(403).json({ error: 'modification impossible ,vous n\'êtes pas sont auteur !' });
    };

}; //fin exports