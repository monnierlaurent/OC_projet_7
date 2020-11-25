createNavBar = () => {
    const navBar = document.getElementById('nav_index');
    navBar.appendChild(createElm4('a', 'Connexion', 'id', 'connexion', 'class', 'header__nav__a--style', 'href', './index.html', 'title', 'Lien pour se connecter'));
    navBar.appendChild(createElm4('a', 'Inscription', 'id', 'inscription', 'class', 'header__nav__a--style', 'href', './signup.html', 'title', 'Lien pour s\'incrire'));
};

createFormLogin = () => {

    const mainIndex = document.getElementById('mainIndex');

    const formPost = mainIndex.appendChild(createElm2('form', '', 'id', 'form_Login', 'class', 'bloc__form--login--flex')); //
    formPost.appendChild(createElm1('h2', 'Connexion', 'class', 'bloc__login__form--label--style--create--post')); //

    formPost.appendChild(createElm2('label', 'Adresse email :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'email')); //
    formPost.appendChild(createElm3('input', '', 'id', 'email', 'class', 'bloc__form--input--create--post--style-2', 'type', 'email')); //
    formPost.appendChild(createElm2('p', '*champ obligatoire l\'email doit contenir le nom de domaine @groupomania.fr !', 'id', 'message_1', 'class', 'bloc__form--font--message_form'));

    formPost.appendChild(createElm2('label', 'Mot de passe :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'password')); //
    formPost.appendChild(createElm3('input', '', 'id', 'password', 'class', 'bloc__form--input--create--post--style-2', 'type', 'password')); //
    formPost.appendChild(createElm2('p', '*champ obligatoire<br>le mot de passe doit contenir au mois 8 characteres 1 majuscule et 1 charactere spécial !', 'id', 'message_2', 'class', 'bloc__form--font--message_form'));

    const newDiv1 = formPost.appendChild(createElm1('div', '', 'class', '', )); //
    newDiv1.appendChild(createElm3('button', 'Connexion', 'id', 'btn_connect_index', 'class', 'bloc__form--create--post--btn--post', 'title', 'Boutton de connexion')); //

    newDiv1.appendChild(createElm2('p', 'Un des champs n\'est pas rempli correctement veulliez verifier le formulaire !', 'id', 'message_3', 'class', 'bloc__form--font--message_form_2'));

    mainIndex.appendChild(createElm3('img', '', 'class', 'bloc_login_img-style', 'src', './ressources/image/backgroud_index.png', 'alt', 'logo_groupomania'));
};