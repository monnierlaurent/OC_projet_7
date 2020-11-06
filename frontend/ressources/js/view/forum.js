createNavBar = (recupUserId, nom, prenom) => {
    const navBar = document.getElementById('nav_forum');
    navBar.appendChild(createElm2('a', nom + ' ' + prenom + ' est connecté', 'id', '', 'class', 'header__nav__a--style'));
    navBar.appendChild(createElm2('a', 'Poster un message', 'id', 'poster', 'class', 'header__nav__a--style', 'href', '#'));
    navBar.appendChild(createElm3('a', 'Mon compte', 'id', 'compteUser', 'class', 'header__nav__a--style', 'href', './compteUser.html?id=' + recupUserId));
    navBar.appendChild(createElm3('a', 'Déonnection', 'id', 'deconnection', 'class', 'header__nav__a--style', 'href', './index.html'));
};


createDisplayPostImg = (repPostId, repNom, repPrenom, repDateCrea, repTitre, repContenu, repImageUrl, repLikes, repDislikes, nbComs) => {

    const newarticle = mainIndex.appendChild(createElm2('article', '', 'id', 'lien_article' + repPostId, 'class', 'bloc_article--flex--width'));
    const newDiv2 = newarticle.appendChild(createElm2('div', '', 'id', 'div_img_suppr', 'class', 'bloc_article_div--flex'));
    newDiv2.appendChild(createElm1('p', repNom, 'class', 'bloc_article_div_p--padding'));
    newDiv2.appendChild(createElm1('p', repPrenom, 'class', 'bloc_article_div_p--padding'));
    newDiv2.appendChild(createElm1('p', repDateCrea, 'class', 'bloc_article_div_p--padding'));

    newarticle.appendChild(createElm1('h2', repTitre, 'class', 'bloc_heading--style'));
    newarticle.appendChild(createElm1('p', repContenu, 'class', 'bloc_article_p2--style'));
    newarticle.appendChild(createElm4('img', '', 'id', 'img_post_display' + repPostId, 'class', 'bloc_article_img--width', 'src', repImageUrl, 'alt', 'image_du_pots_sur_groupomania.fr'));

    const newDiv3 = newarticle.appendChild(createElm1('div', '', 'class', 'bloc_article_div--flex2'));
    const newDiv4 = newDiv3.appendChild(createElm1('div', '', 'class', 'bloc_article_div--flex'));
    newDiv4.appendChild(createElm2('i', '', 'id', 'like-forum' + repPostId, 'class', 'fas fa-heart bloc_article_div_p--padding'));
    newDiv4.appendChild(createElm2('p', repLikes, 'id', 'compteur_like', 'class', 'bloc_article_div_p--padding'));
    newDiv4.appendChild(createElm2('i', '', 'id', 'dislike-forum' + repPostId, 'class', 'fas fa-heart-broken bloc_article_div_p--padding'));
    newDiv4.appendChild(createElm2('p', repDislikes, 'id', 'compteur_dislike', 'class', 'bloc_article_div_p--padding'));

    newDiv3.appendChild(createElm2('p', nbComs + ' commentaire', 'id', 'display_coms_forum' + repPostId, 'class', 'bloc_article_div_p--padding bloc_article_div_a--hover'));

    const newDiv5 = newarticle.appendChild(createElm1('div', '', 'class', 'bloc_article_div--flex '));
    const newLien3 = newDiv5.appendChild(createElm2('p', '', 'id', 'btn_modif_post', 'class', 'bloc_article_div_p--padding'));
    newLien3.appendChild(createElm2('p', 'Modifier', 'class', 'bloc_article_div_a--hover', 'id', 'btn_modif_post' + repPostId));

    const newLien2 = newDiv5.appendChild(createElm2('p', '', 'id', 'btn_com_post', 'class', 'bloc_article_div_p--padding'));
    newLien2.appendChild(createElm2('p', 'commenter', 'class', 'bloc_article_div_a--hover', 'id', 'btn_commenter_post' + repPostId));

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

modaleCreatePost = () => {
    const main = document.querySelector('main');
    const newAside = main.appendChild(createElm2('aside', '', 'id', 'modal1', 'class', 'modal'));
    const newDivAside = newAside.appendChild(createElm1('div', '', 'class', 'modal-wrapper'));

    const formPost = newDivAside.appendChild(createElm2('form', '', 'id', 'form_post', 'class', ''));
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

modaleCreateModifPost = (titre, contenu, imageUrl) => {
    const main = document.querySelector('main');
    const newAside = main.appendChild(createElm2('aside', '', 'id', 'modal1', 'class', 'modal'));
    const newDivAside = newAside.appendChild(createElm1('div', '', 'class', 'modal-wrapper'));

    const formPost = newDivAside.appendChild(createElm2('form', '', 'id', 'form_post', 'class', 'bloc_article--flex--width'));
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

createComsForm = () => {
    const main = document.querySelector('main');
    const newAside = main.appendChild(createElm2('aside', '', 'id', 'modal1', 'class', 'modal'));
    const newDivAside = newAside.appendChild(createElm1('div', '', 'class', 'modal-wrapper'));

    const newForm = newDivAside.appendChild(createElm1('form', '', 'class', 'bloc_form--style bloc_article--flex--width'));
    newForm.appendChild(createElm2('label', 'Commenter :', 'class', 'bloc_form_label--style', 'for', 'commentaire'));
    newForm.appendChild(createElm3('textarea', '', 'id', 'commentaire', 'class', 'bloc_form-input--style', 'row', '2'));
    newForm.appendChild(createElm2('p', 'le champs n\'est pas rempli correctement !', 'id', 'erreur_coms', 'class', 'bloc__form--font--erreur'));

    const newDiv4 = newForm.appendChild(createElm1('div', '', 'class', 'bloc_form_btn--flex'));
    newDiv4.appendChild(createElm2('button', 'Poster', 'id', 'btn_envoyer_coms', 'class', 'bloc_form-btn--style2'));
    newDiv4.appendChild(createElm2('button', 'Annuler', 'id', 'btn_annuler_coms', 'class', 'bloc_form-btn--style2'));
};


modalComModif = (valueTitre, valueTextarea, comId) => {

    const main = document.querySelector('main');
    const newAside = main.appendChild(createElm2('aside', '', 'id', 'modal1', 'class', 'modal'));
    const newDivAside = newAside.appendChild(createElm1('div', '', 'class', 'modal-wrapper'));
    newDivAside.appendChild(createElm1('h2', valueTitre, 'class', ''));
    newDivAside.appendChild(createInputs('textarea', valueTextarea, 'id', 'text_coms_modal', 'class', 'bloc__aside__heading--padding bloc_form-input--style'));
    newDivAside.appendChild(createElm2('p', 'le champs n\'est pas rempli correctement !', 'id', 'erreur_modif_coms', 'class', 'bloc__form--font--erreur'));
    newDivAside.appendChild(createElm2('p', 'modifier', 'id', 'btnComModif', 'class', 'bloc__form--btn-2'));
    newDivAside.appendChild(createElm2('p', 'Annuler', 'id', 'btn_com_annul', 'class', 'bloc__form--btn-2'));
};