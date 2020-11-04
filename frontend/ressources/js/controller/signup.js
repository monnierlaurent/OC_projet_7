createLogin = () => {

    createNavbar();

    createFormSignup();

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
                paragErreur1.innerHTML = '* champ obligatoire';

            } else if (regexNomPrenom.test(nom.value) === true) {
                paragErreur1.setAttribute('class', 'bloc__form--font--erreur1');
                paragErreur1.innerHTML = '* champ obligatoire';

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

    const btnConnection = document.getElementById('btn_inscrip_signup');
    btnConnection.addEventListener('click', () => {
        if (regexNomPrenom.test(nom.value) !== false && regexNomPrenom.test(prenom.value) !== false && regexEmail.test(email.value) !== false && regexPassword.test(password.value) !== false) {
            const contact = {
                nom: nom.value,
                prenom: prenom.value,
                email: email.value,
                password: password.value,
                role: 2
            };

            const datas = send('http://localhost:3000/api/auth/signup', contact);

            datas.then(response => {

                if (response.error) {
                    paragErreur5.setAttribute('class', 'bloc__form--font--erreur2');
                } else {

                    const auth = JSON.stringify(response);
                    sessionStorage.setItem('repAuth', auth);

                    window.location = './index.html';
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