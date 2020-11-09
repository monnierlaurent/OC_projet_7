createLogin = () => {

    createNavbar();

    createFormSignup();

    const paragErreur6 = document.getElementById('erreur6');

    const regexNomPrenom = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'.-]{2,20} *$/;
    const regexEmail = /^[a-zA-Z1-9-._]+?@{1}[groupomania.fr]+[.]{1}[a-zA-Z1-9]{2,10}$/;
    const regexPassword = /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\#\$\(\)\*\+\,\!\"\%\&\'\.\/\?\[\]\^\_\:\;\§\~\|\`\@\¤\µ\/]{4,255}/;

    const nom = document.getElementById('nom');
    const prenom = document.getElementById('prenom');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('comfirmPassword');


    valideSignup(nom, prenom, email, password, confirmPassword, regexNomPrenom, regexEmail, regexPassword);

    const btnConnection = document.getElementById('btn_inscrip_signup');
    btnConnection.addEventListener('click', (event) => {
        event.preventDefault();
        if (regexNomPrenom.test(nom.value) !== false && regexNomPrenom.test(prenom.value) !== false && regexEmail.test(email.value) !== false && regexPassword.test(password.value) !== false, confirmPassword.value === password.value) {
            const contact = {
                nom: nom.value,
                prenom: prenom.value,
                email: email.value,
                password: password.value,
                role: 2
            };

            const datas6 = send('http://localhost:3000/api/auth/signup', contact);

            datas6.then(response => {

                if (response.error) {

                    paragErreur6.setAttribute('class', 'bloc__form--font--erreur2');
                } else {

                    const auth = JSON.stringify(response);
                    sessionStorage.setItem('repAuth', auth);

                    window.location = './index.html';
                };
            }).catch((error => {
                modals();
            })); //fin catch
        } else {
            paragErreur6.setAttribute('class', 'bloc__form--font--erreur2');
        };
    });

};

createLogin();