const sanitize = require('mongo-sanitize');
const fs = require('fs');
const PostModel = require('../models/postModel');
const LikeModel = require('../models/likeModel');

const postModel = new PostModel();
const likeModel = new LikeModel();

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
            .then(() => {
                res.status(201).json({ message: 'message enregistré !!!' });
            }).catch(() => res.status(500).json({ error: 'La syntaxe de la requête est erronée' }));
    } else {
        fs.unlink(`${req.file.filename}`, () => { res.status(400).json({ error: 'La syntaxe de la requête est erronée' }) });
    };
};

//----recuperer tous post de la BDD----
exports.displayPost = (req, res, next) => {
    postModel.findAll()
        .then(response => {

            res.status(201).json(response);

        }).catch(() => res.status(404).json({ error: 'cette resource n\'existe pas !' }));
}; ////fin exports

//----recuperer un post par son ID----

exports.displayPostId = (req, res, next) => {
    const reqParamsId = sanitize(req.params.id);

    postModel.findOneAll('posts', 'postId', reqParamsId)
        .then(response => {

            res.status(201).json(response);
        }).catch(() => res.status(404).json({ error: 'cette resource n\'existe pas !' }));
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
                            }).catch(() => res.status(400).json({ error: 'La syntaxe de la requête est erronée' }));
                    } else {
                        res.status(403).json({ error: 'suppression impossible ,vous n\'êtes pas sont créateur !' });
                    };
                }).catch(() => res.status(404).json({ error: 'cette resource n\'existe pas !' }));
        }).catch(() => res.status(404).json({ error: 'cette resource n\'existe pas !' }));
}; //fin exports

//----modification d'un post par son ID----
exports.updatePostId = (req, res, next) => {

    const reqParamsId = sanitize(req.params.id);
    const userIdAuth = sanitize(req.userIdAuth);

    postModel.findOne('users', 'id', userIdAuth)
        .then(response => {

            const userIdRec = response.id;
            const roleRec = response.role;

            postModel.findOne('posts', 'postId', reqParamsId)
                .then((response) => {
                    if (response.userId === userIdRec || roleRec === 1) {

                        const postObject = req.file ? {...JSON.parse(req.body.posts),
                            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                        } : {...req.body };

                        if (req.file) {
                            const filename = response.imageUrl.split("/images")[1];
                            fs.unlink(`images/${filename}`, () => {
                                postModel.updateOne(postObject.titre, postObject.contenu, postObject.imageUrl, reqParamsId)
                                    .then(() => {
                                        res.status(200).json({ message: 'posts bien mis a jour !' });
                                    }).catch(() => res.status(400).json({ error: 'La syntaxe de la requête est erronée' }));
                            });
                        } else {
                            const imageUrl = response[0].imageUrl;
                            postModel.updateOne(postObject.titre, postObject.contenu, imageUrl, reqParamsId)
                                .then(() => {
                                    res.status(200).json({ message: 'posts bien mis a jour !' });
                                }).catch(() => res.status(400).json({ error: 'La syntaxe de la requête est erronée' }));
                        };

                    } else {
                        res.status(403).json({ error: 'vous ne pouvez pas modifié ce post !' });
                    };
                }).catch(() => res.status(404).json({ error: 'cette resource n\'existe pas !' }));
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

        likeModel.likeFindOne('postLikes', 'userId', userIdAuth, 'postId', reqParamsId)
            .then((response) => {

                if (reqBody.like === 1) {
                    if (response[0] === undefined) {
                        likeModel.likeSave('postLikes', 'postId', 'userId', 'postLikeValeur', reqParamsId, reqBody.userId, reqBody.like)
                            .then(() => {
                                likeModel.likeUpdateOne('posts', 'likes', 'likes+1', 'postId', reqParamsId)
                                    .then(() => {
                                        res.status(201).json({ message: 'like enregistré !' });
                                    }).catch(() => res.status(400).json({ error: 'La syntaxe de la requête est erronée' }));
                            }).catch(() => res.status(500).json({ error: 'La syntaxe de la requête est erronée' }));
                    } else if (response[0].postLikeValeur === 1) {
                        res.status(201).json({ message: 'Vous avez déja liké !' });
                    } else if (response[0].postLikeValeur === -1) {
                        res.status(201).json({ message: 'Vous avez déja disliké !' });
                    };
                }; //fin de if valeur 1

                if (reqBody.like === -1) {
                    if (response[0] === undefined) {
                        likeModel.likeSave('postLikes', 'postId', 'userId', 'postLikeValeur', reqParamsId, reqBody.userId, reqBody.like)
                            .then(() => {
                                likeModel.likeUpdateOne('posts', 'dislikes', 'dislikes+1', 'postId', reqParamsId)
                                    .then(() => {
                                        res.status(201).json({ message: 'Dislike enregistré !' });
                                    }).catch(() => res.status(400).json({ error: 'La syntaxe de la requête est erronée' }));
                            }).catch(() => res.status(500).json({ error: 'La syntaxe de la requête est erronée' }));
                    } else if (response[0].postLikeValeur === 1) {
                        res.status(201).json({ message: 'Vous avez déja liké !' });
                    } else if (response[0].postLikeValeur === -1) {
                        res.status(201).json({ message: 'Vous avez déja disliké !' });
                    };
                }; //fin de if valeur 1

                if (reqBody.like === 2) {

                    if (response[0] === undefined) {
                        return res.status(400).json({ error: 'Vous n\'avez aucuns likes ou dislikes a supprimer !!' });
                    };
                    if (response[0].postLikeValeur === 1) {

                        likeModel.likeDeleteOne('postLikes', 'postId', reqParamsId, 'userId', reqBody.userId)
                            .then(() => {
                                likeModel.likeUpdateOne('posts', 'likes', 'likes-1', 'postId', reqParamsId)
                                    .then(() => {
                                        res.status(201).json({ message: 'Like supprimé !' });
                                    }).catch(() => res.status(400).json({ error: 'La syntaxe de la requête est erronée' }));
                            }).catch(() => res.status(400).json({ error: 'La syntaxe de la requête est erronée' }));
                    };
                    if (response[0].postLikeValeur === -1) {
                        likeModel.likeDeleteOne('postLikes', 'postId', reqParamsId, 'userId', reqBody.userId)
                            .then(() => {
                                likeModel.likeUpdateOne('posts', 'dislikes', 'dislikes-1', 'postId', reqParamsId)
                                    .then(() => {
                                        res.status(201).json({ message: 'Dislike supprimé !' });
                                    }).catch(() => res.status(400).json({ error: 'La syntaxe de la requête est erronée' }));
                            }).catch(() => res.status(400).json({ error: 'La syntaxe de la requête est erronée' }));
                    };
                };

            }).catch(() => res.status(404).json({ error: 'cette resource n\'existe pas !' }));
    } else {
        res.status(400).json({ error: 'La syntaxe de la requête est erronée !' });
    };
}; //fin likeSauce