createNavBar = () => {
    const navBar = document.getElementById('nav_index');
    navBar.appendChild(createElm3('a', 'Inscription', 'id', 'inscription', 'class', 'header__nav__a--style', 'href', './signup.html'));
    navBar.appendChild(createElm3('a', 'Connection', 'id', 'connection', 'class', 'header__nav__a--style', 'href', './index.html'));
};

createFormLogin = () => {

    const mainIndex = document.getElementById('mainIndex');

    const formPost = mainIndex.appendChild(createElm2('form', '', 'id', '', 'class', 'bloc__form--login--flex')); //
    formPost.appendChild(createElm1('h2', 'Connection', 'class', 'bloc__login__form--label--style--create--post')); //

    formPost.appendChild(createElm2('label', 'Adresse email :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'email')); //
    formPost.appendChild(createElm3('input', '', 'id', 'email', 'class', 'bloc__form--input--create--post--style-2', 'type', 'email')); //
    formPost.appendChild(createElm2('p', '* champ obligatoire', 'id', 'erreur1', 'class', 'bloc__form_p--style'));

    formPost.appendChild(createElm2('label', 'Mot de passe :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'password')); //
    formPost.appendChild(createElm3('input', '', 'id', 'password', 'class', 'bloc__form--input--create--post--style-2', 'type', 'password')); //
    formPost.appendChild(createElm2('p', '* champ obligatoire', 'id', 'erreur2', 'class', 'bloc__form_p--style'));

    const newDiv1 = formPost.appendChild(createElm1('div', '', 'class', '', )); //
    newDiv1.appendChild(createElm2('button', 'Connection', 'id', 'btn_connect_index', 'class', 'bloc__form--create--post--btn--post')); //

    newDiv1.appendChild(createElm2('p', 'le champs n\'est pas rempli correctement !', 'id', 'erreur3', 'class', 'bloc__form--font--erreur'));

    mainIndex.appendChild(createElm3('img', '', 'class', 'bloc_login_img-style', 'src', './ressources/image/backgroud_index.png', 'alt', 'logo_groupomania'));
};