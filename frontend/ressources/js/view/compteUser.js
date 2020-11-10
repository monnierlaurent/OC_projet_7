createNavbar = () => {
    const navBar = document.getElementById('nav_users');
    navBar.appendChild(createElm3('a', 'Forum', 'id', 'retourForum', 'class', 'header__nav__a--style', 'href', './forum.html'));
    navBar.appendChild(createElm3('a', 'Déonnection', 'id', 'deconnection', 'class', 'header__nav__a--style', 'href', './index.html'));
};

createDisplayUers = (nom, prenom, emailRec) => {
    const mainUsers = document.getElementById('main_compe_user');
    const newSection = mainUsers.appendChild(createElm1('section', '', 'class', 'bloc_section_form--flex'));
    const newdiv1 = newSection.appendChild(createElm1('div', '', 'class', 'bloc_section_form_btn--flex--1'));
    newdiv1.appendChild(createElm1('h2', 'Compte utilisateur', 'class', 'bloc_section_form_heading--style'));
    newdiv1.appendChild(createElm2('i', '', 'id', 'btn_suppr_profil_user', 'class', 'far fa-trash-alt')); //bloc__form--btn-2

    newSection.appendChild(createElm1('p', 'Nom :' + ' ' + nom, 'class', 'bloc__login__form--label--style--create--post'));
    newSection.appendChild(createElm1('p', 'Prenom :' + ' ' + prenom, 'class', 'bloc__login__form--label--style--create--post'));
    newSection.appendChild(createElm2('p', 'date d\'incription :', 'id', 'user_date', 'class', 'bloc__login__form--label--style--create--post'));
    newSection.appendChild(createElm1('p', 'Email :' + ' ' + emailRec, 'class', 'bloc__login__form--label--style--create--post'));

    const newDiv = newSection.appendChild(createElm1('div', '', 'class', 'bloc_section_form_btn--flex--2'));
    newDiv.appendChild(createElm2('button', 'Modifier mon profil', 'id', 'btn_modif_profil_user', 'class', 'bloc__form--btn-2'));
    newDiv.appendChild(createElm2('button', 'Modifier le mot de passe', 'id', 'btn_modif_password_1', 'class', 'bloc__form--btn-2'));

};

createFormModifUser = (nom, prenom, emailRec) => {
    const mainUsers = document.getElementById('main_compe_user');
    const newForm = mainUsers.appendChild(createElm2('form', '', 'id', 'form_modif_user', 'class', 'display--none '));

    newForm.appendChild(createElm2('label', 'Nom :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'nom'));
    newForm.appendChild(createInputs('input', '', 'id', 'nom', 'class', 'bloc__login__form--input--style-2', 'type', 'text', 'value', nom));
    newForm.appendChild(createElm2('p', 'le champs n\'est pas rempli correctement !', 'id', 'erreur1', 'class', 'bloc__form--font--erreur'));

    newForm.appendChild(createElm2('label', 'Prenom :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'prenom'));
    newForm.appendChild(createInputs('input', '', 'id', 'prenom', 'class', 'bloc__login__form--input--style-2', 'type', 'text', 'value', prenom));
    newForm.appendChild(createElm2('p', 'le champs n\'est pas rempli correctement !', 'id', 'erreur2', 'class', 'bloc__form--font--erreur'));

    newForm.appendChild(createElm2('label', 'email :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'email'));
    newForm.appendChild(createInputs('input', '', 'id', 'email', 'class', 'bloc__login__form--input--style-2', 'type', 'email', 'value', emailRec));
    newForm.appendChild(createElm2('p', 'le champs n\'est pas rempli correctement !', 'id', 'erreur3', 'class', 'bloc__form--font--erreur'));

    /*newForm.appendChild(createElm2('label', 'Confirmer avec votre mot de passe :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'password'));
    newForm.appendChild(createInputs('input', '', 'id', 'password', 'class', 'bloc__login__form--input--style-2', 'type', '', 'value', ''));
    newForm.appendChild(createElm2('p', 'le champs n\'est pas rempli correctement !', 'id', 'erreur4', 'class', 'bloc__form--font--erreur'));*/

    const newDiv2 = newForm.appendChild(createElm1('div', '', 'class', 'bloc_section_form_btn--flex--1'));
    newDiv2.appendChild(createElm2('button', 'Modifer mon profil', 'id', 'btn_modif_profil_user2', 'class', 'bloc__form--btn-2'));
    newDiv2.appendChild(createElm2('button', 'Annuler', 'id', 'btn_annule_modif_user', 'class', 'bloc__form--btn-2'));
    newForm.appendChild(createElm2('p', '1 des champs n\'est pas rempli correctement !', 'id', 'erreur5', 'class', 'bloc__form--font--erreur'));
};

createFormModifPassword = () => {

    const mainUsers = document.getElementById('main_compe_user');
    const newForm = mainUsers.appendChild(createElm2('form', '', 'id', 'form_modif_password', 'class', 'display--none')); //display--none bloc_section_form--flex

    newForm.appendChild(createElm2('label', 'Ancient mot de passe :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'holdPassword'));
    newForm.appendChild(createInputs('input', '', 'id', 'holdPassword', 'class', 'bloc__login__form--input--style-2', 'type', 'password'));
    newForm.appendChild(createElm2('p', 'le champs n\'est pas rempli correctement !', 'id', 'erreur_1', 'class', 'bloc__form--font--erreur'));

    newForm.appendChild(createElm2('label', 'Nouveau mot de passe :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'newPassword'));
    newForm.appendChild(createInputs('input', '', 'id', 'newPassword', 'class', 'bloc__login__form--input--style-2', 'type', 'password', ));
    newForm.appendChild(createElm2('p', 'le champs n\'est pas rempli correctement !', 'id', 'erreur_2', 'class', 'bloc__form--font--erreur'));

    newForm.appendChild(createElm2('label', 'Confirmation du passe :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'confirmPassword'));
    newForm.appendChild(createInputs('input', '', 'id', 'confirmPassword', 'class', 'bloc__login__form--input--style-2', 'type', 'password'));
    newForm.appendChild(createElm2('p', 'le champs n\'est pas rempli correctement !', 'id', 'erreur_3', 'class', 'bloc__form--font--erreur'));

    const newDiv2 = newForm.appendChild(createElm1('div', '', 'class', 'bloc_section_form_btn--flex--1'));
    newDiv2.appendChild(createElm2('button', 'Modifer', 'id', 'btn_modif_password', 'class', 'bloc__form--btn-2'));
    newDiv2.appendChild(createElm2('button', 'Annuler', 'id', 'btn_annule_modif_password', 'class', 'bloc__form--btn-2'));
    newForm.appendChild(createElm2('p', '1 des champs n\'est pas rempli correctement !', 'id', 'erreur_4', 'class', 'bloc__form--font--erreur'));

};