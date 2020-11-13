createforum = () => {

    const recupStorage = sessionStorage.getItem('repAuth');
    const recupUserId = JSON.parse(recupStorage);

    if (!recupUserId) {
        window.location = './index.html';
    };

    if (recupUserId === null) {
        modals('Vous n\avez pas accès a cette ressource !', 'Inscription', './signup.html');
    } else {
        const urlUserID = 'http://localhost:3000/api/auth/' + recupUserId.userId; //recup user
        const urlpostAll = 'http://localhost:3000/api/post'; //recup post

        const dataUser = requestAuth(urlUserID); //appel user
        dataUser.then(user => {

            createNavBarForum(user.avatar, recupUserId.userId, user.nom, user.prenom);

            //gestion du button de déconnectionde la nav bar

            deconnection('deconnection');

            //button publier de la nodal de publication
            const btnPublier = document.getElementById('publier');
            btnPublier.addEventListener('click', (event) => {
                event.preventDefault();

                modaleCreatePost(user.avatar, user.nom, user.prenom);

                exitModal('btn_annule_create_post'); //modal create post

                const image = document.getElementById('post_img').files;
                const titre = document.getElementById('post_forum_titre');
                const contenu = document.getElementById('post_forum_text');

                const regexDatas = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'.-]{2,255}/;

                validPosts(titre, contenu, regexDatas, 'erreur_posts');

                const btnEnvoiPublication = document.getElementById('btn_publier_forum');
                btnEnvoiPublication.addEventListener('click', (event) => {
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

                                /* const postObjsect1 = requestAuth('http://localhost:3000/api/post');
                                 postObjsect1.then(response => {

                                     console.log(response);
                                 });*/

                                messageConfirm('Message publié');
                                setTimeout(() => {
                                    window.location.reload();
                                }, 900);
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

                                /*const postObjsect2 = requestAuth('http://localhost:3000/api/post');
                                postObjsect2.then(response => {
                                  

                                    console.log(response[0]);
                                });*/
                                messageConfirm('Message publié');
                                setTimeout(() => {
                                    window.location.reload();
                                }, 900);
                            }).catch((error => {
                                modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');
                            })); //fin catch
                        };

                    } else {
                        const erreurPost = document.getElementById('erreur_posts');
                        erreurPost.setAttribute('class', 'bloc__form--font--erreur2');
                        erreurPost.innerHTML = 'le champs n\'est pas rempli correctement !';
                    };
                }); //fin btn envoie publication
            }); //fin de btnPublier

            const dataPost = requestAuth(urlpostAll); //appel post
            dataPost.then(posts => {

                posts.forEach(rep => {
                    const urlComAll = 'http://localhost:3000/api/post/' + rep.postId + '/com'; //recup com
                    const dataCom = requestAuth(urlComAll); //appel com
                    dataCom.then(coms => {

                        const compteurCom = coms.length;
                        // creation de l'affichage des posts
                        createDisplayPostImg(rep.postId, rep.avatar, rep.nom, rep.prenom, rep.titre, rep.contenu, rep.imageUrl, rep.likes, rep.dislikes, compteurCom);

                        compterHours('date_crea_post', rep.postId, rep.dateCrea); //affichage du temps de publication

                        valideUserCreateur(recupUserId.userId, rep.userId, rep.postId, recupUserId.role); // gestion de la vue des btn suppr et modif si on est pas l'utilisateur createur

                        deleteImg(rep.imageUrl, rep.postId);

                        // gestion de la suppression de publication
                        const btnSupprPublication = document.getElementById('btn_suppr_publication' + rep.postId);
                        btnSupprPublication.addEventListener('click', (event) => {
                            event.preventDefault();

                            // suppression d'un post
                            const urlpostAll = 'http://localhost:3000/api/post/' + rep.postId;
                            const datas2 = deleteAuth(urlpostAll);
                            datas2.then((response) => {

                                messageConfirm('Message supprimé');
                                setTimeout(() => {
                                    window.location.reload();
                                }, 900);

                            }).catch((error => {
                                modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');
                            })); //fin catch
                        }); // fin de suppression d'un post

                        //gestion des likes
                        const btnLike = document.getElementById('like-forum' + rep.postId);
                        btnLike.addEventListener('click', (event) => {
                            const like = {
                                userId: recupUserId.userId,
                                like: 1
                            };
                            const likeSend1 = sendAuthJson('http://localhost:3000/api/post/' + rep.postId + '/like', like);
                            likeSend1.then(response => {

                                const url = 'http://localhost:3000/api/post/' + rep.postId;
                                console.log(url)
                                const likeSend1 = requestAuth('http://localhost:3000/api/post/' + rep.postId);
                                likeSend1.then(response => {

                                    const compteur_like = document.getElementById('compteur_like' + rep.postId);
                                    compteur_like.innerHTML = response.likes;

                                    const compteur_dislike = document.getElementById('compteur_dislike' + rep.postId);
                                    compteur_dislike.innerHTML = response.dislikes;
                                });

                                //window.location.reload();
                            }).catch((error => {
                                modals();
                            })); //fin catch
                        });

                        const btnDislike = document.getElementById('dislike-forum' + rep.postId);
                        btnDislike.addEventListener('click', (event) => {
                            const like = {
                                userId: recupUserId.userId,
                                like: -1
                            };
                            const likeSend2 = sendAuthJson('http://localhost:3000/api/post/' + rep.postId + '/like', like);
                            likeSend2.then(response => {

                                const likeSend1 = requestAuth('http://localhost:3000/api/post/' + rep.postId);
                                likeSend1.then(response => {
                                    const compteur_like = document.getElementById('compteur_like' + rep.postId);
                                    compteur_like.innerHTML = response.likes;
                                    const compteur_dislike = document.getElementById('compteur_dislike' + rep.postId);
                                    compteur_dislike.innerHTML = response.dislikes;
                                });

                                //window.location.reload();
                            }).catch((error => {
                                modals();
                            })); //fin catch
                        });

                        //gestion de la modification de post
                        const btnModifPost = document.getElementById('btn_modif_publication' + rep.postId);
                        btnModifPost.addEventListener('click', (event) => {
                            event.preventDefault();
                            const recupPost = requestAuth('http://localhost:3000/api/post/' + rep.postId);
                            recupPost.then(response => {

                                modaleCreateModifPost(response.avatar, response.titre, response.contenu, response.imageUrl, response.nom, response.prenom);

                                exitModal('btn_annule_forum'); //modal modif post

                                const image = document.getElementById('post_img').files;
                                const titre = document.getElementById('post_forum_titre');
                                const contenu = document.getElementById('post_forum_text');

                                const regexDatas = /^[a-zA-Z1-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'.-]{2,255}/;

                                validPosts(titre, contenu, regexDatas, 'erreur_posts');

                                const btnEnvoi = document.getElementById('btn_post_forum');
                                btnEnvoi.addEventListener('click', (event) => {
                                    event.preventDefault();

                                    if (regexDatas.test(titre.value) !== false && regexDatas.test(contenu.value) !== false) {
                                        const urlUserID = 'http://localhost:3000/api/auth/' + recupUserId.userId;

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

                                                    const GETUrlImg = 'http://localhost:3000/api/post/' + rep.postId;
                                                    const GETpostObjsect1 = requestAuth(GETUrlImg);
                                                    GETpostObjsect1.then(resp => {
                                                        console.log(resp);
                                                    });
                                                    messageConfirm('Message modifié');

                                                }).catch((error => {
                                                    modals();
                                                })); //fin catch
                                            } else {
                                                const posts = {
                                                    titre: titre.value,
                                                    contenu: contenu.value
                                                };

                                                const urlPost = 'http://localhost:3000/api/post/' + rep.postId;
                                                const postObjsect = putAuthJson(urlPost, posts);
                                                postObjsect.then(response => {

                                                    const GETUrlImg = 'http://localhost:3000/api/post/' + rep.postId;
                                                    const GETpostObjsect = requestAuth(GETUrlImg);
                                                    GETpostObjsect.then(response => {


                                                        const titre = document.getElementById('titre' + rep.postId);
                                                        titre.innerHTML = response.titre;
                                                        const contenu = document.getElementById('contenu' + rep.postId);
                                                        contenu.innerHTML = response.contenu;

                                                        messageConfirm('Message modifié');
                                                        setTimeout(() => {
                                                            const message = document.getElementById('messageModif');
                                                            message.setAttribute('class', ('display--none'));

                                                            const modalModifPost = document.getElementById('modal1');
                                                            modalModifPost.setAttribute('class', ('display--none'));

                                                        }, 900);
                                                    });

                                                }).catch((error => {
                                                    modals();
                                                })); //fin catch
                                            };
                                        }).catch((error => {
                                            //modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');
                                        })); //fin catch
                                    } else {
                                        const erreurPost = document.getElementById('erreur_posts');
                                        erreurPost.setAttribute('class', 'bloc__form--font--erreur2');
                                        erreurPost.innerHTML = 'le champs n\'est pas rempli correctement !';
                                    };
                                });
                            });





                        }); //fin de la modification de post

                        // gestion des commentaires

                        //gestion l'envoi d'un commentaire 
                        const btnCommenter = document.getElementById('btn_commenter_publication' + rep.postId);

                        btnCommenter.addEventListener('click', (event) => {
                            createComsForm(user.avatar, user.nom, user.prenom);
                            exitModal('btnAnnulerComs_1'); //fermeture de la modal de modification des commentaires

                            const contenu = document.getElementById('commentaire');
                            const regexDatas = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'.-]{2,255}/;

                            validComs('erreur_posts', contenu, regexDatas); //validation du contenu du commentaire

                            const btnEnvoiCom = document.getElementById('btn_envoyer_coms');
                            btnEnvoiCom.addEventListener('click', (event) => {
                                event.preventDefault();

                                if (regexDatas.test(contenu.value) === true) {

                                    const coms = {
                                        comContenu: contenu.value
                                    };

                                    const urlComs = 'http://localhost:3000/api/post/' + rep.postId + '/com';
                                    const postObjsect = sendAuthJson(urlComs, coms);
                                    postObjsect.then(response => {
                                        messageConfirm('Commentaire publié');
                                        setTimeout(() => {
                                            window.location.reload();
                                        }, 900);
                                        //window.location = './forum.html';
                                    }).catch((error => {
                                        modals();
                                    })); //fin catch
                                } else {
                                    const erreurs = document.getElementById('erreur_posts');
                                    erreurs.setAttribute('class', 'bloc__form--font--erreur2');
                                    erreurs.innerHTML = 'le champs n\'est pas rempli correctement !';
                                };
                            });
                        }); //fin de l'envoi d'un commentaire 

                        coms.forEach(reps => {

                            createDisplayComs(reps.avatar, reps.nom, reps.prenom, reps.comContenu, reps.postId, reps.comId, reps.comLikes, reps.comDislikes); // affichage des commentaire

                            compterHours('date_crea_coms', reps.comId, reps.comDateCrea); //compteur de temps de publication

                            valideUserCreateurCom(recupUserId.userId, reps.userId, reps.comId, recupUserId.role); //affichages des buttons modifier et supprimer si on est le createur du commentaire

                            const paragDisplayNbComs = document.getElementById('display_coms_forum' + rep.postId);
                            if (compteurCom > 1) {

                                paragDisplayNbComs.innerHTML = compteurCom + ' commentaires';
                            } else {
                                paragDisplayNbComs.innerHTML = compteurCom + ' commentaire';
                            };

                            //gestion du button pour faire apparaitre les commentaires
                            const btnDysplayComs = document.getElementById('display_coms_forum' + reps.postId);
                            const btnHideComs = document.getElementById('display_none_forum' + reps.postId);

                            const articleComsDisplay = document.getElementById('coms_display_none' + reps.comId);
                            const articleHideDisplay = document.getElementById('display_none_forum' + reps.postId);

                            btnDysplayComs.addEventListener('click', (event) => {
                                articleComsDisplay.setAttribute('class', '');
                                articleHideDisplay.setAttribute('class', 'bloc__modal__create--commentaire--flex bloc_article--icons--flex');
                            }); // fin de click
                            btnHideComs.addEventListener('click', (event) => {
                                articleComsDisplay.setAttribute('class', 'display--none');
                                articleHideDisplay.setAttribute('class', 'display--none');
                            }); // fin de click

                            //gestion de suppression d'un commentaire
                            const btnSupprCommentaire = document.getElementById('btn_com_suppr' + reps.comId);
                            btnSupprCommentaire.addEventListener('click', (event) => {

                                event.preventDefault();
                                const urlModifCom = 'http://localhost:3000/api/post/' + rep.postId + '/com/' + reps.comId;
                                const data = deleteAuth(urlModifCom);

                                data.then(() => {
                                    messageConfirm('Commentaire supprimé');
                                    setTimeout(() => {

                                    }, 900);
                                }).catch((error => {
                                    modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');
                                })); //fin catch
                            }); // fin btn supprime commentaire

                            //gestion de la modification d'un commentaire

                            const btnModifCommentaire = document.getElementById('btn_com_modif1' + reps.comId);
                            btnModifCommentaire.addEventListener('click', (event) => {
                                event.preventDefault();

                                const urlModifCom = 'http://localhost:3000/api/post/' + rep.postId + '/com/' + reps.comId;
                                const data = requestAuth(urlModifCom);
                                data.then(response => {

                                    modifComsForm(response.avatar, response.nom, response.prenom, response.comContenu);

                                    exitModal('btn_annuler_modif_coms'); //gestion du button de fermeture de la modal modif commentaire

                                    const recupContenu = document.getElementById('commentaireModifCom');
                                    const regexDatas = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'.-]{2,255}/;

                                    validComsModif(recupContenu, regexDatas, 'erreur_posts');

                                    const btnEnvoiModifCom = document.getElementById('btnComModif');
                                    btnEnvoiModifCom.addEventListener('click', (event) => {
                                        event.preventDefault();
                                        if (regexDatas.test(recupContenu.value) !== false) {

                                            const comModif = {
                                                comContenu: recupContenu.value
                                            };

                                            const urlModifCom = 'http://localhost:3000/api/post/' + rep.postId + '/com/' + reps.comId;
                                            const data = putAuthJson(urlModifCom, comModif);
                                            data.then(() => {

                                                const data = requestAuth('http://localhost:3000/api/post/' + rep.postId + '/com/' + reps.comId);
                                                data.then(response => {

                                                    messageConfirm('Commentaire modifié');

                                                    const contenuCom = document.getElementById('contenuCom' + reps.comId);
                                                    contenuCom.innerHTML = response.comContenu;

                                                    setTimeout(() => {
                                                        const modalMessage = document.getElementById('messageModif');
                                                        modalMessage.setAttribute('class', 'display--none');

                                                        const modalFormModifcom = document.getElementById('modal1');
                                                        modalFormModifcom.setAttribute('class', 'display--none');
                                                    }, 900);
                                                });
                                            }).catch((error => {
                                                modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');
                                            })); //fin catch //fin then data
                                        } else {
                                            const erreur4 = document.getElementById('erreur_posts');
                                            erreur4.setAttribute('class', 'bloc__form--font--erreur2');
                                            erreur4.innerHTML = 'le champs n\'est pas rempli correctement !';
                                        };
                                    }); //fin de btn envoie de la modification du commentaire
                                });
                            });

                            // gestion des likes des commentaires
                            const btnComLikes = document.getElementById('like_com' + reps.comId);
                            btnComLikes.addEventListener('click', (event) => {
                                event.preventDefault();
                                const like = {
                                    userId: recupUserId.userId,
                                    like: 1
                                };
                                const comLikeSend = sendAuthJson('http://localhost:3000/api/post/' + rep.postId + '/com/' + reps.comId + '/like', like);
                                comLikeSend.then(response => {

                                    const comLikeSend = requestAuth('http://localhost:3000/api/post/' + rep.postId + '/com/' + reps.comId);
                                    comLikeSend.then(response => {

                                        const comLikes = document.getElementById('comLikes_1' + reps.comId)
                                        comLikes.innerHTML = response.comLikes;
                                        const comDislikes = document.getElementById('comDislikes_1' + reps.comId)
                                        comDislikes.innerHTML = response.comDislikes;
                                    });
                                }).catch((error => {
                                    modals();
                                })); //fin catch
                            });

                            const btnComDislike = document.getElementById('dislike_com' + reps.comId);
                            btnComDislike.addEventListener('click', (event) => {
                                event.preventDefault();
                                const like = {
                                    userId: recupUserId.userId,
                                    like: -1
                                };
                                const comDisikeSend = sendAuthJson('http://localhost:3000/api/post/' + rep.postId + '/com/' + reps.comId + '/like', like);
                                comDisikeSend.then(response => {

                                    const comLikeSend = requestAuth('http://localhost:3000/api/post/' + rep.postId + '/com/' + reps.comId);
                                    comLikeSend.then(response => {

                                        const comLikes = document.getElementById('comLikes_1' + reps.comId)
                                        comLikes.innerHTML = response.comLikes;
                                        const comDislikes = document.getElementById('comDislikes_1' + reps.comId)
                                        comDislikes.innerHTML = response.comDislikes;
                                    });
                                }).catch((error => {
                                    modals();
                                })); //fin catch 
                            });
                        }); //fin de boucle coms
                    }).catch((error => {
                        //modals();
                    })); //fin catch coms
                }); // fin de boucle de posts
            }).catch((error => {
                console.log('le forum et vide');

            })); //fin catch post
        }).catch((error => {

            modals();
        })); //fin catch user
    }; // fin de else de verification de recupUserId

}; //fin de createforum

createforum();