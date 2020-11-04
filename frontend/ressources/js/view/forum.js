createNavBar = (recupUserId) => {
    const navBar = document.getElementById('nav_forum');
    navBar.appendChild(createElm3('a', 'Poster un message', 'id', 'poster', 'class', 'header__nav__a--style', 'href', '#'));
    navBar.appendChild(createElm3('a', 'Forum', 'id', 'retourForum', 'class', 'header__nav__a--style', 'href', './forum.html'));
    navBar.appendChild(createElm3('a', 'Mon compte', 'id', 'compteUser', 'class', 'header__nav__a--style', 'href', './compteUser.html?id=' + recupUserId));
    navBar.appendChild(createElm3('a', 'Déonnection', 'id', 'deconnection', 'class', 'header__nav__a--style', 'href', './index.html'));

};

createFormPost = () => {
    const formPost = mainIndex.appendChild(createElm2('form', '', 'id', 'form_post', 'class', 'display--none'));
    formPost.appendChild(createElm1('h2', 'Mon post :', 'class', 'bloc__login__form--label--style-2'));

    formPost.appendChild(createElm2('label', 'Titre :', 'class', 'bloc__login__form--label--style-2', 'for', 'post_forum_titre'));
    formPost.appendChild(createInputs('input', '', 'id', 'post_forum_titre', 'class', 'bloc__login__form--input--style-2', 'name', 'titre'));

    formPost.appendChild(createElm2('label', 'Message :', 'class', 'bloc__login__form--label--style-2', 'for', 'post_forum'));
    formPost.appendChild(createInputs('textarea', '', 'id', 'post_forum_text', 'rows', '5', 'cols', '33', 'class', 'bloc__login__form--input--style-2', 'name', 'contenu'));

    const formPost2 = formPost.appendChild(createElm2('form', '', 'class', 'bloc_article--flex--width2'));
    formPost2.appendChild(createElm2('label', 'Ajouter une image :', 'class', 'bloc__login__form--label--style-2', 'for', 'post_img'));
    formPost2.appendChild(createInputs('input', '', 'class', '', 'id', 'post_img', 'type', 'file', 'accept', 'image/png, image/jpeg, image/gif', 'name', 'image'));

    const newDiv1 = formPost.appendChild(createElm1('div', '', 'class', 'bloc_bloc__form--btn-flex', ));
    newDiv1.appendChild(createElm2('button', 'Poster', 'id', 'btn_post_forum', 'class', 'bloc__form--btn-post'));
    newDiv1.appendChild(createElm2('button', 'Annuler', 'id', 'btn_annule_forum', 'class', 'bloc__form--btn-post'));

};

createDisplayPostImg = (repPostId, repNom, repPrenom, repDateCrea, repTitre, repContenu, repImageUrl, repLikes, repDislikes) => {




    const newarticle = mainIndex.appendChild(createElm1('article', '', 'class', 'bloc_article--flex--width'));
    const newLien = newarticle.appendChild(createElm3('a', '', 'id', 'lien_article', 'class', 'bloc_article_a--style', 'href', './postsDetail.html?id=' + repPostId));
    const newDiv2 = newLien.appendChild(createElm2('div', '', 'id', 'div_img_suppr', 'class', 'bloc_article_div--flex'));
    newDiv2.appendChild(createElm1('p', repNom, 'class', 'bloc_article_div_p--padding'));
    newDiv2.appendChild(createElm1('p', repPrenom, 'class', 'bloc_article_div_p--padding'));
    newDiv2.appendChild(createElm1('p', repDateCrea, 'class', 'bloc_article_div_p--padding'));

    newLien.appendChild(createElm1('h2', repTitre, 'class', 'bloc_heading--style'));
    newLien.appendChild(createElm1('p', repContenu, 'class', 'bloc_article_p2--style'));
    newLien.appendChild(createElm3('img', '', 'id', 'img_post_display', 'class', 'bloc_article_img--width', 'src', repImageUrl));

    newDiv3 = newarticle.appendChild(createElm1('div', '', 'class', 'bloc_article_div--flex'));
    newDiv3.appendChild(createElm2('i', '', 'id', 'like-forum', 'class', 'fas fa-heart bloc_article_div_p--padding'));
    newDiv3.appendChild(createElm2('p', repLikes, 'id', 'compteur_like', 'class', 'bloc_article_div_p--padding'));
    newDiv3.appendChild(createElm2('i', '', 'id', 'dislike-forum', 'class', 'fas fa-heart-broken bloc_article_div_p--padding'));
    newDiv3.appendChild(createElm2('p', repDislikes, 'id', 'compteur_dislike', 'class', 'bloc_article_div_p--padding'));

    const newLien2 = newDiv3.appendChild(createElm2('p', '', 'id', 'btn_com_post', 'class', 'bloc_article_div_p--padding'));
    newLien2.appendChild(createElm2('a', 'commenter', 'class', 'bloc_article_div_a--hover', 'href', './postsDetail.html?id=' + repPostId));

    const newLien3 = newDiv3.appendChild(createElm2('p', '', 'id', 'btn_modif_post', 'class', 'bloc_article_div_p--padding'));
    newLien3.appendChild(createElm2('a', 'Modifier', 'class', 'bloc_article_div_a--hover', 'href', './postsDetail.html?id=' + repPostId));
};