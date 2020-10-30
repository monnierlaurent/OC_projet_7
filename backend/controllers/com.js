const sanitize = require('mongo-sanitize');
//const db = require('../request');

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
        return res.status(400).json({ error: 'La syntaxe de la requête est erronée !' });
    };

    comModel.save(userIdAuth, reqParamsId, reqBody.comContenu)
        .then(() => {
            res.status(201).json({ message: 'commentaire enregisté !' });
        }).catch(() => res.status(500).json({ error: 'La syntaxe de la requête est erronée' }));
};


//----recuperer tous post de la BDD----
exports.displayCom = (req, res, next) => {
    const reqParamsId = sanitize(req.params.id);

    comModel.findAll(reqParamsId)
        .then(response => {
            res.status(201).json(response);
        }).catch(() => res.status(404).json({ error: 'cette resource n\'existe pas !' }));
}; //fin exports


//----recuperer un post par son ID----

exports.displayComId = (req, res, next) => {
    const reqParamsComId = sanitize(req.params.comId);

    comModel.findOneJoint('coms', 'comId', reqParamsComId)
        .then(response => {
            res.status(201).json(response);
        }).catch(() => res.status(404).json({ error: 'cette resource n\'existe pas !' }));
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
                                res.status(200).json({ message: 'coms bien supprimé !' });
                            }).catch(() => res.status(400).json({ error: 'La syntaxe de la requête est erronée' }));
                    } else {
                        res.status(403).json({ error: 'suppression impossible ,vous n\'êtes pas sont auteur !' });
                    };
                }).catch(() => res.status(404).json({ error: 'cette resource n\'existe pas !' }));
        }).catch(() => res.status(404).json({ error: 'cette resource n\'existe pas !' }));
}; //fin exports

exports.updateComId = (req, res, next) => {
    const reqBody = sanitize(req.body);
    const reqParamsComId = sanitize(req.params.comId);
    const userIdAuth = sanitize(req.userIdAuth);

    if (reqBody.comContenu === undefined) {
        return res.status(400).json({ error: 'La syntaxe de la requête est erronée !' });
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
                                res.status(200).json({ message: 'coms bien mis a jour !' });
                            }).catch(() => res.status(400).json({ error: 'La syntaxe de la requête est erronée' }));
                    } else {
                        res.status(403).json({ error: 'modification impossible ,vous n\'êtes pas sont auteur !' });
                    };
                }).catch(() => res.status(404).json({ error: 'cette resource n\'existe pas !' }));
        }).catch(() => res.status(404).json({ error: 'cette resource n\'existe pas !' }));
}; //fin exports


exports.likeCom = (req, res, next) => {
    const reqBody = sanitize(req.body);
    const reqParamsComId = sanitize(req.params.comId);
    const userIdAuth = sanitize(req.userIdAuth);

    if (reqBody.userId === undefined || reqBody.like === undefined) {
        return res.status(400).json({ error: 'La syntaxe de la requête est erronée !' });
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
                                        res.status(201).json({ message: 'like enregistré !' });
                                    }).catch(() => res.status(400).json({ error: 'La syntaxe de la requête est erronée' }));
                            }).catch(() => res.status(500).json({ error: 'La syntaxe de la requête est erronée' }));
                    } else if (response[0].comLikeValeur === 1) {
                        res.status(201).json({ message: 'Vous avez déja liké !' });
                    } else if (response[0].comLikeValeur === -1) {
                        res.status(201).json({ message: 'Vous avez déja disliké !' });
                    };
                };

                if (reqBody.like === -1) {
                    if (response[0] === undefined) {
                        likeModel.likeSave('comLikes', 'comId', 'userId', 'comLikeValeur', reqParamsComId, reqBody.userId, reqBody.like)
                            .then(() => {
                                likeModel.likeUpdateOne('coms', 'comDislikes', 'comDislikes+1', 'comId', reqParamsComId)
                                    .then(() => {
                                        res.status(201).json({ message: 'Dislike enregistré !' });
                                    }).catch(() => res.status(400).json({ error: 'La syntaxe de la requête est erronée' }));
                            }).catch(() => res.status(500).json({ error: 'La syntaxe de la requête est erronée' }));
                    } else if (response[0].comLikeValeur === 1) {
                        res.status(201).json({ message: 'Vous avez déja liké !' });
                    } else if (response[0].comLikeValeur === -1) {
                        res.status(201).json({ message: 'Vous avez déja disliké !' });
                    };
                };

                if (reqBody.like === 2) {

                    if (response[0] === undefined) {
                        return res.status(400).json({ error: 'Vous n\'avez aucuns likes ou dislikes a supprimer !!' });
                    };
                    if (response[0].comLikeValeur === 1) {

                        likeModel.likeDeleteOne('comLikes', 'comId', reqParamsComId, 'userId', reqBody.userId)
                            .then(() => {
                                likeModel.likeUpdateOne('coms', 'comLikes', 'comLikes-1', 'comId', reqParamsComId)
                                    .then(() => {
                                        res.status(201).json({ message: 'Like supprimé !' });
                                    }).catch(() => res.status(400).json({ error: 'La syntaxe de la requête est erronée' }));
                            }).catch(() => res.status(400).json({ error: 'La syntaxe de la requête est erronée' }));
                    };
                    if (response[0].comLikeValeur === -1) {
                        likeModel.likeDeleteOne('comLikes', 'comId', reqParamsComId, 'userId', reqBody.userId)
                            .then(() => {
                                likeModel.likeUpdateOne('coms', 'comDislikes', 'comDislikes-1', 'comId', reqParamsComId)
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