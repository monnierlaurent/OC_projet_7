createNavbar = (avatar, nom, prenom, recupUserId) => {
    const navBar = document.getElementById('nav_users');
    navBar.appendChild(createElm3('img', '', 'src', avatar, 'class', 'header__nav__avatar--style', 'alt', 'avatar de l\'utilisateur connecté'));
    navBar.appendChild(createElm4('a', nom + ' ' + prenom + '', 'id', '', 'class', 'header__nav__a--style', 'href', './compteUser.html?id=' + recupUserId, 'title', 'lien pour accéder au compte utilisateur'));

    navBar.appendChild(createElm4('a', '', 'id', 'retourForum', 'class', 'fas fa-home class header__nav__a--style--2', 'href', './forum.html', 'title', 'lien pour accéder a la page principal'));

    navBar.appendChild(createElm3('i', '', 'id', 'deconnection', 'class', 'fas fa-power-off class header__nav__a--style--2', 'title', 'boutton pour  se déconnecter'));
};

createDisplayUers = (nom, prenom, emailRec, avatar) => {
    const mainUsers = document.getElementById('main_compe_user');
    const newSection = mainUsers.appendChild(createElm1('section', '', 'class', 'bloc_section_form--flex'));

    const newdiv = newSection.appendChild(createElm1('div', '', 'class', 'bloc_section_form_btn--flex--1'));
    newdiv.appendChild(createElm1('h2', 'Compte utilisateur', 'class', 'bloc_section_form_heading--style'));
    newdiv.appendChild(createElm3('i', '', 'id', 'btn_suppr_profil_user', 'class', 'far fa-trash-alt', 'title', 'boutton pour supprimer le compte utilisateur')); //bloc__form--btn-2

    const newDiv1 = newSection.appendChild(createElm1('div', '', 'class', 'bloc_profil_users--flex'));

    const newDiv2 = newDiv1.appendChild(createElm1('div', '', 'class', ''));
    newDiv2.appendChild(createElm2('p', 'Nom :' + ' ' + nom, 'id', 'nom_user', 'class', 'bloc__login__form--label--style--create--post'));
    newDiv2.appendChild(createElm2('p', 'Prenom :' + ' ' + prenom, 'id', 'prenom_user', 'class', 'bloc__login__form--label--style--create--post'));
    newDiv2.appendChild(createElm2('p', 'date d\'incription :', 'id', 'user_date', 'class', 'bloc__login__form--label--style--create--post'));
    newDiv2.appendChild(createElm2('p', 'Email :' + ' ' + emailRec, 'id', 'email_user', 'class', 'bloc__login__form--label--style--create--post'));

    const newDiv3 = newDiv1.appendChild(createElm1('div', '', 'class', ''));
    newDiv3.appendChild(createElm3('img', '', 'src', avatar, 'class', 'bloc_dic_user_img--width', 'alt', 'avatar de l\'utilisateur qui a publier le message'));

    const newDiv4 = newSection.appendChild(createElm1('div', '', 'class', 'bloc_section_form_btn--flex--2'));
    newDiv4.appendChild(createElm3('button', 'Modifier mon profil', 'id', 'btn_modif_profil_user', 'class', 'bloc__form--btn-2', 'title', 'boutton pour modifer le compte utilisateur'));
    newDiv4.appendChild(createElm3('button', 'Modifier le mot de passe', 'id', 'btn_modif_password_1', 'class', 'bloc__form--btn-2', 'title', 'boutton pour modifier le mot de passe'));

};
1

