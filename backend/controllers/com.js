const express = require('express');
const sanitize = require('mongo-sanitize');

const db = require('../request');
const Com = require('../models/com');
//const crypto = require('crypto');
//------logique métier commentaires------

exports.createCom = (req, res, next) => {

    const reqBody = sanitize(req.body);
    const userIdAuth = sanitize(req.userIdAuth);
    const reqParamsId = sanitize(req.params.id);

    if (reqBody.comAuteur === undefined || reqBody.comContenu === undefined) {
        return res.status(400).json({ error: 'La syntaxe de la requête est erronée !' });
    };

    const sqlAuteur = `SELECT nom, prenom FROM users WHERE id='${userIdAuth}'`;
    //console.log(sqlAuteur);

    db.query(sqlAuteur, function(err, results) {

        const dataNom = JSON.stringify(results[0].nom);
        const hashNomString = dataNom.split('"').join('');

        const dataPrenom = JSON.stringify(results[0].prenom);
        const hashPrenomString = dataPrenom.split('"').join('');

        //const auteur = hashNomString + ' ' + hashPrenomString;
        const auteur = 'laurent' + ' ' + 'monnier';
        const com = new Com({
            userId: userIdAuth,
            postId: reqParamsId,
            comContenu: reqBody.comContenu,
            comLikes: 0,
            comDislikes: 0
        });

        const sqlPost = `INSERT INTO coms (userId ,postId, comContenu, comDateCrea, comDateModif, comLikes ,comDislikes) VALUES ('${com.userId}','${com.postId}','${com.comContenu}',now(),now(),'${com.comLikes}','${com.comDislikes}')`;

        db.query(sqlPost, function(err, results) {
            if (err) throw err;
            console.log("commentaire posté");
        });
        res.status(201).json({ message: 'message enregistré !!!' });
    });
    //console.log(com);
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

    const sqlUserRecup = `SELECT role FROM users WHERE id='${userIdAuth}'`;

    db.query(sqlUserRecup, function(err, results) {

        const data1 = JSON.stringify(results);
        const role = '"role":1';

        if (reqBody.userId === userIdAuth || data1.includes(role)) {
            const sqlGetId = `DELETE FROM coms WHERE comId='${reqParamsComId}'`;
            db.query(sqlGetId, function(err, results) {

                res.status(200).json({ message: "Message supprimé !" });
            });
        } else {
            res.status(403).json({ error: 'suppression impossible ,vous n\'êtes pas sont auteur !' });
        };
    });
}; //fin exports

exports.updateComId = (req, res, next) => {
    const reqBody = sanitize(req.body);
    const reqParamsComId = sanitize(req.params.comId);
    const userIdAuth = sanitize(erq.userIdAuth);

    if (reqBody.comAuteur === undefined || reqBody.comContenu === undefined) {
        return res.status(400).json({ error: 'La syntaxe de la requête est erronée !' });
    };

    const sqlUserRecup = `SELECT role FROM users WHERE id='${userIdAuth}'`;

    db.query(sqlUserRecup, function(err, results) {

        const data1 = JSON.stringify(results);
        const role = '"role":1';

        if (reqBody.userId === userIdAuth || data1.includes(role)) {
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
    });
}; //fin exports


exports.likeCom = (req, res, next) => {
    const reqBody = sanitize(req.body);
    const reqParamsId = sanitize(req.params.id);
    const userIdAuth = sanitize(req.userIdAuth);

    if (reqBody.userId === undefined || reqBody.like === undefined) {
        return res.status(400).json({ error: 'La syntaxe de la requête est erronée !' });
    };

    if (reqBody.like) {
        const sqlPostLikeUser = `SELECT * FROM comLikes WHERE userId='${userIdAuth}' AND comId='${reqParamsId}'`;

        db.query(sqlPostLikeUser, function(err, results) {
            const likePositif = '"comLikeValeur":1';
            const likeNegatif = '"comLikeValeur":-1';

            const data = JSON.stringify(results);

            if (reqBody.like === 1) {

                if (data.includes(likePositif)) {
                    res.status(201).json({ message: 'Vous avez déja liké !' });
                } else if (data.includes(likeNegatif)) {
                    res.status(201).json({ message: 'Vous avez déja disliké !' });
                } else {
                    const sqlLike = `INSERT INTO comLikes (comId, userId, comLikeValeur) VALUES ('${reqParamsId}','${reqBody.userId}','${reqBody.like}')`
                    db.query(sqlLike, function(err, results) {

                        const sqlLikeCount = `UPDATE coms SET likes=likes+1 WHERE comId='${reqParamsId}'`;
                        db.query(sqlLikeCount, function(err, results) {
                            res.status(201).json({ message: 'Like enregistré !' });
                        });
                    });
                };
            };
            if (reqBody.like === -1) {

                if (data.includes(likePositif)) {
                    res.status(201).json({ message: 'Vous avez déja liké !' });
                } else if (data.includes(likeNegatif)) {
                    res.status(201).json({ message: 'Vous avez déja disliké !' });
                } else {
                    const sqlLike = `INSERT INTO comLikes (comId, userId, comLikeValeur) VALUES ('${reqParamsId}','${reqBody.userId}','${reqBody.like}')`
                    db.query(sqlLike, function(err, results) {

                        const sqlDilsikeCount = `UPDATE coms SET dislikes=dislikes+1 WHERE postId='${reqParamsId}'`;
                        db.query(sqlDilsikeCount, function(err, results) {
                            res.status(201).json({ message: 'Dislike enregistré !' });
                        });
                    });
                };
            };
            if (reqBody.like === 2) {

                const sqlDeleteLike = `DELETE FROM comLikes WHERE comId='${reqParamsId}' AND userId='${reqBody.userId}'`;

                if (data.includes(likePositif)) {
                    db.query(sqlDeleteLike, function(err, results) {
                        const sqllikeOff = `UPDATE coms SET likes=likes-1 WHERE comId='${reqParamsId}'`;
                        db.query(sqllikeOff, function(err, results) {
                            res.status(201).json({ message: 'Like supprimé !' });
                        });
                    });
                };
                if (data.includes(likeNegatif)) {
                    db.query(sqlDeleteLike, function(err, results) {
                        const sqlDislikeOff = `UPDATE coms SET dislikes=dislikes-1 WHERE comId='${reqParamsId}'`;
                        db.query(sqlDislikeOff, function(err, results) {
                            res.status(201).json({ message: 'Like supprimé !' });
                        });
                    });
                };
            };
        });
    } else {
        res.status(400).json({ error: 'La syntaxe de la requête est erronée !' });
    };
}; //fin likeSauce