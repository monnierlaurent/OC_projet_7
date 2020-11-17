const sanitize = require('mongo-sanitize');

const ComModel = require('../models/comModel');
const LikeModel = require('../models/likeModel');

const comModel = new ComModel();
const likeModel = new LikeModel();
//------logique métier commentaires------

exports.createCom = (req, res, next) => {

    const reqBody = sanitize(req.body);
    const userIdAuth = sanitize(req.userIdAuth);
    const reqParamsId = sanitize(req.params.id);

    if (reqBody.comContenu === undefined) {
        return res.status(400).json({ message: '*Champ obligatoire, le contenu doit contenir au minimum 2 charactères !' });
    };

    comModel.save(userIdAuth, reqParamsId, reqBody.comContenu)
        .then(() => {
            res.status(201).json({ status: 201, message: 'Commentaire enregisté !' });
        }).catch(() => res.status(500).json({ status: 500, message: 'Le serveur rencontre un problème réessayez dans un moment !' }));
};


//----recuperer tous post de la BDD----
exports.displayCom = (req, res, next) => {
    const reqParamsId = sanitize(req.params.id);

    comModel.findAll(reqParamsId)
        .then(response => {
            res.status(201).json(response);
        }).catch(() => res.status(404).json({ status: 404, message: 'Cette resource n\'existe pas ou est inaccessible pour le moment !' }));
}; //fin exports


//----recuperer un post par son ID----

exports.displayComId = (req, res, next) => {
    const reqParamsComId = sanitize(req.params.comId);

    comModel.findOneJoint('coms', 'comId', reqParamsComId)
        .then(response => {
            res.status(201).json(response);
        }).catch(() => res.status(404).json({ status: 404, message: 'Cette resource n\'existe pas ou est inaccessible pour le moment !' }));
}; //fin exports

//----suppresion  d'un post par son ID----
exports.deleteComId = (req, res, next) => {

    const reqParamsComId = sanitize(req.params.comId);
    const userIdAuth = sanitize(req.userIdAuth);

    comModel.findOne('users', 'id', userIdAuth)
        .then(response => {

            const userIdRec = response[0].id;
            const roleRec = response[0].role;

            comModel.findOne('coms', 'comId', reqParamsComId)
                .then(response => {

                    if (response[0].userId === userIdRec || roleRec === 1) {
                        comModel.deleteOne(reqParamsComId)
                            .then(() => {
                                res.status(200).json({ message: 'Commentaire bien supprimé !' });
                            }).catch(() => res.status(400).json({ status: 400, message: 'Le commentaire na pas été supprimé !' }));
                    } else {
                        res.status(403).json({ status: 403, message: 'Suppression impossible ,vous n\'êtes pas sont auteur !' });
                    };
                }).catch(() => res.status(404).json({ status: 404, message: 'Cette resource n\'existe pas ou est inaccessible pour le moment !' }));
        }).catch(() => res.status(404).json({ status: 404, message: 'Cette resource n\'existe pas ou est inaccessible pour le moment !' }));
}; //fin exports

exports.updateComId = (req, res, next) => {
    const reqBody = sanitize(req.body);
    const reqParamsComId = sanitize(req.params.comId);
    const userIdAuth = sanitize(req.userIdAuth);

    if (reqBody.comContenu === undefined) {
        return res.status(400).json({ message: '*champ obligatoire, le contenu doit contenir au minimum 2 charactères !' });
    };
    comModel.findOne('users', 'id', userIdAuth)
        .then(response => {

            const userIdRec = response[0].id;
            const roleRec = response[0].role;


            comModel.findOne('coms', 'comId', reqParamsComId)
                .then(response => {
                    if (response[0].userId === userIdRec || roleRec === 1) {

                        comModel.updateOne(reqBody.comContenu, reqParamsComId)
                            .then(() => {
                                res.status(200).json({ status: 200, message: 'Commentaire bien mis a jour !' });
                            }).catch(() => res.status(400).json({ status: 400, message: 'Le commentaire n\'est pas mis a jour !' }));
                    } else {
                        res.status(403).json({ status: 403, message: 'Modification impossible ,vous n\'êtes pas sont auteur !' });
                    };
                }).catch(() => res.status(404).json({ status: 404, message: 'Cette resource n\'existe pas ou est inaccessible pour le moment !' }));
        }).catch(() => res.status(404).json({ status: 404, message: 'Cette resource n\'existe pas ou est inaccessible pour le moment !' }));
}; //fin exports


