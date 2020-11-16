createNavBarForum = (avatar, recupUserId, nom, prenom) => {
    const header = document.getElementById('header_forum');
    const createNavBar = header.appendChild(createElm1('nav', '', 'class', 'header__nav--padding')); //display--none 
    createNavBar.appendChild(createElm4('img', '', 'src', avatar, 'class', 'header__nav__avatar--style', 'alt', 'avatar de l\'utilisateur connecté', 'alt', 'avatar de l\'utilisateur'));
    createNavBar.appendChild(createElm4('a', nom + ' ' + prenom + '', 'id', '', 'class', 'header__nav__a--style', 'href', './compteUser.html?id=' + recupUserId, 'title', 'lien pour accéder au compte utilisateur'));
    createNavBar.appendChild(createElm3('i', '', 'id', 'publier_message', 'class', 'far fa-envelope header__nav__a--style--2', 'title', 'lien pour créer une publication'));
    createNavBar.appendChild(createElm4('a', '', 'id', 'compteUser', 'class', 'far fa-user header__nav__a--style--2', 'title', 'lien pour accéder au compte utilisateur', 'href', './compteUser.html?id=' + recupUserId));
    createNavBar.appendChild(createElm3('i', '', 'id', 'deconnection', 'class', 'fas fa-power-off class header__nav__a--style--3', 'title', 'lien pour se déconnecter'));
};

createDisplayPostImg = (repPostId, avatar, repNom, repPrenom, repTitre, repContenu, repImageUrl, repLikes, repDislikes, nbComs, recupUserId) => {

    const mainIndex = document.getElementById('main_forum');
    const newarticle = mainIndex.appendChild(createElm2('article', '', 'id', 'content_article' + repPostId, 'class', 'bloc_article--flex--width')); //display--none 
    const newDiv = newarticle.appendChild(createElm1('div', '', 'class', 'bloc_article_div--flex'));

    const newDiv1 = newDiv.appendChild(createElm1('div', '', 'class', 'article__avatar--flex'));
    newDiv1.appendChild(createElm3('img', '', 'src', avatar, 'class', 'article__avatar--style', 'alt', 'Avatar de l\'utilisateur qui a publier le message'));
    newDiv1.appendChild(createElm1('h2', repNom + ' ' + repPrenom, 'class', 'bloc_article_div_p--padding--coms'));

    newDiv.appendChild(createElm2('p', '0', 'id', 'date_crea_post' + repPostId, 'class', 'bloc'));

    const newDiv2 = newarticle.appendChild(createElm2('div', '', 'id', 'lien_article' + repPostId, 'class', 'bloc_article_div--flex3'));
    newDiv2.appendChild(createElm2('h2', repTitre, 'id', 'titre' + repPostId, 'class', 'bloc_heading--style'));
    newDiv2.appendChild(createElm2('p', repContenu, 'id', 'contenu' + repPostId, 'class', 'bloc_article_p2--style'));
    newDiv2.appendChild(createElm4('img', '', 'id', 'img_post_display' + repPostId, 'class', 'bloc_article_img--width', 'src', repImageUrl, 'alt', 'Image de la publication sur groupomania.fr'));

    const newDiv3 = newarticle.appendChild(createElm1('div', '', 'class', 'bloc_article_div--flex'));
    const newDiv5 = newDiv3.appendChild(createElm1('div', '', 'class', 'div--commentaire'));
    newDiv5.appendChild(createElm2('i', '', 'id', 'like-forum' + repPostId, 'class', 'fas fa-heart bloc_article_div_p--padding--coms'));
    newDiv5.appendChild(createElm2('p', repLikes, 'id', 'compteur_like' + repPostId, 'class', 'bloc_article_div_p--padding--coms'));
    newDiv5.appendChild(createElm2('i', '', 'id', 'dislike-forum' + repPostId, 'class', 'fas fa-heart-broken bloc_article_div_p--padding--coms'));
    newDiv5.appendChild(createElm2('p', repDislikes, 'id', 'compteur_dislike' + repPostId, 'class', 'bloc_article_div_p--padding--coms'));

    const newDiv4 = newDiv3.appendChild(createElm1('div', '', 'class', ''));
    newDiv4.appendChild(createElm2('p', nbComs + ' commentaire', 'id', 'display_coms_forum' + repPostId, 'class', 'div--commentaire bloc_article_div_p--padding--coms  bloc_article--icons--flex'));

    const newDiv6 = newarticle.appendChild(createElm1('div', '', 'class', 'bloc_article_div--flex2 '));
    newDiv6.appendChild(createElm3('i', '', 'id', 'btn_commenter_publication' + repPostId, 'class', 'far fa-comment-alt bloc_article--icons--flex bloc_article_p--padding', 'title', 'lien pour commenter une publication'));
    newDiv6.appendChild(createElm3('i', '', 'id', 'btn_modif_publication' + repPostId, 'class', 'display--none', 'title', 'lien pour modifier une publication')); //bloc_article--icons--flex bloc_article_p--padding
    newDiv6.appendChild(createElm3('i', '', 'id', 'btn_suppr_publication' + repPostId, 'class', 'display--none', 'title', 'lien pour supprimer une publication')); // bloc_article--icons--flex bloc_article_p--padding

    newDiv7 = newarticle.appendChild(createElm2('div', '', 'id', 'display_forum' + repPostId, 'class', 'bloc_article_div--flex3'));
    newDiv8 = newarticle.appendChild(createElm2('p', 'masquer', 'id', 'display_none_forum' + repPostId, 'class', 'display--none')); //bloc_article--icons--flex
};

