const sanitize = require('mongo-sanitize');
const fs = require('fs');
const PostModel = require('../models/postModel');
const LikeModel = require('../models/likeModel');

const postModel = new PostModel();
const likeModel = new LikeModel();

//----enregister un post sur la table POSTS la  BDD----
exports.createPostImg = (req, res, next) => {
    const userIdAuth = sanitize(req.userIdAuth);
    const reqBody = sanitize(req.body);

    if (req.body.posts) {
        const postsObject = JSON.parse(reqBody.posts);

        if (postsObject.titre === undefined) {
            return res.status(400).json({ status: 400, message: 'Le titre est obligatoire et doit contenir au minum 2 charactères<br>sans caractères spéciaux !' });
        };
        if (postsObject.contenu === undefined) {
            return res.status(400).json({ status: 400, message: 'Le contenu du message doit contenir au minum 2 caractères !' });
        };
        if (!req.file) {
            return res.status(400).json({ status: 400, message: 'Le message doit contenir sois une image soit un contenu d\'au minum 2 caractères !' });
        };

        const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

        postModel.saveImg(userIdAuth, postsObject.titre, postsObject.contenu, imageUrl)
            .then(() => {
                postModel.findOnedate()
                    .then(response => {

                        res.status(201).json({
                            /* userId: response[0].userId,
                             titre: response[0].titre,
                             contenu: response[0].contenu,
                             dateCrea: response[0].dateCrea,
                             dateModif: response[0].dateModif,
                             imageUrl: response[0].imageUrl,
                             likes: response[0].likes,
                             dislikes: response[0].dislikes,
                             postId: response[0].postId,
                             nom: response[0].nom,
                             prenom: response[0].prenom,
                             avatar: response[0].avatar,*/
                            status: 201,
                            message: 'Publication enregistré !'
                        });
                    });

            }).catch(() => res.status(500).json({ status: 500, message: 'Une erreur est survenue,la publication n\'est pas enregisté !' }));
    } else {
        fs.unlink(`${req.file.filename}`, () => { res.status(400).json({ status: 400, message: 'L\image a bien été supprimé' }) });
    };
};

exports.createPost = (req, res, next) => {
    const userIdAuth = sanitize(req.userIdAuth);
    const reqBody = sanitize(req.body);

    if (reqBody.titre === undefined || reqBody.contenu === undefined) {
        return res.status(400).json({ status: 400, message: 'Le titre est obligatoire et doit contenir au minum 2 charactères<br>sans caractères spéciaux !' });
    };
    if (reqBody.titre === undefined || reqBody.contenu === undefined) {
        return res.status(400).json({ status: 400, message: 'Le contenu du message doit contenir au minum 2 caractères !' });
    };

    postModel.save(userIdAuth, reqBody.titre, reqBody.contenu)
        .then(() => {
            postModel.findOnedate()
                .then(response => {

                    res.status(201).json({
                        /*userId: response[0].userId,
                        titre: response[0].titre,
                        contenu: response[0].contenu,
                        dateCrea: response[0].dateCrea,
                        dateModif: response[0].dateModif,
                        imageUrl: response[0].imageUrl,
                        likes: response[0].likes,
                        dislikes: response[0].dislikes,
                        postId: response[0].postId,
                        nom: response[0].nom,
                        prenom: response[0].prenom,
                        avatar: response[0].avatar,*/
                        status: 201,
                        message: 'Publication enregistré !'
                    });
                });
        }).catch(() => res.status(500).json({ status: 500, message: 'Une erreur est survenue,la publication n\'est pas enregisté !' }));
};

//----recuperer tous post de la BDD----
exports.displayPost = (req, res, next) => {
    postModel.findAll()
        .then(response => {

            res.status(201).json(response);

        }).catch(() => res.status(404).json({ status: 404, message: 'Cette resource n\'existe pas ou est inaccessible pour le moment !' }));
}; ////fin exports

//----recuperer un post par son ID----

exports.displayPostId = (req, res, next) => {
    const reqParamsId = sanitize(req.params.id);

    postModel.findOneAll('posts', 'postId', reqParamsId)
        .then(response => {

            res.status(201).json(response);
        }).catch(() => res.status(404).json({ status: 404, message: 'Cette resource n\'existe pas ou est inaccessible pour le moment !' }));
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
                                const filename = response[0].imageUrl.split('/images/')[1];
                                fs.unlink(`images/${filename}`, () => {
                                    res.status(200).json({ status: 200, message: 'Publication supprimé !' });
                                });
                            }).catch(() => res.status(400).json({ status: 400, message: 'Une erreur est survenue,la publication n\'est pas enregisté !' }));

                    } else {
                        res.status(403).json({ status: 403, message: 'La suppression est impossible ,vous n\'êtes pas sont auteur !' });
                    };
                }).catch(() => res.status(404).json({ status: 404, message: 'Cette resource n\'existe pas ou est inaccessible pour le moment !' }));
        }).catch(() => res.status(404).json({ status: 404, message: 'Cette resource n\'existe pas ou est inaccessible pour le moment !' }));
}; //fin exports

