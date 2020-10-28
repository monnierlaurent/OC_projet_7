const sanitize = require('mongo-sanitize');
const fs = require('fs');
const PostModel = require('../models/postModel');
const db = require('../request');
const { response } = require('express');
const { json } = require('body-parser');

const postModel = new PostModel();


//----enregister un post sur la table POSTS la  BDD----
exports.createPost = (req, res, next) => {

    const userIdAuth = sanitize(req.userIdAuth);
    const reqBody = sanitize(req.body);

    if (req.body.posts) {
        const postsObject = JSON.parse(reqBody.posts);

        if (postsObject.titre === undefined || postsObject.contenu === undefined) {
            return res.status(400).json({ error: 'La syntaxe de la requête est erronée !' });
        };

        if (!req.file) {
            return res.status(400).json({ error: 'La syntaxe de la requête est erronée !' });
        };

        const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

        postModel.save(userIdAuth, postsObject.titre, postsObject.contenu, imageUrl)
            .then(reponse => {
                res.status(201).json({ message: 'message enregistré !!!' });
            }); //faire un catch
    } else {
        fs.unlink(`${req.file.filename}`, () => { res.status(400).json({ error: 'La syntaxe de la requête est erronée' }) });
    };
};

//----recuperer tous post de la BDD----
exports.displayPost = (req, res, next) => {
    postModel.findAll()
        .then(reponse => {
            res.status(201).json(reponse);
        }); //faire un catch
}; ////fin exports

//----recuperer un post par son ID----

exports.displayPostId = (req, res, next) => {
    const reqParamsId = sanitize(req.params.id);

    postModel.findOne('posts', 'postId', reqParamsId)
        .then(reponse => {
            res.status(201).json(reponse);
        }); //faire un catch
}; //fin exports


//----suppresion  d'un post par son ID----
exports.deletePostId = (req, res, next) => {
    const reqParamsId = sanitize(req.params.id);
    const userIdAuth = sanitize(req.userIdAuth);

    postModel.findOne('users', 'id', userIdAuth)
        .then(response => {
            const userIdRec = response[0].id;
            const roleRec = response[0].role;

            postModel.findOne('posts', 'postId', reqParamsId)
                .then((response) => {

                    if (response[0].userId === userIdRec || roleRec === 1) {

                        postModel.deleteOne(reqParamsId)
                            .then(() => {
                                res.status(200).json({ message: 'posts bien supprimé !' });
                            }); //faire un catch
                    } else {
                        res.status(403).json({ error: 'suppression impossible ,vous n\'êtes pas sont créateur !' });
                    };
                }); //faire un catch
        }); //faire un catch
}; //fin exports

//----modification d'un post par son ID----
exports.updatePostId = (req, res, next) => {

    const reqParamsId = sanitize(req.params.id);
    const reqBody = sanitize(req.body);
    const userIdAuth = sanitize(req.userIdAuth);

    postModel.findOne('users', 'id', userIdAuth)
        .then(response => {
            const userIdRec = response[0].id;
            const roleRec = response[0].role;
            postModel.findOne('posts', 'postId', reqParamsId)
                .then((response) => {
                    if (response[0].userId === userIdRec || roleRec === 1) {

                        const postObject = req.file ? {...JSON.parse(req.body.posts),
                            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                        } : {...req.body };
                        console.log(postObject)
                        if (req.file) {
                            const filename = response[0].imageUrl.split("/images")[1];
                            fs.unlink(`images/${filename}`, () => {
                                postModel.updateOne(postObject.titre, postObject.contenu, postObject.imageUrl, reqParamsId)
                                    .then(() => {
                                        res.status(200).json({ message: 'posts bien mis a jour !' });
                                    }); //faire un catch
                            });
                        } else {
                            const imageUrl = response[0].imageUrl;
                            postModel.updateOne(postObject.titre, postObject.contenu, imageUrl, reqParamsId)
                                .then(() => {
                                    res.status(200).json({ message: 'posts bien mis a jour !' });
                                }); //faire un catch
                        };

                    } else {
                        res.status(403).json({ error: 'vous ne pouvez pas modifié ce post !' });
                    };
                }); //faire un catch
        });
}; //fin exports

exports.likePost = (req, res, next) => {
    const reqBody = sanitize(req.body);
    const reqParamsId = sanitize(req.params.id);
    const userIdAuth = sanitize(req.userIdAuth);

    if (reqBody.userId === undefined || reqBody.like === undefined) {
        return res.status(400).json({ error: 'La syntaxe de la requête est erronée !' });
    };

    if (reqBody.like) {
        const sqlPostLikeUser = `SELECT * FROM postLikes WHERE userId='${userIdAuth}' AND postId='${reqParamsId}'`;

        db.query(sqlPostLikeUser, function(err, results) {
            const likePositif = '"postLikeValeur":1';
            const likeNegatif = '"postLikeValeur":-1';

            const data = JSON.stringify(results);

            if (reqBody.like === 1) {

                if (data.includes(likePositif)) {
                    res.status(201).json({ message: 'Vous avez déja liké !' });
                } else if (data.includes(likeNegatif)) {
                    res.status(201).json({ message: 'Vous avez déja disliké !' });
                } else {
                    const sqlLike = `INSERT INTO postLikes (postId, userId, postLikeValeur) VALUES ('${reqParamsId}','${reqBody.userId}','${reqBody.like}')`
                    db.query(sqlLike, function(err, results) {

                        const sqlLikeCount = `UPDATE posts SET likes=likes+1 WHERE postId='${reqParamsId}'`;
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
                    const sqlLike = `INSERT INTO postLikes (postId, userId, postLikeValeur) VALUES ('${reqParamsId}','${reqBody.userId}','${reqBody.like}')`
                    db.query(sqlLike, function(err, results) {

                        const sqlDilsikeCount = `UPDATE posts SET dislikes=dislikes+1 WHERE postId='${reqParamsId}'`;
                        db.query(sqlDilsikeCount, function(err, results) {
                            res.status(201).json({ message: 'Disike enregistré !' });
                        });
                    });
                };
            };
            if (reqBody.like === 2) {

                const sqlDeleteLike = `DELETE FROM postLikes WHERE postId='${reqParamsId}' AND userId='${reqBody.userId}'`;

                if (data.includes(likePositif)) {
                    db.query(sqlDeleteLike, function(err, results) {
                        const sqllikeOff = `UPDATE posts SET likes=likes-1 WHERE postId='${reqParamsId}'`;
                        db.query(sqllikeOff, function(err, results) {
                            res.status(201).json({ message: 'Like supprimé !' });
                        });
                    });
                };
                if (data.includes(likeNegatif)) {
                    db.query(sqlDeleteLike, function(err, results) {
                        const sqlDislikeOff = `UPDATE posts SET dislikes=dislikes-1 WHERE postId='${reqParamsId}'`;
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