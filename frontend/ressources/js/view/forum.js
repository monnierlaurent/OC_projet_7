createNavBar = (recupUserId) => {
    const navBar = document.getElementById('nav_forum');
    navBar.appendChild(createElm3('a', 'Poster un message', 'id', 'poster', 'class', 'header__nav__a--style', 'href', '#'));
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

    formPost.appendChild(createElm2('p', 'le champs n\'est pas rempli correctement !', 'id', 'erreur_posts', 'class', 'bloc__form--font--erreur'));
};

createDisplayPostImg = (repPostId, repNom, repPrenom, repDateCrea, repTitre, repContenu, repImageUrl, repLikes, repDislikes, nbComs) => {

    const newarticle = mainIndex.appendChild(createElm1('article', '', 'class', 'bloc_article--flex--width'));
    const newLien = newarticle.appendChild(createElm3('a', '', 'id', 'lien_article' + repPostId, 'class', 'bloc_article_a--style', 'href', './postsDetail.html?id=' + repPostId));
    const newDiv2 = newLien.appendChild(createElm2('div', '', 'id', 'div_img_suppr', 'class', 'bloc_article_div--flex'));
    newDiv2.appendChild(createElm1('p', repNom, 'class', 'bloc_article_div_p--padding'));
    newDiv2.appendChild(createElm1('p', repPrenom, 'class', 'bloc_article_div_p--padding'));
    newDiv2.appendChild(createElm1('p', repDateCrea, 'class', 'bloc_article_div_p--padding'));

    newLien.appendChild(createElm1('h2', repTitre, 'class', 'bloc_heading--style'));
    newLien.appendChild(createElm1('p', repContenu, 'class', 'bloc_article_p2--style'));
    newLien.appendChild(createElm4('img', '', 'id', 'img_post_display' + repPostId, 'class', 'bloc_article_img--width', 'src', repImageUrl, 'alt', 'image_du_pots_sur_groupomania.fr'));

    const newDiv3 = newarticle.appendChild(createElm1('div', '', 'class', 'bloc_article_div--flex2'));
    const newDiv4 = newDiv3.appendChild(createElm1('div', '', 'class', 'bloc_article_div--flex'));
    newDiv4.appendChild(createElm2('i', '', 'id', 'like-forum' + repPostId, 'class', 'fas fa-heart bloc_article_div_p--padding'));
    newDiv4.appendChild(createElm2('p', repLikes, 'id', 'compteur_like', 'class', 'bloc_article_div_p--padding'));
    newDiv4.appendChild(createElm2('i', '', 'id', 'dislike-forum' + repPostId, 'class', 'fas fa-heart-broken bloc_article_div_p--padding'));
    newDiv4.appendChild(createElm2('p', repDislikes, 'id', 'compteur_dislike', 'class', 'bloc_article_div_p--padding'));

    newDiv3.appendChild(createElm2('p', nbComs + ' comments ', 'id', 'display_coms_forum' + repPostId, 'class', 'bloc_article_div_p--padding bloc_article_div_a--hover'));

    const newDiv5 = newarticle.appendChild(createElm1('div', '', 'class', 'bloc_article_div--flex '));
    const newLien3 = newDiv5.appendChild(createElm2('p', '', 'id', 'btn_modif_post', 'class', 'bloc_article_div_p--padding'));
    newLien3.appendChild(createElm2('a', 'Modifier', 'class', 'bloc_article_div_a--hover', 'href', './postsDetail.html?id=' + repPostId));

    const newLien2 = newDiv5.appendChild(createElm2('p', '', 'id', 'btn_com_post', 'class', 'bloc_article_div_p--padding'));
    newLien2.appendChild(createElm2('p', 'commenter', 'class', 'bloc_article_div_a--hover', 'id', 'btnCommenterPost' + repPostId));

    newDiv5.appendChild(createElm2('p', 'Supprimer', 'id', 'btn_suppr_post' + repPostId, 'class', 'bloc_article_div_p--padding bloc_article_div_a--hover'));

    const newDiv6 = newarticle.appendChild(createElm2('div', '', 'id', 'display_forum' + repPostId, 'class', 'bloc_article_div--flex3'));

    const newDiv7 = newarticle.appendChild(createElm2('p', 'masquer', 'id', 'display_none_forum' + repPostId, 'class', 'display--none')); //bloc_article_div--flex4 bloc_article_div_a--hover
};

createDisplayComs = (nom, prenom, date, contenu, postId, comId) => {
    const mainPostId = document.getElementById('display_forum' + postId);
    const newArticle = mainPostId.appendChild(createElm2('article', '', 'id', 'coms_display_none' + comId, 'class', 'display--none')); // bloc_article--flex--width-2
    const newDiv5 = newArticle.appendChild(createElm1('div', '', 'class', 'bloc_article_div--flex'));
    newDiv5.appendChild(createElm1('h2', nom + ' ' + prenom, 'class', 'bloc_article_div_p--padding-2'));
    newDiv5.appendChild(createElm1('p', date, 'class', 'bloc_article_div_p--padding-2'));

    newArticle.appendChild(createElm1('p', contenu, 'class', 'bloc_article_p2--style-2'));

    const newDiv6 = newArticle.appendChild(createElm1('div', '', 'class', 'bloc_article_div--flex'));
    newDiv6.appendChild(createElm2('i', '', 'id', 'like_com' + comId, 'class', 'fas fa-heart bloc_article_div_p--padding-2'));
    newDiv6.appendChild(createElm1('p', '0', 'class', 'bloc_article_div_p--padding-2'));
    newDiv6.appendChild(createElm2('i', '', 'id', 'dislike_com' + comId, 'class', 'fas fa-heart-broken bloc_article_div_p--padding-2'));
    newDiv6.appendChild(createElm1('p', '0', 'class', 'bloc_article_div_p--padding-2'));


    newDiv6.appendChild(createElm3('a', 'Modifier', 'id', 'btn_com_modif' + comId, 'class', 'bloc_article_div_p--padding-2 bloc_article_div_a--hover', 'href', '#?id=' + postId));
    newDiv6.appendChild(createElm2('a', 'Supprimer', 'id', 'btn_com_suppr' + comId, 'class', 'bloc_article_div_p--padding-2 bloc_article_div_a--hover'));


};