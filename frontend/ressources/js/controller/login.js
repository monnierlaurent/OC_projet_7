createLogin = () => {

    createNavBar();

    createFormLogin();

    envoiRequest = () => {
        const email = document.getElementById('email');
        const password = document.getElementById('password');

        const paragErreur3 = document.getElementById('erreur3');

        const regexEmail = /^[a-zA-Z1-9-._]+?@{1}[groupomania.fr]+[.]{1}[a-zA-Z1-9]{2,10}$/;
        const regexPassword = /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\#\$\(\)\*\+\,\!\"\%\&\'\.\/\?\[\]\^\_\:\;\§\~\|\`\@\¤\µ\/]{4,255}/;

        valideLogin(email, password, regexEmail, regexPassword);

        const newBtnConnection = document.getElementById('btn_connect_index');

        newBtnConnection.addEventListener('click', (event) => {
            event.preventDefault();

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

                }).catch((error) => {



                    modals();
                }); //fin catch

            } else {
                paragErreur3.setAttribute('class', 'bloc__form--font--erreur2');
            };
        });
    };
    envoiRequest();
};

createLogin();