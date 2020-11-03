createNavbar = () => {
    const navBar = document.getElementById('nav_signup');
    navBar.appendChild(createElm3('a', 'Inscription', 'id', 'inscription', 'class', 'header__nav__a--style', 'href', './signup.html'));
    navBar.appendChild(createElm3('a', 'Connection', 'id', 'connection', 'class', 'header__nav__a--style', 'href', './index.html'));
};
createFormSignup = () => {

    const mainIndex = document.getElementById('main_signup');
    mainIndex.appendChild(createElm1('h2', 'Inscription', 'class', 'bloc__login--h1--style'));

    const newForm = mainIndex.appendChild(createElm1('form', '', 'class', 'bloc__login__form--flex'));

    newForm.appendChild(createElm2('label', 'Nom :', 'class', 'bloc__login__form--label--style', 'for', 'nom'));
    newForm.appendChild(createElm3('input', '', 'id', 'nom', 'class', 'bloc__login__form--input--style', 'type', 'text'));
    newForm.appendChild(createElm2('p', '* champ obligatoire', 'id', 'erreur1', 'class', 'bloc__form_p--style'));

    newForm.appendChild(createElm2('label', 'Prenom :', 'class', 'bloc__login__form--label--style', 'for', 'prenom'));
    newForm.appendChild(createElm3('input', '', 'id', 'prenom', 'class', 'bloc__login__form--input--style', 'type', 'text'));
    newForm.appendChild(createElm2('p', '* champ obligatoire', 'id', 'erreur2', 'class', 'bloc__form_p--style'));

    newForm.appendChild(createElm2('label', 'Email :', 'class', 'bloc__login__form--label--style', 'for', 'email'));
    newForm.appendChild(createElm3('input', '', 'id', 'email', 'class', 'bloc__login__form--input--style', 'type', 'email'));
    newForm.appendChild(createElm2('p', '* champ obligatoire', 'id', 'erreur3', 'class', 'bloc__form_p--style'));

    newForm.appendChild(createElm2('label', 'Mot de passe :', 'class', 'bloc__login__form--label--style', 'for', 'password'));
    newForm.appendChild(createElm3('input', '', 'id', 'password', 'class', 'bloc__login__form--input--style', 'type', 'password'));
    newForm.appendChild(createElm2('p', '* champ obligatoire', 'id', 'erreur4', 'class', 'bloc__form_p--style'));

    const newBtnConnection = mainIndex.appendChild(createElm2('button', 'Inscription', 'id', 'btn_inscrip_signup', 'class', 'bloc__form--btn'));

    mainIndex.appendChild(createElm2('p', 'les informations sont érronées !', 'id', 'erreur5', 'class', 'bloc__form--font--erreur'));

};