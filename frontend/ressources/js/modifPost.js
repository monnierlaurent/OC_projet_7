createFormModif = () => {

    const urlPost = 'http://localhost:3000/api/post/' + (new URL(window.location.href)).searchParams.get('id');

    const datas = requestAuth(urlPost);
    datas.then(modifPost => {

        const mainModif = document.getElementById('main_modif_post');

        const formPost = mainModif.appendChild(createElm2('form', '', 'id', 'form_post', 'class', 'bloc_article--flex--width'));
        formPost.appendChild(createElm1('h2', 'Modifier mon post :', 'class', 'bloc__login__form--label--style-2'));

        formPost.appendChild(createElm2('label', 'Titre :', 'class', 'bloc__login__form--label--style-2', 'for', 'post_forum_titre'));
        formPost.appendChild(createInputs('input', '', 'id', 'post_forum_titre', 'class', 'bloc__login__form--input--style-2', 'name', 'titre', 'value', modifPost.titre));

        formPost.appendChild(createElm2('label', 'Message :', 'class', 'bloc__login__form--label--style-2', 'for', 'post_forum_text'));
        formPost.appendChild(createInputs('textarea', modifPost.contenu, 'id', 'post_forum_text', 'rows', '10', 'class', 'bloc__login__form--input--style-2', 'name', 'contenu'));

        formPost.appendChild(createElm2('img', '', 'class', 'bloc_article_img--width2', 'src', modifPost.imageUrl, 'alt', 'affichage de l\'anciene image'));

        const formPost2 = formPost.appendChild(createElm2('form', '', 'class', 'bloc_article--flex--width2'));
        formPost2.appendChild(createElm2('label', 'Ajouter une image :', 'class', 'bloc__login__form--label--style-2', 'for', 'post_img'));
        formPost2.appendChild(createInputs('input', '', 'class', '', 'id', 'post_img', 'type', 'file', 'accept', 'image/png, image/jpeg, image/gif', 'name', 'image'));

        const newDiv1 = formPost.appendChild(createElm1('div', '', 'class', 'bloc_bloc__form--btn-flex', ));
        newDiv1.appendChild(createElm2('button', 'Modifier', 'id', 'btn_post_forum', 'class', 'bloc__form--btn-post'));
        newDiv1.appendChild(createElm2('button', 'Annuler', 'id', 'btn_annule_forum', 'class', 'bloc__form--btn-post'));

        const btnAnnul = document.getElementById('btn_annule_forum');

        btnAnnul.addEventListener('click', (event) => {
            event.preventDefault();
            window.location = './postsDetail.html?id=' + modifPost.postId;
        });

    });



}; // fin de createFormModif


createFormModif();