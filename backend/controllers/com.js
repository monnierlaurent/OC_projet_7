const sanitize = require('mongo-sanitize');
const ComModel = require('../models/comModel')
const db = require('../request');

const comModel = new ComModel();

//------logique métier commentaires------

exports.createCom = (req, res, next) => {

    const reqBody = sanitize(req.body);
    const userIdAuth = sanitize(req.userIdAuth);
    const reqParamsId = sanitize(req.params.id);

    if (reqBody.comContenu === undefined) {
        return res.status(400).json({ error: 'La syntaxe de la requête est erronée !' });
    };
    userId, paramsId, contenu
    comModel.save(userIdAuth, reqParamsId, reqBody.comContenu)
        .then(response => {
            res.status(201).json(response);
        }); //faire un catch
};


//----recuperer tous post de la BDD----
exports.displayCom = (req, res, next) => {
    const reqParamsId = sanitize(req.params.id);

    comModel.findAll(reqParamsId)
        .then(response => {
            res.status(201).json(response);
        }); //faire un catch
}; //fin exports


//----recuperer un post par son ID----

exports.displayComId = (req, res, next) => {
    const reqParamsComId = sanitize(req.params.comId);

    comModel.findOne('coms', 'comId', reqParamsComId)
        .then(response => {
            res.status(201).json(response);
        }); //faire un catch
}; //fin exports

//----suppresion  d'un post par son ID----
exports.deleteComId = (req, res, next) => {

    const reqParamsComId = sanitize(req.params.comId);
    //const reqParamsId = sanitize(req.params.id);
    //const reqBody = sanitize(req.body);
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
                            }); //faire un catch
                    } else {
                        res.status(403).json({ error: 'suppression impossible ,vous n\'êtes pas sont auteur !' });
                    };
                }); //faire un catch
        }); //faire un catch
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

            contenu, paramsId
            comModel.findOne('coms', 'comId', reqParamsComId)
                .then(response => {
                    if (response[0].userId === userIdRec || roleRec === 1) {
                        comModel.updateOne(reqBody.contenu, reqParamsComId)
                            .then(() => {
                                res.status(200).json({ message: 'coms bien mis a jour !' });
                            }); //faire un catch
                    } else {
                        res.status(403).json({ error: 'modification impossible ,vous n\'êtes pas sont auteur !' });
                    };
                }); //faire un catch
        }); //faire un catch
}; //fin exports


exports.likeCom = (req, res, next) => {
    const reqBody = sanitize(req.body);
    const reqParamsId = sanitize(req.params.id);
    const reqParamsComId = sanitize(req.params.comId);

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

                        const sqlLikeCount = `UPDATE coms SET comLikes=comLikes+1 WHERE comId='${reqParamsComId}'`;
                        console.log(sqlLikeCount);
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

                        const sqlDilsikeCount = `UPDATE coms SET comDislikes=comDislikes+1 WHERE comId='${reqParamsComId}'`;
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
                        const sqllikeOff = `UPDATE coms SET comLikes=comLikes-1 WHERE comId='${reqParamsComId}'`;
                        db.query(sqllikeOff, function(err, results) {
                            res.status(201).json({ message: 'Like supprimé !' });
                        });
                    });
                };
                if (data.includes(likeNegatif)) {
                    db.query(sqlDeleteLike, function(err, results) {
                        const sqlDislikeOff = `UPDATE coms SET comDislikes=comDislikes-1 WHERE comId='${reqParamsComId}'`;
                        db.query(sqlDislikeOff, function(err, results) {
                            res.status(201).json({ message: 'Dislike supprimé !' });
                        });
                    });
                };
            };
        });
    } else {
        res.status(400).json({ error: 'La syntaxe de la requête est erronée !' });
    };
}; //fin likeSauce