//----modification d'un post par son ID----
exports.updatePostIdImg = (req, res, next) => {

    const reqParamsId = sanitize(req.params.id);
    const userIdAuth = sanitize(req.userIdAuth);

    postModel.findOne('users', 'id', userIdAuth)
        .then(response => {

            const userIdRec = response.id;
            const roleRec = response.role;

            postModel.findOne('posts', 'postId', reqParamsId)
                .then((response) => {

                    if (response.userId === userIdRec || roleRec === 1) {

                        const reqBodyParse = JSON.parse(req.body.posts);

                        const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

                        const filename = response[0].imageUrl.split("/images")[1];

                        fs.unlink(`images/${filename}`, () => {

                            postModel.updateOne(reqBodyParse.titre, reqBodyParse.contenu, imageUrl, reqParamsId)

                            .then(() => {
                                res.status(200).json({ status: 200, message: 'Publication modifée !' });
                            }).catch(() => res.status(400).json({ status: 400, message: 'La publication n\'est pas mis a jour !' }));
                        });
                    } else {
                        res.status(403).json({ status: 403, message: 'Vous ne pouvez pas modifié ce post , vous n\'êtes pas sont auteur!' });
                    };
                }).catch(() => res.status(404).json({ status: 404, message: 'Cette resource n\'existe pas ou est inaccessible pour le moment !' }));
        });
}; //fin exports


exports.updatePostId = (req, res, next) => {

    const reqParamsId = sanitize(req.params.id);
    const userIdAuth = sanitize(req.userIdAuth);
    const reqBody = sanitize(req.body);

    postModel.findOne('users', 'id', userIdAuth)
        .then(response => {

            const userIdRec = response[0].id;
            const roleRec = response[0].role;

            postModel.findOne('posts', 'postId', reqParamsId)
                .then((response) => {

                    if (response[0].userId === userIdRec || roleRec === 1) {

                        const imageUrl = response[0].imageUrl;

                        postModel.updateOne(reqBody.titre, reqBody.contenu, imageUrl, reqParamsId)
                            .then(() => {
                                res.status(200).json({ status: 200, message: 'Publication modifiée !' });
                            }).catch(() => res.status(400).json({ status: 400, message: 'La publication n\'est pas mis a jour !' }));

                    } else {
                        res.status(403).json({ status: 403, message: 'Vous ne pouvez pas modifié cette publication , vous n\'êtes pas sont auteur !' });
                    };
                }).catch(() => res.status(404).json({ status: 404, message: 'Cette resource n\'existe pas ou est inaccessible pour le moment !' }));
        });
}; //fin exports

