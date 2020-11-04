const db = require('../request');

class LikesModel {
    constructor() {};

    likeFindOne(table, idType, userId, idType2, paramsId) {
        try {
            const sql = `SELECT * FROM ${table} WHERE ${idType}='${userId}' AND ${idType2}=${paramsId}`;
            return new Promise((resolve) => {
                db.query(sql, function(err, result, fields) {
                    resolve(result);
                });
            });
        } catch (error) { console.error(error); };

    }; //fin de findAll

    likeSave(table, champ1, champ2, champ3, paramsId, userId, valeurLike) {
        try {
            const sql = `INSERT INTO ${table} (${champ1},${champ2},${champ3}) VALUES (${paramsId},${userId},${valeurLike})`;
            return new Promise((resolve) => {
                db.query(sql, function(err, result, fields) {
                    resolve(result);
                });
            });
        } catch (error) { console.error(error); };

    }; //fin de findAll

    likeUpdateOne(table, champ, valeur, idType2, reqParamsId) {
        try {
            const sql = `UPDATE ${table} SET ${champ}=${valeur} WHERE ${idType2}='${reqParamsId}'`;
            return new Promise((resolve) => {
                db.query(sql, function(err, result, fields) {
                    resolve(result);
                });
            });
        } catch (error) { console.error(error); };

    }; //fin de findAll


    likeDeleteOne(table, idType1, paramsId, idType2, userId) {
        try {
            const sql = `DELETE FROM ${table} WHERE ${idType1}='${paramsId}' AND ${idType2}='${userId}'`;
            return new Promise((resolve) => {
                db.query(sql, function(err, result, fields) {
                    resolve(result);
                });
            });
        } catch (error) { console.error(error); };

    }; //fin de findAll
};

module.exports = LikesModel;