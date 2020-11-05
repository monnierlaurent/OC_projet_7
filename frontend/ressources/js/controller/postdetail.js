createDetailPost = () => {
    const recupStorage = sessionStorage.getItem('repAuth');
    const recupUserId3 = JSON.parse(recupStorage);

    if (recupUserId3 === null) {
        modals('Vous n\avez pas accès a cette ressource !', 'Inscription', './signup.html');
    } else {
        createNavrbar(recupUserId3.userId);

        const urlPost = 'http://localhost:3000/api/post/' + (new URL(window.location.href)).searchParams.get('id');
        const datas = requestAuth(urlPost);
        datas.then(postUnique => {

            displayPostId(postUnique.nom, postUnique.prenom, postUnique.dateCrea, postUnique.titre, postUnique.contenu, postUnique.imageUrl, postUnique.likes, postUnique.dislikes, postUnique.postId);

            // gestion des likes
            const btnLike = document.getElementById('like-forum' + postUnique.postId);
            const btnDislike = document.getElementById('dislike-forum' + postUnique.postId);
            //gestion du j'aime
            btnLike.addEventListener('click', () => {
                console.log('clik j\'aime');

                likeFunction = () => {
                    const likeData = requestAuth('http://localhost:3000/api/post/' + postUnique.postId + '/like');
                    likeData.then(response => {
                        if (response.length === 0) {

                            const like = {
                                userId: recupUserId3.userId,
                                like: 1
                            };
                            const likeSend1 = sendAuthJson('http://localhost:3000/api/post/' + postUnique.postId + '/like', like);
                            likeSend1.then(response => {

                                window.location.reload();
                            });
                        }; //fin de if

                        if (response) {

                            response.forEach(likeRep => {

                                if (likeRep.userId === recupUserId3.userId, likeRep.postLikeValeur === 1) {

                                    const like = {
                                        userId: recupUserId3.userId,
                                        like: 2
                                    };
                                    const likeSend2 = sendAuthJson('http://localhost:3000/api/post/' + postUnique.postId + '/like', like);
                                    console.log(likeSend2);

                                    likeSend2.then(response => {
                                        console.log(response);
                                        window.location.reload();
                                    }); //fin de then
                                }; // fin de if
                            }); // fin de boucle
                        }; // fin de else
                    }); //tin de then

                }; //fin likeFunction
                likeFunction();
            });

            //gestion du j'aime pas
            btnDislike.addEventListener('click', () => {
                console.log('clik j\'aime pas');

                dislikeFunction = () => {
                    const likeData = requestAuth('http://localhost:3000/api/post/' + postUnique.postId + '/like');
                    likeData.then(response => {
                        if (response.length === 0) {

                            const like = {
                                userId: recupUserId3.userId,
                                like: -1
                            };
                            const likeSend1 = sendAuthJson('http://localhost:3000/api/post/' + postUnique.postId + '/like', like);
                            likeSend1.then(response => {
                                window.location.reload();
                            }); // fin de then
                        }; //fin de if
                        if (response) {

                            response.forEach(likeRep => {

                                if (likeRep.userId === recupUserId3.userId, likeRep.postLikeValeur === -1) {

                                    const like = {
                                        userId: recupUserId3.userId,
                                        like: 2
                                    };
                                    const likeSend2 = sendAuthJson('http://localhost:3000/api/post/' + postUnique.postId + '/like', like);
                                    console.log(likeSend2);

                                    likeSend2.then(response => {
                                        console.log(response);
                                        window.location.reload();
                                    }); //fin de then
                                }; // fin de if
                            }); // fin de boucle
                        }; // fin de else
                    }); //fin de then

                }; //fin dislikeFunction
                dislikeFunction();
            });


            createFormComs();

            const erreurCom = document.getElementById('erreur_coms');
            const recupComtenu = document.getElementById('commentaire');
            const regexDatas = /^[a-zA-Z1-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'.-]{2,20} *$/;

            valide = () => {
                recupComtenu.addEventListener('change', (event) => {
                    event.preventDefault;

                    if (recupComtenu.value.length === 0) {
                        erreurCom.setAttribute('class', 'bloc__form--font--erreur');
                        erreurCom.innerHTML = 'le champs n\'est pas rempli correctement !';

                    } else if (regexDatas.test(recupComtenu.value) === true) {
                        erreurCom.setAttribute('class', 'bloc__form--font--erreur');
                        erreurCom.innerHTML = 'le champs n\'est pas rempli correctement !';

                    } else if (regexDatas.test(recupComtenu.value) === false) {
                        erreurCom.setAttribute('class', 'bloc__form--font--erreur2');
                        erreurCom.innerHTML = 'le champs n\'est pas rempli correctement !';
                    };
                });
            };
            valide();


            const btnPostComs = document.getElementById('btn_envoyer_coms');
            btnPostComs.addEventListener('click', (event) => {
                event.preventDefault();

                const contenu = document.getElementById('commentaire');

                const coms = {
                    comContenu: contenu.value
                };
                const urlComs = 'http://localhost:3000/api/post/' + (new URL(window.location.href)).searchParams.get('id') + '/com';

                const postObjsect = sendAuthJson(urlComs, coms);
                postObjsect.then(response => {

                    window.location = './postsDetail.html?id=' + postUnique.postId;
                }).catch((error => {

                    modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');

                })); //fin catch
            }); // fin click

            const btnAnnul = document.getElementById('btn_annuler_coms');
            btnAnnul.addEventListener('click', (event) => {
                event.preventDefault();
                window.location = './postsDetail.html?id=' + postUnique.postId;
            }); // fin click

            const btnUpprPost = document.getElementById('btn_suppr_post');
            btnUpprPost.addEventListener('click', (event) => {
                event.preventDefault();

                const datas = deleteAuth(urlPost);
                datas.then(deletePost => {
                    modals(deletePost.message, 'forum', 'forum.html');
                }).catch((error => {

                    // faire spinner
                    modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');

                })); //fin catch
            }); // fin click

            const urlUserID = 'http://localhost:3000/api/auth/' + recupUserId3.userId;
            const datas1 = requestAuth(urlUserID);
            datas1.then(() => {

                const urlComAll = 'http://localhost:3000/api/post/' + (new URL(window.location.href)).searchParams.get('id') + '/com';

                const datas2 = requestAuth(urlComAll);
                datas2.then(coms => {

                    coms.forEach(rep => {

                        createDisplayComs(rep.nom, rep.prenom, rep.comDateCrea, rep.comContenu, rep.postId, rep.comId);

                        const urlModifCom = 'http://localhost:3000/api/post/' + rep.postId + '/com/' + rep.comId;

                        const btnSuppCom = document.getElementById('btn_com_suppr' + rep.comId);
                        btnSuppCom.addEventListener('click', (event) => {

                            event.preventDefault();

                            const data = deleteAuth(urlModifCom);

                            data.then(() => {
                                window.location = './postsDetail.html?id=' + rep.postId;
                            }).catch((error => {
                                modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');
                            })); //fin catch
                        }); // fin click

                        const btnmodif = document.getElementById('btn_com_modif' + rep.comId);
                        btnmodif.addEventListener('click', (event) => {
                            event.preventDefault();

                            modalComModif('modif coms', rep.comContenu);

                            const regexDatas = /^[a-zA-Z1-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'.-]{2,20} *$/;

                            const recupComtenu2 = document.getElementById('text_coms_modal');
                            const erreurComModif = document.getElementById('erreur_modif_coms');

                            valideComModif = () => {
                                recupComtenu2.addEventListener('change', (event) => {
                                    event.preventDefault;

                                    if (recupComtenu2.value.length === 0) {
                                        erreurComModif.setAttribute('class', 'bloc__form--font--erreur');
                                        erreurComModif.innerHTML = 'le champs n\'est pas rempli correctement !';

                                    } else if (regexDatas.test(recupComtenu2.value) === true) {
                                        erreurComModif.setAttribute('class', 'bloc__form--font--erreur');
                                        erreurComModif.innerHTML = 'le champs n\'est pas rempli correctement !';

                                    } else if (regexDatas.test(recupComtenu2.value) === false) {
                                        erreurComModif.setAttribute('class', 'bloc__form--font--erreur2');
                                        erreurComModif.innerHTML = 'le champs n\'est pas rempli correctement !';
                                    };
                                });

                            }; //fin de valideComModif

                            valideComModif();

                            const btnModifModal = document.getElementById('btnComMOdif');
                            btnModifModal.addEventListener('click', (event) => {
                                event.preventDefault();

                                const comModif = {
                                    comContenu: recupComtenu2.value
                                };

                                const data = putAuthJson(urlModifCom, comModif);
                                data.then(() => {

                                    window.location = 'postsDetail.html?id=' + rep.postId;
                                }).catch((error => {
                                    modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');
                                })); //fin catch //fin then data
                            }); //fin de listner btn modif

                            const btnAnnulCom = document.getElementById('btn_com_suppr');
                            btnAnnulCom.addEventListener('click', (event) => {
                                event.preventDefault();
                                window.location = './postsDetail.html?id=' + rep.postId;
                            });
                        }); //fin click
                    });
                }).catch((error => {
                    modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');
                })); //fin catch
            }).catch((error => {
                modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');
            })); //fin catch //fin de then user
        }).catch((error => {
            modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');
        })); //fin catch //fin de then postUnique
    };
}; // fin createDetailPost

createDetailPost();