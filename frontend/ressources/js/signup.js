createLogin = () => {

    const navBar = document.getElementById('nav_signup');
    navBar.appendChild(createElm3('a', 'Inscription', 'id', 'inscription', 'class', 'header__nav__a--style', 'href', './signup.html'));
    navBar.appendChild(createElm3('a', 'Connection', 'id', 'connection', 'class', 'header__nav__a--style', 'href', './index.html'));

    //creation du h1 main
    const mainIndex = document.getElementById('main_signup');
    mainIndex.appendChild(createElm1('h2', 'Inscription', 'class', 'bloc__login--h1--style'));

    // creation du formulaire
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

    const paragErreur1 = document.getElementById('erreur1');
    const paragErreur2 = document.getElementById('erreur2');
    const paragErreur3 = document.getElementById('erreur3');
    const paragErreur4 = document.getElementById('erreur4');
    const paragErreur5 = document.getElementById('erreur5');


    const regexNomPrenom = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'.-]{2,20} *$/;
    const regexEmail = /^[a-zA-Z1-9-._]+?@{1}[a-zA-Z1-9.-_]+[.]{1}[a-zA-Z1-9]{2,10}$/;
    const regexPassword = /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'.-]{4,255}/;

    const nom = document.getElementById('nom');
    const prenom = document.getElementById('prenom');
    const email = document.getElementById('email');
    const password = document.getElementById('password');


    valide = () => {
        nom.addEventListener('change', (event) => {
            event.preventDefault;

            if (nom.value.length === 0) {
                paragErreur1.setAttribute('class', 'bloc__form--font--erreur1');
                paragErreur1.innerHTML = '* champ obligatoire 10';

            } else if (regexNomPrenom.test(nom.value) === true) {
                paragErreur1.setAttribute('class', 'bloc__form--font--erreur1');
                paragErreur1.innerHTML = '* champ obligatoire10';

            } else if (regexNomPrenom.test(nom.value) === false) {
                paragErreur1.setAttribute('class', 'bloc__form--font--erreur2');
                paragErreur1.innerHTML = 'Format du NOM  conforme !!!';
            };
        });
        prenom.addEventListener('change', (event) => {
            event.preventDefault;

            if (prenom.value.length === 0) {
                paragErreur2.setAttribute('class', 'bloc__form--font--erreur1');
                paragErreur2.innerHTML = '* champ obligatoire';

            } else if (regexNomPrenom.test(prenom.value) === true) {
                paragErreur2.setAttribute('class', 'bloc__form--font--erreur1');
                paragErreur2.innerHTML = '* champ obligatoire';

            } else if (regexNomPrenom.test(prenom.value) === false) {
                paragErreur2.setAttribute('class', 'bloc__form--font--erreur2');
                paragErreur2.innerHTML = 'Format de l\'email est non  conforme !!!';
            };
        });

        email.addEventListener('change', (event) => {
            event.preventDefault;

            if (email.value.length === 0) {
                paragErreur3.setAttribute('class', 'bloc__form--font--erreur1');
                paragErreur3.innerHTML = '* champ obligatoire';

            } else if (regexEmail.test(email.value) === true) {
                paragErreur3.setAttribute('class', 'bloc__form--font--erreur1');
                paragErreur3.innerHTML = '* champ obligatoire';

            } else if (regexEmail.test(email.value) === false) {
                paragErreur3.setAttribute('class', 'bloc__form--font--erreur2');
                paragErreur3.innerHTML = 'Format de l\'email est non  conforme !!!';
            };
        });

        password.addEventListener('change', (event) => {
            event.preventDefault;
            if (password.value.length === 0) {
                paragErreur4.setAttribute('class', 'bloc__form--font--erreur1');
                paragErreur4.innerHTML = '* champ obligatoire';

            } else if (regexPassword.test(password.value) === true) {
                paragErreur4.setAttribute('class', 'bloc__form--font--erreur1');
                paragErreur4.innerHTML = '* champ obligatoire';

            } else if (regexPassword.test(password.value) === false) {
                paragErreur4.setAttribute('class', 'bloc__form--font--erreur2');
                paragErreur4.innerHTML = 'Format de l\'email est non  conforme !!!';
            };
        });
    }; // fin valide
    valide();

    newBtnConnection.addEventListener('click', () => {
        if (regexNomPrenom.test(nom.value) !== false && regexNomPrenom.test(prenom.value) !== false && regexEmail.test(email.value) !== false && regexPassword.test(password.value) !== false) {
            const contact = {
                nom: nom.value,
                prenom: prenom.value,
                email: email.value,
                password: password.value,
                role: 2
            };

            const datas = send('http://localhost:3000/api/auth/login', contact);
            datas.then(response => {

                if (response.error) {
                    paragErreur5.setAttribute('class', 'bloc__form--font--erreur2');
                } else {

                    const auth = JSON.stringify(response);
                    sessionStorage.setItem('repAuth', auth);

                    window.location = 'forum.html';
                };

            }).catch((error => {

                // faire spinner
                modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');

            })); //fin catch

        } else {
            paragErreur5.setAttribute('class', 'bloc__form--font--erreur2');
        };
    });

};




createLogin();