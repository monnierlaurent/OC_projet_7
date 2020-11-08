createforum = () => {


    const recupStorage = sessionStorage.getItem('repAuth');
    const recupUserId2 = JSON.parse(recupStorage);

    if (!recupUserId2) {
        window.location = './index.html';
    };

    const urlUserID = 'http://localhost:3000/api/auth/' + recupUserId2.userId;

    if (recupUserId2 === null) {
        modals('Vous n\avez pas accès a cette ressource !', 'Inscription', './signup.html');
    } else {

        const datas = requestAuth(urlUserID);
        datas.then(user => {
            createNavBarForum(recupUserId2.userId, user.nom, user.prenom);

            const btnDeconection = document.getElementById('deconnection');
            btnDeconection.addEventListener('click', (event) => {
                event.preventDefault();

                sessionStorage.clear();

                window.location = './index.html';
            });

            const btnPosteMessage = document.getElementById('poster');
            btnPosteMessage.addEventListener('click', (event) => {
                event.preventDefault();

                modaleCreatePost(user.nom, user.prenom);
                exitModal('btn_annule_create_post'); //modal create post

                const BtnPost = document.getElementById('btn_post_forum_1');

                const datas1 = requestAuth(urlUserID);
                datas1.then(user => {

                    const erreurPost = document.getElementById('erreur_posts');

                    const image = document.getElementById('post_img').files;
                    const titre = document.getElementById('post_forum_titre');
                    const contenu = document.getElementById('post_forum_text');

                    const regexDatas = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'.-]{2,255}/;

                    validPosts(titre, contenu, regexDatas, 'erreur_posts');


                    BtnPost.addEventListener('click', (event) => {
                        event.preventDefault();
                        if (regexDatas.test(titre.value) !== false && regexDatas.test(contenu.value) !== false) {
                            if (image[0]) {

                                const posts10 = {
                                    titre: titre.value,
                                    contenu: contenu.value,
                                };

                                const posts = JSON.stringify(posts10);

                                const data = new FormData();
                                data.append('image', image[0]);
                                data.append('posts', posts);

                                const postObjsect = sendAuthFormdata('http://localhost:3000/api/post/img', data);

                                postObjsect.then(response => {

                                    window.location = './forum.html';
                                }).catch((error => {
                                    modals('Désolé !<br>Le serveur ne repond pas ', 'Connection', './index.html');
                                })); //fin catch
                            } else {
                                const posts = {
                                    titre: titre.value,
                                    contenu: contenu.value
                                };

                                const postObjsect = sendAuthJson('http://localhost:3000/api/post', posts);
                                postObjsect.then(response => {
                                    window.location = './forum.html';
                                }).catch((error => {
                                    modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');
                                })); //fin catch
                            };
                        } else {
                            erreurPost.setAttribute('class', 'bloc__form--font--erreur2');
                            erreurPost.innerHTML = 'le champs n\'est pas rempli correctement !';
                        };
                    });
                }).catch((error => {
                    modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');
                })); //fin catch 
            });

            // creation des messages 
            const urlpostAll = 'http://localhost:3000/api/post';
            const datas2 = requestAuth(urlpostAll);
            datas2.then(post => {

                    post.forEach(rep => {

                        const urlComAll2 = 'http://localhost:3000/api/post/' + rep.postId + '/com';
                        const datas3 = requestAuth(urlComAll2);
                        datas3.then(coms => {

                            const compteurCom = coms.length;

                            // creation de l'affichage des posts
                            createDisplayPostImg(rep.postId, rep.nom, rep.prenom, rep.titre, rep.contenu, rep.imageUrl, rep.likes, rep.dislikes, compteurCom);

                            compterHours('date_crea_post', rep.postId, rep.dateCrea);

                            // gestion de la vue des btn suppr et modif si on est pas l'utilisateur createur
                            if (recupUserId2.userId === rep.userId) {
                                const btnModifier = document.getElementById('btn_modif_post' + rep.postId, );
                                btnModifier.removeAttribute('class');
                                btnModifier.setAttribute('class', 'fas fa-pen bloc_article_div_a--hover bloc_article_p--padding');

                                const btnSupprimer = document.getElementById('btn_suppr_post' + rep.postId);
                                btnSupprimer.removeAttribute('class');
                                btnSupprimer.setAttribute('class', 'far fa-trash-alt bloc_article_div_a--hover bloc_article_p--padding');
                            };

                            // ajout du 's' sur commentaires si supprieur a 1
                            const paragDisplayNbComs = document.getElementById('display_coms_forum' + rep.postId);
                            if (compteurCom > 1) {

                                paragDisplayNbComs.innerHTML = compteurCom + ' commentaires';
                            } else {
                                paragDisplayNbComs.innerHTML = compteurCom + ' commentaire';
                            };

                            // gestion des likes 
                            const btnLike = document.getElementById('like-forum' + rep.postId);
                            btnLike.addEventListener('click', (event) => {
                                const like = {
                                    userId: recupUserId2.userId,
                                    like: 1
                                };
                                const likeSend1 = sendAuthJson('http://localhost:3000/api/post/' + rep.postId + '/like', like);
                                likeSend1.then(response => {
                                    window.location.reload();
                                });
                            });

                            const btnDislike = document.getElementById('dislike-forum' + rep.postId);
                            btnDislike.addEventListener('click', (event) => {
                                const like = {
                                    userId: recupUserId2.userId,
                                    like: -1
                                };
                                const likeSend2 = sendAuthJson('http://localhost:3000/api/post/' + rep.postId + '/like', like);
                                likeSend2.then(response => {

                                    window.location.reload();
                                });
                            });

                            coms.forEach(rep => {

                                createDisplayComs(rep.nom, rep.prenom, rep.comContenu, rep.postId, rep.comId, rep.comLikes, rep.comDislikes);

                                compterHours('date_crea_coms', rep.comId, rep.comDateCrea);

                                //gestion des comLikes 
                                const btnComLikes = document.getElementById('like_com' + rep.comId);
                                btnComLikes.addEventListener('click', (event) => {
                                    event.preventDefault();
                                    const like = {
                                        userId: recupUserId2.userId,
                                        like: 1
                                    };
                                    const comLikeSend = sendAuthJson('http://localhost:3000/api/post/' + rep.postId + '/com/' + rep.comId + '/like', like);
                                    comLikeSend.then(response => {

                                        window.location.reload();
                                    });
                                });

                                const btnComDislike = document.getElementById('dislike_com' + rep.comId);
                                btnComDislike.addEventListener('click', (event) => {
                                    event.preventDefault();
                                    const like = {
                                        userId: recupUserId2.userId,
                                        like: -1
                                    };
                                    const comDisikeSend = sendAuthJson('http://localhost:3000/api/post/' + rep.postId + '/com/' + rep.comId + '/like', like);
                                    comDisikeSend.then(response => {

                                        window.location.reload();
                                    });
                                });

                                if (recupUserId2.userId === rep.userId) {
                                    const btnModifierCom = document.getElementById('btn_com_modif1' + rep.comId);
                                    btnModifierCom.removeAttribute('class');
                                    btnModifierCom.setAttribute('class', 'fas fa-pen bloc_article_div_a--hover bloc_article_p--padding');

                                    const btnSupprimerCom = document.getElementById('btn_com_suppr' + rep.comId);
                                    btnSupprimerCom.removeAttribute('class');
                                    btnSupprimerCom.setAttribute('class', 'far fa-trash-alt bloc_article_div_a--hover bloc_article_p--padding');

                                };

                                const btnDysplayComs = document.getElementById('display_coms_forum' + rep.postId);
                                const btnHideComs = document.getElementById('display_none_forum' + rep.postId);

                                const articleComsDisplay = document.getElementById('coms_display_none' + rep.comId);
                                const articleHideDisplay = document.getElementById('display_none_forum' + rep.postId);

                                btnDysplayComs.addEventListener('click', (event) => {
                                    articleComsDisplay.removeAttribute('class');
                                    articleComsDisplay.setAttribute('class', '');

                                    articleHideDisplay.removeAttribute('class');
                                    articleHideDisplay.setAttribute('class', 'bloc_article_div--flex4 bloc_article_div_a--hover');
                                }); // fin de click
                                btnHideComs.addEventListener('click', (event) => {

                                    articleComsDisplay.removeAttribute('class');
                                    articleComsDisplay.setAttribute('class', 'display--none');

                                    articleHideDisplay.removeAttribute('class');
                                    articleHideDisplay.setAttribute('class', 'display--none');
                                }); // fin de click

                                const btnModifCom = document.getElementById('btn_com_modif1' + rep.comId);
                                btnModifCom.addEventListener('click', () => {

                                    modifComsForm(rep.nom, rep.prenom, rep.comContenu);

                                    exitModal('btnAnnulerComs'); //modal de modification des commentaires

                                    const recupComtenu2 = document.getElementById('commentaireModifCom');
                                    const regexDatas = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'.-]{2,255}/;

                                    const btnEnvoiCom = document.getElementById('btnComModif');
                                    const erreur4 = document.getElementById('erreur4');

                                    validComsModif(recupComtenu2, regexDatas);

                                    btnEnvoiCom.addEventListener('click', (event) => {
                                        event.preventDefault();

                                        if (regexDatas.test(recupComtenu2.value) !== false) {

                                            const comModif = {
                                                comContenu: recupComtenu2.value
                                            };

                                            const urlModifCom = 'http://localhost:3000/api/post/' + rep.postId + '/com/' + rep.comId;
                                            const data = putAuthJson(urlModifCom, comModif);
                                            data.then(() => {

                                                window.location = 'forum.html';
                                            }).catch((error => {
                                                modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');
                                            })); //fin catch //fin then data
                                        } else {
                                            erreur4.setAttribute('class', 'bloc__form--font--erreur2');
                                            erreur4.innerHTML = 'le champs n\'est pas rempli correctement !';
                                        };
                                    });
                                }); // fin de modif coms

                                const btnSupprCom = document.getElementById('btn_com_suppr' + rep.comId);
                                btnSupprCom.addEventListener('click', (event) => {

                                    const urlModifCom = 'http://localhost:3000/api/post/' + rep.postId + '/com/' + rep.comId;
                                    event.preventDefault();

                                    const data = deleteAuth(urlModifCom);

                                    data.then(() => {
                                        window.location = './forum.html';
                                    }).catch((error => {
                                        modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');
                                    })); //fin catch
                                });
                            }); //fin de boucle


                            // suppression de la balise img si il n'y a pas d'image
                            if (rep.imageUrl) {
                                //console.log('il y a une image');
                            } else {
                                const imqAltParent = document.getElementById('lien_article' + rep.postId);
                                const imgBalise = document.getElementById('img_post_display' + rep.postId);
                                imqAltParent.removeChild(imgBalise);
                            };

                            // modification d'un posts
                            const btnModif = document.getElementById('btn_modif_post' + rep.postId);
                            btnModif.addEventListener('click', (event) => {
                                event.preventDefault();

                                modaleCreateModifPost(rep.titre, rep.contenu, rep.imageUrl, rep.nom, rep.prenom);

                                exitModal('btn_annule_forum'); //modal modif post

                                const image = document.getElementById('post_img').files;
                                const titre = document.getElementById('post_forum_titre');
                                const contenu = document.getElementById('post_forum_text');

                                const regexDatas = /^[a-zA-Z1-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'.-]{2,255}/;

                                validPosts(titre, contenu, regexDatas, 'erreur_modif_posts');

                                const btnEnvoi = document.getElementById('btn_post_forum');
                                btnEnvoi.addEventListener('click', (event) => {
                                    event.preventDefault();

                                    if (regexDatas.test(titre.value) !== false && regexDatas.test(contenu.value) !== false) {
                                        const urlUserID = 'http://localhost:3000/api/auth/' + recupUserId2.userId;

                                        const datas1 = requestAuth(urlUserID);
                                        datas1.then(user => {

                                            if (image[0]) {
                                                const posts10 = {
                                                    titre: titre.value,
                                                    contenu: contenu.value,
                                                };

                                                const posts = JSON.stringify(posts10);

                                                const data = new FormData();
                                                data.append('image', image[0]);
                                                data.append('posts', posts);

                                                const postUrlImg = 'http://localhost:3000/api/post/img/' + rep.postId;
                                                const postObjsect = putAuthFormdata(postUrlImg, data);

                                                postObjsect.then(response => {

                                                    window.location = './forum.html';
                                                }).catch((error => {

                                                    // faire spinner
                                                    modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');

                                                })); //fin catch

                                            } else {
                                                const posts = {
                                                    titre: titre.value,
                                                    contenu: contenu.value
                                                };

                                                const urlPost = 'http://localhost:3000/api/post/' + rep.postId;
                                                const postObjsect = putAuthJson(urlPost, posts);
                                                postObjsect.then(response => {

                                                    window.location = './forum.html';
                                                }).catch((error => {
                                                    modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');
                                                })); //fin catch
                                            };
                                        }).catch((error => {
                                            //modals('Désolé !<br>Le serveur ne repond pas10', 'Connection', './index.html');
                                        })); //fin catch
                                    } else {
                                        const erreurPost = document.getElementById('erreur_modif_posts');
                                        erreurPost.setAttribute('class', 'bloc__form--font--erreur2');
                                        erreurPost.innerHTML = 'le champs n\'est pas rempli correctement !';
                                    };
                                });
                            });

                            // gestion des commentaires

                            const btnComment = document.getElementById('btn_commenter_post' + rep.postId);
                            btnComment.addEventListener('click', () => {

                                createComsForm(rep.nom, rep.prenom);

                                exitModal('btn_annuler_modif_coms'); //modal modif commentaires

                                const contenu = document.getElementById('commentaire');

                                const regexDatas1 = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'.-]{2,255}/;
                                const erreurs = document.getElementById('erreur1');


                                validComs(contenu, regexDatas1, 'erreurComs1');

                                const btnPostComs = document.getElementById('btn_envoyer_coms');

                                btnPostComs.addEventListener('click', (event) => {
                                    event.preventDefault();

                                    if (regexDatas1.test(contenu.value) === true) {

                                        const coms = {
                                            comContenu: contenu.value
                                        };

                                        const urlComs = 'http://localhost:3000/api/post/' + rep.postId + '/com';

                                        const postObjsect = sendAuthJson(urlComs, coms);
                                        postObjsect.then(response => {

                                            window.location = './forum.html';
                                        }).catch((error => {
                                            modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');
                                        })); //fin catch
                                    } else {

                                        erreurs.setAttribute('class', 'bloc__form--font--erreur2');
                                        erreurs.innerHTML = 'le champs n\'est pas rempli correctement !';
                                    };
                                }); // fin click
                            });

                            // suppression d'un posts
                            const btnSuppr = document.getElementById('btn_suppr_post' + rep.postId);
                            btnSuppr.addEventListener('click', (event) => {
                                event.preventDefault();

                                const urlpostAll = 'http://localhost:3000/api/post/' + rep.postId;
                                const datas2 = deleteAuth(urlpostAll);
                                datas2.then((response) => {

                                    window.location = './forum.html';
                                }).catch((error => {
                                    modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');
                                })); //fin catch
                            });
                        });
                    });
                })
                .catch((error => {
                    console.log(error = 'le forum et vide');
                })); //fin catch
        });
    }; //fin de else
}; // fin createForum
createforum();