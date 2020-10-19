const express = require('express');
const sanitize = require('mongo-sanitize');

const db = require('../request');
const Post = require('../models/post');



//----enregister un post sur la table POSTS la  BDD----
exports.createPost = (req, res, next) => {

    const reqBody = sanitize(req.body);
    const userIdAuth = sanitize(req.userIdAuth);

    if (reqBody.titre === undefined || reqBody.auteur === undefined || reqBody.contenu === undefined) {
        return res.status(400).json({ error: 'La syntaxe de la requête est erronée !' });
    };

    const post = new Post({
        id: null,
        userId: userIdAuth,
        titre: reqBody.titre,
        auteur: reqBody.auteur,
        contenu: reqBody.contenu,
        likes: 0,
        dislikes: 0

    });
    // console.log(post);

    const sqlPost = `INSERT INTO posts (userid ,titre, auteur, contenu, dateCrea, dateModif, likes ,dislikes) VALUES ('${post.userId}','${post.titre}', '${post.auteur}','${post.contenu}',now(),now(),'${post.likes}','${post.dislikes}')`;

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

    const reqParamsId = sanitize(req.params.id);

    const sqlGetId = `SELECT * FROM posts WHERE id='${reqParamsId}'`;
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

    if (req.body.userId === req.userIdAuth) {

        const sqlGetId = `DELETE FROM posts WHERE id='${reqParamsId}'`;

        db.query(sqlGetId, function(err, results) {

            res.status(200).json({ message: "Message supprimé !" });
        });
    } else {
        res.status(403).json({ error: 'suppression impossible ,vous n\'êtes pas sont créateur !' });
    };
}; //fin exports

//----modification d'un post par son ID----
exports.updatePostId = (req, res, next) => {

    const reqParamsId = sanitize(req.params.id);
    const reqBody = sanitize(req.body);
    const userIdAuth = sanitize(req.userIdAuth);

    if (reqBody.userId === userIdAuth) {

        const sqlGetId = `UPDATE posts SET titre='${reqBody.titre}',auteur='${reqBody.auteur}',contenu='${reqBody.contenu}',dateModif=now()  WHERE id='${reqParamsId}'`;

        db.query(sqlGetId, function(err, results) {
            if (results) {
                // console.log(results)
                return res.status(200).json({ message: "Message modifié !" });

            } else {
                return res.status(403).json({ message: "Aucun post présent !" });
            };
        });
    } else {
        res.status(403).json({ error: 'suppression modifié ce post ,vous n\'êtes pas sont auteur !' });
    };

}; //fin exports

exports.likeSauce = (req, res, next) => {
    const reqBody = sanitize(req.body);

    const sqlLikes = `SELECT userId FROM postLikes WHERE postId='${req.params.id}'`;
    const sqlDislikes = `SELECT userId FROM postDislikes WHERE postId='${req.params.id}'`;

    const sqlUpLike = `UPDATE posts SET likes=likes+1 WHERE id='${req.params.id}'`;

    const sqlUserIdpostLike = `INSERT INTO postLikes (postId,userID) values (${req.params.id},${reqBody.userId})`;


    if (reqBody.like === 1) {

        db.query(sqlLikes, function(err, results) {
            if (err) throw err;
            const data1 = JSON.stringify(results);

            if (data1.includes(req.body.userId)) {
                res.status(201).json({ message: 'Vous avez déja liké !' });
            } else {
                db.query(sqlDislikes, function(err, results) {
                    if (err) throw err;
                    const data2 = JSON.stringify(results);
                    if (data2.includes(req.body.userId)) {
                        res.status(201).json({ message: 'Vous avez déja disliké !' });
                    } else {
                        db.query(sqlUserIdpostLike, function(err, results) {
                            if (err) throw err;

                            db.query(sqlUpLike, function(err, results) {
                                if (err) throw err;
                                res.status(201).json({ message: 'like enregisté !' });
                            });
                        });
                    };
                });
            };
        });
    };
};



/*db.query(sqlUserIdpostLike, function(err, results) {
    if (err) throw err;

    db.query(sqlUpLike, function(err, results) {
        if (err) throw err;
        res.status(201).json({ message: 'like enregisté !' });
    });
});*/


/*db.query(sqlLikes, function(err, results) {
    if (err) throw err;

    const tableUserId = JSON.stringify(results);

    if (tableUserId.includes(req.body.userId)) {
        res.status(201).json({ message: 'Vous avez déja liké !' });
    } else {
        const sqlUpLike = `UPDATE posts SET likes=likes+1`;

        db.query(sqlUpLike, function(err, results) {
            if (err) throw err;
            res.status(201).json({ message: 'like enregisté !' });
        });
    };
});*/

/* if (reqBody.like === undefined, reqBody.userId === undefined) {
         return res.status(400).json({ error: 'La syntaxe de la requête est erronée !' });
     };*/

//if (reqBody.like === -1) {};
//if (reqBody.like === 0) {};