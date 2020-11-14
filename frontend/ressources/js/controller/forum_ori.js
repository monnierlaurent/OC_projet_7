createforum = () => {

    const recupStorage = sessionStorage.getItem('repAuth');
    const recupUserId = JSON.parse(recupStorage);

    if (!recupUserId) {
        window.location = './index.html';
    };

    if (recupUserId === null) {
        modals('Vous n\avez pas accès a cette ressource !', 'Inscription', './signup.html');
    } else {

        const dataUser = requestAuth('http://localhost:3000/api/auth/' + recupUserId.userId); //appel user
        dataUser.then(user => {

            createNavBarForum(user.avatar, recupUserId.userId, user.nom, user.prenom);

            deconnection('deconnection');

            modaleCreatePost(user.avatar, user.nom, user.prenom);

            const modalCreateMessage = document.getElementById('publier_message');
            modalCreateMessage.addEventListener('click', (event) => {
                const contentModal = document.getElementById('modal_create_post');
                contentModal.setAttribute('class', 'modal');
            });

            const modalCreateMessagehide = document.getElementById('btn_hide_form_create_post');
            modalCreateMessagehide.addEventListener('click', (event) => {
                const contentModalHide = document.getElementById('modal_create_post');
                contentModalHide.setAttribute('class', 'display--none');

                const erreurPost = document.getElementById('message_posts-envoi');
                erreurPost.setAttribute('class', 'bloc__form--font--message_form_3');

                document.getElementById('form_post').reset();
            });

            const image = document.getElementById('post_img').files;
            const titre = document.getElementById('post_forum_titre');
            const contenu = document.getElementById('post_forum_text');

            const regexDatas = /^[a-zA-Z1-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'.-]{2,255}/;

            validPosts(titre, regexDatas, 'message_posts');

            const btnEnvoiPublication = document.getElementById('btn_publier_forum');
            btnEnvoiPublication.addEventListener('click', (event) => {
                event.preventDefault();

                if (image[0] && regexDatas.test(titre.value) !== false && regexDatas.test(contenu.value) !== false) {

                    const posts10 = {
                        titre: titre.value,
                        contenu: contenu.value,
                    };

                    const posts = JSON.stringify(posts10);

                    const data = new FormData();
                    data.append('image', image[0]);
                    data.append('posts', posts);

                    const postObjsect = sendAuthFormdata('http://localhost:3000/api/post/img', data);
                    postObjsect.then(rep => {
                        /*const dataCom = requestAuth('http://localhost:3000/api/post/' + rep.postId + '/com'); //appel com
                        dataCom.then(coms => {

                            const compteurCom = coms.length;
                            // creation de l'affichage des posts
                            createDisplayPostImg(rep.postId, rep.avatar, rep.nom, rep.prenom, rep.titre, rep.contenu, rep.imageUrl, rep.likes, rep.dislikes, compteurCom);

                            compterHours('date_crea_post', rep.postId, rep.dateCrea); //affichage du temps de publication

                            valideUserCreateur(recupUserId.userId, rep.userId, rep.postId, recupUserId.role); // gestion de la vue des btn suppr et modif si on est pas l'utilisateur createur

                            deleteImg(rep.imageUrl, rep.postId);

                            deletetitre(rep.contenu, rep.postId);
                        });*/

                        messageConfirm('Message publié');

                        const modalModifPost = document.getElementById('modal_create_post');
                        modalModifPost.setAttribute('class', ('display--none'));
                        setTimeout(() => {
                            const message = document.getElementById('messageModif');
                            message.setAttribute('class', ('display--none'));
                        }, 900);

                    }).catch((error => {
                        modals('Désolé !<br>Le serveur ne repond pas ', 'Connection', './index.html');
                    })); //fin catch
                } else if (image[0] && regexDatas.test(titre.value) !== false && regexDatas.test(contenu.value) === false) {

                    const posts10 = {
                        titre: titre.value,
                        contenu: 'vide',
                    };

                    const posts = JSON.stringify(posts10);

                    const data = new FormData();
                    data.append('image', image[0]);
                    data.append('posts', posts);

                    const postObjsect = sendAuthFormdata('http://localhost:3000/api/post/img', data);
                    postObjsect.then(rep => {
                        /* const dataCom = requestAuth('http://localhost:3000/api/post/' + rep.postId + '/com'); //appel com
                         dataCom.then(coms => {

                             const compteurCom = coms.length;
                             // creation de l'affichage des posts
                             createDisplayPostImg(rep.postId, rep.avatar, rep.nom, rep.prenom, rep.titre, rep.contenu, rep.imageUrl, rep.likes, rep.dislikes, compteurCom);

                             compterHours('date_crea_post', rep.postId, rep.dateCrea); //affichage du temps de publication

                             valideUserCreateur(recupUserId.userId, rep.userId, rep.postId, recupUserId.role); // gestion de la vue des btn suppr et modif si on est pas l'utilisateur createur

                             deleteImg(rep.imageUrl, rep.postId);

                             deletetitre(rep.contenu, rep.postId);
                         });*/

                        messageConfirm('Message publié');

                        const modalModifPost = document.getElementById('modal_create_post');
                        modalModifPost.setAttribute('class', ('display--none'));
                        setTimeout(() => {
                            const message = document.getElementById('messageModif');
                            message.setAttribute('class', ('display--none'));
                        }, 900);
                    }).catch((error => {
                        modals('Désolé !<br>Le serveur ne repond pas ', 'Connection', './index.html');
                    })); //fin catch
                } else if (!image[0] && regexDatas.test(titre.value) !== false && regexDatas.test(contenu.value) !== false) {

                    const posts = {
                        titre: titre.value,
                        contenu: contenu.value
                    };

                    const postObjsect = sendAuthJson('http://localhost:3000/api/post', posts); //  
                    postObjsect.then(rep => {

                        /*const dataCom = requestAuth('http://localhost:3000/api/post/' + rep.postId + '/com'); //appel com
                                    dataCom.then(coms => {

                                        const compteurCom = coms.length;
                                        // creation de l'affichage des posts
                                         createDisplayPostImg(rep.postId, rep.avatar, rep.nom, rep.prenom, rep.titre, rep.contenu, rep.imageUrl, rep.likes, rep.dislikes, compteurCom);

                            compterHours('date_crea_post', rep.postId, rep.dateCrea); //affichage du temps de publication

                            valideUserCreateur(recupUserId.userId, rep.userId, rep.postId, recupUserId.role); // gestion de la vue des btn suppr et modif si on est pas l'utilisateur createur

                            deleteImg(rep.imageUrl, rep.postId);

                            deletetitre(rep.contenu, rep.postId);
                        });*/

                        messageConfirm('Message publié');

                        const modalModifPost = document.getElementById('modal_create_post');
                        modalModifPost.setAttribute('class', ('display--none'));
                        setTimeout(() => {
                            const main = document.getElementById('main_forum');
                            const message = document.getElementById('messageModif');
                            main.removeChild(message);

                            //window.location = './forum.html';
                        }, 900);
                    }).catch((error => {
                        modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');
                    })); //fin catch
                } else {
                    const erreurPost = document.getElementById('message_posts-envoi');
                    erreurPost.setAttribute('class', 'bloc__form--font--message_form_4');
                };
            }); //fin btn envoie publication

            //--------------------------------affichage des publications------------------------------------
            const dataPost = requestAuth('http://localhost:3000/api/post'); //appel post
            dataPost.then(posts => {

                posts.forEach(rep => {
                    //const urlComAll = 'http://localhost:3000/api/post/' + rep.postId + '/com'; //recup com
                    const dataCom = requestAuth('http://localhost:3000/api/post/' + rep.postId + '/com'); //appel com
                    dataCom.then(coms => {

                        const compteurCom = coms.length;
                        // creation de l'affichage des posts
                        createDisplayPostImg(rep.postId, rep.avatar, rep.nom, rep.prenom, rep.titre, rep.contenu, rep.imageUrl, rep.likes, rep.dislikes, compteurCom);

                        compterHours('date_crea_post', rep.postId, rep.dateCrea); //affichage du temps de publication

                        valideUserCreateur(recupUserId.userId, rep.userId, rep.postId, recupUserId.role); // gestion de la vue des btn suppr et modif si on est pas l'utilisateur createur

                        deleteImg(rep.imageUrl, rep.postId);

                        deletetitre(rep.contenu, rep.postId);

                        // gestion de la suppression de publication
                        const btnSupprPublication = document.getElementById('btn_suppr_publication' + rep.postId);
                        btnSupprPublication.addEventListener('click', (event) => {
                            event.preventDefault();

                            // suppression d'un post
                            const datas2 = deleteAuth('http://localhost:3000/api/post/' + rep.postId);
                            datas2.then((response) => {

                                const mainIndex = document.getElementById('main_forum');
                                const contentArticle = document.getElementById('content_article' + rep.postId);
                                mainIndex.removeChild(contentArticle);

                                messageConfirm(response.message);
                                setTimeout(() => {
                                    const main = document.getElementById('main_forum');
                                    const message = document.getElementById('messageModif');
                                    main.removeChild(message);
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
                            }).catch((error => {
                                modals();
                            })); //fin catch
                        });

                        //---------------------gestion de la modification de post----------------------------

                        const btnModifPost = document.getElementById('btn_modif_publication' + rep.postId);
                        btnModifPost.addEventListener('click', (event) => {
                            event.preventDefault();

                            const recupPost = requestAuth('http://localhost:3000/api/post/' + rep.postId);
                            recupPost.then(response => {

                                modaleCreateModifPost(response.postId, response.avatar, response.titre, response.contenu, response.imageUrl, response.nom, response.prenom);

                                const contentModal = document.getElementById('modal_modif_post');
                                contentModal.setAttribute('class', 'modal');

                                const modalmodifMessageHide = document.getElementById('btn_annule_forum');
                                modalmodifMessageHide.addEventListener('click', (event) => {
                                    event.preventDefault();
                                    const contentModalHide = document.getElementById('modal_modif_post');
                                    contentModalHide.setAttribute('class', 'display--none');

                                    const erreurPost = document.getElementById('message_modif_posts');
                                    erreurPost.setAttribute('class', 'bloc__form--font--message_form_3');

                                    document.getElementById('form_modif_post_1').reset();
                                    document.getElementById('form_modif_post_2').reset();
                                });

                                const image = document.getElementById('post_img' + response.postId).files;
                                const titre = document.getElementById('post_forum_titre' + response.postId);
                                const contenu = document.getElementById('post_forum_text' + response.postId);

                                const regexDatas = /^[a-zA-Z1-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'.-]{2,255}$/;

                                validPosts(titre, regexDatas, 'message_modif_posts');

                                const btnEnvoiModifPost = document.getElementById('btn_post_forum_modif');
                                btnEnvoiModifPost.addEventListener('click', (event) => {
                                    event.preventDefault();

                                    console.log(contenu.value);
                                    if (image[0] && regexDatas.test(titre.value) !== false && regexDatas.test(contenu.value) !== false) {

                                        const posts10 = {
                                            titre: titre.value,
                                            contenu: contenu.value
                                        };

                                        console.log(posts10);
                                        const posts = JSON.stringify(posts10);

                                        const data = new FormData();
                                        data.append('image', image[0]);
                                        data.append('posts', posts);


                                        const updateObjsect1 = putAuthFormdata('http://localhost:3000/api/post/img/' + response.postId, data);
                                        updateObjsect1.then(repUpdate1 => {
                                            console.log(repUpdate1);
                                            console.log(repUpdate1.message);
                                            const recupObjsect = requestAuth('http://localhost:3000/api/post/' + response.postId);
                                            recupObjsect.then(recupUpdate1 => {
                                                const updateTitre = document.getElementById('titre' + response.postId);
                                                updateTitre.innerHTML = recupUpdate1.titre;

                                                const divContenu = document.getElementById('lien_article' + response.postId)
                                                divContenu.appendChild(createElm2('p', recupUpdate1.contenu, 'id', 'contenu' + response.postId, 'class', 'bloc_article_p2--style'));

                                                messageConfirm(repUpdate1.message);

                                                const contentModalHide = document.getElementById('modal_modif_post');
                                                contentModalHide.setAttribute('class', 'display--none');

                                                setTimeout(() => {
                                                    const message = document.getElementById('messageModif');
                                                    message.setAttribute('class', 'display--none');
                                                }, 900);
                                            });
                                        });
                                        console.log('titre + contenu + image');


                                    } else if (image[0] && regexDatas.test(titre.value) !== false && regexDatas.test(contenu.value) === false) {
                                        const posts10 = {
                                            titre: titre.value,
                                            contenu: 'vide'
                                        };
                                        const posts = JSON.stringify(posts10);

                                        const data = new FormData();
                                        data.append('image', image[0]);
                                        data.append('posts', posts);

                                        const updateObjsect2 = putAuthFormdata('http://localhost:3000/api/post/img/' + response.postId, data);

                                        updateObjsect2.then(repUpdate => {

                                            console.log(repUpdate.message);
                                            const recupObjsect = requestAuth('http://localhost:3000/api/post/' + response.postId);
                                            recupObjsect.then(recupUpdate => {
                                                const updateTitre = document.getElementById('titre' + response.postId);
                                                updateTitre.innerHTML = recupUpdate.titre;

                                                messageConfirm(repUpdate.message);

                                                const contentModalHide = document.getElementById('modal_modif_post');
                                                contentModalHide.setAttribute('class', 'display--none');

                                                setTimeout(() => {
                                                    const message = document.getElementById('messageModif');
                                                    message.setAttribute('class', 'display--none');
                                                }, 900);
                                            });
                                        });


                                        console.log('titre + image');

                                    } else if (!image[0] && regexDatas.test(titre.value) !== false && regexDatas.test(contenu.value) !== false) {

                                        const posts = {
                                            titre: titre.value,
                                            contenu: contenu.value
                                        };

                                        const updateObjsect = putAuthJson('http://localhost:3000/api/post/' + response.postId, posts);
                                        updateObjsect.then(repUpdate => {

                                            console.log(repUpdate.message);
                                            const recupObjsect = requestAuth('http://localhost:3000/api/post/' + response.postId);
                                            recupObjsect.then(recupUpdate3 => {
                                                const updateTitre = document.getElementById('titre' + response.postId);
                                                updateTitre.innerHTML = recupUpdate3.titre;

                                                const divContenu = document.getElementById('lien_article' + response.postId)
                                                divContenu.appendChild(createElm2('p', '', 'id', 'contenu' + response.postId, 'class', 'bloc_article_p2--style'));
                                                const updateContenu = document.getElementById('contenu' + response.postId);
                                                updateContenu.innerHTML = recupUpdate3.contenu;

                                                messageConfirm(repUpdate.message);

                                                const contentModalHide = document.getElementById('modal_modif_post');
                                                contentModalHide.setAttribute('class', 'display--none');

                                                setTimeout(() => {
                                                    const message = document.getElementById('messageModif');
                                                    message.setAttribute('class', 'display--none');
                                                }, 900);
                                            });
                                        });
                                    } else {
                                        const erreurPost = document.getElementById('message_modif_posts');
                                        erreurPost.setAttribute('class', 'bloc__form--font--message_form_4');
                                        erreurPost.innerHTML = 'le champs n\'est pas rempli correctement !';
                                    };
                                });
                            });

                        });


                        //--------------------- gestion des commentaires----------------------------


                        //---------------gestion l'envoi d'un commentaire ---------------------
                        const btnCommenter = document.getElementById('btn_commenter_publication' + rep.postId);
                        btnCommenter.addEventListener('click', (event) => {
                            createComsForm(user.avatar, user.nom, user.prenom);

                            const contentModal = document.getElementById('modal_create_commentaire');
                            contentModal.setAttribute('class', 'modal');

                            const modalmodifcomHide = document.getElementById('btnAnnulerComs_1');
                            modalmodifcomHide.addEventListener('click', (event) => {
                                //event.preventDefault();
                                const contentModalHide = document.getElementById('modal_create_commentaire');
                                contentModalHide.setAttribute('class', 'display--none');

                                const erreurPost = document.getElementById('message_coms_modif');
                                erreurPost.setAttribute('class', 'bloc__form--font--message_form_4');

                                document.getElementById('form_modif_post').reset();
                            });

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

                                        const urlRecupComs = 'http://localhost:3000/api/post/' + rep.postId + '/com';
                                        const postObjsect = requestAuth(urlRecupComs);
                                        postObjsect.then(response => {
                                            response.forEach(comsRecup => {

                                                createDisplayComs(response.avatar, response.nom, response.prenom, response.comContenu, response.postId, response.comId, response.comLikes, response.comDislikes); // affichage des commentaire
                                                messageConfirm('Commentaire publié');

                                                setTimeout(() => {
                                                    const modalFormModifcom = document.getElementById('modal1');
                                                    modalFormModifcom.setAttribute('class', 'display--none');
                                                }, 900);
                                                console.log(comsRecup);
                                            });
                                        });
                                    }).catch((error => {
                                        modals();
                                    })); //fin catch
                                } else {
                                    const erreurs = document.getElementById('message_coms_modif');
                                    erreurs.setAttribute('class', 'bloc__form--font--message_form_4');
                                    erreurs.innerHTML = 'Le champs commentaire et obligatoire et dois contenir au minimum 2 charateres!';
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

                                    const contentModal = document.getElementById('modal_modif_commentaire');
                                    contentModal.setAttribute('class', 'modal');

                                    const modalmodifcomHide = document.getElementById('btn_annuler_modif_coms');
                                    modalmodifcomHide.addEventListener('click', (event) => {
                                        event.preventDefault();
                                        const contentModalHide = document.getElementById('modal_modif_commentaire');
                                        contentModalHide.setAttribute('class', 'display--none');

                                        const erreurPost = document.getElementById('message_coms_modif');
                                        erreurPost.setAttribute('class', 'bloc__form--font--message_form_4');

                                        document.getElementById('form_modif_com').reset();
                                    });

                                    const recupContenu = document.getElementById('commentaireModifCom');
                                    const regexDatas = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'.-]{2,255}/;

                                    validComsModif(recupContenu, regexDatas, 'message_coms_modif');

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

                                                    const modalFormModifcom = document.getElementById('modal_modif_commentaire');
                                                    modalFormModifcom.setAttribute('class', 'display--none');

                                                    setTimeout(() => {
                                                        const modalMessage = document.getElementById('messageModif');
                                                        modalMessage.setAttribute('class', 'display--none');
                                                    }, 900);
                                                });
                                            }).catch((error => {
                                                modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');
                                            })); //fin catch //fin then data
                                        } else {
                                            const erreur4 = document.getElementById('message_coms_modif');
                                            erreur4.setAttribute('class', 'bloc__form--font--message_form_4');
                                            //erreur4.innerHTML = 'le champs n\'est pas rempli correctement !';
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
                                    // modals();
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

            //modals();
        })); //fin catch user
    }; // fin de else de verification de recupUserId

}; //fin de createforum

createforum();