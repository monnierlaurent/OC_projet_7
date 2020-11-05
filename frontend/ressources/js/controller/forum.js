const mainIndex = document.getElementById('main_forum');

createforum = () => {

    const recupStorage = sessionStorage.getItem('repAuth');
    const recupUserId2 = JSON.parse(recupStorage);

    if (recupUserId2 === null) {
        modals('Vous n\avez pas accès a cette ressource !', 'Inscription', './signup.html');
    } else {
        createNavBar(recupUserId2.userId);

        const btnPosteMessage = document.getElementById('poster');
        btnPosteMessage.addEventListener('click', (event) => {
            event.preventDefault();

            const recupFormCreatePost = document.getElementById('form_post');
            recupFormCreatePost.removeAttribute('class');
            recupFormCreatePost.setAttribute('class', 'bloc_article--flex--width');
        });

        createFormPost();

        const BtnPost = document.getElementById('btn_post_forum');

        const recupStorage2 = sessionStorage.getItem('repAuth');
        const recupUserId3 = JSON.parse(recupStorage2);
        const urlUserID = 'http://localhost:3000/api/auth/' + recupUserId3.userId;

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

                        // faire spinner
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

                        // faire spinner
                        modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');

                    })); //fin catch
                };
            });
        }).catch((error => {

            // faire spinner
            modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');

        })); //fin catch 

        // creation des messages 

        const urlpostAll = 'http://localhost:3000/api/post';
        const datas2 = requestAuth(urlpostAll);
        datas2.then(post => {

            post.forEach(rep => {

                createDisplayPostImg(rep.postId, rep.nom, rep.prenom, rep.dateCrea, rep.titre, rep.contenu, rep.imageUrl, rep.likes, rep.dislikes);

                if (rep.imageUrl) {
                    console.log('il y a une image');
                } else {

                    const imqAltParent = document.getElementById('lien_article' + rep.postId);
                    const imgBalise = document.getElementById('img_post_display' + rep.postId);
                    imqAltParent.removeChild(imgBalise);
                };

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
        }).catch((error => {

            // faire spinner
            //modals('Désolé !<br>Le serveur ne repond pas10', 'Connection', './index.html');
            console.log(error = 'le forum et vide');
        })); //fin catch
    }; //fin de else
}; // fin createForum
createforum();