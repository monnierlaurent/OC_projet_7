const db = require('../request');
//const mysql = require('mysql');

class UserModel {
    constructor() {}

    findAll() {
        const sql = `SELECT * FROM users`;
        return new Promise((resolve) => {
            db.query(sql, (err, result, fields) => {
                if (err) throw err;
                resolve(result)
            });
        });
    }; //fin de findAll

    findOne(value1, value2) {
        const sql = `SELECT * FROM users WHERE ${value1}='${value2}'`;
        return new Promise((resolve) => {
            db.query(sql, (err, result, fields) => {
                if (err) throw err;
                resolve(result)
            });
        });
    }; //fin de findOne

    save(nom, prenom, emailH, emailM, password, role, emailR) {
        const sql = `INSERT INTO users (nom, prenom,  email, emailMask, password, dateInscrip, role, dateModif, emailRec  ) VALUES ('${nom}','${prenom}','${emailH}','${emailM}','${password}',NOW(),${role},NOW(),'${emailR}')`;
        return new Promise((resolve) => {
            db.query(sql, (err, result, fields) => {
                if (err) throw err;
                resolve(result)
            });
        });
    }; //fin de save

    deleteOne(id) {
        const sql = `DELETE FROM users WHERE id='${id}'`;
        return new Promise((resolve) => {
            db.query(sql, (err, result, fields) => {
                if (err) throw err;
                resolve(result)
            });
        });
    }; //fin de delete

    updateOne(nom, prenom, emailH, emailM, password, role, emailR, paramsId) {
        const sql = `UPDATE users SET nom='${nom}', prenom='${prenom}' ,emailMask='${emailH}', email='${emailM}',password='${password}', role=${role}, dateModif=now(), emailRec='${emailR}' WHERE id='${paramsId}'`;

        return new Promise((resolve) => {
            db.query(sql, (err, result, fields) => {
                if (err) throw err;
                resolve(result)
            });
        });
    }; //fin de update

};
module.exports = UserModel;