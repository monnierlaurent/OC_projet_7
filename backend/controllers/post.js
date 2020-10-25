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

    } else {
        const filename = image.split("/images")[1]; // a regler -----------------------IMPORTANT
        fs.unlink(`images/${filename}`, () => { res.status(400).json({ error: 'La syntaxe de la requête est erronée' }) });
    }
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

            const sqlGetId = `DELETE FROM posts WHERE postId='${reqParamsId}'`;

            db.query(sqlGetId, function(err, results) {

                res.status(200).json({ message: "Message supprimé !" });
            });
        } else {
            res.status(403).json({ error: 'suppression impossible ,vous n\'êtes pas sont créateur !' });
        };

    });



}; //fin exports

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

            const sqlGetId = `UPDATE posts SET titre='${reqBody.titre}',auteur='${reqBody.auteur}',contenu='${reqBody.contenu}',dateModif=now() ,imageUrl='${reqBody.imageUrl}'  WHERE postId='${reqParamsId}'`;

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
    });


}; //fin exports

/*exports.likeSauce = (req, res, next) => {
    const reqBody = sanitize(req.body);

    const sqlLikes = `SELECT userId FROM postLikes WHERE postId='${req.params.id}'`;
    const sqlDislikes = `SELECT userId FROM postDislikes WHERE postId='${req.params.id}'`;

    const sqlUpLike = `UPDATE posts SET likes=likes+1 WHERE id='${req.params.id}'`;
    const sqlUpDislike = `UPDATE posts SET dislikes=dislikes+1 WHERE id='${req.params.id}'`;

    const sqlUpLike0 = `UPDATE posts SET likes=likes-1 WHERE id='${req.params.id}'`;
    const sqlUpDislike0 = `UPDATE posts SET dislikes=dislikes-1 WHERE id='${req.params.id}'`;

    const sqlUpLike1 = `UPDATE posts SET likes=likes WHERE id='${req.params.id}'`;
    const sqlUpDislike1 = `UPDATE posts SET dislikes=dislikes WHERE id='${req.params.id}'`;

    const sqlUserIdpostLike = `INSERT INTO postLikes (postId,userID) values (${req.params.id},${reqBody.userId})`;
    const sqlUserIdpostDislike = `INSERT INTO postDislikes (postId,userID) values (${req.params.id},${reqBody.userId})`;


    // gestion des likes
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
    // gestion des dislikes
    if (reqBody.like === -1) {
        db.query(sqlUpDislike, function(err, results) {
            if (err) throw err;
            const data1 = JSON.stringify(results);

            if (data1.includes(req.body.userId)) {
                res.status(201).json({ message: 'Vous avez déja disliké !' });
            } else {
                db.query(sqlLikes, function(err, results) {
                    if (err) throw err;

                    const data2 = JSON.stringify(results);

                    if (data2.includes(req.body.userId)) {
                        res.status(201).json({ message: 'Vous avez déja liké !' });
                    } else {
                        db.query(sqlUserIdpostDislike, function(err, results) {
                            if (err) throw err;

                            db.query(sqlUpDislike, function(err, results) {
                                if (err) throw err;
                                res.status(201).json({ message: 'Dislike enregisté !' });
                            });
                        });
                    };
                });
            };
        });
    };
    //suppression d'un like ou dislike
     if (reqBody.like === 0) {
         db.query(sqlLikes, function(err, results) {
             if (err) throw err;

             const data1 = JSON.stringify(results);

             if (data1.includes(req.body.userId)) {
                 db.query(sqlUpLike0, function(err, results) {
                     if (err) throw err;
                     res.status(201).json({ message: 'like supprimé !' });
                 });
             } else {
                 db.query(sqlUpLike1, function(err, results) {
                     if (err) throw err;
                     res.status(201).json({ message: 'like supprimé 10!' });
                 });

             };
         });

         db.query(sqlDislikes, function(err, results) {
             if (err) throw err;
             const data2 = JSON.stringify(results);

             if (data2.includes(req.body.userId)) {

                 db.query(sqlUpDislike0, function(err, results) {
                     if (err) throw err;
                     res.status(201).json({ message: 'Dislike supprimé !' });
                 });
             } else {
                 b.query(sqlUpDislike1, function(err, results) {
                     if (err) throw err;
                     res.status(201).json({ message: 'Dislike supprimé 10!' });
                 });
             };
         });

     };

}; //fin likeSauce

*/

//if (reqBody.like === 0) {};