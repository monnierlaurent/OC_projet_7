createLogin = () => {

    // liens nav bar
    const navBar = document.getElementById('nav_index');
    navBar.appendChild(createElm3('a', 'Inscription', 'id', 'inscription', 'class', 'header__nav__a--style', 'href', './signup.html'));
    navBar.appendChild(createElm3('a', 'Connection', 'id', 'connection', 'class', 'header__nav__a--style', 'href', './index.html'));

    //creation de la section main
    const mainIndex = document.getElementById('mainIndex');
    mainIndex.appendChild(createElm1('h2', 'Connection', 'class', 'bloc__login--h1--style'));

    // creation du formulaire
    const newForm = mainIndex.appendChild(createElm1('form', '', 'class', 'bloc__login__form--flex'));
    newForm.appendChild(createElm2('label', 'Email :', 'class', 'bloc__login__form--label--style', 'for', 'email'));
    newForm.appendChild(createElm3('input', '', 'id', 'email', 'class', 'bloc__login__form--input--style', 'type', 'text'));
    newForm.appendChild(createElm2('p', '* champ obligatoire', 'id', 'erreur1', 'class', 'bloc__form_p--style'));

    newForm.appendChild(createElm2('label', 'Mot de passe :', 'class', 'bloc__login__form--label--style', 'for', 'password'));
    newForm.appendChild(createElm3('input', '', 'id', 'password', 'class', 'bloc__login__form--input--style', 'type', 'password'));
    newForm.appendChild(createElm2('p', '* champ obligatoire', 'id', 'erreur2', 'class', 'bloc__form_p--style'));

    const newBtnConnection = mainIndex.appendChild(createElm2('button', 'connection', 'id', 'btn_connect_index', 'class', 'bloc__form--btn'));

    mainIndex.appendChild(createElm2('p', 'l\'email ou le mot de passe son erroné', 'id', 'erreur3', 'class', 'bloc__form--font--erreur'));

    mainIndex.appendChild(createElm3('img', '', 'class', 'bloc_login_img-style', 'src', './ressources/image/backgroud_index.png', 'alt', 'logo_groupomania'));

    envoiRequest = () => {

        const paragErreur1 = document.getElementById('erreur1');
        const paragErreur2 = document.getElementById('erreur2');
        const paragErreur3 = document.getElementById('erreur3');

        const regexEmail = /^[a-zA-Z1-9-._]+?@{1}[a-zA-Z1-9.-_]+[.]{1}[a-zA-Z1-9]{2,10}$/;
        const regexPassword = /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'.-]{4,255}/;

        const email = document.getElementById('email');
        const password = document.getElementById('password');

        valide = () => {
            email.addEventListener('change', (event) => {
                event.preventDefault;

                if (email.value.length === 0) {
                    paragErreur1.setAttribute('class', 'bloc__form--font--erreur1');
                    paragErreur1.innerHTML = '* champ obligatoire';

                } else if (regexEmail.test(email.value) === true) {
                    paragErreur1.setAttribute('class', 'bloc__form--font--erreur1');
                    paragErreur1.innerHTML = '* champ obligatoire';

                } else if (regexEmail.test(email.value) === false) {
                    paragErreur1.setAttribute('class', 'bloc__form--font--erreur2');
                    paragErreur1.innerHTML = 'Format de l\'email est non  conforme !!!';
                };
            });

            password.addEventListener('change', (event) => {
                event.preventDefault;

                if (password.value.length === 0) {
                    paragErreur2.setAttribute('class', 'bloc__form--font--erreur1');
                    paragErreur2.innerHTML = '* champ obligatoire';

                } else if (regexPassword.test(email.value) === true) {
                    paragErreur2.setAttribute('class', 'bloc__form--font--erreur1');
                    paragErreur2.innerHTML = '* champ obligatoire';

                } else if (regexPassword.test(email.value) === false) {
                    paragErreur2.setAttribute('class', 'bloc__form--font--erreur2');
                    paragErreur2.innerHTML = 'Format de l\'email est non  conforme !!!';
                };
            });

        }; //fin function valide

        valide();

        newBtnConnection.addEventListener('click', () => {
            if (regexEmail.test(email.value) !== false && regexPassword.test(password.value) !== false) {
                const contact = {
                    email: email.value,
                    password: password.value
                };

                const datas = send('http://localhost:3000/api/auth/login', contact);
                datas.then(response => {

                    if (response.error) {
                        paragErreur3.setAttribute('class', 'bloc__form--font--erreur2');
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
                paragErreur3.setAttribute('class', 'bloc__form--font--erreur2');
            };
        });
    };
    envoiRequest();
};

createLogin();