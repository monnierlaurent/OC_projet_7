const db = require('../request');
const Cryptr = require('cryptr');

const cryptr = new Cryptr('@le&Petit%Chat#BoitDu&Laid%De#Poule&Tous%Les#Noel');

class PostsModel {
    constructor() {};

    save(userId, titre, contenu, image) {
        try {
            const sql = `INSERT INTO posts (userid ,titre, contenu, dateCrea, dateModif,imageUrl, likes ,dislikes) VALUES ('${userId}','${titre}', '${contenu}',now(),now(),'',0,0)`;
            return new Promise((resolve) => {
                db.query(sql, function(err, result, fields) {

                    resolve(result);
                });
            });
        } catch (error) {
            console.error(error);
        };
    }; //fin de save

    saveImg(userId, titre, contenu, image) {

        try {
            const sql = `INSERT INTO posts (userid ,titre, contenu, dateCrea, dateModif,imageUrl, likes ,dislikes) VALUES ('${userId}','${titre}', '${contenu}',now(),now(),'${image}',0,0)`;
            return new Promise((resolve) => {
                db.query(sql, function(err, result, fields) {
                    resolve(result);
                });
            });
        } catch (error) {
            console.error(error);
        };

    }; //fin de save




    findAll() {

        try {
            let sql = `SELECT * FROM posts INNER JOIN users ON userId = id ORDER BY dateCrea DESC`;
            return new Promise((resolve) => {
                db.query(sql, function(err, result, fields) {

                    const tablePost = [];
                    if (result[0] === undefined) {
                        resolve(err = 'La syntaxe de la requête est erronée')
                    } else {
                        result.forEach(rep => {

                            const nom = rep.nom;
                            const prenom = rep.prenom;
                            //const email = rep.emailRec;

                            const decryptNom = cryptr.decrypt(nom);
                            const decryptPrenom = cryptr.decrypt(prenom);
                            //const decryptEmail = cryptr.decrypt(email);

                            const allPosts = {
                                userId: rep.userId,
                                titre: rep.titre,
                                contenu: rep.contenu,
                                dateCrea: rep.dateCrea,
                                dateModif: rep.dateModif,
                                imageUrl: rep.imageUrl,
                                likes: rep.likes,
                                dislikes: rep.dislikes,
                                postId: rep.postId,
                                nom: decryptNom,
                                prenom: decryptPrenom,
                                avatar: rep.avatar
                                    //email: rep.email,
                                    //emailMask: rep.emailMask,
                                    //password: rep.password,
                                    //dateInscrip: rep.dateInscrip,
                                    //role: rep.role,
                                    //id: rep.id,
                                    //emailRec: decryptEmail
                            };

                            tablePost.push(allPosts);
                        });
                    };
                    resolve(tablePost);
                });
            });
        } catch (error) {
            console.error(error);
        };

    }; //fin de findAll

    findOne(table, idType, paramsId) {

        try {
            let sql = `SELECT * FROM ${table}  WHERE ${idType}=${paramsId}`;
            return new Promise((resolve) => {
                db.query(sql, (err, result, fields) => {
                    resolve(result);

                });
            });
        } catch (error) {
            console.error(error);
        };

    }; //fin de findOne

    findOneAll(table, idType, paramsId) {

        try {
            let sql = `SELECT * FROM ${table} INNER JOIN users ON userId = id WHERE ${idType}=${paramsId}`;
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

                        const allPosts = {
                            userId: result[0].userId,
                            titre: result[0].titre,
                            contenu: result[0].contenu,
                            dateCrea: result[0].dateCrea,
                            dateModif: result[0].dateModif,
                            imageUrl: result[0].imageUrl,
                            likes: result[0].likes,
                            dislikes: result[0].dislikes,
                            postId: result[0].postId,
                            nom: decryptNom,
                            prenom: decryptPrenom,
                            avatar: result[0].avatar,
                            //email: result[0].email,
                            //emailMask: result[0].emailMask,
                            //password: result[0].password,
                            //dateInscrip: result[0].dateInscrip,
                            //role: result[0].role,
                            //id: result[0].id,
                            //emailRec: decryptEmail
                        };
                        resolve(allPosts);
                    };
                });
            });
        } catch (error) {
            console.error(error);
        };

    }; //fin de findOne

    deleteOne(paramsId) {

        try {
            const sql = `DELETE FROM posts WHERE postId='${paramsId}'`;
            return new Promise((resolve) => {
                db.query(sql, (err, result, fields) => {

                    resolve(result);

                });
            });
        } catch (error) {
            console.error(error);
        };

    }; //fin de deleteOne

    updateOne(titre, contenu, image, paramsId) {

        try {
            const sql = `UPDATE posts SET titre='${titre}', contenu='${contenu}', dateModif=now(), imageUrl='${image}' WHERE postId='${paramsId}'`;

            return new Promise((resolve) => {
                db.query(sql, (err, result, fields) => {

                    resolve(result);
                });
            });
        } catch (error) {
            console.error(error);
        };
    }; //fin de updateOne

    findOnedate() {

        try {
            let sql = `SELECT * FROM posts INNER JOIN users ON userId = id ORDER BY dateCrea DESC LIMIT 1`;
            return new Promise((resolve) => {
                db.query(sql, function(err, result, fields) {

                    const tablePost = [];
                    if (result[0] === undefined) {
                        resolve(err = 'La syntaxe de la requête est erronée')
                    } else {
                        result.forEach(rep => {

                            const nom = rep.nom;
                            const prenom = rep.prenom;
                            //const email = rep.emailRec;

                            const decryptNom = cryptr.decrypt(nom);
                            const decryptPrenom = cryptr.decrypt(prenom);
                            //const decryptEmail = cryptr.decrypt(email);

                            const allPosts = {
                                userId: rep.userId,
                                titre: rep.titre,
                                contenu: rep.contenu,
                                dateCrea: rep.dateCrea,
                                dateModif: rep.dateModif,
                                imageUrl: rep.imageUrl,
                                likes: rep.likes,
                                dislikes: rep.dislikes,
                                postId: rep.postId,
                                nom: decryptNom,
                                prenom: decryptPrenom,
                                avatar: rep.avatar
                                    //email: rep.email,
                                    //emailMask: rep.emailMask,
                                    //password: rep.password,
                                    //dateInscrip: rep.dateInscrip,
                                    //role: rep.role,
                                    //id: rep.id,
                                    //emailRec: decryptEmail
                            };

                            tablePost.push(allPosts);
                        });
                    };
                    resolve(tablePost);
                });
            });
        } catch (error) {
            console.error(error);
        };

    }; //fin de findAll
};


module.exports = PostsModel;