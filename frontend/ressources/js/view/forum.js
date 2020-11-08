//----------------------------parties forum ------------------------------------------------------

createNavBarForum = (recupUserId, nom, prenom) => {
    const header = document.getElementById('header_forum');
    const createNavBar = header.appendChild(createElm1('nav', '', 'class', 'header__nav--padding')); //display--none 
    createNavBar.appendChild(createElm2('i', '', 'id', '', 'class', 'far fa-user-circle header__nav__avatar--style'));
    createNavBar.appendChild(createElm2('a', nom + ' ' + prenom + '', 'id', '', 'class', 'header__nav__a--style'));
    createNavBar.appendChild(createElm2('a', 'Créer une publication', 'id', 'poster', 'class', 'header__nav__a--style'));
    createNavBar.appendChild(createElm3('a', 'Mon compte', 'id', 'compteUser', 'class', 'header__nav__a--style', 'href', './compteUser.html?id=' + recupUserId));
    createNavBar.appendChild(createElm2('a', 'Déonnection', 'id', 'deconnection', 'class', 'header__nav__a--style'));
};

createDisplayPostImg = (repPostId, repNom, repPrenom, repTitre, repContenu, repImageUrl, repLikes, repDislikes, nbComs, recupUserId) => {

    const mainIndex = document.getElementById('main_forum');
    const newarticle = mainIndex.appendChild(createElm1('article', '', 'class', 'bloc_article--flex--width')); //display--none 
    const newDiv1 = newarticle.appendChild(createElm1('div', '', 'class', 'bloc_article_div--flex'));
    newDiv1.appendChild(createElm1('h2', repNom + ' ' + repPrenom, 'class', 'bloc_article_div_p--padding'));
    newDiv1.appendChild(createElm2('p', '0', 'id', 'date_crea_post' + repPostId, 'class', ''));

    const newDiv2 = newarticle.appendChild(createElm2('div', '', 'id', 'lien_article' + repPostId, 'class', 'bloc_article_div--flex3'));
    newDiv2.appendChild(createElm1('h2', repTitre, 'class', 'bloc_heading--style'));
    newDiv2.appendChild(createElm1('p', repContenu, 'class', 'bloc_article_p2--style'));
    newDiv2.appendChild(createElm4('img', '', 'id', 'img_post_display' + repPostId, 'class', 'bloc_article_img--width', 'src', repImageUrl, 'alt', 'image_du_pots_sur_groupomania.fr'));

    const newDiv3 = newarticle.appendChild(createElm1('div', '', 'class', 'bloc_article_div--flex'));
    const newDiv5 = newDiv3.appendChild(createElm1('div', '', 'class', 'div--commentaire'));
    newDiv5.appendChild(createElm2('i', '', 'id', 'like-forum' + repPostId, 'class', 'fas fa-heart bloc_article_div_p--padding'));
    newDiv5.appendChild(createElm2('p', repLikes, 'id', 'compteur_like', 'class', 'bloc_article_div_p--padding'));
    newDiv5.appendChild(createElm2('i', '', 'id', 'dislike-forum' + repPostId, 'class', 'fas fa-heart-broken bloc_article_div_p--padding'));
    newDiv5.appendChild(createElm2('p', repDislikes, 'id', 'compteur_dislike', 'class', 'bloc_article_div_p--padding'));

    const newDiv4 = newDiv3.appendChild(createElm1('div', '', 'class', ''));
    newDiv4.appendChild(createElm2('p', nbComs + ' commentaire', 'id', 'display_coms_forum' + repPostId, 'class', 'div--commentaire bloc_article_div_p--padding  bloc_article_div_a--hover'));

    const newDiv6 = newarticle.appendChild(createElm1('div', '', 'class', 'bloc_article_div--flex2 '));
    newDiv6.appendChild(createElm2('i', '', 'id', 'btn_commenter_post' + repPostId, 'class', 'far fa-comment-alt bloc_article_div_a--hover bloc_article_p--padding'));
    newDiv6.appendChild(createElm2('i', '', 'id', 'btn_modif_post' + repPostId, 'class', 'display--none')); //bloc_article_div_a--hover bloc_article_p--padding
    newDiv6.appendChild(createElm2('i', '', 'id', 'btn_suppr_post' + repPostId, 'class', 'display--none')); // bloc_article_div_a--hover bloc_article_p--padding

    newDiv7 = newarticle.appendChild(createElm2('div', '', 'id', 'display_forum' + repPostId, 'class', 'bloc_article_div--flex3'));
    newDiv8 = newarticle.appendChild(createElm2('p', 'masquer', 'id', 'display_none_forum' + repPostId, 'class', 'display--none')); //bloc_article_div_a--hover
};

