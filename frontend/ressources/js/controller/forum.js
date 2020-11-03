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

        const image = document.getElementById('post_img').files;
        const BtnPost = document.getElementById('btn_post_forum');

        const recupStorage2 = sessionStorage.getItem('repAuth');
        const recupUserId3 = JSON.parse(recupStorage2);
        const urlUserID = 'http://localhost:3000/api/auth/' + recupUserId3.userId;

        const datas1 = requestAuth(urlUserID);
        datas1.then(user => {

            BtnPost.addEventListener('click', (event) => {

                event.preventDefault();
                const titre = document.getElementById('post_forum_titre');
                const contenu = document.getElementById('post_forum_text');
                const auteur = user.nom + ' ' + user.prenom;

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
                const postObjsect = sendAuth('http://localhost:3000/api/post', data);

                postObjsect.then(response => {
                    console.log(response)
                });
            });
        }); // fin resquete

        // creation des messages 

        const urlpostAll = 'http://localhost:3000/api/post';
        const datas2 = requestAuth(urlpostAll);
        datas2.then(post => {
            console.log(post)
            post.forEach(rep => {

                createDisplayPostImg(rep.postId, rep.nom, rep.prenom, rep.dateCrea, rep.titre, rep.contenu, rep.imageUrl, rep.likes, rep.dislikes);

                const btnUpprPost = document.getElementById('btn_suppr_post');
                btnUpprPost.addEventListener('click', (event) => {
                    event.preventDefault();

                    const urlDeletePost = 'http://localhost:3000/api/post/' + rep.postId;
                    const datasuppr = deleteAuth(urlDeletePost);
                    datasuppr.then(deletePost => {
                        modals(deletePost.message, 'forum', 'forum.html');
                    });
                }); // fin de btnUpprPost

            });

        });
    }; // fin de if
}; // fin createForum
createforum();