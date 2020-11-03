createLogin = () => {

    createNavBar();

    createFormLogin();

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

        const newBtnConnection = document.getElementById('btn_connect_index');

        newBtnConnection.addEventListener('click', () => {
            if (regexEmail.test(email.value) !== false && regexPassword.test(password.value) !== false) {
                const contact = {
                    email: email.value,
                    password: password.value
                };

                const datas = send('http://localhost:3000/api/auth/login', contact);
                console.log(datas)
                datas.then(response => {

                    if (response.error) {
                        paragErreur3.setAttribute('class', 'bloc__form--font--erreur2');
                    } else {

                        const auth = JSON.stringify(response);
                        sessionStorage.setItem('repAuth', auth);

                        window.location = 'forum.html';
                    };

                }).catch(() => {

                    // faire spinner
                    modals('Désolé !<br>Le serveur ne repond pas ', 'Connection', './index.html');

                }); //fin catch

            } else {
                paragErreur3.setAttribute('class', 'bloc__form--font--erreur2');
            };
        });
    };
    envoiRequest();
};

createLogin();