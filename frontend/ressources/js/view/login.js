createNavBar = () => {
    const navBar = document.getElementById('nav_index');
    navBar.appendChild(createElm3('a', 'Inscription', 'id', 'inscription', 'class', 'header__nav__a--style', 'href', './signup.html'));
    navBar.appendChild(createElm3('a', 'Connection', 'id', 'connection', 'class', 'header__nav__a--style', 'href', './index.html'));
};

createFormLogin = () => {
    mainIndex.appendChild(createElm1('h2', 'Connection', 'class', 'bloc__login--h1--style'));

    const newForm = mainIndex.appendChild(createElm1('form', '', 'class', 'bloc__login__form--flex'));
    newForm.appendChild(createElm2('label', 'Email :', 'class', 'bloc__login__form--label--style', 'for', 'email'));
    newForm.appendChild(createElm3('input', '', 'id', 'email', 'class', 'bloc__login__form--input--style', 'type', 'text'));
    newForm.appendChild(createElm2('p', '* champ obligatoire', 'id', 'erreur1', 'class', 'bloc__form_p--style'));

    newForm.appendChild(createElm2('label', 'Mot de passe :', 'class', 'bloc__login__form--label--style', 'for', 'password'));
    newForm.appendChild(createElm3('input', '', 'id', 'password', 'class', 'bloc__login__form--input--style', 'type', 'password'));
    newForm.appendChild(createElm2('p', '* champ obligatoire', 'id', 'erreur2', 'class', 'bloc__form_p--style'));

    mainIndex.appendChild(createElm2('button', 'connection', 'id', 'btn_connect_index', 'class', 'bloc__form--btn'));

    mainIndex.appendChild(createElm2('p', 'l\'email ou le mot de passe son erroné', 'id', 'erreur3', 'class', 'bloc__form--font--erreur'));

    mainIndex.appendChild(createElm3('img', '', 'class', 'bloc_login_img-style', 'src', './ressources/image/backgroud_index.png', 'alt', 'logo_groupomania'));
};