createFormModif = () => {

    const recupStorageAuth = sessionStorage.getItem('repAuth');
    const recupUserId5 = JSON.parse(recupStorageAuth);

    if (recupUserId5 === null) {
        modals('Vous n\avez pas accès a cette ressource !', 'Inscription', './signup.html');
    } else {
        createNavrbar(recupUserId5);

        const urlPost = 'http://localhost:3000/api/post/' + (new URL(window.location.href)).searchParams.get('id');

        const datas = requestAuth(urlPost);
        datas.then(modifPost => {

            createFormModifPost(modifPost.titre, modifPost.contenu, modifPost.imageUrl)

            const btnAnnul = document.getElementById('btn_annule_forum');

            btnAnnul.addEventListener('click', (event) => {
                event.preventDefault();
                window.location = './postsDetail.html?id=' + modifPost.postId;
            });

        });
    }; //fin de else
}; // fin de createFormModif


createFormModif();