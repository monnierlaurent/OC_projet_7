const mainIndex = document.getElementById('main_forum');

//console.log(sessionStorage);

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

            BtnPost.addEventListener('click', (event) => {
                event.preventDefault();

                const image = document.getElementById('post_img').files;
                const titre = document.getElementById('post_forum_titre');
                const contenu = document.getElementById('post_forum_text');
                const auteur = user.nom + ' ' + user.prenom;

                if (image[0]) {
                    console.log('avec image');
                    const posts10 = {
                        titre: titre.value,
                        auteur: auteur,
                        contenu: contenu.value,
                    };
                    const posts = JSON.stringify(posts10);

                    const data = new FormData();
                    data.append('image', image[0]);
                    data.append('posts', posts);

                    console.log(image);
                    const postObjsect = sendAuthFormdata('http://localhost:3000/api/post/img', data);

                    postObjsect.then(response => {
                        console.log(response);
                        window.location = './forum.html';
                    });

                } else {
                    const posts = {
                        titre: titre.value,
                        auteur: auteur,
                        contenu: contenu.value
                    };

                    const postObjsect = sendAuthJson('http://localhost:3000/api/post', posts);
                    postObjsect.then(response => {
                        console.log(response);
                        window.location = './forum.html';
                    });
                };
            });
        }); // fin resquete

        // creation des messages 

        const urlpostAll = 'http://localhost:3000/api/post';
        const datas2 = requestAuth(urlpostAll);
        datas2.then(post => {

            post.forEach(rep => {

                console.log(rep)



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
                    });

                });
            });

        });
    }; //fin de else
}; // fin createForum
createforum();