createDisplayComs = (nom, prenom, contenu, postId, comId, comLikes, comDislikes) => {
    const mainPostId = document.getElementById('display_forum' + postId);

    const newArticle = mainPostId.appendChild(createElm2('span', '', 'id', 'coms_display_none' + comId, 'class', 'display--none'));

    const newDiv1 = newArticle.appendChild(createElm2('div', '', 'id', 'divArticleCom' + comId, 'class', 'bloc_article_div--flex--coms--0'));

    const newDiv5 = newDiv1.appendChild(createElm1('div', '', 'class', 'bloc_article_div--flex--coms--1'));
    newDiv5.appendChild(createElm1('h2', nom + ' ' + prenom, 'class', 'bloc_article_div_p--padding--coms'));
    newDiv5.appendChild(createElm2('p', '0', 'id', 'date_crea_coms' + comId, 'class', 'bloc_article_div_p--padding--coms'));

    newDiv1.appendChild(createElm1('p', contenu, 'class', 'bloc_article_div_p--padding--coms'));

    const newDiv6 = newDiv1.appendChild(createElm1('div', '', 'class', 'bloc_article_div--flex--coms--2'));
    const newDiv7 = newDiv6.appendChild(createElm1('div', '', 'class', 'bloc_article_div--flex--coms--3'));
    newDiv7.appendChild(createElm2('i', '', 'id', 'like_com' + comId, 'class', 'fas fa-heart bloc_article_div_p--padding--coms'));
    newDiv7.appendChild(createElm1('p', comLikes, 'class', 'bloc_article_div_p--padding--coms'));
    newDiv7.appendChild(createElm2('i', '', 'id', 'dislike_com' + comId, 'class', 'fas fa-heart-broken bloc_article_div_p--padding--coms'));
    newDiv7.appendChild(createElm1('p', comDislikes, 'class', 'bloc_article_div_p--padding--coms'));

    const newDiv8 = newDiv6.appendChild(createElm1('div', '', 'class', 'bloc_article_div--flex--coms--3'));
    newDiv8.appendChild(createElm2('i', '', 'id', 'btn_com_modif1' + comId, 'class', 'display--none')); ////bloc_article_div_p--padding-2 bloc_article_div_a--hover
    newDiv8.appendChild(createElm2('i', '', 'id', 'btn_com_suppr' + comId, 'class', 'display--none')); ////bloc_article_div_p--padding-2 bloc_article_div_a--hover
};

