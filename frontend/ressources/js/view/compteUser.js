createNavbar = () => {
    const navBar = document.getElementById('nav_users');
    navBar.appendChild(createElm3('a', 'Forum', 'id', 'retourForum', 'class', 'header__nav__a--style', 'href', './forum.html'));
    navBar.appendChild(createElm3('a', 'Déonnection', 'id', 'deconnection', 'class', 'header__nav__a--style', 'href', './index.html'));
};

createDisplayUers = (nom, prenom, dateInscrip, emailRec) => {
    const newSection = mainUsers.appendChild(createElm1('section', '', 'class', 'bloc_section_form--flex'));
    newSection.appendChild(createElm1('h2', 'Compte utilisateur', 'class', 'bloc_section_form_heading--style'));

    newSection.appendChild(createElm1('p', 'Nom :' + ' ' + nom, 'class', 'bloc__login__form--label--style-2'));
    newSection.appendChild(createElm1('p', 'Prenom :' + ' ' + prenom, 'class', 'bloc__login__form--label--style-2'));
    newSection.appendChild(createElm1('p', 'date d\'incription :' + ' ' + dateInscrip, 'class', 'bloc__login__form--label--style-2'));
    newSection.appendChild(createElm1('p', 'Email :' + ' ' + emailRec, 'class', 'bloc__login__form--label--style-2'));

    const newDiv = newSection.appendChild(createElm1('div', '', 'class', 'bloc_section_form_btn--flex'));
    newDiv.appendChild(createElm2('button', 'Modifier mon profil', 'id', 'btn_modif_profil_user', 'class', 'bloc__form--btn-2'));
    newDiv.appendChild(createElm2('button', 'Supprimer mon compte', 'id', 'btn_suppr_profil_user', 'class', 'bloc__form--btn-2'));
};

createFormModifUser = (nom, prenom, emailRec) => {
    const newForm = mainUsers.appendChild(createElm2('form', '', 'id', 'form_modif_user', 'class', 'display--none ')); // bloc_section_form--flex

    newForm.appendChild(createElm2('label', 'Nom', 'class', 'bloc__login__form--label--style-2', 'for', 'nom'));
    newForm.appendChild(createInputs('input', '', 'id', 'nom', 'class', 'bloc__login__form--input--style-2', 'type', 'text', 'value', nom));
    newForm.appendChild(createElm2('p', 'le champs n\'est pas rempli correctement !', 'id', 'erreur1', 'class', 'bloc__form--font--erreur'));

    newForm.appendChild(createElm2('label', 'Prenom', 'class', 'bloc__login__form--label--style-2', 'for', 'prenom'));
    newForm.appendChild(createInputs('input', '', 'id', 'prenom', 'class', 'bloc__login__form--input--style-2', 'type', 'text', 'value', prenom));
    newForm.appendChild(createElm2('p', 'le champs n\'est pas rempli correctement !', 'id', 'erreur2', 'class', 'bloc__form--font--erreur'));

    newForm.appendChild(createElm2('label', 'email', 'class', 'bloc__login__form--label--style-2', 'for', 'email'));
    newForm.appendChild(createInputs('input', '', 'id', 'email', 'class', 'bloc__login__form--input--style-2', 'type', 'email', 'value', emailRec));
    newForm.appendChild(createElm2('p', 'le champs n\'est pas rempli correctement !', 'id', 'erreur3', 'class', 'bloc__form--font--erreur'));

    newForm.appendChild(createElm2('label', 'Password', 'class', 'bloc__login__form--label--style-2', 'for', 'password'));
    newForm.appendChild(createInputs('input', '', 'id', 'password', 'class', 'bloc__login__form--input--style-2', 'type', '', 'value', ''));
    newForm.appendChild(createElm2('p', 'le champs n\'est pas rempli correctement !', 'id', 'erreur4', 'class', 'bloc__form--font--erreur'));

    const newDiv2 = newForm.appendChild(createElm1('div', '', 'class', 'bloc_section_form_btn--flex'));
    newDiv2.appendChild(createElm2('button', 'Modifer mon profil', 'id', 'btn_modif_profil_user2', 'class', 'bloc__form--btn-2'));
    newDiv2.appendChild(createElm2('button', 'Annuler', 'id', 'btn_annule_modif_user', 'class', 'bloc__form--btn-2'));
};