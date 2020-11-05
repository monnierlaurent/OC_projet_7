createNavrbar = (recupUserId) => {
    const navBar = document.getElementById('nav_modif_post_id');
    navBar.appendChild(createElm3('a', 'Forum', 'id', 'retourForum', 'class', 'header__nav__a--style', 'href', './forum.html'));
    navBar.appendChild(createElm3('a', 'Mon compte', 'id', 'compteUser', 'class', 'header__nav__a--style', 'href', './compteUser.html?id=' + recupUserId));
    navBar.appendChild(createElm3('a', 'Déonnection', 'id', 'deconnection', 'class', 'header__nav__a--style', 'href', './index.html'));
};

createFormModifPost = (titre, contenu, imageUrl) => {

    const mainModif = document.getElementById('main_modif_post');

    const formPost = mainModif.appendChild(createElm2('form', '', 'id', 'form_post', 'class', 'bloc_article--flex--width'));
    formPost.appendChild(createElm1('h2', 'Modifier mon post :', 'class', 'bloc__login__form--label--style-2'));

    formPost.appendChild(createElm2('label', 'Titre :', 'class', 'bloc__login__form--label--style-2', 'for', 'post_forum_titre'));
    formPost.appendChild(createInputs('input', '', 'id', 'post_forum_titre', 'class', 'bloc__login__form--input--style-2', 'name', 'titre', 'value', titre));

    formPost.appendChild(createElm2('label', 'Message :', 'class', 'bloc__login__form--label--style-2', 'for', 'post_forum_text'));
    formPost.appendChild(createInputs('textarea', contenu, 'id', 'post_forum_text', 'rows', '10', 'class', 'bloc__login__form--input--style-2', 'name', 'contenu'));
    formPost.appendChild(createElm2('p', 'le champs n\'est pas rempli correctement !', 'id', 'erreur_modif_posts', 'class', 'bloc__form--font--erreur'));

    formPost.appendChild(createElm2('img', '', 'class', 'bloc_article_img--width2', 'src', imageUrl, 'alt', 'affichage de l\'anciene image'));

    const formPost2 = formPost.appendChild(createElm2('form', '', 'class', 'bloc_article--flex--width2'));
    formPost2.appendChild(createElm2('label', 'Ajouter une image :', 'class', 'bloc__login__form--label--style-2', 'for', 'post_img'));
    formPost2.appendChild(createInputs('input', '', 'class', '', 'id', 'post_img', 'type', 'file', 'accept', 'image/png, image/jpeg, image/gif', 'name', 'image'));

    const newDiv1 = formPost.appendChild(createElm1('div', '', 'class', 'bloc_bloc__form--btn-flex', ));
    newDiv1.appendChild(createElm2('button', 'Modifier', 'id', 'btn_post_forum', 'class', 'bloc__form--btn-post'));
    newDiv1.appendChild(createElm2('button', 'Annuler', 'id', 'btn_annule_forum', 'class', 'bloc__form--btn-post'));

};