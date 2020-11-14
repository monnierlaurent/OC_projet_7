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
            //-----------------creation d'une publication-----------------------//
            createPublication = () => {
                const image = document.getElementById('post_img').files;
                const titre = document.getElementById('post_forum_titre');
                const contenu = document.getElementById('post_forum_text');

                const message_1 = document.getElementById('message_1');
                const message_2 = document.getElementById('message_2');
                const message_3 = document.getElementById('message_3');

                const regexDatas = /^[a-zA-Z1-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'.-]{2,255}/;

                validPosts(titre, contenu, regexDatas);

                const btnEnvoiePUblication = document.getElementById('btn_publier_forum');
                btnEnvoiePUblication.addEventListener('click', (event) => {
                    event.preventDefault();

                    if (regexDatas.test(titre.value) === false) {
                        message_1.setAttribute('class', 'bloc__form--font--message_form_4');
                    } else {
                        message_1.setAttribute('class', 'bloc__form--font--message_form');
                    };

                    if (image[0] && regexDatas.test(titre.value) !== false && regexDatas.test(contenu.value) !== false) {
                        console.log('titre + image + contenu');
                    } else if (image[0] && regexDatas.test(titre.value) !== false && regexDatas.test(contenu.value) === false) {
                        console.log('titre + image');
                    } else if (!image[0] && regexDatas.test(titre.value) !== false && regexDatas.test(contenu.value) !== false) {
                        console.log('titre + contenu');
                    } else {
                        message_3.setAttribute('class', 'bloc__form--font--message_form_4');
                        console.log('erreur');
                    };


                }); //fin de btnEnvoiePUblication


            }; // fin de createPublication
            createPublication();


            displayPublication = () => {
                const dataUser = requestAuth('http://localhost:3000/api/post'); //appel user
                dataUser.then(post => {

                    post.forEach(dataPubli => {
                        const dataCom = requestAuth('http://localhost:3000/api/post/' + dataPubli.postId + '/com'); //appel com
                        dataCom.then(coms => {

                            const compteurCom = coms.length;
                            // creation de l'affichage des posts
                            createDisplayPostImg(dataPubli.postId, dataPubli.avatar, dataPubli.nom, dataPubli.prenom, dataPubli.titre, dataPubli.contenu, dataPubli.imageUrl, dataPubli.likes, dataPubli.dislikes, compteurCom);

                            compterHours('date_crea_post', dataPubli.postId, dataPubli.dateCrea); //affichage du temps de publication

                            valideUserCreateur(recupUserId.userId, dataPubli.userId, dataPubli.postId, recupUserId.role); // gestion de la vue des btn suppr et modif si on est pas l'utilisateur createur

                            deleteImg(dataPubli.imageUrl, dataPubli.postId);

                            deletetitre(dataPubli.contenu, dataPubli.postId);

                            //-------------------suppression d'une publication----------------------//
                            deletePublication = () => {
                                const btnSupprPublication = document.getElementById('btn_suppr_publication' + dataPubli.postId);
                                btnSupprPublication.addEventListener('click', (event) => {
                                    event.preventDefault();

                                    // suppression d'un post
                                    const datas2 = deleteAuth('http://localhost:3000/api/post/' + dataPubli.postId);
                                    datas2.then((response) => {

                                        const mainIndex = document.getElementById('main_forum');
                                        const contentArticle = document.getElementById('content_article' + dataPubli.postId);
                                        mainIndex.removeChild(contentArticle);

                                        messageConfirm(response.message);
                                        setTimeout(() => {
                                            const main = document.getElementById('main_forum');
                                            const message = document.getElementById('modal_message');
                                            main.removeChild(message);
                                        }, 900);
                                    }).catch((error => {
                                        modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');
                                    })); //fin catch
                                }); // fin de suppression d'un post
                            }; //deletePublication
                            deletePublication();
                        }); //fin de then coms
                    }); //fin de forEach de post
                });
            }; // fin de displayPublication
            displayPublication();


            //------------------suite du code-------------------------//
        }); //fin de then user
    }; // fin de else verif userid
}; //fin de createforum

createforum();