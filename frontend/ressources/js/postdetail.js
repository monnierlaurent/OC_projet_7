createDetailPost = () => {
    const recupStorage = sessionStorage.getItem('repAuth');
    const recupUserId3 = JSON.parse(recupStorage);

    console.log(recupUserId3.userId)

    if (recupUserId3 === null) {
        modals('Vous n\avez pas accès a cette ressource !', 'Inscription', './signup.html')
    } else {
        createNavrbar(recupUserId3.userId);

        const urlPost = 'http://localhost:3000/api/post/' + (new URL(window.location.href)).searchParams.get('id');
        const datas = requestAuth(urlPost);
        datas.then(postUnique => {

            displayPostId(postUnique.nom, postUnique.prenom, postUnique.dateCrea, postUnique.titre, postUnique.contenu, postUnique.imageUrl, postUnique.likes, postUnique.dislikes, postUnique.postId);

            createFormComs();

            createDisplayComs();
            const btnAnnul = document.getElementById('btn_annuler_post');

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


                // envoie des commentaires



            });
        }); //fin de then

    };

}; // fin createDetailPost

createDetailPost();