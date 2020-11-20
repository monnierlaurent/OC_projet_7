createLogin = () => {

    createNavBar();

    createFormLogin();

    envoiRequest = () => {
        const email = document.getElementById('email');
        const password = document.getElementById('password');

        const message_1 = document.getElementById('message_1');
        const message_2 = document.getElementById('message_2');
        const message_3 = document.getElementById('message_3');

        const regexEmail = /^[a-zA-Z1-9-._]+?@{1}[groupomania]+[.]{1}[fr]{2}$/;
        const regexPassword = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;

        valideLogin(email, password, regexEmail, regexPassword);

        const newBtnConnection = document.getElementById('btn_connect_index');

        const formLogin = document.getElementById('form_Login');
        formLogin.addEventListener('change', () => {

            if (regexEmail.test(email.value) !== false && regexPassword.test(password.value) !== false) {
                message_3.setAttribute('class', 'bloc__form--font--message_form_2');

            };
        });

        newBtnConnection.addEventListener('click', (event) => {
            event.preventDefault();
            if (regexEmail.test(email.value) === false) {
                message_1.setAttribute('class', 'bloc__form--font--message_form_4');
            } else {
                message_1.setAttribute('class', 'bloc__form--font--message_form');
            };
            if (regexPassword.test(password.value) === false) {
                message_2.setAttribute('class', 'bloc__form--font--message_form_4');
            } else {
                message_2.setAttribute('class', 'bloc__form--font--message_form');
            };

            if (regexEmail.test(email.value) !== false && regexPassword.test(password.value) !== false) {

                message_3.setAttribute('class', 'bloc__form--font--message_form_2');
                const contact = {
                    email: email.value,
                    password: password.value
                };

                const datas = send('http://localhost:3000/api/auth/login', contact);
                datas.then(response => {
                    if (response.status === 403 || response.status === 404 || response.status === 500) {

                        messageConfirm(response.message, 'mainIndex');

                        setTimeout(() => {
                            const main = document.getElementById('mainIndex');
                            const messageHide = document.getElementById('modal_message');
                            main.removeChild(messageHide);
                        }, 900);

                    } else if (response.status === 400) {
                        message_3.innerHTML = response.message;
                        message_3.setAttribute('class', 'bloc__form--font--message_form_4');
                    } else {

                        const auth = JSON.stringify(response);
                        sessionStorage.setItem('repAuth', auth);
                        window.location = 'forum.html';
                    };

                }).catch((error) => {
                    modals('Le serveur ne repond pas', 'Retour au catalogue', './index.html');
                    //messageConfirm(error, 'main_forum');
                }); //fin catch
            } else {
                message_3.setAttribute('class', 'bloc__form--font--message_form_4');
            };
        });
    };
    envoiRequest();
};
createLogin();