const db = require('../request');

const Cryptr = require('cryptr');

const cryptr = new Cryptr('@le&Petit%Chat#BoitDu&Laid%De#Poule&Tous%Les#Noel');

class ComsModel {
    constructor() {};

    save(userId, paramsId, contenu) {
        const sql = `INSERT INTO coms (userId ,postId, comContenu, comDateCrea, comDateModif, comLikes ,comDislikes) VALUES ('${userId}','${paramsId}','${contenu}',now(),now(),0,0)`;
        return new Promise((resolve) => {
            db.query(sql, function(err, result, fields) {
                //if (err) throw err;
                resolve(result);
            });
        });
    }; //fin de save

    findAll(paramsId) {
        const sql = `SELECT * FROM coms INNER JOIN users ON userId = id WHERE postId='${paramsId}' ORDER BY comDateCrea DESC`;
        return new Promise((resolve) => {
            db.query(sql, function(err, result, fields) {

                const tablePost = [];

                result.forEach(rep => {

                    const nom = rep.nom;
                    const prenom = rep.prenom;
                    const email = rep.emailRec;

                    const decryptNom = cryptr.decrypt(nom);
                    const decryptPrenom = cryptr.decrypt(prenom);
                    const decryptEmail = cryptr.decrypt(email);

                    const allComs = {
                        comId: rep.comId,
                        userId: rep.userId,
                        postId: rep.postId,
                        comContenu: rep.comContenu,
                        comDateCrea: rep.comDateCrea,
                        comDateModif: rep.comDateModif,
                        comLikes: rep.comLikes,
                        comDislikes: rep.comDislikes,
                        nom: decryptNom,
                        prenom: decryptPrenom,
                        //email: rep.email,
                        //emailMask: rep.emailMask,
                        //password: rep.password,
                        //dateInscrip: rep.dateInscrip,
                        //role: rep.role,
                        //id: rep.id,
                        //dateModif: rep.dateModif,
                        //emailRec: decryptEmail
                    };

                    tablePost.push(allComs);
                });

                resolve(tablePost);
            });
        });
    }; //fin de findAll

    findOne(table, idType, paramsComId) {
        const sql = `SELECT * FROM ${table} INNER JOIN users ON userId = id WHERE ${idType}='${paramsComId}'`;
        return new Promise((resolve) => {
            db.query(sql, (err, result, fields) => {

                const nom = result[0].nom;
                const prenom = result[0].prenom;
                const email = result[0].emailRec;

                const decryptNom = cryptr.decrypt(nom);
                const decryptPrenom = cryptr.decrypt(prenom);
                const decryptEmail = cryptr.decrypt(email);

                const allComs = {
                    comId: result[0].comId,
                    userId: result[0].userId,
                    postId: result[0].postId,
                    comContenu: result[0].comContenu,
                    comDateCrea: result[0].comDateCrea,
                    comDateModif: result[0].comDateModif,
                    comLikes: result[0].comLikes,
                    comDislikes: result[0].comDislikes,
                    nom: decryptNom,
                    prenom: decryptPrenom,
                    //email: result[0].email,
                    //emailMask: result[0].emailMask,
                    //password: result[0].password,
                    //dateInscrip: result[0].dateInscrip,
                    //role: result[0].role,
                    //id: result[0].id,
                    //dateModif: result[0].dateModif,
                    //emailRec: decryptEmail
                };

                resolve(allComs);
            });
        });
    }; //fin de findOne

    deleteOne(paramsComId) {
        const sql = `DELETE FROM coms WHERE comId='${paramsComId}'`;
        return new Promise((resolve) => {
            db.query(sql, (err, result, fields) => {
                resolve(result);
            });
        });
    }; //fin de deleteOne

    updateOne(contenu, paramsComId) {
        const sql = `UPDATE coms SET comContenu='${contenu}', comDateModif=now() WHERE comId=${paramsComId}`;
        return new Promise((resolve) => {
            db.query(sql, (err, result, fields) => {
                resolve(result);
            });
        });
    }; //fin de updateOne

};
module.exports = ComsModel;