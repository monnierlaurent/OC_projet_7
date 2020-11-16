createLogin = () => {

    createNavbar();

    createFormSignup();

    const message_1 = document.getElementById('message_1');
    const message_2 = document.getElementById('message_2');
    const message_3 = document.getElementById('message_3');
    const message_4 = document.getElementById('message_4');
    const message_5 = document.getElementById('message_5');
    const message_6 = document.getElementById('message_6');
    const message_7 = document.getElementById('message_7');

    const regexNomPrenom = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'.-]{2,255}/;
    //const regexNomPrenom = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'.-]{2,20} *$/;
    const regexEmail = /^[a-zA-Z1-9-._]+?@{1}[groupomania.fr]+[.]{1}[a-zA-Z1-9]{2,10}$/;
    const regexPassword = /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\#\$\(\)\*\+\,\!\"\%\&\'\.\/\?\[\]\^\_\:\;\§\~\|\`\@\¤\µ\/]{4,255}/;

    const nom = document.getElementById('nom');
    const prenom = document.getElementById('prenom');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('comfirmPassword');

    const avatar1 = document.getElementById('avatar_1');
    const avatar2 = document.getElementById('avatar_2');
    const avatar3 = document.getElementById('avatar_3');
    const avatar4 = document.getElementById('avatar_4');

    let avatarChoix;

    avatar1.addEventListener('click', (event) => {
        event.preventDefault();
        avatar1.setAttribute('class', 'signup--avatar--border');
        avatar2.setAttribute('class', 'signup--avatar--style');
        avatar3.setAttribute('class', 'signup--avatar--style');
        avatar4.setAttribute('class', 'signup--avatar--style');
        return avatarChoix = avatar1.src;
    });
    avatar2.addEventListener('click', (event) => {
        event.preventDefault();
        avatar1.setAttribute('class', 'signup--avatar--style');
        avatar2.setAttribute('class', 'signup--avatar--border');
        avatar3.setAttribute('class', 'signup--avatar--style');
        avatar4.setAttribute('class', 'signup--avatar--style');
        return avatarChoix = avatar2.src;
    });
    avatar3.addEventListener('click', (event) => {
        event.preventDefault();
        avatar1.setAttribute('class', 'signup--avatar--style');
        avatar2.setAttribute('class', 'signup--avatar--style');
        avatar3.setAttribute('class', 'signup--avatar--border');
        avatar4.setAttribute('class', 'signup--avatar--style');
        return avatarChoix = avatar3.src;
    });
    avatar4.addEventListener('click', (event) => {
        event.preventDefault();
        avatar1.setAttribute('class', 'signup--avatar--style');
        avatar2.setAttribute('class', 'signup--avatar--style');
        avatar3.setAttribute('class', 'signup--avatar--style');
        avatar4.setAttribute('class', 'signup--avatar--border');
        return avatarChoix = avatar4.src;
    });

    valideSignup(nom, prenom, email, password, confirmPassword, regexNomPrenom, regexEmail, regexPassword);

    const btnConnection = document.getElementById('btn_inscrip_signup');
    btnConnection.addEventListener('click', (event) => {
        event.preventDefault();
        if (regexNomPrenom.test(nom.value) === false) {
            message_1.setAttribute('class', 'bloc__form--font--message_form_4');
        } else {
            message_1.setAttribute('class', 'bloc__form--font--message_form');
        };
        if (regexNomPrenom.test(prenom.value) === false) {
            message_2.setAttribute('class', 'bloc__form--font--message_form_4');
        } else {
            message_2.setAttribute('class', 'bloc__form--font--message_form');
        };
        if (regexNomPrenom.test(email.value) === false) {
            message_3.setAttribute('class', 'bloc__form--font--message_form_4');
        } else {
            message_3.setAttribute('class', 'bloc__form--font--message_form');
        };
        if (regexNomPrenom.test(password.value) === false) {
            message_4.setAttribute('class', 'bloc__form--font--message_form_4');
        } else {
            message_4.setAttribute('class', 'bloc__form--font--message_form');
        };
        if (regexNomPrenom.test(password.value) === false) {
            message_4.setAttribute('class', 'bloc__form--font--message_form_4');
        } else {
            message_4.setAttribute('class', 'bloc__form--font--message_form');
        };
        if (confirmPassword.value !== password.value || confirmPassword.length === undefined) {
            message_5.setAttribute('class', 'bloc__form--font--message_form_4');
        } else {
            message_5.setAttribute('class', 'bloc__form--font--message_form');
        };
        if (avatarChoix === undefined) {
            message_6.setAttribute('class', 'bloc__form--font--message_form_4');
        } else {
            message_6.setAttribute('class', 'bloc__form--font--message_form_2');
        };

        if (regexNomPrenom.test(nom.value) !== false && regexNomPrenom.test(prenom.value) !== false && regexEmail.test(email.value) !== false && regexPassword.test(password.value) !== false, confirmPassword.value === password.value && avatarChoix !== undefined) {
            const contact = {
                nom: nom.value,
                prenom: prenom.value,
                email: email.value,
                password: password.value,
                role: 2,
                avatar: avatarChoix
            };

            const datas6 = send('http://localhost:3000/api/auth/signup', contact);

            datas6.then(response => {

                if (response.error) {

                    message_7.setAttribute('class', 'bloc__form--font--message_form_4');
                } else {

                    const auth = JSON.stringify(response);
                    sessionStorage.setItem('repAuth', auth);

                    window.location = './index.html';
                };
            }).catch((error => {
                modals();
            })); //fin catch
        } else {
            message_7.setAttribute('class', 'bloc__form--font--message_form_4');
        };
    });
};

createLogin();