createDisplayComs = (avatar, nom, prenom, contenu, comId, postId, comLikes, comDislikes) => {
    const mainPostId = document.getElementById('display_forum' + postId);

    const newArticle = mainPostId.appendChild(createElm2('span', '', 'id', 'coms_display' + comId, 'class', 'display--none'));

    const newDiv = newArticle.appendChild(createElm2('div', '', 'id', 'divArticleCom' + comId, 'class', 'bloc_article_div--flex--coms--0'));

    const newDiv1 = newDiv.appendChild(createElm1('div', '', 'class', 'bloc_article_div--flex--coms--1'));

    const newDiv2 = newDiv1.appendChild(createElm1('div', '', 'class', 'article__avatar--flex'));
    newDiv2.appendChild(createElm3('img', '', 'src', avatar, 'class', 'article__avatar--style', 'alt', 'avatar de l\'utilisateur qui a publier le message'));
    newDiv2.appendChild(createElm1('h2', nom + ' ' + prenom, 'class', 'bloc_article_div_p--padding--coms'));

    newDiv1.appendChild(createElm2('p', '0', 'id', 'date_crea_coms' + comId, 'class', 'bloc_article_div_p--padding--coms'));

    newDiv.appendChild(createElm2('p', contenu, 'id', 'contenuCom' + comId, 'class', 'bloc_article_div_p--padding--coms'));

    const newDiv3 = newDiv.appendChild(createElm1('div', '', 'class', 'bloc_article_div--flex--coms--2'));
    const newDiv4 = newDiv3.appendChild(createElm1('div', '', 'class', 'bloc_article_div--flex--coms--3'));
    newDiv4.appendChild(createElm2('i', '', 'id', 'like_com' + comId, 'class', 'fas fa-heart bloc_article_div_p--padding--coms'));
    newDiv4.appendChild(createElm2('p', comLikes, 'id', 'comLikes_1' + comId, 'class', 'bloc_article_div_p--padding--coms'));
    newDiv4.appendChild(createElm2('i', '', 'id', 'dislike_com' + comId, 'class', 'fas fa-heart-broken bloc_article_div_p--padding--coms'));
    newDiv4.appendChild(createElm2('p', comDislikes, 'id', 'comDislikes_1' + comId, 'class', 'bloc_article_div_p--padding--coms'));

    const newDiv5 = newDiv3.appendChild(createElm1('div', '', 'class', 'bloc_article_div--flex--coms--3'));
    newDiv5.appendChild(createElm3('i', '', 'id', 'btn_com_modif1' + comId, 'class', 'display--none', 'title', 'boutton pour modifier un commentaire')); ////bloc_article_div_p--padding-2 bloc_article--icons--flex
    newDiv5.appendChild(createElm3('i', '', 'id', 'btn_com_suppr' + comId, 'class', 'display--none', 'title', 'boutton pour supprimer')); ////bloc_article_div_p--padding-2 bloc_article--icons--flex
};

