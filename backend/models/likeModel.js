const db = require('../request');

class LikesModel {
    constructor() {};

    likeFindOne(table, idType, userId, idType2, paramsId) {
        const sql = `SELECT * FROM ${table} WHERE ${idType}='${userId}' AND ${idType2}=${paramsId}`;
        return new Promise((resolve) => {
            db.query(sql, function(err, result, fields) {
                resolve(result);
            });
        });
    }; //fin de findAll

    likeSave(table, champ1, champ2, champ3, paramsId, userId, valeurLike) {
        const sql = `INSERT INTO ${table} (${champ1},${champ2},${champ3}) VALUES (${paramsId},${userId},${valeurLike})`;
        return new Promise((resolve) => {
            db.query(sql, function(err, result, fields) {
                resolve(result);
            });
        });
    }; //fin de findAll

    likeUpdateOne(table, champ, valeur, idType2, reqParamsId) {
        const sql = `UPDATE ${table} SET ${champ}=${valeur} WHERE ${idType2}='${reqParamsId}'`;
        return new Promise((resolve) => {
            db.query(sql, function(err, result, fields) {
                resolve(result);
            });
        });
    }; //fin de findAll


    likeDeleteOne(table, idType1, paramsId, idType2, userId) {
        const sql = `DELETE FROM ${table} WHERE ${idType1}='${paramsId}' AND ${idType2}='${userId}'`;
        return new Promise((resolve) => {
            db.query(sql, function(err, result, fields) {
                resolve(result);
            });
        });
    }; //fin de findAll
};

module.exports = LikesModel;