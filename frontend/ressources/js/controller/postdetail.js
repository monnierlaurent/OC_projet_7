createDetailPost = () => {
    const recupStorage = sessionStorage.getItem('repAuth');
    const recupUserId3 = JSON.parse(recupStorage);

    console.log(recupUserId3.userId)

    if (recupUserId3 === null) {
        modals('Vous n\avez pas accès a cette ressource !', 'Inscription', './signup.html');
    } else {
        createNavrbar(recupUserId3.userId);

        const urlPost = 'http://localhost:3000/api/post/' + (new URL(window.location.href)).searchParams.get('id');
        const datas = requestAuth(urlPost);
        datas.then(postUnique => {

            displayPostId(postUnique.nom, postUnique.prenom, postUnique.dateCrea, postUnique.titre, postUnique.contenu, postUnique.imageUrl, postUnique.likes, postUnique.dislikes, postUnique.postId);

            createFormComs();

            const btnPostComs = document.getElementById('btn_envoyer_coms');
            btnPostComs.addEventListener('click', (event) => {
                event.preventDefault();

                const contenu = document.getElementById('commentaire');

                const coms = {
                    comContenu: contenu.value
                };
                const urlComs = 'http://localhost:3000/api/post/' + (new URL(window.location.href)).searchParams.get('id') + '/com';
                console.log(urlComs)
                const postObjsect = sendAuthJson(urlComs, coms);
                postObjsect.then(response => {
                    console.log(response);
                    window.location = './postsDetail.html?id=' + postUnique.postId;
                });

            });

            const btnAnnul = document.getElementById('btn_annuler_coms');
            btnAnnul.addEventListener('click', (event) => {
                event.preventDefault();
                window.location = './postsDetail.html?id=' + postUnique.postId;
            });

            const btnUpprPost = document.getElementById('btn_suppr_post');
            btnUpprPost.addEventListener('click', (event) => {
                event.preventDefault();

                const datas = deleteAuth(urlPost);
                datas.then(deletePost => {
                    modals(deletePost.message, 'forum', 'forum.html');
                });
            });

            const urlUserID = 'http://localhost:3000/api/auth/' + recupUserId3.userId;
            const datas1 = requestAuth(urlUserID);
            datas1.then(user => {

                const urlComAll = 'http://localhost:3000/api/post/' + (new URL(window.location.href)).searchParams.get('id') + '/com';
                console.log(urlComAll)
                const datas2 = requestAuth(urlComAll);
                datas2.then(coms => {
                    console.log(coms)
                    coms.forEach(rep => {
                        createDisplayComs(rep.nom, rep.prenom, rep.comDateCrea, rep.comContenu);

                    });

                });
            });





        }); //fin de then

    };

}; // fin createDetailPost

createDetailPost();