createFormModifUser = (nom, prenom, emailRec) => {
    const mainUsers = document.getElementById('main_compe_user');
    const newForm = mainUsers.appendChild(createElm2('form', '', 'id', 'form_modif_user', 'class', 'display--none '));

    newForm.appendChild(createElm2('label', 'Nom :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'nom'));
    newForm.appendChild(createInputs('input', '', 'id', 'nom', 'class', 'bloc__login__form--input--style-2', 'type', 'text', 'value', nom));
    newForm.appendChild(createElm2('p', '*Champ obligatoire le NOM dois comporter au moins 2 characteres sans chiffre ni characteres spéciaux !', 'id', 'message_1', 'class', 'bloc__form--font--message_form'));

    newForm.appendChild(createElm2('label', 'Prenom :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'prenom'));
    newForm.appendChild(createInputs('input', '', 'id', 'prenom', 'class', 'bloc__login__form--input--style-2', 'type', 'text', 'value', prenom));
    newForm.appendChild(createElm2('p', '*Champ obligatoire le PRENOM dois comporter au moins 2 characteres sans chiffre ni characteres spéciaux !', 'id', 'message_2', 'class', 'bloc__form--font--message_form'));

    newForm.appendChild(createElm2('label', 'email :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'email'));
    newForm.appendChild(createInputs('input', '', 'id', 'email', 'class', 'bloc__login__form--input--style-2', 'type', 'email', 'value', emailRec));
    newForm.appendChild(createElm2('p', '*Champ obligatoire l\'EMAIL doit contenir le nom de domaine @groupomania.fr !', 'id', 'message_3', 'class', 'bloc__form--font--message_form'));

    const newDiv1 = newForm.appendChild(createElm1('div', '', 'class', 'signup--avatar--flex', ));
    newDiv1.appendChild(createElm4('img', '', 'id', 'avatars_1', 'src', 'http://localhost:3000/images/avatar/avatar_01.png', 'class', 'signup--avatar--style', 'alt', 'Choix de l\'avatar 1'));
    newDiv1.appendChild(createElm4('img', '', 'id', 'avatars_2', 'src', 'http://localhost:3000/images/avatar/avatar_02.png', 'class', 'signup--avatar--style', 'alt', 'Choix de l\'avatar 2'));
    newDiv1.appendChild(createElm4('img', '', 'id', 'avatars_3', 'src', 'http://localhost:3000/images/avatar/avatar_03.png', 'class', 'signup--avatar--style', 'alt', 'Choix de l\'avatar 3'));
    newDiv1.appendChild(createElm4('img', '', 'id', 'avatars_4', 'src', 'http://localhost:3000/images/avatar/avatar_04.png', 'class', 'signup--avatar--style', 'alt', 'Choix de l\'avatar 4'));
    newForm.appendChild(createElm2('p', '*avatar obligatoire', 'id', 'message_4', 'class', 'bloc__form--font--message_form'));

    const newDiv2 = newForm.appendChild(createElm1('div', '', 'class', 'bloc_section_form_btn--flex--1'));
    newDiv2.appendChild(createElm3('button', 'Modifer mon profil', 'id', 'btn_modif_profil_user_2', 'class', 'bloc__form--btn-2', 'title', 'boutton pour modifer le compte utilisateur'));
    newDiv2.appendChild(createElm3('button', 'Annuler', 'id', 'btn_annule_modif_user', 'class', 'bloc__form--btn-2', 'title', 'boutton pour annuler la modificationdu compte utilisateur'));
    newForm.appendChild(createElm2('p', 'Un des champs n\'est pas rempli correctement !', 'id', 'message_5', 'class', 'bloc__form--font--message_form_2'));
};

createFormModifPassword = () => {

    const mainUsers = document.getElementById('main_compe_user');
    const newForm = mainUsers.appendChild(createElm2('form', '', 'id', 'form_modif_password', 'class', 'display--none')); //display--none bloc_section_form--flex

    newForm.appendChild(createElm2('label', 'Ancient mot de passe :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'holdPassword'));
    newForm.appendChild(createInputs('input', '', 'id', 'holdPassword', 'class', 'bloc__login__form--input--style-2', 'type', 'password'));
    newForm.appendChild(createElm2('p', '*Champ obligatoire le mot de passe doit contenir au mois 8 characteres <br>1 majuscule et 1 charactere spécial !', 'id', 'message_11', 'class', 'bloc__form--font--message_form'));

    newForm.appendChild(createElm2('label', 'Nouveau mot de passe :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'newPassword'));
    newForm.appendChild(createInputs('input', '', 'id', 'newPassword', 'class', 'bloc__login__form--input--style-2', 'type', 'password', ));
    newForm.appendChild(createElm2('p', '*Champ obligatoire le mot de passe doit contenir au mois 8 characteres <br>1 majuscule et 1 charactere spécial !', 'id', 'message_22', 'class', 'bloc__form--font--message_form'));

    newForm.appendChild(createElm2('label', 'Confirmation du passe :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'confirmPassword'));
    newForm.appendChild(createInputs('input', '', 'id', 'confirmPassword', 'class', 'bloc__login__form--input--style-2', 'type', 'password'));
    newForm.appendChild(createElm2('p', '*champ obligatoire saisissez a nouveau votre mon de passe', 'id', 'message_33', 'class', 'bloc__form--font--message_form'));

    const newDiv2 = newForm.appendChild(createElm1('div', '', 'class', 'bloc_section_form_btn--flex--1'));
    newDiv2.appendChild(createElm3('button', 'Modifer', 'id', 'btn_modif_password', 'class', 'bloc__form--btn-2', 'title', 'boutton pour modifer le mot de passe'));
    newDiv2.appendChild(createElm3('button', 'Annuler', 'id', 'btn_annule_modif_password', 'class', 'bloc__form--btn-2', 'title', 'boutton pour annuler la modification du mot de passe'));
    newForm.appendChild(createElm2('p', 'Un des champs n\'est pas rempli correctement !', 'id', 'message_44', 'class', 'bloc__form--font--message_form_2'));

};