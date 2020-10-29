const db = require('../request');
//const mysql = require('mysql');

class PostsModel {
    constructor() {};

    save(userId, titre, contenu, image) {
        const sql = `INSERT INTO posts (userid ,titre, contenu, dateCrea, dateModif,imageUrl, likes ,dislikes) VALUES ('${userId}','${titre}', '${contenu}',now(),now(),'${image}',0,0)`;
        return new Promise((resolve) => {
            db.query(sql, function(err, result, fields) {
                //if (err) throw err;

                resolve(result);


            });
        });
    }; //fin de save


    findAll() {
        let sql = `SELECT * FROM posts INNER JOIN users ON userId = id`;
        return new Promise((resolve) => {
            db.query(sql, function(err, result, fields) {

                resolve(result);

            });
        });
    }; //fin de findAll

    findOne(table, idType, paramsId) {
        let sql = `SELECT * FROM ${table} INNER JOIN users ON userId = id WHERE ${idType}=${paramsId}`;
        return new Promise((resolve) => {
            db.query(sql, (err, result, fields) => {

                resolve(result);

            });
        });
    }; //fin de findOne

    deleteOne(paramsId) {
        const sql = `DELETE FROM posts WHERE postId='${paramsId}'`;
        return new Promise((resolve) => {
            db.query(sql, (err, result, fields) => {

                resolve(result);

            });
        });
    }; //fin de deleteOne

    updateOne(titre, contenu, image, paramsId) {
        const sql = `UPDATE posts SET titre='${titre}', contenu='${contenu}', dateModif=now(), imageUrl='${image}' WHERE postId='${paramsId}'`;

        return new Promise((resolve) => {
            db.query(sql, (err, result, fields) => {

                resolve(result);

            });
        });
    }; //fin de updateOne

};

module.exports = PostsModel;