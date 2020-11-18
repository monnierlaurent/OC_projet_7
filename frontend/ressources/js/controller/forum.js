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

            createNavbar = () => {
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

                    document.getElementById('form_post').reset();
                });
            }; // fin de createNavbar
            createNavbar();


            createPublication = () => {
                const image = document.getElementById('post_img').files;
                const titre = document.getElementById('post_forum_titre');
                const contenu = document.getElementById('post_forum_text');

                const message_1 = document.getElementById('message_1');
                const message_3 = document.getElementById('message_3');

                const regexDatas = /^[a-zA-Z1-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'.-]{2,255}/;

                validPosts(titre, contenu, regexDatas);

                const formPubli = document.getElementById('form_post');
                formPubli.addEventListener('change', (event) => {
                    event.preventDefault();
                    if (regexDatas.test(titre.value) !== false) {
                        message_3.setAttribute('class', 'bloc__form--font--message_form_3');
                    };
                });



                const btnEnvoiePUblication = document.getElementById('btn_publier_forum');
                btnEnvoiePUblication.addEventListener('click', (event) => {
                    event.preventDefault();

                    if (regexDatas.test(titre.value) === false) {
                        message_1.setAttribute('class', 'bloc__form--font--message_form_4');
                    } else {
                        message_1.setAttribute('class', 'bloc__form--font--message_form');
                    };

                    if (image[0] && regexDatas.test(titre.value) !== false && regexDatas.test(contenu.value) !== false) {
                        const posts10 = {
                            titre: titre.value,
                            contenu: contenu.value
                        };

                        const posts = JSON.stringify(posts10);

                        const data = new FormData();
                        data.append('image', image[0]);
                        data.append('posts', posts);

                        const sendObjsect1 = sendAuthFormdata('http://localhost:3000/api/post/img', data);
                        sendObjsect1.then(repObjet1 => {
                            if (repObjet1.status === 400 || repObjet1.status === 404 || repObjet1.status === 403 || repObjet1.status === 500) {
                                messageConfirm(repObjet1.message, 'main_forum');
                                setTimeout(() => {
                                    const main = document.getElementById('main_forum');
                                    const messageHide = document.getElementById('modal_message');
                                    main.removeChild(messageHide);
                                }, 900);

                            } else {

                                messageConfirm(repObjet1.message, 'main_forum');

                                const contentModalHide = document.getElementById('modal_create_post');
                                contentModalHide.setAttribute('class', 'display--none');

                                setTimeout(() => {
                                    const main = document.getElementById('main_forum');
                                    const messageHide = document.getElementById('modal_message');
                                    main.removeChild(messageHide);
                                }, 900);
                            };
                        });

                    } else if (image[0] && regexDatas.test(titre.value) !== false && regexDatas.test(contenu.value) === false) {

                        const posts10 = {
                            titre: titre.value,
                            contenu: 'vide'
                        };

                        const posts = JSON.stringify(posts10);

                        const data = new FormData();
                        data.append('image', image[0]);
                        data.append('posts', posts);

                        const sendObjsect2 = sendAuthFormdata('http://localhost:3000/api/post/img', data);
                        sendObjsect2.then(repObjet2 => {
                            if (repObjet2.status === 400 || repObjet2.status === 404 || repObjet2.status === 403 || repObjet2.status === 500) {
                                messageConfirm(repObjet2.message, 'main_forum');
                                setTimeout(() => {
                                    const main = document.getElementById('main_forum');
                                    const messageHide = document.getElementById('modal_message');
                                    main.removeChild(messageHide);
                                }, 900);

                            } else {

                                messageConfirm(repObjet2.message, 'main_forum');

                                const contentModalHide = document.getElementById('modal_create_post');
                                contentModalHide.setAttribute('class', 'display--none');

                                setTimeout(() => {
                                    const main = document.getElementById('main_forum');
                                    const messageHide = document.getElementById('modal_message');
                                    main.removeChild(messageHide);

                                }, 900);
                            };
                        });

                    } else if (!image[0] && regexDatas.test(titre.value) !== false && regexDatas.test(contenu.value) !== false) {

                        const posts = {
                            titre: titre.value,
                            contenu: contenu.value
                        };

                        const sendObjsect3 = sendAuthJson('http://localhost:3000/api/post', posts); //  
                        sendObjsect3.then(repObjet3 => {

                            if (repObjet3.status === 400 || repObjet3.status === 404 || repObjet3.status === 403 || repObjet3.status === 500) {
                                messageConfirm(repObjet3.message, 'main_forum');
                                setTimeout(() => {
                                    const main = document.getElementById('main_forum');
                                    const messageHide = document.getElementById('modal_message');
                                    main.removeChild(messageHide);
                                }, 900);

                            } else {

                                const contentModalHide = document.getElementById('modal_create_post');
                                contentModalHide.setAttribute('class', 'display--none');

                                messageConfirm(repObjet3.message, 'main_forum');

                                setTimeout(() => {
                                    const main = document.getElementById('main_forum');
                                    const messageHide = document.getElementById('modal_message');
                                    main.removeChild(messageHide);
                                    window.location = './forum.html';
                                }, 900);
                            };
                        }); //fin de then sendObjsect3
                    } else {
                        message_3.setAttribute('class', 'bloc__form--font--message_form_4');
                    };
                }); //fin de btnEnvoiePUblication
            }; // fin de createPublication
            createPublication();


            displayPublication = () => {
                const dataUser = requestAuth('http://localhost:3000/api/post'); //appel user
                dataUser.then(post => {
                    console.log(post)
                    if (post === 'La syntaxe de la requête est erronée') {
                        messageConfirm('Le forum est vide !!', 'main_forum');
                        setTimeout(() => {
                            const main = document.getElementById('main_forum');
                            const message = document.getElementById('modal_message');
                            main.removeChild(message);
                        }, 1500);

                    } else {
                        post.forEach(dataPubli => {

                            const dataCom = requestAuth('http://localhost:3000/api/post/' + dataPubli.postId + '/com'); //appel com
                            dataCom.then(coms => {

                                const compteurCom = coms.length;
                                // creation de l'affichage des posts
                                createPost = () => {
                                    createDisplayPostImg(dataPubli.postId, dataPubli.avatar, dataPubli.nom, dataPubli.prenom, dataPubli.titre, dataPubli.contenu, dataPubli.imageUrl, dataPubli.likes, dataPubli.dislikes, compteurCom);

                                    compterHours('date_crea_post', dataPubli.postId, dataPubli.dateCrea); //affichage du temps de publication

                                    valideUserCreateur(recupUserId.userId, dataPubli.userId, dataPubli.postId, recupUserId.role); // gestion de la vue des btn suppr et modif si on est pas l'utilisateur createur

                                    deleteImg(dataPubli.imageUrl, dataPubli.postId);

                                    deletetitre(dataPubli.contenu, dataPubli.postId);
                                };
                                createPost();

                                //-------------------suppression d'une publication----------------------//
                                deletePublication = () => {
                                    const btnSupprPublication = document.getElementById('btn_suppr_publication' + dataPubli.postId);
                                    btnSupprPublication.addEventListener('click', (event) => {
                                        event.preventDefault();

                                        // suppression d'un post
                                        const datas2 = deleteAuth('http://localhost:3000/api/post/' + dataPubli.postId);
                                        datas2.then((response) => {

                                            const main = document.getElementById('main_forum');
                                            const contentArcticle = document.getElementById('content_article' + dataPubli.postId);
                                            main.removeChild(contentArcticle);

                                            messageConfirm(response.message, 'main_forum');

                                            setTimeout(() => {
                                                const main = document.getElementById('main_forum');
                                                const message = document.getElementById('modal_message');
                                                main.removeChild(message);
                                            }, 900);
                                        }).catch((error => {
                                            messageConfirm(error, 'main_forum');
                                        })); //fin catch
                                    }); // fin de suppression d'un post
                                }; //deletePublication
                                deletePublication();

                                //-------------------gestion des likes et dislikes d'une publication----------------------//
                                likePublication = () => {
                                    const btnLike = document.getElementById('like-forum' + dataPubli.postId);
                                    btnLike.addEventListener('click', (event) => {
                                        const like = {
                                            userId: recupUserId.userId,
                                            like: 1
                                        };
                                        const likeSend1 = sendAuthJson('http://localhost:3000/api/post/' + dataPubli.postId + '/like', like);
                                        likeSend1.then(response => {

                                            const likeSend1 = requestAuth('http://localhost:3000/api/post/' + dataPubli.postId);
                                            likeSend1.then(response => {

                                                const compteur_like = document.getElementById('compteur_like' + dataPubli.postId);
                                                compteur_like.innerHTML = response.likes;

                                                const compteur_dislike = document.getElementById('compteur_dislike' + dataPubli.postId);
                                                compteur_dislike.innerHTML = response.dislikes;
                                            });
                                        }).catch((error => {
                                            messageConfirm(error, 'main_forum');
                                        })); //fin catch
                                    });

                                    const btnDislike = document.getElementById('dislike-forum' + dataPubli.postId);
                                    btnDislike.addEventListener('click', (event) => {
                                        const like = {
                                            userId: recupUserId.userId,
                                            like: -1
                                        };
                                        const likeSend2 = sendAuthJson('http://localhost:3000/api/post/' + dataPubli.postId + '/like', like);
                                        likeSend2.then(response => {

                                            const likeSend1 = requestAuth('http://localhost:3000/api/post/' + dataPubli.postId);
                                            likeSend1.then(response => {

                                                const compteur_like = document.getElementById('compteur_like' + dataPubli.postId);
                                                compteur_like.innerHTML = response.likes;

                                                const compteur_dislike = document.getElementById('compteur_dislike' + dataPubli.postId);
                                                compteur_dislike.innerHTML = response.dislikes;
                                            });
                                        }).catch((error => {
                                            messageConfirm(error, 'main_forum');
                                        })); //fin catch
                                    });
                                }; //fin de likePublication
                                likePublication();

                                //-------------------modification d'une publication----------------------//
                                modifPublication = () => {

                                    const btnModalModifPubli = document.getElementById('btn_modif_publication' + dataPubli.postId);
                                    btnModalModifPubli.addEventListener('click', (event) => {
                                        event.preventDefault();

                                        const sendModifObjsect1 = requestAuth('http://localhost:3000/api/post/' + dataPubli.postId);
                                        sendModifObjsect1.then(recupModifObjet => {

                                            modaleCreateModifPost(recupModifObjet.postId, recupModifObjet.avatar, recupModifObjet.titre, recupModifObjet.contenu, recupModifObjet.imageUrl, recupModifObjet.nom, recupModifObjet.prenom);

                                            const modalModifPubli = document.getElementById('modal_modif_post')
                                            modalModifPubli.setAttribute('class', 'modal');

                                            const btnHideModal = document.getElementById('btn_annule_forum');
                                            btnHideModal.addEventListener('click', (event) => {
                                                event.preventDefault();

                                                const main = document.getElementById('main_forum');
                                                const modalModifPubli = document.getElementById('modal_modif_post');
                                                main.removeChild(modalModifPubli);

                                                modalModifPubli.setAttribute('class', 'display--none');
                                            });

                                            const titre = document.getElementById('post_forum_titre' + dataPubli.postId);
                                            const contenu = document.getElementById('post_forum_text' + dataPubli.postId);
                                            const image = document.getElementById('post_img' + dataPubli.postId).files;

                                            if (recupModifObjet.contenu === 'vide') {

                                                contenu.innerText = '';
                                            };

                                            const message_3 = document.getElementById('message_33');

                                            const regexDatas = /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'\.\-\ ]{2,255}$/;

                                            validModifPosts(titre, contenu, regexDatas);

                                            const formPubli = document.getElementById('modal_modif_post');
                                            formPubli.addEventListener('change', (event) => {
                                                event.preventDefault();
                                                if (regexDatas.test(titre.value) !== false) {
                                                    message_3.setAttribute('class', 'bloc__form--font--message_form_3');
                                                };
                                            });

                                            const btnSendModif = document.getElementById('btn_post_forum_modif');
                                            btnSendModif.addEventListener('click', (event) => {

                                                if (regexDatas.test(titre.value) === false) {
                                                    const message_1 = document.getElementById('message_11');
                                                    message_1.setAttribute('class', 'bloc__form--font--message_form_4');
                                                } else {
                                                    const message_1 = document.getElementById('message_11');
                                                    message_1.setAttribute('class', 'bloc__form--font--message_form');

                                                };
                                                if (contenu.length < 0) {
                                                    if (regexDatas.test(contenu.value) === false) {
                                                        const message_2 = document.getElementById('message_22');
                                                        message_2.setAttribute('class', 'bloc__form--font--message_form_4');
                                                    } else {
                                                        const message_2 = document.getElementById('message_22');
                                                        message_2.setAttribute('class', 'bloc__form--font--message_form');
                                                    };
                                                };

                                                if (image[0] && regexDatas.test(titre.value) !== false && regexDatas.test(contenu.value) !== false) {
                                                    const posts10 = {
                                                        titre: titre.value,
                                                        contenu: contenu.value
                                                    };
                                                    const posts = JSON.stringify(posts10);

                                                    const data = new FormData();
                                                    data.append('image', image[0]);
                                                    data.append('posts', posts);

                                                    const sendModifObjsect1 = putAuthFormdata('http://localhost:3000/api/post/img/' + dataPubli.postId, data);
                                                    sendModifObjsect1.then(repModifObjet1 => {


                                                        if (repModifObjet1.status === 400 || repModifObjet1.status === 404 || repModifObjet1.status === 403 || repModifObjet1.status === 500) {
                                                            messageConfirm(repModifObjet1.message, 'main_forum');
                                                            setTimeout(() => {
                                                                const main = document.getElementById('main_forum');
                                                                const messageHide = document.getElementById('modal_message');
                                                                main.removeChild(messageHide);
                                                            }, 900);

                                                        } else {

                                                            const recupObjsect = requestAuth('http://localhost:3000/api/post/' + dataPubli.postId);
                                                            recupObjsect.then(recupUpdate2 => {

                                                                const updateTitre = document.getElementById('titre' + dataPubli.postId);
                                                                updateTitre.innerHTML = recupUpdate2.titre;

                                                                const ModifContenu = document.getElementById('contenu' + dataPubli.postId);
                                                                ModifContenu.innerHTML = recupUpdate3.contenu;

                                                                const updateImage = document.getElementById('img_post_display' + dataPubli.postId);
                                                                updateImage.setAttribute('src', recupUpdate2.imageUrl);

                                                                messageConfirm(repModifObjet1.message, 'main_forum');

                                                                const main = document.getElementById('main_forum');
                                                                const modalModifPubli = document.getElementById('modal_modif_post');
                                                                main.removeChild(modalModifPubli);

                                                                setTimeout(() => {
                                                                    const message = document.getElementById('messageModif');
                                                                    message.setAttribute('class', 'display--none');
                                                                }, 900);

                                                            }).catch((error => {
                                                                messageConfirm(error, 'main_forum');
                                                            })); //fin catch
                                                        };
                                                    }).catch((error => {
                                                        messageConfirm(error, 'main_forum');
                                                    })); //fin catch
                                                } else if (image[0] && regexDatas.test(titre.value) !== false && regexDatas.test(contenu.value) === false) {
                                                    const posts10 = {
                                                        titre: titre.value,
                                                        contenu: 'vide'
                                                    };
                                                    const posts = JSON.stringify(posts10);

                                                    const data = new FormData();
                                                    data.append('image', image[0]);
                                                    data.append('posts', posts);

                                                    const sendModifObjsect2 = putAuthFormdata('http://localhost:3000/api/post/img/' + dataPubli.postId, data);
                                                    sendModifObjsect2.then(repModifObjet2 => {

                                                        if (repModifObjet2.status === 400 || repModifObjet2.status === 404 || repModifObjet2.status === 403 || repModifObjet2.status === 500) {
                                                            messageConfirm(repModifObjet2.message, 'main_forum');
                                                            setTimeout(() => {
                                                                const main = document.getElementById('main_forum');
                                                                const messageHide = document.getElementById('modal_message');
                                                                main.removeChild(messageHide);
                                                            }, 900);

                                                        } else {

                                                            const recupObjsect = requestAuth('http://localhost:3000/api/post/' + dataPubli.postId);
                                                            recupObjsect.then(recupUpdate2 => {

                                                                const updateTitre = document.getElementById('titre' + dataPubli.postId);
                                                                updateTitre.innerHTML = recupUpdate2.titre;

                                                                const updateImage = document.getElementById('img_post_display' + dataPubli.postId);
                                                                updateImage.setAttribute('src', recupUpdate2.imageUrl);

                                                                messageConfirm(repModifObjet2.message, 'main_forum');

                                                                const main = document.getElementById('main_forum');
                                                                const modalModifPubli = document.getElementById('modal_modif_post');
                                                                main.removeChild(modalModifPubli);

                                                                setTimeout(() => {
                                                                    const message = document.getElementById('messageModif');
                                                                    message.setAttribute('class', 'display--none');
                                                                }, 900);
                                                            }).catch((error => {
                                                                messageConfirm(error, 'main_forum');
                                                            })); //fin catch
                                                        };
                                                    }).catch((error => {
                                                        messageConfirm(error, 'main_forum');
                                                    })); //fin catch
                                                } else if (!image[0] && regexDatas.test(titre.value) !== false && regexDatas.test(contenu.value) !== false) {

                                                    const posts = {
                                                        titre: titre.value,
                                                        contenu: contenu.value
                                                    };

                                                    const sendModifObjsect3 = putAuthJson('http://localhost:3000/api/post/' + dataPubli.postId, posts); //  
                                                    sendModifObjsect3.then(repModifObjet3 => {

                                                        console.log(repModifObjet3)
                                                        if (repModifObjet3.status === 400 || repModifObjet3.status === 404 || repModifObjet3.status === 403 || repModifObjet3.status === 500) {
                                                            messageConfirm(repModifObjet3.message, 'main_forum');
                                                            setTimeout(() => {
                                                                const main = document.getElementById('main_forum');
                                                                const messageHide = document.getElementById('modal_message');
                                                                main.removeChild(messageHide);
                                                            }, 900);

                                                        } else {

                                                            const recupObjsect = requestAuth('http://localhost:3000/api/post/' + dataPubli.postId);
                                                            recupObjsect.then(recupUpdate3 => {

                                                                const ModifTitre = document.getElementById('titre' + dataPubli.postId);
                                                                ModifTitre.innerHTML = recupUpdate3.titre;

                                                                const ModifContenu = document.getElementById('contenu' + dataPubli.postId);
                                                                ModifContenu.innerHTML = recupUpdate3.contenu;

                                                                messageConfirm(repModifObjet3.message, 'main_forum');

                                                                const main = document.getElementById('main_forum');
                                                                const modalModifPubli = document.getElementById('modal_modif_post');
                                                                main.removeChild(modalModifPubli);

                                                                setTimeout(() => {
                                                                    const main = document.getElementById('main_forum');
                                                                    const messageHide = document.getElementById('modal_message');
                                                                    main.removeChild(messageHide);
                                                                    window.location = './forum.html';
                                                                }, 900);
                                                            }).catch((error => {
                                                                messageConfirm(error, 'main_forum')
                                                            })); //fin catch
                                                        };
                                                    }).catch((error => {
                                                        messageConfirm(error, 'main_forum')
                                                    })); //fin catch
                                                } else {
                                                    const message_3 = document.getElementById('message_33');
                                                    message_3.setAttribute('class', 'bloc__form--font--message_form_4');
                                                };
                                            }); // fin de btnSendModif
                                        });
                                    }); // fin de btnModalModifPubli
                                }; // fin de modifPublication
                                modifPublication();

                                //-------------------ouvrir la section des commentaires d'une publication----------------------//
                                displayCommentaire = () => {

                                    coms.forEach(displayCommentaire => {

                                        createDisplayComs(displayCommentaire.avatar, displayCommentaire.nom, displayCommentaire.prenom, displayCommentaire.comContenu, displayCommentaire.comId, displayCommentaire.postId, displayCommentaire.comLikes, displayCommentaire.comDislikes); // affichage des commentaire

                                        compterHours('date_crea_coms', displayCommentaire.comId, displayCommentaire.comDateCrea); //compteur de temps de publication

                                        valideUserCreateurCom(recupUserId.userId, displayCommentaire.userId, displayCommentaire.comId, recupUserId.role); //affichages des buttons modifier et supprimer si on est le createur du commentaire

                                        const paragDisplayNbComs = document.getElementById('display_coms_forum' + dataPubli.postId);
                                        if (compteurCom > 1) {

                                            paragDisplayNbComs.innerHTML = compteurCom + ' commentaires';
                                        } else {
                                            paragDisplayNbComs.innerHTML = compteurCom + ' commentaire';
                                        };

                                        const btnDysplayComs = document.getElementById('display_coms_forum' + dataPubli.postId);
                                        btnDysplayComs.addEventListener('click', (event) => {
                                            event.preventDefault();
                                            const createDisplayComs = document.getElementById('coms_display' + displayCommentaire.comId);
                                            createDisplayComs.removeAttribute('class');
                                            const btnMasquer = document.getElementById('display_none_forum' + dataPubli.postId);
                                            btnMasquer.setAttribute('class', 'bloc_article--icons--flex');
                                        });

                                        const btnHideComs = document.getElementById('display_none_forum' + dataPubli.postId);
                                        btnHideComs.addEventListener('click', (event) => {
                                            event.preventDefault();
                                            const createDisplayComs = document.getElementById('coms_display' + displayCommentaire.comId);
                                            createDisplayComs.setAttribute('class', 'display--none');

                                            btnHideComs.setAttribute('class', 'display--none');
                                        });

                                        //-------------------suppression d'un commentaire----------------------//
                                        deleteCommentaire = () => {
                                            const btnSupprCommentaire = document.getElementById('btn_com_suppr' + displayCommentaire.comId);
                                            btnSupprCommentaire.addEventListener('click', (event) => {

                                                event.preventDefault();

                                                const urlModifCom = 'http://localhost:3000/api/post/' + dataPubli.postId + '/com/' + displayCommentaire.comId;
                                                const data = deleteAuth(urlModifCom);
                                                data.then(repDelete => {

                                                    const mainPostid = document.getElementById('display_forum' + dataPubli.postId);

                                                    const contentSpan = document.getElementById('coms_display' + displayCommentaire.comId);
                                                    mainPostid.removeChild(contentSpan);

                                                    const dataCom = requestAuth('http://localhost:3000/api/post/' + dataPubli.postId + '/com'); //appel com
                                                    dataCom.then(coms => {

                                                        const compteurCom = coms.length;

                                                        const compteurComs = document.getElementById('display_coms_forum' + dataPubli.postId);
                                                        compteurComs.innerHTML = compteurCom + ' ' + 'commentaire';

                                                    });
                                                    messageConfirm(repDelete.message, 'main_forum');

                                                    setTimeout(() => {
                                                        const main = document.getElementById('main_forum');
                                                        const message = document.getElementById('modal_message');
                                                        main.removeChild(message);

                                                        const btnMasquer = document.getElementById('display_none_forum' + dataPubli.postId);
                                                        btnMasquer.setAttribute('class', 'display--none');
                                                    }, 900);
                                                }).catch((error => {
                                                    messageConfirm(error, 'main_forum');
                                                }));
                                            });
                                        }; //fin de deleteCommentaire
                                        deleteCommentaire();

                                        //-------------------modification d'un commentaire----------------------//
                                        modifCommentaire = () => {

                                            const btnModifCommentaire = document.getElementById('btn_com_modif1' + displayCommentaire.comId);
                                            btnModifCommentaire.addEventListener('click', (event) => {
                                                event.preventDefault();

                                                const recupCommentaire = requestAuth('http://localhost:3000/api/post/' + dataPubli.postId + '/com/' + displayCommentaire.comId);
                                                recupCommentaire.then(recupCommentaire => {

                                                    modifComsForm(recupCommentaire.avatar, recupCommentaire.nom, recupCommentaire.prenom, recupCommentaire.comContenu);

                                                    const contentModal = document.getElementById('modal_modif_commentaire');
                                                    contentModal.setAttribute('class', 'modal');

                                                    const modalmodifcomHide = document.getElementById('btn_annuler_modif_coms');
                                                    modalmodifcomHide.addEventListener('click', (event) => {
                                                        event.preventDefault();

                                                        const main = document.getElementById('main_forum');
                                                        const contentModalHide = document.getElementById('modal_modif_commentaire');
                                                        main.removeChild(contentModalHide);
                                                    });

                                                    const message_1 = document.getElementById('message_coms_111');
                                                    const recupContenu = document.getElementById('commentaireModifCom');

                                                    const regexDatas = /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'.-]{2,255}/;

                                                    validComsModif(recupContenu, regexDatas, 'message_coms_111');

                                                    const formCom = document.getElementById('form_modif_com');

                                                    formCom.addEventListener('change', (event) => {
                                                        event.preventDefault();
                                                        if (regexDatas.test(recupContenu.value) !== false) {
                                                            const message_2 = document.getElementById('message_coms_222');
                                                            message_2.setAttribute('class', 'bloc__form--font--message_form_3');
                                                        };
                                                    });

                                                    const btnEnvoiModifCom = document.getElementById('btnComModif');
                                                    btnEnvoiModifCom.addEventListener('click', (event) => {
                                                        event.preventDefault();

                                                        if (regexDatas.test(recupContenu.value) === false) {
                                                            message_1.setAttribute('class', 'bloc__form--font--message_form_4')
                                                        } else {
                                                            message_1.setAttribute('class', 'bloc__form--font--message_form')
                                                        };

                                                        if (regexDatas.test(recupContenu.value) !== false) {

                                                            const comModif = {
                                                                comContenu: recupContenu.value
                                                            };

                                                            const urlModifCom = 'http://localhost:3000/api/post/' + dataPubli.postId + '/com/' + displayCommentaire.comId;
                                                            const data = putAuthJson(urlModifCom, comModif);
                                                            data.then(repUpdateCom => {

                                                                const data = requestAuth('http://localhost:3000/api/post/' + dataPubli.postId + '/com/' + displayCommentaire.comId);
                                                                data.then(response => {

                                                                    if (repUpdateCom.status === 400 || repUpdateCom.status === 404 || repUpdateCom.status === 403 || repUpdateCom.status === 500) {
                                                                        messageConfirm(repUpdateCom.message, 'main_forum');
                                                                        setTimeout(() => {
                                                                            const main = document.getElementById('main_forum');
                                                                            const messageHide = document.getElementById('modal_message');
                                                                            main.removeChild(messageHide);
                                                                        }, 900);

                                                                    } else {

                                                                        messageConfirm(repUpdateCom.message, 'main_forum');

                                                                        const contenuCom = document.getElementById('contenuCom' + displayCommentaire.comId);
                                                                        contenuCom.innerHTML = response.comContenu;

                                                                        const main1 = document.getElementById('main_forum');
                                                                        const modalFormModifcom = document.getElementById('modal_modif_commentaire');
                                                                        main1.removeChild(modalFormModifcom);

                                                                        setTimeout(() => {
                                                                            const main2 = document.getElementById('main_forum');
                                                                            const modalMessage = document.getElementById('modal_message');
                                                                            main2.removeChild(modalMessage);
                                                                        }, 900);
                                                                    };
                                                                });
                                                            }).catch((error => {
                                                                messageConfirm(error, 'main_forum');
                                                            })); //fin catch //fin then data
                                                        } else {
                                                            const message_2 = document.getElementById('message_coms_222');
                                                            message_2.setAttribute('class', 'bloc__form--font--message_form_4');
                                                            //erreur4.innerHTML = 'le champs n\'est pas rempli correctement !';
                                                        };
                                                    }); //fin de btn envoie de la modification du commentaire
                                                });
                                            });
                                        }; //fin de modifCommentaire
                                        modifCommentaire();

                                        //-------------------like ou dislike d'un commentaire----------------------//
                                        likeCommentaire = () => {
                                            const btnComLikes = document.getElementById('like_com' + displayCommentaire.comId);
                                            btnComLikes.addEventListener('click', (event) => {
                                                event.preventDefault();
                                                const like = {
                                                    userId: recupUserId.userId,
                                                    like: 1
                                                };
                                                const comLikeSend = sendAuthJson('http://localhost:3000/api/post/' + dataPubli.postId + '/com/' + displayCommentaire.comId + '/like', like);
                                                comLikeSend.then(response => {

                                                    const comLikeSend = requestAuth('http://localhost:3000/api/post/' + dataPubli.postId + '/com/' + displayCommentaire.comId);
                                                    comLikeSend.then(response => {

                                                        const comLikes = document.getElementById('comLikes_1' + displayCommentaire.comId)
                                                        comLikes.innerHTML = response.comLikes;
                                                        const comDislikes = document.getElementById('comDislikes_1' + displayCommentaire.comId)
                                                        comDislikes.innerHTML = response.comDislikes;
                                                    });
                                                }).catch((error => {
                                                    messageConfirm(error, 'main_forum');
                                                })); //fin catch
                                            });

                                            const btnComDislike = document.getElementById('dislike_com' + displayCommentaire.comId);
                                            btnComDislike.addEventListener('click', (event) => {
                                                event.preventDefault();
                                                const like = {
                                                    userId: recupUserId.userId,
                                                    like: -1
                                                };
                                                const comDisikeSend = sendAuthJson('http://localhost:3000/api/post/' + dataPubli.postId + '/com/' + displayCommentaire.comId + '/like', like);
                                                comDisikeSend.then(response => {

                                                    const comLikeSend = requestAuth('http://localhost:3000/api/post/' + dataPubli.postId + '/com/' + displayCommentaire.comId);
                                                    comLikeSend.then(response => {

                                                        const comLikes = document.getElementById('comLikes_1' + displayCommentaire.comId)
                                                        comLikes.innerHTML = response.comLikes;
                                                        const comDislikes = document.getElementById('comDislikes_1' + displayCommentaire.comId)
                                                        comDislikes.innerHTML = response.comDislikes;
                                                    });
                                                }).catch((error => {
                                                    messageConfirm(error, 'main_forum');
                                                })); //fin catch 
                                            });
                                        }; //fin de likeCommentaire
                                        likeCommentaire();

                                    }); // fin de boucle commentaire
                                }; //fin de displayCommentaire
                                displayCommentaire();

                                //-------------------publication d'un commentaire----------------------//
                                commentairePublication = () => {

                                    createComsForm(user.avatar, user.nom, user.prenom);

                                    const btnPubliCommentaire = document.getElementById('btn_commenter_publication' + dataPubli.postId);
                                    btnPubliCommentaire.addEventListener('click', (event) => {
                                        event.preventDefault();

                                        const modalPubliCommentaire = document.getElementById('modal_create_commentaire');
                                        modalPubliCommentaire.setAttribute('class', 'modal');

                                        const btnAnnulCommentaire = document.getElementById('btn_Annuler_Coms_1');
                                        btnAnnulCommentaire.addEventListener('click', (event) => {
                                            event.preventDefault();
                                            document.getElementById('form_commentaire').reset();

                                            modalPubliCommentaire.setAttribute('class', 'display--none');
                                        });

                                        const contenu = document.getElementById('create_commentaire');
                                        const regexDatas = /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'.-]{2,255}/;

                                        validComs('message_coms_1', contenu, regexDatas);

                                        const formCom = document.getElementById('form_commentaire');
                                        formCom.addEventListener('change', (event) => {
                                            event.preventDefault();
                                            if (regexDatas.test(contenu.value) !== false) {
                                                const message_2 = document.getElementById('message_coms_2');
                                                message_2.setAttribute('class', 'bloc__form--font--message_form_3');
                                            };
                                        });

                                        const btnSendCommentaire = document.getElementById('btn_envoyer_coms');
                                        btnSendCommentaire.addEventListener('click', (event) => {
                                            event.preventDefault();
                                            if (regexDatas.test(contenu.value) === false) {
                                                const message_1 = document.getElementById('message_coms_1');
                                                message_1.setAttribute('class', 'bloc__form--font--message_form_4');
                                            } else {
                                                const message_1 = document.getElementById('message_coms_1');
                                                message_1.setAttribute('class', 'bloc__form--font--message_form');
                                            };

                                            if (regexDatas.test(contenu.value) !== false) {
                                                const coms = {
                                                    comContenu: contenu.value
                                                };

                                                const sendCommebtaireObjsect = sendAuthJson('http://localhost:3000/api/post/' + dataPubli.postId + '/com', coms);
                                                sendCommebtaireObjsect.then(repSendCommentaire => {

                                                    if (repSendCommentaire.status === 400 || repSendCommentaire.status === 404 || repSendCommentaire.status === 403 || repSendCommentaire.status === 500) {
                                                        messageConfirm(repSendCommentaire.message, 'main_forum');
                                                        setTimeout(() => {
                                                            const main = document.getElementById('main_forum');
                                                            const messageHide = document.getElementById('modal_message');
                                                            main.removeChild(messageHide);
                                                        }, 900);

                                                    } else {


                                                        messageConfirm(repSendCommentaire.message, 'main_forum');
                                                        const main = document.querySelector('main');
                                                        const modalPubliCommentaire = document.getElementById('modal_create_commentaire');
                                                        main.removeChild(modalPubliCommentaire);

                                                        setTimeout(() => {
                                                            const message = document.getElementById('modal_message');
                                                            main.removeChild(message)
                                                            window.location = './forum.html';
                                                        }, 900);
                                                    };
                                                });
                                            } else {
                                                const message_2 = document.getElementById('message_coms_2');
                                                message_2.setAttribute('class', 'bloc__form--font--message_form_4');
                                            };
                                        });
                                    });
                                }; // fin de commentairePublication
                                commentairePublication();
                            }); //fin de then coms
                        });
                    };
                });
            }; // fin de displayPublication
            displayPublication();
        }).catch((error => {
            messageConfirm(error, 'main_forum');
        })); //fin catch
    }; // fin de else verif userid
}; //fin de createforum

createforum();