exports.likeCom = (req, res, next) => {
    const reqBody = sanitize(req.body);
    const reqParamsComId = sanitize(req.params.comId);
    const userIdAuth = sanitize(req.userIdAuth);

    if (reqBody.userId === undefined) {
        return res.status(400).json({ status: 400, message: 'Vous n\'etes pas identifié !' });
    };
    if (reqBody.like === undefined) {
        return res.status(400).json({ status: 400, message: 'Il manque votre appréciation dans votre demande !' });
    };

    if (reqBody.like) {

        likeModel.likeFindOne('comLikes', 'userId', userIdAuth, 'comId', reqParamsComId)
            .then((response) => {

                if (reqBody.like === 1) {
                    if (response[0] === undefined) {
                        likeModel.likeSave('comLikes', 'comId', 'userId', 'comLikeValeur', reqParamsComId, reqBody.userId, reqBody.like)
                            .then(() => {
                                likeModel.likeUpdateOne('coms', 'comLikes', 'comLikes+1', 'comId', reqParamsComId)
                                    .then(() => {
                                        res.status(201).json({ status: 201, message: 'like enregistré !' });
                                    }).catch(() => res.status(400).json({ status: 400, message: 'Une erreur est survenue,le like  n\'est pas enregisté !' }));
                            }).catch(() => res.status(500).json({ status: 500, message: 'Le serveur rencontre un problème réessayez dans un moment !' }));

                    } else if (response[0].comLikeValeur === 1) {
                        likeModel.likeDeleteOne('comLikes', 'comId', reqParamsComId, 'userId', reqBody.userId)
                            .then(() => {
                                likeModel.likeUpdateOne('coms', 'comLikes', 'comLikes-1', 'comId', reqParamsComId)
                                    .then(() => {
                                        res.status(201).json({ status: 201, message: 'Like supprimé !' });
                                    }).catch(() => res.status(400).json({ status: 400, message: 'Une erreur est survenue, like n\'est pas supprimé !' }));
                            }).catch(() => res.status(400).json({ status: 400, message: 'Une erreur est survenue, like n\'est pas supprimé !' }));

                    } else if (response[0].comLikeValeur === -1) {

                        likeModel.likeDeleteOne('comlikes', 'comId', reqParamsComId, 'userId', reqBody.userId)
                            .then(() => {
                                likeModel.likeUpdateOne('coms', 'comDislikes', 'comDislikes-1', 'comId', reqParamsComId)
                                    .then(() => {
                                        likeModel.likeSave('comlikes', 'comId', 'userId', 'comLikeValeur', reqParamsComId, reqBody.userId, reqBody.like)
                                            .then(() => {
                                                likeModel.likeUpdateOne('coms', 'comLikes', 'comLikes+1', 'comId', reqParamsComId)
                                                    .then(() => {
                                                        res.status(201).json({ status: 201, message: 'like enregistré !' });
                                                    }).catch(() => res.status(400).json({ status: 400, message: 'Une erreur est survenue,le like  n\'est pas enregisté !' }));
                                            }).catch(() => res.status(500).json({ status: 500, message: 'Le serveur rencontre un problème réessayez dans un moment !' }));

                                    }).catch(() => res.status(400).json({ status: 400, message: 'Une erreur est survenue, dislike n\'est pas supprimé !' }));
                            }).catch(() => res.status(400).json({ status: 400, message: 'Une erreur est survenue, dislike n\'est pas supprimé !' }));
                    };
                };

                if (reqBody.like === -1) {

                    if (response[0] === undefined) {

                        likeModel.likeSave('comlikes', 'comId', 'userId', 'comLikeValeur', reqParamsComId, reqBody.userId, reqBody.like)

                        .then(() => {
                            likeModel.likeUpdateOne('coms', 'comDislikes', 'comDislikes+1', 'comId', reqParamsComId)
                                .then(() => {
                                    res.status(201).json({ status: 201, message: 'Dislike enregistré !' });
                                }).catch(() => res.status(400).json({ status: 400, message: 'Une erreur est survenue,le dislike  n\'est pas enregisté !' }));
                        }).catch(() => res.status(500).json({ status: 500, message: 'Le serveur rencontre un problème réessayez dans un moment !' }));

                    } else if (response[0].comLikeValeur === 1) {
                        likeModel.likeDeleteOne('comlikes', 'comId', reqParamsComId, 'userId', reqBody.userId)
                            .then(() => {
                                likeModel.likeUpdateOne('coms', 'comLikes', 'comLikes-1', 'comId', reqParamsComId)
                                    .then(() => {
                                        likeModel.likeSave('comlikes', 'comId', 'userId', 'comLikeValeur', reqParamsComId, reqBody.userId, reqBody.like)
                                            .then(() => {
                                                likeModel.likeUpdateOne('coms', 'comDislikes', 'comDislikes+1', 'comId', reqParamsComId)
                                                    .then(() => {
                                                        res.status(201).json({ status: 201, message: 'like enregistré !' });
                                                    }).catch(() => res.status(400).json({ status: 400, message: 'Une erreur est survenue,le like  n\'est pas enregisté !' }));
                                            }).catch(() => res.status(500).json({ status: 500, message: 'Le serveur rencontre un problème réessayez dans un moment !' }));

                                    }).catch(() => res.status(400).json({ status: 400, message: 'Une erreur est survenue,le like  n\'est pas enregisté !' }));
                            }).catch(() => res.status(400).json({ status: 400, message: 'Une erreur est survenue,le dislike  n\'est pas supprimé !' }));

                    } else if (response[0].comLikeValeur === -1) {
                        likeModel.likeDeleteOne('comLikes', 'comId', reqParamsComId, 'userId', reqBody.userId)
                            .then(() => {
                                likeModel.likeUpdateOne('coms', 'comDislikes', 'comDislikes-1', 'comId', reqParamsComId)
                                    .then(() => {
                                        res.status(201).json({ status: 201, message: 'Dislike supprimé !' });
                                    }).catch(() => res.status(400).json({ status: 400, message: 'Une erreur est survenue,le dislike  n\'est pas supprimé !' }));
                            }).catch(() => res.status(400).json({ status: 400, message: 'Une erreur est survenue,le dislike  n\'est pas supprimé !' }));
                    };
                };
            }).catch(() => res.status(404).json({ status: 404, message: 'Une erreur est survenue,cette ressource n\'est pas disponible pour le moment !' }));
    } else {
        res.status(400).json({ status: 400, message: 'La syntaxe de la requête est erronée !' });
    };
}; //fin likeSauce