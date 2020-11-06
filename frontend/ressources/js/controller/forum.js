const mainIndex = document.getElementById('main_forum');

createforum = () => {

    const recupStorage = sessionStorage.getItem('repAuth');
    const recupUserId2 = JSON.parse(recupStorage);

    const urlUserID = 'http://localhost:3000/api/auth/' + recupUserId2.userId;
    //console.log(recupUserId2.userId)
    if (recupUserId2 === null) {
        modals('Vous n\avez pas accès a cette ressource !', 'Inscription', './signup.html');
    } else {


        const datas = requestAuth(urlUserID);
        datas.then(user => {
            createNavBar(recupUserId2.userId, user.nom, user.prenom);


            const btnPosteMessage = document.getElementById('poster');
            btnPosteMessage.addEventListener('click', (event) => {
                event.preventDefault();
                modaleCreatePost();

                const BtnPost = document.getElementById('btn_post_forum');

                const datas1 = requestAuth(urlUserID);
                datas1.then(user => {

                    const erreurPost = document.getElementById('erreur_posts');

                    const image = document.getElementById('post_img').files;
                    const titre = document.getElementById('post_forum_titre');
                    const contenu = document.getElementById('post_forum_text');
                    const auteur = user.nom + ' ' + user.prenom;

                    const regexDatas = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'.-]{2,255}/;

                    valide = () => {
                        titre.addEventListener('change', (event) => {
                            event.preventDefault;

                            if (titre.value.length === 0) {
                                erreurPost.setAttribute('class', 'bloc__form--font--erreur');
                                erreurPost.innerHTML = 'le champs n\'est pas rempli correctement !';
                                console.log('ok1 blanc');
                            } else if (regexDatas.test(titre.value) === true) {
                                erreurPost.setAttribute('class', 'bloc__form--font--erreur');
                                erreurPost.innerHTML = 'le champs n\'est pas rempli correctement !';
                                console.log('ok2');
                            } else if (regexDatas.test(titre.value) === false) {
                                erreurPost.setAttribute('class', 'bloc__form--font--erreur2');
                                erreurPost.innerHTML = 'le champs n\'est pas rempli correctement !';
                                console.log('pas ok');
                            };
                        });
                        contenu.addEventListener('change', (event) => {
                            event.preventDefault;

                            if (contenu.value.length === 0) {
                                erreurPost.setAttribute('class', 'bloc__form--font--erreur');
                                erreurPost.innerHTML = 'le champs n\'est pas rempli correctement !';

                            } else if (regexDatas.test(contenu.value) === true) {
                                erreurPost.setAttribute('class', 'bloc__form--font--erreur');
                                erreurPost.innerHTML = 'le champs n\'est pas rempli correctement !';

                            } else if (regexDatas.test(contenu.value) === false) {
                                erreurPost.setAttribute('class', 'bloc__form--font--erreur2');
                                erreurPost.innerHTML = 'le champs n\'est pas rempli correctement !';
                            };
                        });
                    }; //fin de valide

                    valide();

                    BtnPost.addEventListener('click', (event) => {
                        event.preventDefault();

                        if (image[0]) {

                            const posts10 = {
                                titre: titre.value,
                                auteur: auteur,
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
                                auteur: auteur,
                                contenu: contenu.value
                            };

                            const postObjsect = sendAuthJson('http://localhost:3000/api/post', posts);
                            postObjsect.then(response => {
                                window.location = './forum.html';
                            }).catch((error => {
                                modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');
                            })); //fin catch
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

                        // let compteurCom;
                        const urlComAll2 = 'http://localhost:3000/api/post/' + rep.postId + '/com';
                        const datas3 = requestAuth(urlComAll2);
                        datas3.then(coms => {

                            const compteurCom = coms.length;

                            // creation de l'affichage des posts
                            createDisplayPostImg(rep.postId, rep.nom, rep.prenom, rep.dateCrea, rep.titre, rep.contenu, rep.imageUrl, rep.likes, rep.dislikes, compteurCom);

                            // ajout du s sur commentaires si supprieur a 1
                            const paragDisplayNbComs = document.getElementById('display_coms_forum' + rep.postId);
                            if (compteurCom > 1) {

                                paragDisplayNbComs.innerHTML = compteurCom + ' commentaires';
                            } else {
                                paragDisplayNbComs.innerHTML = compteurCom + ' commentaire';
                            }
                            //creation de l'affichage des commenataires
                            const urlComAll = 'http://localhost:3000/api/post/' + rep.postId + '/com';
                            const datas4 = requestAuth(urlComAll);
                            datas4.then(coms => {

                                coms.forEach(rep => {

                                    //console.log(coms.length)
                                    createDisplayComs(rep.nom, rep.prenom, rep.comDateCrea, rep.comContenu, rep.postId, rep.comId);

                                    const btnDysplayComs = document.getElementById('display_coms_forum' + rep.postId);
                                    const btnHideComs = document.getElementById('display_none_forum' + rep.postId);

                                    const articleComsDisplay = document.getElementById('coms_display_none' + rep.comId);
                                    const articleHideDisplay = document.getElementById('display_none_forum' + rep.postId);

                                    btnDysplayComs.addEventListener('click', (event) => {
                                        articleComsDisplay.removeAttribute('class');
                                        articleComsDisplay.setAttribute('class', 'bloc_article--flex--width-2');

                                        articleHideDisplay.removeAttribute('class');
                                        articleHideDisplay.setAttribute('class', 'bloc_article_div--flex4 bloc_article_div_a--hover');
                                    }); // fin de click
                                    btnHideComs.addEventListener('click', (event) => {

                                        articleComsDisplay.removeAttribute('class');
                                        articleComsDisplay.setAttribute('class', 'display--none');

                                        articleHideDisplay.removeAttribute('class');
                                        articleHideDisplay.setAttribute('class', 'display--none');
                                    }); // fin de click

                                    const btnModifCom = document.getElementById('btn_com_modif' + rep.comId);
                                    btnModifCom.addEventListener('click', () => {

                                        modalComModif('modif coms', rep.comContenu);

                                        const btnEnvoiCom = document.getElementById('btnComModif');
                                        btnEnvoiCom.addEventListener('click', (event) => {
                                            event.preventDefault();
                                            const recupComtenu2 = document.getElementById('text_coms_modal');
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
                                        });

                                        const btnAnnulEnvoiCom = document.getElementById('btn_com_annul');
                                        btnAnnulEnvoiCom.addEventListener('click', (event) => {
                                            event.preventDefault();
                                            window.location = './forum.html';
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
                            }); //fin de then



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
                                modaleCreateModifPost(rep.titre, rep.contenu, rep.imageUrl);

                                const btnAnnul = document.getElementById('btn_annule_forum');
                                const btnEnvoi = document.getElementById('btn_post_forum');

                                btnAnnul.addEventListener('click', (event) => {
                                    event.preventDefault();
                                    window.location = './forum.html';
                                });

                                const image = document.getElementById('post_img').files;
                                const titre = document.getElementById('post_forum_titre');
                                const contenu = document.getElementById('post_forum_text');

                                btnEnvoi.addEventListener('click', (event) => {
                                    event.preventDefault();

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

                                            console.log(posts)
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
                                });
                            });

                            const btnComment = document.getElementById('btn_commenter_post' + rep.postId);
                            btnComment.addEventListener('click', () => {
                                createComsForm();

                                const btnPostComs = document.getElementById('btn_envoyer_coms');
                                btnPostComs.addEventListener('click', (event) => {
                                    event.preventDefault();

                                    const contenu = document.getElementById('commentaire');

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