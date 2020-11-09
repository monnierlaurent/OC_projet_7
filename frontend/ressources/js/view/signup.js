createNavbar = () => {
    const navBar = document.getElementById('nav_signup');
    navBar.appendChild(createElm3('a', 'Inscription', 'id', 'inscription', 'class', 'header__nav__a--style', 'href', './signup.html'));
    navBar.appendChild(createElm3('a', 'Connection', 'id', 'connection', 'class', 'header__nav__a--style', 'href', './index.html'));
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

    const newDiv1 = formPost.appendChild(createElm1('div', '', 'class', '', )); //
    newDiv1.appendChild(createElm2('button', 'Inscription', 'id', 'btn_inscrip_signup', 'class', 'bloc__form--create--post--btn--post')); //

    newDiv1.appendChild(createElm2('p', 'le champs n\'est pas rempli correctement !', 'id', 'erreur6', 'class', 'bloc__form--font--erreur'));

};