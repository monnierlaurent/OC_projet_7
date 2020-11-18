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

    const regexNomPrenom = /^([a-zA-Za-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'.-]+([ ]){0,}){1,}$/;
    const regexEmail = /^[a-zA-Z1-9-._]+?@{1}[groupomania]+[.]{1}[fr]{2}$/;
    const regexPassword = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;

    const nom = document.getElementById('nom');
    const prenom = document.getElementById('prenom');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('comfirmPassword');

    const avatar1 = document.getElementById('avatar_1');
    const avatar2 = document.getElementById('avatar_2');
    const avatar3 = document.getElementById('avatar_3');
    const avatar4 = document.getElementById('avatar_4');

    let avatarChoix = 'vide';

    avatar1.addEventListener('click', (event) => {
        event.preventDefault();
        avatar1.setAttribute('class', 'signup--avatar--border');
        avatar2.setAttribute('class', 'signup--avatar--style');
        avatar3.setAttribute('class', 'signup--avatar--style');
        avatar4.setAttribute('class', 'signup--avatar--style');
        message_6.setAttribute('class', 'bloc__form--font--message_form_5');
        return avatarChoix = avatar1.src;
    });
    avatar2.addEventListener('click', (event) => {
        event.preventDefault();
        avatar1.setAttribute('class', 'signup--avatar--style');
        avatar2.setAttribute('class', 'signup--avatar--border');
        avatar3.setAttribute('class', 'signup--avatar--style');
        avatar4.setAttribute('class', 'signup--avatar--style');
        message_6.setAttribute('class', 'bloc__form--font--message_form_5');
        return avatarChoix = avatar2.src;
    });
    avatar3.addEventListener('click', (event) => {
        event.preventDefault();
        avatar1.setAttribute('class', 'signup--avatar--style');
        avatar2.setAttribute('class', 'signup--avatar--style');
        avatar3.setAttribute('class', 'signup--avatar--border');
        avatar4.setAttribute('class', 'signup--avatar--style');
        message_6.setAttribute('class', 'bloc__form--font--message_form_5');
        return avatarChoix = avatar3.src;
    });
    avatar4.addEventListener('click', (event) => {
        event.preventDefault();
        avatar1.setAttribute('class', 'signup--avatar--style');
        avatar2.setAttribute('class', 'signup--avatar--style');
        avatar3.setAttribute('class', 'signup--avatar--style');
        avatar4.setAttribute('class', 'signup--avatar--border');
        message_6.setAttribute('class', 'bloc__form--font--message_form_5');
        return avatarChoix = avatar4.src;
    });

    valideSignup(nom, prenom, email, password, confirmPassword, regexNomPrenom, regexEmail, regexPassword);

    const formSignup = document.getElementById('form_signup');
    formSignup.addEventListener('change', (event) => {
        event.preventDefault();

        if (regexNomPrenom.test(nom.value) !== false && regexNomPrenom.test(prenom.value) !== false && regexEmail.test(email.value) !== false && regexPassword.test(password.value) !== false && confirmPassword.value === password.value && avatarChoix !== 'vide') {
            message_7.setAttribute('class', 'bloc__form--font--message_form_2');
        };
    });

    const btnInscription = document.getElementById('btn_inscrip_signup');
    btnInscription.addEventListener('click', (event) => {
        event.preventDefault();

        console.log(avatarChoix)
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
        if (regexEmail.test(email.value) === false) {
            message_3.setAttribute('class', 'bloc__form--font--message_form_4');
        } else {
            message_3.setAttribute('class', 'bloc__form--font--message_form');
        };
        if (regexPassword.test(password.value) === false) {
            message_4.setAttribute('class', 'bloc__form--font--message_form_4');
        } else {
            message_4.setAttribute('class', 'bloc__form--font--message_form');
        };
        if (confirmPassword.value !== password.value) {
            message_5.setAttribute('class', 'bloc__form--font--message_form_4');
        } else {
            message_5.setAttribute('class', 'bloc__form--font--message_form');
        };
        if (avatarChoix === 'vide') {
            message_6.setAttribute('class', 'bloc__form--font--message_form_4');
        } else {
            message_6.setAttribute('class', 'bloc__form--font--message_form_5');
        };

        if (regexNomPrenom.test(nom.value) !== false && regexNomPrenom.test(prenom.value) !== false && regexEmail.test(email.value) !== false && regexPassword.test(password.value) !== false && confirmPassword.value === password.value && avatarChoix !== undefined) {

            message_7.setAttribute('class', 'bloc__form--font--message_form_2');


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

                if (response.status === 403 || response.status === 404 || response.status === 500) {
                    messageConfirm(response.message, 'main_signup');

                    setTimeout(() => {
                        const main = document.getElementById('main_signup');
                        const messageHide = document.getElementById('modal_message');
                        main.removeChild(messageHide);
                    }, 900);

                } else if (response.status === 400) {
                    message_7.innerHTML = response.message;
                    message_7.setAttribute('class', 'bloc__form--font--message_form_4');

                } else {

                    const auth = JSON.stringify(response);
                    sessionStorage.setItem('repAuth', auth);

                    messageConfirm(response.message, 'main_signup');

                    setTimeout(() => {
                        const main = document.getElementById('main_signup');
                        const messageHide = document.getElementById('modal_message');
                        main.removeChild(messageHide);
                        window.location = './forum.html';
                    }, 900);
                };
            }).catch((error => {
                messageConfirm(error, 'main_forum');
            })); //fin catch
        } else {
            message_7.setAttribute('class', 'bloc__form--font--message_form_4');
        };
    });
};

createLogin();