modaleCreatePost = (avatar, nom, prenom) => {
    const main = document.querySelector('main');
    const newAside = main.appendChild(createElm2('aside', '', 'id', 'modal_create_post', 'class', 'display--none')); //modal
    const newDivAside = newAside.appendChild(createElm1('div', '', 'class', 'modal-wrapper')); //
    newDivAside.appendChild(createElm3('button', '', 'id', 'btn_hide_form_create_post', 'class', 'far fa-times-circle fa-2x bloc__form--create--post--btn-annul--style', 'title', 'lien pour annuler créationde  la publication')); //

    const formPost = newDivAside.appendChild(createElm2('form', '', 'id', 'form_post', 'class', 'bloc__form--create--post--flex')); //
    formPost.appendChild(createElm1('h2', 'Créer une publication', 'class', 'bloc__login__form--label--style--create--post')); //

    const newDiv1 = formPost.appendChild(createElm1('div', '', 'class', 'bloc_modal_create_post_avatar_flex'));
    newDiv1.appendChild(createElm4('img', '', 'src', avatar, 'class', 'article__avatar--style', 'alt', 'avatar de l\'utilisateur qui a publier le message', 'title', 'avatar de l\'utilisateur'));
    newDiv1.appendChild(createElm1('p', ' ' + nom + ' ' + prenom, 'class', 'bloc__login__form--label--style--create--post')); //

    formPost.appendChild(createElm2('label', 'Titre :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'post_forum_titre')); //
    formPost.appendChild(createInputs('input', '', 'id', 'post_forum_titre', 'class', 'bloc__form--input--create--post--style-2', 'name', 'titre')); //
    formPost.appendChild(createElm2('p', '*champ obligatoire le titre doit contenir au moins 2 characteres', 'id', 'message_1', 'class', 'bloc__form--font--message_form'));

    formPost.appendChild(createElm2('label', 'Message :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'post_forum')); //
    formPost.appendChild(createInputs('textarea', '', 'id', 'post_forum_text', 'rows', '5', 'cols', '33', 'class', 'bloc__form--input--create--post--style-2', 'name', 'contenu')); //
    formPost.appendChild(createElm2('p', 'le contenu du message dois etre d\'au-moins 2 characteres !', 'id', 'message_2', 'class', 'bloc__form--font--message_form'));

    const formPost2 = formPost.appendChild(createElm2('form', '', 'class', 'bloc_form--create--post--flex--width')); //
    formPost2.appendChild(createElm2('label', 'Ajouter une image :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'post_img')); //
    formPost2.appendChild(createInputs('input', '', 'class', '', 'id', 'post_img', 'type', 'file', 'accept', 'image/png, image/jpeg, image/gif', 'name', 'image'));

    const newDiv2 = formPost.appendChild(createElm1('div', '', 'class', '', )); //
    newDiv2.appendChild(createElm3('button', 'Publier', 'id', 'btn_publier_forum', 'class', 'bloc__form--create--post--btn--post', 'title', 'boutton pour publier le message')); //

    formPost.appendChild(createElm2('p', 'Le champ titre et obligatoire<br>vous devez aussi soit saisir un message soit selectionner une image !', 'id', 'message_3', 'class', 'bloc__form--font--message_form_3'));
};

modaleCreateModifPost = (postId, avatar, titre, contenu, imageUrl, nom, prenom) => {
    const main = document.querySelector('main');
    const newAside = main.appendChild(createElm2('aside', '', 'id', 'modal_modif_post', 'class', 'display--none')); //modal
    const newDivAside = newAside.appendChild(createElm1('div', '', 'class', 'modal-wrapper')); //
    newDivAside.appendChild(createElm3('button', '', 'id', 'btn_annule_forum', 'class', 'far fa-times-circle fa-2x bloc__form--create--post--btn-annul--style', 'title', 'boutton pour annuler la publication d\'un commentaire')); //

    const formPost = newDivAside.appendChild(createElm2('form', '', 'id', 'form_modif_post_1', 'class', 'bloc__form--create--post--flex')); //
    formPost.appendChild(createElm1('h2', 'Modifier la publication', 'class', 'bloc__login__form--label--style--create--post')); //

    const newDiv1 = formPost.appendChild(createElm1('div', '', 'class', 'bloc_modal_create_post_avatar_flex'));
    newDiv1.appendChild(createElm3('img', '', 'src', avatar, 'class', 'article__avatar--style', 'alt', 'avatar de l\'utilisateur qui a publier le message'));
    newDiv1.appendChild(createElm1('p', nom + ' ' + prenom, 'class', 'bloc__login__form--label--style--create--post')); //

    formPost.appendChild(createElm2('label', 'Titre :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'post_forum_titre')); //
    formPost.appendChild(createInputs('input', '', 'id', 'post_forum_titre' + postId, 'class', 'bloc__form--input--create--post--style-2', 'name', 'titre', 'value', titre)); //
    formPost.appendChild(createElm2('p', '*champ obligatoire, le titre doit contenir au minum 2 charactères<br>sans caractères spéciaux !', 'id', 'message_11', 'class', 'bloc__form--font--message_form'));

    formPost.appendChild(createElm2('label', 'Message :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'post_forum')); //
    formPost.appendChild(createInputs('textarea', contenu, 'id', 'post_forum_text' + postId, 'rows', '5', 'cols', '33', 'class', 'bloc__form--input--create--post--style-2', 'name', 'contenu')); //
    formPost.appendChild(createElm2('p', 'Le contenu doit contenir au minum 2 charactères !', 'id', 'message_22', 'class', 'bloc__form--font--message_form'));

    const formPost2 = formPost.appendChild(createElm3('form', '', 'id', 'form_modif_post_2', 'class', 'bloc_form--create--post--flex--width')); //
    formPost2.appendChild(createElm2('img', '', 'class', 'bloc_article_img--width2', 'src', imageUrl, 'alt', 'affichage de l\'anciene image'));

    formPost2.appendChild(createElm2('label', 'Ajouter une image :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'post_img')); //
    formPost2.appendChild(createInputs('input', '', 'class', '', 'id', 'post_img' + postId, 'type', 'file', 'accept', 'image/png, image/jpeg, image/gif', 'name', 'image'));

    const newDiv2 = formPost.appendChild(createElm1('div', '', 'class', '', )); //
    newDiv2.appendChild(createElm3('p', 'Publier', 'id', 'btn_post_forum_modif', 'class', 'bloc__form--create--post--btn--post', 'title', 'boutton pour publier un commentaire')); //

    formPost.appendChild(createElm2('p', 'Le champ titre et obligatoire<br>vous devez aussi soit saisir un message soit selectionner une image !', 'id', 'message_33', 'class', 'bloc__form--font--message_form_3'));
};
createComsForm = (avatar, nom, prenom) => {
    const main = document.querySelector('main');
    const newAside = main.appendChild(createElm2('aside', '', 'id', 'modal_create_commentaire', 'class', 'display--none')); //modal
    const newDivAside = newAside.appendChild(createElm1('div', '', 'class', 'modal-wrapper')); //
    newDivAside.appendChild(createElm3('button', '', 'id', 'btn_Annuler_Coms_1', 'class', 'far fa-times-circle fa-2x bloc__form--create--post--btn-annul--style', 'title', 'boutton pour annuler la creation d\'un commentaire')); //

    const formPost = newDivAside.appendChild(createElm2('form', '', 'id', 'form_commentaire', 'class', 'bloc__form--create--post--flex')); //
    formPost.appendChild(createElm1('h2', 'Céer un commentaire', 'class', 'bloc__login__form--label--style--create--post')); //

    const newDiv1 = formPost.appendChild(createElm1('div', '', 'class', 'bloc_modal_create_post_avatar_flex'));
    newDiv1.appendChild(createElm3('img', '', 'src', avatar, 'class', 'article__avatar--style', 'alt', 'avatar de l\'utilisateur qui a publier le message'));
    newDiv1.appendChild(createElm1('p', nom + ' ' + prenom, 'class', 'bloc__login__form--label--style--create--post')); //

    formPost.appendChild(createElm2('label', 'Commentaire :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'post_forum')); //
    formPost.appendChild(createInputs('textarea', '', 'id', 'create_commentaire', 'rows', '5', 'cols', '33', 'class', 'bloc__form--input--create--post--style-2', 'name', 'contenu')); //
    formPost.appendChild(createElm2('p', 'Le champs commentaire et obligatoire et dois contenir au minimum 2 charateres !', 'id', 'message_coms_1', 'class', 'bloc__form--font--message_form'));

    const newDiv2 = formPost.appendChild(createElm1('div', '', 'class', '', )); //
    newDiv2.appendChild(createElm3('button', 'Publier', 'id', 'btn_envoyer_coms', 'class', 'bloc__form--create--post--btn--post', 'title', 'boutton pour  publier d\'un commentaire')); //

    formPost.appendChild(createElm2('p', 'Le champs commentaire et obligatoire et dois contenir au minimum 2 charateres!', 'id', 'message_coms_2', 'class', 'bloc__form--font--message_form_3'));
};

modifComsForm = (avatar, nom, prenom, valueTextarea) => {
    const main = document.querySelector('main');
    const newAside = main.appendChild(createElm2('aside', '', 'id', 'modal_modif_commentaire', 'class', 'display--none')); //modal
    const newDivAside = newAside.appendChild(createElm1('div', '', 'class', 'modal-wrapper')); //
    newDivAside.appendChild(createElm3('button', '', 'id', 'btn_annuler_modif_coms', 'class', 'far fa-times-circle fa-2x bloc__form--create--post--btn-annul--style', 'title', 'boutton pour annuler la creation d\'un commentaire')); //

    const formPost = newDivAside.appendChild(createElm2('form', '', 'id', 'form_modif_com', 'class', 'bloc__form--create--post--flex')); //
    formPost.appendChild(createElm1('h2', 'Céer un commentaire', 'class', 'bloc__login__form--label--style--create--post')); //

    const newDiv1 = formPost.appendChild(createElm1('div', '', 'class', 'bloc_modal_create_post_avatar_flex'));
    newDiv1.appendChild(createElm3('img', '', 'src', avatar, 'class', 'article__avatar--style', 'alt', 'avatar de l\'utilisateur qui a publier le message'));
    newDiv1.appendChild(createElm1('p', nom + ' ' + prenom, 'class', 'bloc__login__form--label--style--create--post')); //

    formPost.appendChild(createElm2('label', 'Commentaire :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'post_forum')); //
    formPost.appendChild(createInputs('textarea', valueTextarea, 'id', 'commentaireModifCom', 'rows', '5', 'cols', '33', 'class', 'bloc__form--input--create--post--style-2', 'name', 'contenu')); //
    formPost.appendChild(createElm2('p', 'Le champs commentaire et obligatoire et dois contenir au minimum 2 charateres!', 'id', 'message_coms_111', 'class', 'bloc__form--font--message_form'));

    const newDiv2 = formPost.appendChild(createElm1('div', '', 'class', '', )); //
    newDiv2.appendChild(createElm3('button', 'Publier', 'id', 'btnComModif', 'class', 'bloc__form--create--post--btn--post', 'title', 'boutton pour  publier un commentaire')); //

    formPost.appendChild(createElm2('p', 'Le champs commentaire et obligatoire et dois contenir au minimum 2 charateres!', 'id', 'message_coms_222', 'class', 'bloc__form--font--message_form_3'));
};


messageConfirm = (message) => {
    const main = document.getElementById('main_forum');
    const NenDiv = main.appendChild(createElm2('div', '', 'id', 'modal_message', 'class', 'modal', ));
    NenDiv.appendChild(createElm2('p', message, 'id', 'message_confirm', 'class', 'modal-confirm-style modal-wrapper')); //'Message bien supprimé'
};