const db = require('../request');
const Cryptr = require('cryptr');

const cryptr = new Cryptr('@le&Petit%Chat#BoitDu&Laid%De#Poule&Tous%Les#Noel');


class UserModel {
    constructor() {}

    findAll() {
        try {
            const sql = `SELECT * FROM users`;
            return new Promise((resolve) => {
                db.query(sql, (err, result, fields) => {
                    if (result === undefined) {
                        resolve(err = 'La syntaxe de la requête est erronée');
                    } else {
                        resolve(result);
                    };
                });
            });
        } catch (error) { console.error(error); };

    }; //fin de findAll

    findOneLog(value1, value2) {
        try {
            const sql = `SELECT * FROM users  WHERE ${value1}='${value2}'`;
            return new Promise((resolve) => {
                db.query(sql, (err, result, fields) => {
                    resolve(result)

                });
            });
        } catch (error) { console.error(error); };

    }; //fin de findOne

    findOne(value1, value2) {
        try {
            const sql = `SELECT * FROM users  WHERE ${value1}='${value2}'`;
            return new Promise((resolve) => {
                db.query(sql, (err, result, fields) => {
                    if (result === undefined) {
                        resolve(err = 'La syntaxe de la requête est erronée');
                    } else if (result[0] === undefined) {
                        resolve(err = 'La syntaxe de la requête est erronée');
                    } else {
                        const nom = result[0].nom;
                        const prenom = result[0].prenom;
                        const email = result[0].emailRec;

                        const decryptNom = cryptr.decrypt(nom);
                        const decryptPrenom = cryptr.decrypt(prenom);
                        const decryptEmail = cryptr.decrypt(email);

                        const usersId = {
                            nom: decryptNom,
                            prenom: decryptPrenom,
                            email: result[0].email,
                            emailMask: result[0].emailMask,
                            password: result[0].password,
                            dateInscrip: result[0].dateInscrip,
                            role: result[0].role,
                            id: result[0].id,
                            dateModif: result[0].dateModif,
                            emailRec: decryptEmail
                        };
                        resolve(usersId)
                    };
                });
            });
        } catch (error) { console.error(error); };

    }; //fin de findOne

    save(nom, prenom, emailH, emailM, password, role, emailR) {
        try {
            const sql = `INSERT INTO users (nom, prenom,  email, emailMask, password, dateInscrip, role, dateModif, emailRec  ) VALUES ('${nom}','${prenom}','${emailH}','${emailM}','${password}',NOW(),${role},NOW(),'${emailR}')`;
            return new Promise((resolve) => {
                db.query(sql, (err, result, fields) => {

                    resolve(result)
                });
            });
        } catch (error) { console.error(error); };

    }; //fin de save

    deleteOne(id) {
        try {
            const sql = `DELETE FROM users WHERE id='${id}'`;
            return new Promise((resolve) => {
                db.query(sql, (err, result, fields) => {;
                    resolve(result)
                });
            });
        } catch (error) { console.error(error); };

    }; //fin de delete

    updateOne(nom, prenom, emailH, emailM, password, role, emailR, paramsId) {
        try {
            const sql = `UPDATE users SET nom='${nom}', prenom='${prenom}' ,emailMask='${emailH}', email='${emailM}',password='${password}', role=${role}, dateModif=now(), emailRec='${emailR}' WHERE id='${paramsId}'`;
            return new Promise((resolve) => {
                db.query(sql, (err, result, fields) => {

                    resolve(result)
                });
            });
        } catch (error) { console.error(error); };

    }; //fin de update

};
module.exports = UserModel;