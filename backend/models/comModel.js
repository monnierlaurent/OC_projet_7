const db = require('../request');

class ComsModel {
    constructor() {};

    save(userId, paramsId, contenu) {
        const sqlPost = `INSERT INTO coms (userId ,postId, comContenu, comDateCrea, comDateModif, comLikes ,comDislikes) VALUES ('${userId}','${paramsId}','${contenu}',now(),now(),0,0)`;
        return new Promise((resolve) => {
            db.query(sql, function(err, result, fields) {
                //if (err) throw err;
                resolve(result);
            });
        });
    }; //fin de save


    findAll(paramsId) {
        const sql = `SELECT * FROM coms WHERE postId='${paramsId}'`;
        return new Promise((resolve) => {
            db.query(sql, function(err, result, fields) {
                resolve(result);
            });
        });
    }; //fin de findAll

    findOne(table, idType, paramsComId) {
        const sql = `SELECT * FROM ${table} WHERE ${idType}='${paramsComId}'`;
        return new Promise((resolve) => {
            db.query(sql, (err, result, fields) => {
                resolve(result);
            });
        });
    }; //fin de findOne

    deleteOne(paramsComId) {
        const sqlGetId = `DELETE FROM coms WHERE comId='${paramsComId}'`;
        return new Promise((resolve) => {
            db.query(sql, (err, result, fields) => {
                resolve(result);
            });
        });
    }; //fin de deleteOne

    updateOne(contenu, paramsId) {
        const sql = `UPDATE coms SET comContenu='${contenu}', dateModif=now() WHERE comId='${paramsId}'`;
        return new Promise((resolve) => {
            db.query(sql, (err, result, fields) => {
                resolve(result);
            });
        });
    }; //fin de updateOne

};
module.exports = ComsModel;