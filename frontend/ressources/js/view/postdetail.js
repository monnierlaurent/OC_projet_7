createNavrbar = (userId) => {
    const navBar = document.getElementById('nav_post_id');
    navBar.appendChild(createElm3('a', 'Forum', 'id', 'retourForum', 'class', 'header__nav__a--style', 'href', './forum.html'));
    navBar.appendChild(createElm3('a', 'Mon compte', 'id', 'compteUser', 'class', 'header__nav__a--style', 'href', './compteUser.html?id=' + userId));
    navBar.appendChild(createElm3('a', 'Déonnection', 'id', 'deconnection', 'class', 'header__nav__a--style', 'href', './index.html'));
};


displayPostId = (nom, prenom, dateCrea, titre, contenu, imageUrl, likes, dislikes, postId) => {
    const mainPostId = document.getElementById('main_post_id');
    const newSection = mainPostId.appendChild(createElm1('section', '', 'class', 'bloc_article--flex--width'));

    const newDiv2 = newSection.appendChild(createElm1('div', '', 'class', 'bloc_article_div--flex'));
    newDiv2.appendChild(createElm1('p', nom, 'class', 'bloc_article_div_p--padding'));
    newDiv2.appendChild(createElm1('p', prenom, 'class', 'bloc_article_div_p--padding'));
    newDiv2.appendChild(createElm1('p', dateCrea, 'class', 'bloc_article_div_p--padding'));

    newSection.appendChild(createElm1('h2', titre, 'class', 'bloc_heading--style'));
    newSection.appendChild(createElm1('p', contenu, 'class', 'bloc_article_p2--style'));
    newSection.appendChild(createElm3('img', '', 'class', 'bloc_article_img--width', 'src', imageUrl, 'alt', 'gif du post sur groupomania'));

    const newDiv3 = newSection.appendChild(createElm1('div', '', 'class', 'bloc_article_div--flex'));
    newDiv3.appendChild(createElm2('i', '', 'id', 'like-forum', 'class', 'fas fa-heart bloc_article_div_p--padding'));
    newDiv3.appendChild(createElm2('p', likes, 'id', 'compteur_like', 'class', 'bloc_article_div_p--padding'));
    newDiv3.appendChild(createElm2('i', '', 'id', 'dislike-forum', 'class', 'fas fa-heart-broken bloc_article_div_p--padding'));
    newDiv3.appendChild(createElm2('p', dislikes, 'id', 'compteur_dislike', 'class', 'bloc_article_div_p--padding'));

    const newLien3 = newDiv3.appendChild(createElm2('p', '', 'id', 'btn_modif_post', 'class', 'bloc_article_div_p--padding'));
    newLien3.appendChild(createElm2('a', 'Modifier', 'class', 'bloc_article_div_a--hover', 'href', './modifPost.html?id=' + postId));
    newDiv3.appendChild(createElm2('p', 'supprimer', 'id', 'btn_suppr_post', 'class', 'bloc_article_div_p--padding bloc_article_div_a--hover'));
};

createFormComs = () => {
    const mainPostId = document.getElementById('main_post_id');
    const newForm = mainPostId.appendChild(createElm1('form', '', 'class', 'bloc_form--style bloc_article--flex--width'));
    newForm.appendChild(createElm2('label', 'Commenter :', 'class', 'bloc_form_label--style', 'for', 'commentaire'));
    newForm.appendChild(createElm3('textarea', '', 'id', 'commentaire', 'class', 'bloc_form-input--style', 'row', '2'));

    const newDiv4 = newForm.appendChild(createElm1('div', '', 'class', 'bloc_form_btn--flex'));
    newDiv4.appendChild(createElm2('button', 'Poster', 'id', 'btn_envoyer_post', 'class', 'bloc_form-btn--style2'));
    newDiv4.appendChild(createElm2('button', 'Annuler', 'id', 'btn_annuler_post', 'class', 'bloc_form-btn--style2'));
};

createDisplayComs = () => {
    const mainPostId = document.getElementById('main_post_id');
    const newArticle = mainPostId.appendChild(createElm1('article', '', 'class', 'bloc_article--flex--width-2'));
    const newDiv5 = newArticle.appendChild(createElm1('div', '', 'class', 'bloc_article_div--flex'));
    newDiv5.appendChild(createElm1('h2', 'nom prenom', 'class', 'bloc_article_div_p--padding-2'));
    newDiv5.appendChild(createElm1('p', 'date', 'class', 'bloc_article_div_p--padding-2'));

    const newParag = newArticle.appendChild(createElm1('p', 'place des commentaire des posts', 'class', 'bloc_article_p2--style-2'));

    const newDiv6 = newArticle.appendChild(createElm1('div', '', 'class', 'bloc_article_div--flex'));
    newDiv6.appendChild(createElm2('i', '', 'id', 'like_com', 'class', 'fas fa-heart bloc_article_div_p--padding-2'));
    newDiv6.appendChild(createElm1('p', '0', 'class', 'bloc_article_div_p--padding-2'));
    newDiv6.appendChild(createElm2('i', '', 'id', 'dislike_com', 'class', 'fas fa-heart-broken bloc_article_div_p--padding-2'));
    newDiv6.appendChild(createElm1('p', '0', 'class', 'bloc_article_div_p--padding-2'));
};