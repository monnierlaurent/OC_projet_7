createNavbar = () => {
    const navBar = document.getElementById('nav_signup');
    navBar.appendChild(createElm4('a', 'Connexion', 'id', 'connection', 'class', 'header__nav__a--style', 'href', './index.html', 'title', 'Lien pour se connecter'));
    navBar.appendChild(createElm4('a', 'Inscription', 'id', 'inscription', 'class', 'header__nav__a--style', 'href', './signup.html', 'title', 'Lien pour s\'incrire'));
};


createFormSignup = () => {

    const mainIndex = document.getElementById('main_signup');
    //const mainIndex = document.getElementById('main_signup');

    const formPost = mainIndex.appendChild(createElm2('form', '', 'id', 'form_signup', 'class', 'bloc__form--login--flex')); //
    formPost.appendChild(createElm1('h2', 'Inscription', 'class', 'bloc__login__form--label--style--create--post')); //

    formPost.appendChild(createElm2('label', 'Nom :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'nom')); //
    formPost.appendChild(createElm3('input', '', 'id', 'nom', 'class', 'bloc__form--input--create--post--style-2', 'type', 'text')); //
    formPost.appendChild(createElm2('p', '*Champ obligatoire le NOM doit comporter au moins 2 caractères sans chiffre ni caractères spéciaux !', 'id', 'message_1', 'class', 'bloc__form--font--message_form'));

    formPost.appendChild(createElm2('label', 'Prenom :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'prenom')); //
    formPost.appendChild(createElm3('input', '', 'id', 'prenom', 'class', 'bloc__form--input--create--post--style-2', 'type', 'text')); //
    formPost.appendChild(createElm2('p', '*Champ obligatoire le PRENOM doit comporter au moins 2 caractères sans chiffre ni caractères spéciaux !', 'id', 'message_2', 'class', 'bloc__form--font--message_form')); //

    formPost.appendChild(createElm2('label', 'Adresse email :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'email')); //
    formPost.appendChild(createElm3('input', '', 'id', 'email', 'class', 'bloc__form--input--create--post--style-2', 'type', 'email')); //
    formPost.appendChild(createElm2('p', '*Champ obligatoire L\'EMAIL doit contenir le nom de domaine @groupomania.fr !', 'id', 'message_3', 'class', 'bloc__form--font--message_form'));

    formPost.appendChild(createElm2('label', 'Mot de passe :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'password')); //
    formPost.appendChild(createElm3('input', '', 'id', 'password', 'class', 'bloc__form--input--create--post--style-2', 'type', 'password')); //
    formPost.appendChild(createElm2('p', '*Champ obligatoire<br>Le mot de passe doit contenir au moins 8 caractères 1 majuscule et 1 caractère spécial et 1 chiffre !', 'id', 'message_4', 'class', 'bloc__form--font--message_form'));

    formPost.appendChild(createElm2('label', 'Comfirmation du mot de passe :', 'class', 'bloc__login__form--label--style--create--post', 'for', 'comfirmPassword')); //
    formPost.appendChild(createElm3('input', '', 'id', 'comfirmPassword', 'class', 'bloc__form--input--create--post--style-2', 'type', 'password')); //
    formPost.appendChild(createElm2('p', '*champ obligatoire saisissez a nouveau votre mot de passe', 'id', 'message_5', 'class', 'bloc__form--font--message_form'));


    formPost.appendChild(createElm1('p', 'Sélèctionner un avatar :', 'class', 'bloc__login__form--label--style--create--post')); //

    const newDiv2 = formPost.appendChild(createElm1('div', '', 'class', 'signup--avatar--flex', ));
    newDiv2.appendChild(createElm4('img', '', 'id', 'avatar_1', 'src', 'http://localhost:3000/images/avatar/avatar_01.png', 'class', 'signup--avatar--style', 'alt', 'Choix de l\'avatar 1')); //signup--avatar--border
    newDiv2.appendChild(createElm4('img', '', 'id', 'avatar_2', 'src', 'http://localhost:3000/images/avatar/avatar_02.png', 'class', 'signup--avatar--style', 'alt', 'Choix de l\'avatar 2'));
    newDiv2.appendChild(createElm4('img', '', 'id', 'avatar_3', 'src', 'http://localhost:3000/images/avatar/avatar_03.png', 'class', 'signup--avatar--style', 'alt', 'Choix de l\'avatar 3'));
    newDiv2.appendChild(createElm4('img', '', 'id', 'avatar_4', 'src', 'http://localhost:3000/images/avatar/avatar_04.png', 'class', 'signup--avatar--style', 'alt', 'Choix de l\'avatar 4'));

    formPost.appendChild(createElm2('p', '*avatar obligatoire', 'id', 'message_6', 'class', 'bloc__form--font--message_form'));

    const newDiv1 = formPost.appendChild(createElm1('div', '', 'class', '', )); //
    newDiv1.appendChild(createElm3('button', 'Inscription', 'id', 'btn_inscrip_signup', 'class', 'bloc__form--create--post--btn--post', 'title', 'Boutton de validation pour l\'inscription')); //

    newDiv1.appendChild(createElm2('p', 'Un des champs n\'est pas rempli correctement !', 'id', 'message_7', 'class', 'bloc__form--font--message_form_2'));

};