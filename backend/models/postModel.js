const db = require('../request');
const mysql = require('mysql');

class PostsModels {
    constructor() {};

    findAll() {
        let sql = `SELECT * FROM posts`;
        return new Promise((resolve) => {
            db.query(sql, function(err, result, fields) {
                if (err) throw err;
                resolve(result)
            });
        });
    }; //fin de  findAll

    findOne() {
        let sql = `SELECT * FROM posts WHERE id='${req.params.id}'`;
        return new Promise((resolve) => {
            db.query(sql, (err, result, fields) => {
                if (err) throw err;
                resolve(result)
            });
        });
    }; //fin de  findOne
};