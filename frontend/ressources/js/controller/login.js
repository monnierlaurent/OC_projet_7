createLogin = () => {

    createNavBar();

    createFormLogin();

    envoiRequest = () => {
        const email = document.getElementById('email');
        const password = document.getElementById('password');

        const message_1 = document.getElementById('message_1');
        const message_2 = document.getElementById('message_2');
        const message_3 = document.getElementById('message_3');

        const regexEmail = /^[a-zA-Z1-9-._]+?@{1}[groupomania.fr]+[.]{1}[a-zA-Z1-9]{2,10}$/;
        const regexPassword = /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\#\$\(\)\*\+\,\!\"\%\&\'\.\/\?\[\]\^\_\:\;\§\~\|\`\@\¤\µ\/]{8,255}/;

        valideLogin(email, password, regexEmail, regexPassword);

        const newBtnConnection = document.getElementById('btn_connect_index');

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

                const contact = {
                    email: email.value,
                    password: password.value
                };

                const datas = send('http://localhost:3000/api/auth/login', contact);

                datas.then(response => {

                    if (response.error) {
                        message_3.innerHTML = response.error;
                        message_3.setAttribute('class', 'bloc__form--font--message_form_4');
                    } else {

                        const auth = JSON.stringify(response);
                        sessionStorage.setItem('repAuth', auth);
                        window.location = 'forum.html';
                    };

                }).catch((error) => {
                    modals();
                }); //fin catch
            } else {
                message_3.setAttribute('class', 'bloc__form--font--message_form_4');
            };
        });
    };
    envoiRequest();
};

createLogin();