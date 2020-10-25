const express = require('express');
const sanitize = require('mongo-sanitize');
const fs = require('fs');

const db = require('../request');
const Post = require('../models/post');



//----enregister un post sur la table POSTS la  BDD----
exports.createPost = (req, res, next) => {

    const userIdAuth = sanitize(req.userIdAuth);

    let postsObject;

    if (req.body.posts) {

        postsObject = JSON.parse(req.body.posts);
        if (postsObject.titre === undefined || postsObject.auteur === undefined || postsObject.contenu === undefined) {
            return res.status(400).json({ error: 'La syntaxe de la requête est erronée !' });
        };

        if (!req.file) {
            return res.status(400).json({ error: 'La syntaxe de la requête est erronée !' });
        };

        delete postsObject._id;

        const post = new Post({
            ...postsObject,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        });

        const sqlPost = `INSERT INTO posts (userid ,titre, auteur, contenu, dateCrea, dateModif,imageUrl, likes ,dislikes) VALUES ('${userIdAuth}','${post.titre}', '${post.auteur}','${post.contenu}',now(),now(),'${post.imageUrl}','${post.likes}','${post.dislikes}')`;

        db.query(sqlPost, function(err, results) {
            if (err) throw err;
            res.status(201).json({ message: 'message enregistré !!!' });
        });
    } else {
        //const filename = image.split("/images")[1]; // a regler -----------------------IMPORTANT
        fs.unlink(`${req.file.filename}`, () => { res.status(400).json({ error: 'La syntaxe de la requête est erronée' }) });
    };
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

    const reqParamsId = sanitize(req.params.id);

    const sqlGetId = `SELECT * FROM posts WHERE postId='${reqParamsId}'`;
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
exports.deletePostId = (req, res, next) => {
    const reqParamsId = sanitize(req.params.id);
    const userIdAuth = sanitize(req.userIdAuth);

    const sqlUserRecup = `SELECT role FROM users WHERE id='${userIdAuth}'`;
    db.query(sqlUserRecup, function(err, results) {

        const data1 = JSON.stringify(results);
        const role = '"role":1';

        if (req.body.userId === req.userIdAuth || data1.includes(role)) {
            const sqlGetImageUrl = `SELECT imageUrl FROM posts WHERE postId='${reqParamsId}'`
            db.query(sqlGetImageUrl, function(err, results) {

                const data = JSON.stringify(results);
                const data1 = data.split('[{"imageUrl":"http://localhost:3000').join('');
                const data2 = data1.split('"}]').join('');
                console.log(data2);
                const filename = data2.split("/images")[1];
                console.log(filename);
                fs.unlink(`images/${filename}`, () => {

                    const sqlGetId = `DELETE FROM posts WHERE postId='${reqParamsId}'`;
                    db.query(sqlGetId, function(err, results) {

                        res.status(200).json({ message: "Message supprimé !" });
                    });
                });
            });

        } else {
            res.status(403).json({ error: 'suppression impossible ,vous n\'êtes pas sont créateur !' });
        };
    });
}; //fin exports


/* const sqlGetId = `DELETE FROM posts WHERE postId='${reqParamsId}'`;

 db.query(sqlGetId, function(err, results) {

     res.status(200).json({ message: "Message supprimé !" });
 });*/

//----modification d'un post par son ID----
exports.updatePostId = (req, res, next) => {

    const reqParamsId = sanitize(req.params.id);
    const reqBody = sanitize(req.body);
    const userIdAuth = sanitize(req.userIdAuth);

    const sqlUserRecup = `SELECT role FROM users WHERE id='${userIdAuth}'`;
    db.query(sqlUserRecup, function(err, results) {

        const data1 = JSON.stringify(results);
        const role = '"role":1';

        if (reqBody.userId === userIdAuth || data1.includes(role)) {

            const postObject = req.file ? {...JSON.parse(req.body.posts),
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            } : {...req.body };

            if (req.file) {
                const sqlGetImageUrl = `SELECT imageUrl FROM posts WHERE postId='${reqParamsId}'`
                db.query(sqlGetImageUrl, function(err, results) {

                    const data = JSON.stringify(results);
                    const data1 = data.split('[{"imageUrl":"http://localhost:3000').join('');
                    const data2 = data1.split('"}]').join('');
                    //console.log(data2);
                    const filename = data2.split("/images")[1];
                    //console.log(filename);
                    fs.unlink(`images/${filename}`, () => {

                        const sqlGetId = `UPDATE posts SET titre='${reqBody.titre}',auteur='${reqBody.auteur}',contenu='${reqBody.contenu}',dateModif=now() ,imageUrl='${reqBody.imageUrl}'  WHERE postId='${reqParamsId}'`;
                        db.query(sqlGetId, function(err, results) {
                            if (results) {
                                // console.log(results)
                                return res.status(200).json({ message: "Message modifié !" });

                            } else {
                                return res.status(403).json({ message: "Aucun post présent !" });
                            };
                        });
                    });
                });
            } else {
                const sqlGetId = `UPDATE posts SET titre='${reqBody.titre}',auteur='${reqBody.auteur}',contenu='${reqBody.contenu}',dateModif=now() ,imageUrl='${reqBody.imageUrl}'  WHERE postId='${reqParamsId}'`;
                db.query(sqlGetId, function(err, results) {
                    if (results) {
                        // console.log(results)
                        return res.status(200).json({ message: "Message modifié !" });

                    } else {
                        return res.status(403).json({ message: "Aucun post présent !" });
                    };
                });
            };
        } else {
            res.status(403).json({ error: 'suppression modifié ce post ,vous n\'êtes pas sont auteur !' });
        };
    });


}; //fin exports

exports.likeSauce = (req, res, next) => {
    const reqBody = sanitize(req.body);




}; //fin likeSauce