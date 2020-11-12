createNavbar = () => {
    const navBar = document.getElementById('nav_signup');
    navBar.appendChild(createElm4('a', 'Connection', 'id', 'connection', 'class', 'header__nav__a--style', 'href', './index.html', 'title', 'lien pour se connecter'));
    navBar.appendChild(createElm4('a', 'Inscription', 'id', 'inscription', 'class', 'header__nav__a--style', 'href', './signup.html', 'title', 'lien pour s\'incrire'));
};


createFormSignup = () => {

    const mainIndex = document.getElementById('main_signup');

    const formPost = mainIndex.appendChild(createElm2('form', '', 'id', '', 'class', 'bloc__form--login--flex')); //
    formPost.appendChild(createElm1('h2', 'Connection', 'class', 'bloc__login__form--label--style--create--post')); //

    formPost.appendChild(createElm2('label', 'Nom :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'nom')); //
    formPost.appendChild(createElm3('input', '', 'id', 'nom', 'class', 'bloc__form--input--create--post--style-2', 'type', 'text')); //
    formPost.appendChild(createElm2('p', '* champ obligatoire', 'id', 'erreur1', 'class', 'bloc__form_p--style'));

    formPost.appendChild(createElm2('label', 'Prenom :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'prenom')); //
    formPost.appendChild(createElm3('input', '', 'id', 'prenom', 'class', 'bloc__form--input--create--post--style-2', 'type', 'text')); //
    formPost.appendChild(createElm2('p', '* champ obligatoire', 'id', 'erreur2', 'class', 'bloc__form_p--style'));

    formPost.appendChild(createElm2('label', 'Adresse email :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'email')); //
    formPost.appendChild(createElm3('input', '', 'id', 'email', 'class', 'bloc__form--input--create--post--style-2', 'type', 'email')); //
    formPost.appendChild(createElm2('p', '* champ obligatoire', 'id', 'erreur3', 'class', 'bloc__form_p--style'));

    formPost.appendChild(createElm2('label', 'Mot de passe :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'password')); //
    formPost.appendChild(createElm3('input', '', 'id', 'password', 'class', 'bloc__form--input--create--post--style-2', 'type', 'password')); //
    formPost.appendChild(createElm2('p', '* champ obligatoire exemple : @Modepasse', 'id', 'erreur4', 'class', 'bloc__form_p--style'));

    formPost.appendChild(createElm2('label', 'Comfirmation du mot de passe :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'comfirmPassword')); //
    formPost.appendChild(createElm3('input', '', 'id', 'comfirmPassword', 'class', 'bloc__form--input--create--post--style-2', 'type', 'password')); //
    formPost.appendChild(createElm2('p', '* champ obligatoire', 'id', 'erreur5', 'class', 'bloc__form_p--style'));

    const newDiv2 = formPost.appendChild(createElm1('div', '', 'class', 'signup--avatar--flex', ));
    newDiv2.appendChild(createElm4('img', '', 'id', 'avatar_1', 'src', 'http://localhost:3000/images/avatar/avatar_01.png', 'class', 'signup--avatar--style', 'alt', 'Choix de l\'avatar 1')); //signup--avatar--border
    newDiv2.appendChild(createElm4('img', '', 'id', 'avatar_2', 'src', 'http://localhost:3000/images/avatar/avatar_02.png', 'class', 'signup--avatar--style', 'alt', 'Choix de l\'avatar 2'));
    newDiv2.appendChild(createElm4('img', '', 'id', 'avatar_3', 'src', 'http://localhost:3000/images/avatar/avatar_03.png', 'class', 'signup--avatar--style', 'alt', 'Choix de l\'avatar 3'));
    newDiv2.appendChild(createElm4('img', '', 'id', 'avatar_4', 'src', 'http://localhost:3000/images/avatar/avatar_04.png', 'class', 'signup--avatar--style', 'alt', 'Choix de l\'avatar 4'));

    const newDiv1 = formPost.appendChild(createElm1('div', '', 'class', '', )); //
    newDiv1.appendChild(createElm3('button', 'Inscription', 'id', 'btn_inscrip_signup', 'class', 'bloc__form--create--post--btn--post', 'title', 'Boutton de validation pour l\'inscription')); //

    newDiv1.appendChild(createElm2('p', 'le champs n\'est pas rempli correctement !', 'id', 'erreur6', 'class', 'bloc__form--font--erreur'));

};