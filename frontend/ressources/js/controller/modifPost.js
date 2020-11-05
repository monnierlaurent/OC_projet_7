createFormModif = () => {

    const recupStorageAuth = sessionStorage.getItem('repAuth');
    const recupUserId5 = JSON.parse(recupStorageAuth);

    if (recupUserId5 === null) {
        modals('Vous n\avez pas accès a cette ressource !', 'Inscription', './signup.html');
    } else {
        createNavrbar(recupUserId5);

        const urlPost = 'http://localhost:3000/api/post/' + (new URL(window.location.href)).searchParams.get('id');
        const postUrlImg = 'http://localhost:3000/api/post/img/' + (new URL(window.location.href)).searchParams.get('id');

        const datas = requestAuth(urlPost);
        datas.then(modifPost => {

            createFormModifPost(modifPost.titre, modifPost.contenu, modifPost.imageUrl)

            const btnAnnul = document.getElementById('btn_annule_forum');
            const btnEnvoi = document.getElementById('btn_post_forum');


            btnAnnul.addEventListener('click', (event) => {
                event.preventDefault();
                window.location = './postsDetail.html?id=' + modifPost.postId;
            });

            const image = document.getElementById('post_img').files;
            const titre = document.getElementById('post_forum_titre');
            const contenu = document.getElementById('post_forum_text');

            const regexDatas = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'.-]{2,255}/;
            const erreurModifPost = document.getElementById('erreur_modif_posts');

            valideModifPost = () => {
                titre.addEventListener('change', (event) => {
                    event.preventDefault;

                    if (titre.value.length === 0) {
                        erreurModifPost.setAttribute('class', 'bloc__form--font--erreur');
                    } else if (regexDatas.test(titre.value) === true) {
                        erreurModifPost.setAttribute('class', 'bloc__form--font--erreur');
                    } else if (regexDatas.test(titre.value) === false) {
                        erreurModifPost.setAttribute('class', 'bloc__form--font--erreur2');
                    };
                });
                contenu.addEventListener('change', (event) => {
                    event.preventDefault;

                    if (contenu.value.length === 0) {
                        erreurModifPost.setAttribute('class', 'bloc__form--font--erreur');
                    } else if (regexDatas.test(contenu.value) === true) {
                        erreurModifPost.setAttribute('class', 'bloc__form--font--erreur');
                    } else if (regexDatas.test(contenu.value) === false) {
                        erreurModifPost.setAttribute('class', 'bloc__form--font--erreur2');
                    };
                });
            }; // fin de valideModifPost

            valideModifPost();


            btnEnvoi.addEventListener('click', (event) => {
                event.preventDefault();

                const urlUserID = 'http://localhost:3000/api/auth/' + recupUserId5.userId;

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
                        const postObjsect = putAuthJson(urlPost, posts);
                        postObjsect.then(response => {

                            window.location = './forum.html';
                        }).catch((error => {

                            // faire spinner
                            modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');

                        })); //fin catch
                    };
                }).catch((error => {

                    // faire spinner
                    modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');

                })); //fin catch

            });
        }).catch((error => {

            // faire spinner
            modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');

        })); //fin catch
    };
}; // fin de createFormModif


createFormModif();