exports.likePost = (req, res, next) => {
    const reqBody = sanitize(req.body);
    const reqParamsId = sanitize(req.params.id);
    const userIdAuth = sanitize(req.userIdAuth);

    if (reqBody.userId === undefined) {
        return res.status(400).json({ status: 400, message: 'Vous n\'etes pas identifié, vous ne pouvez pas donner d\'appréciation' });
    };
    if (reqBody.like === undefined) {
        return res.status(400).json({ status: 400, message: 'Il manque votre appréciation dans votre demende !' });
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
                                        res.status(201).json({ status: 201, message: 'like enregistré !' });
                                    }).catch(() => res.status(400).json({ status: 400, message: 'Une erreur est survenue,le like  n\'est pas enregisté !' }));
                            }).catch(() => res.status(400).json({ status: 400, message: 'Une erreur est survenue,le like  n\'est pas enregisté !' }));

                    } else if (response[0].postLikeValeur === 1) {

                        likeModel.likeDeleteOne('postLikes', 'postId', reqParamsId, 'userId', reqBody.userId)
                            .then(() => {
                                likeModel.likeUpdateOne('posts', 'likes', 'likes-1', 'postId', reqParamsId)
                                    .then(() => {
                                        res.status(201).json({ status: 201, message: 'Like supprimé !' });
                                    }).catch(() => res.status(400).json({ status: 400, message: 'Une erreur est survenue,le like  n\'est pas supprimé !' }));
                            }).catch(() => res.status(400).json({ status: 400, message: 'Une erreur est survenue,le like  n\'est pas supprimé !' }));
                        //suppresion du like + mise a jout du compteur

                    } else if (response[0].postLikeValeur === -1) {
                        likeModel.likeDeleteOne('postLikes', 'postId', reqParamsId, 'userId', reqBody.userId)
                            .then(() => {
                                //suppresion du dislike + mise a jout du compteur
                                likeModel.likeUpdateOne('posts', 'dislikes', 'dislikes-1', 'postId', reqParamsId)
                                    .then(() => {
                                        likeModel.likeSave('postLikes', 'postId', 'userId', 'postLikeValeur', reqParamsId, reqBody.userId, reqBody.like)
                                            .then(() => {
                                                likeModel.likeUpdateOne('posts', 'likes', 'likes+1', 'postId', reqParamsId)
                                                    .then(() => {
                                                        res.status(201).json({ status: 201, message: 'dislike supprimé ! like enregisté !' });
                                                    }).catch(() => res.status(400).json({ status: 400, message: 'Une erreur est survenue,le like  n\'est pas enregistré !' }));
                                            }).catch(() => res.status(400).json({ status: 400, message: 'Une erreur est survenue,le like  n\'est pas enregistré !' }));

                                    }).catch(() => res.status(400).json({ message: 'Une erreur est survenue,le dislike  n\'est pas supprimé !' }));
                            }).catch(() => res.status(400).json({ message: 'Une erreur est survenue,le dislike  n\'est pas supprimé !' }));
                    };
                }; //fin de if valeur 1

                if (reqBody.like === -1) {
                    if (response[0] === undefined) {
                        likeModel.likeSave('postLikes', 'postId', 'userId', 'postLikeValeur', reqParamsId, reqBody.userId, reqBody.like)
                            .then(() => {
                                likeModel.likeUpdateOne('posts', 'dislikes', 'dislikes+1', 'postId', reqParamsId)
                                    .then(() => {
                                        res.status(201).json({ status: 201, message: 'Dislike enregistré !' });
                                    }).catch(() => res.status(400).json({ status: 400, message: 'Une erreur est survenue,le dislike  n\'est pas enregistré !' }));
                            }).catch(() => res.status(400).json({ status: 400, message: 'Une erreur est survenue,le dislike  n\'est pas enregistré !' }));

                    } else if (response[0].postLikeValeur === 1) {
                        //suppression du like + mise a jout du compteur
                        likeModel.likeDeleteOne('postLikes', 'postId', reqParamsId, 'userId', reqBody.userId)
                            .then(() => {
                                likeModel.likeUpdateOne('posts', 'likes', 'likes-1', 'postId', reqParamsId)
                                    .then(() => {
                                        likeModel.likeSave('postLikes', 'postId', 'userId', 'postLikeValeur', reqParamsId, reqBody.userId, reqBody.like)
                                            .then(() => {
                                                likeModel.likeUpdateOne('posts', 'dislikes', 'dislikes+1', 'postId', reqParamsId)
                                                    .then(() => {
                                                        res.status(201).json({ status: 201, message: 'disike supprimé ! like enregisté !' });
                                                    }).catch(() => res.status(400).json({ status: 400, message: 'Une erreur est survenue,le dislike  n\'est pas enregistré !' }));
                                            }).catch(() => res.status(400).json({ status: 400, message: 'Une erreur est survenue,le dislike  n\'est pas enregistré !' }));

                                    }).catch(() => res.status(400).json({ status: 400, message: 'Une erreur est survenue,le like  n\'est pas supprimé !' }));
                            }).catch(() => res.status(400).json({ status: 400, message: 'Une erreur est survenue,le dislike  n\'est pas supprimé !' }));
                        //ajout du dislike + mise a jout du compteur


                    } else if (response[0].postLikeValeur === -1) {
                        likeModel.likeDeleteOne('postLikes', 'postId', reqParamsId, 'userId', reqBody.userId)
                            .then(() => {
                                likeModel.likeUpdateOne('posts', 'dislikes', 'dislikes-1', 'postId', reqParamsId)
                                    .then(() => {
                                        res.status(201).json({ status: 201, message: 'Dislike supprimé !' });
                                    }).catch(() => res.status(400).json({ status: 400, message: 'Une erreur est survenue,le dislike  n\'est pas supprimé !' }));
                            }).catch(() => res.status(400).json({ status: 400, message: 'Une erreur est survenue,le dislike  n\'est pas supprimé !' }));
                        //suppresion du dislike + mise a jout du compteur

                    };
                }; //fin de if valeur 1

            }).catch(() => res.status(404).json({ status: 404, message: 'Une erreur est survenue,cette ressource n\'est pas disponible pour le moment !' }));
    } else {
        res.status(400).json({ status: 400, message: 'La syntaxe de la requête est erronée !' });
    };
};