modaleCreatePost = (nom, prenom) => {
    const main = document.querySelector('main');
    const newAside = main.appendChild(createElm2('aside', '', 'id', 'modal1', 'class', 'modal')); //
    const newDivAside = newAside.appendChild(createElm1('div', '', 'class', 'modal-wrapper')); //
    newDivAside.appendChild(createElm2('button', '', 'id', 'btn_annule_create_post', 'class', 'far fa-times-circle fa-2x bloc__form--create--post--btn-annul--style')); //

    const formPost = newDivAside.appendChild(createElm2('form', '', 'id', 'form_post', 'class', 'bloc__form--create--post--flex')); //
    formPost.appendChild(createElm1('h2', 'Créer une publication', 'class', 'bloc__login__form--label--style--create--post')); //
    formPost.appendChild(createElm1('p', 'De : ' + nom + ' ' + prenom, 'class', 'bloc__login__form--label--style--create--post')); //

    formPost.appendChild(createElm2('label', 'Titre :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'post_forum_titre')); //
    formPost.appendChild(createInputs('input', '', 'id', 'post_forum_titre', 'class', 'bloc__form--input--create--post--style-2', 'name', 'titre')); //

    formPost.appendChild(createElm2('label', 'Message :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'post_forum')); //
    formPost.appendChild(createInputs('textarea', '', 'id', 'post_forum_text', 'rows', '5', 'cols', '33', 'class', 'bloc__form--input--create--post--style-2', 'name', 'contenu')); //

    const formPost2 = formPost.appendChild(createElm2('form', '', 'class', 'bloc_form--create--post--flex--width')); //
    formPost2.appendChild(createElm2('label', 'Ajouter une image :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'post_img')); //
    formPost2.appendChild(createInputs('input', '', 'class', '', 'id', 'post_img', 'type', 'file', 'accept', 'image/png, image/jpeg, image/gif', 'name', 'image'));

    const newDiv1 = formPost.appendChild(createElm1('div', '', 'class', '', )); //
    newDiv1.appendChild(createElm2('button', 'Publier', 'id', 'btn_post_forum_1', 'class', 'bloc__form--create--post--btn--post')); //

    formPost.appendChild(createElm2('p', 'le champs n\'est pas rempli correctement !', 'id', 'erreur_posts', 'class', 'bloc__form--font--erreur'));
};
modaleCreateModifPost = (titre, contenu, imageUrl, nom, prenom) => {
    const main = document.querySelector('main');
    const newAside = main.appendChild(createElm2('aside', '', 'id', 'modal1', 'class', 'modal')); //
    const newDivAside = newAside.appendChild(createElm1('div', '', 'class', 'modal-wrapper')); //
    newDivAside.appendChild(createElm2('button', '', 'id', 'btn_annule_forum', 'class', 'far fa-times-circle fa-2x bloc__form--create--post--btn-annul--style')); //

    const formPost = newDivAside.appendChild(createElm2('form', '', 'id', 'form_post', 'class', 'bloc__form--create--post--flex')); //
    formPost.appendChild(createElm1('h2', 'Modifier la publication', 'class', 'bloc__login__form--label--style--create--post')); //
    formPost.appendChild(createElm1('p', 'De : ' + nom + ' ' + prenom, 'class', 'bloc__login__form--label--style--create--post')); //

    formPost.appendChild(createElm2('label', 'Titre :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'post_forum_titre')); //
    formPost.appendChild(createInputs('input', '', 'id', 'post_forum_titre', 'class', 'bloc__form--input--create--post--style-2', 'name', 'titre', 'value', titre)); //

    formPost.appendChild(createElm2('label', 'Message :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'post_forum')); //
    formPost.appendChild(createInputs('textarea', contenu, 'id', 'post_forum_text', 'rows', '5', 'cols', '33', 'class', 'bloc__form--input--create--post--style-2', 'name', 'contenu')); //

    const formPost2 = formPost.appendChild(createElm2('form', '', 'class', 'bloc_form--create--post--flex--width')); //
    formPost2.appendChild(createElm2('img', '', 'class', 'bloc_article_img--width2', 'src', imageUrl, 'alt', 'affichage de l\'anciene image'));

    formPost2.appendChild(createElm2('label', 'Ajouter une image :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'post_img')); //
    formPost2.appendChild(createInputs('input', '', 'class', '', 'id', 'post_img', 'type', 'file', 'accept', 'image/png, image/jpeg, image/gif', 'name', 'image'));

    const newDiv1 = formPost.appendChild(createElm1('div', '', 'class', '', )); //
    newDiv1.appendChild(createElm2('button', 'Publier', 'id', 'btn_post_forum', 'class', 'bloc__form--create--post--btn--post')); //

    formPost.appendChild(createElm2('p', 'le champs n\'est pas rempli correctement !', 'id', 'erreur_posts', 'class', 'bloc__form--font--erreur'));
};
createComsForm = (nom, prenom) => {
    const main = document.querySelector('main');
    const newAside = main.appendChild(createElm2('aside', '', 'id', 'modal1', 'class', 'modal')); //
    const newDivAside = newAside.appendChild(createElm1('div', '', 'class', 'modal-wrapper')); //
    newDivAside.appendChild(createElm2('button', '', 'id', 'btn_annuler_modif_coms', 'class', 'far fa-times-circle fa-2x bloc__form--create--post--btn-annul--style')); //

    const formPost = newDivAside.appendChild(createElm2('form', '', 'id', 'form_post', 'class', 'bloc__form--create--post--flex')); //
    formPost.appendChild(createElm1('h2', 'Céer un commentaire', 'class', 'bloc__login__form--label--style--create--post')); //
    formPost.appendChild(createElm1('p', 'De : ' + nom + ' ' + prenom, 'class', 'bloc__login__form--label--style--create--post')); //

    formPost.appendChild(createElm2('label', 'Commentaire :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'post_forum')); //
    formPost.appendChild(createInputs('textarea', '', 'id', 'commentaire', 'rows', '5', 'cols', '33', 'class', 'bloc__form--input--create--post--style-2', 'name', 'contenu')); //

    const newDiv1 = formPost.appendChild(createElm1('div', '', 'class', '', )); //
    newDiv1.appendChild(createElm2('button', 'Publier', 'id', 'btn_envoyer_coms', 'class', 'bloc__form--create--post--btn--post')); //

    formPost.appendChild(createElm2('p', 'le champs n\'est pas rempli correctement !', 'id', 'erreur_posts', 'class', 'bloc__form--font--erreur'));
};

modifComsForm = (nom, prenom, valueTextarea) => {
    const main = document.querySelector('main');
    const newAside = main.appendChild(createElm2('aside', '', 'id', 'modal1', 'class', 'modal')); //
    const newDivAside = newAside.appendChild(createElm1('div', '', 'class', 'modal-wrapper')); //
    newDivAside.appendChild(createElm2('button', '', 'id', 'btnAnnulerComs', 'class', 'far fa-times-circle fa-2x bloc__form--create--post--btn-annul--style')); //

    const formPost = newDivAside.appendChild(createElm2('form', '', 'id', 'form_post', 'class', 'bloc__form--create--post--flex')); //
    formPost.appendChild(createElm1('h2', 'Céer un commentaire', 'class', 'bloc__login__form--label--style--create--post')); //
    formPost.appendChild(createElm1('p', 'De : ' + nom + ' ' + prenom, 'class', 'bloc__login__form--label--style--create--post')); //

    formPost.appendChild(createElm2('label', 'Commentaire :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'post_forum')); //
    formPost.appendChild(createInputs('textarea', valueTextarea, 'id', 'commentaireModifCom', 'rows', '5', 'cols', '33', 'class', 'bloc__form--input--create--post--style-2', 'name', 'contenu')); //

    const newDiv1 = formPost.appendChild(createElm1('div', '', 'class', '', )); //
    newDiv1.appendChild(createElm2('button', 'Publier', 'id', 'btnComModif', 'class', 'bloc__form--create--post--btn--post')); //

    formPost.appendChild(createElm2('p', 'le champs n\'est pas rempli correctement !', 'id', 'erreur_posts', 'class', 'bloc__form--font--erreur'));
};