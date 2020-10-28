const db = require('../request');

class ComsModel {
    constructor() {};
    findAll() {
        let sql = `SELECT * FROM coms`;
        return new Promise((resolve) => {
            db.query(sql, function(err, result, fields) {

                resolve(result);
            });
        });
    }; //fin de findAll

    findOne(table, idType, paramsId) {
        let sql = `SELECT * FROM ${table} WHERE ${idType}=${paramsId}`;
        return new Promise((resolve) => {
            db.query(sql, (err, result, fields) => {

                resolve(result);
            });
        });
    }; //fin de findOne

};
module.exports = ComsModel;