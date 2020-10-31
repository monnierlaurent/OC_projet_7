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
newForm.appendChild(createElm1('p', 'Message d\'erreur dans les champs', 'class', 'bloc__form_p--style'));

newForm.appendChild(createElm2('label', 'Prenom :', 'class', 'bloc__login__form--label--style', 'for', 'prenom'));
newForm.appendChild(createElm3('input', '', 'id', 'prenom', 'class', 'bloc__login__form--input--style', 'type', 'text'));
newForm.appendChild(createElm1('p', 'Message d\'erreur dans les champs', 'class', 'bloc__form_p--style'));

newForm.appendChild(createElm2('label', 'Email :', 'class', 'bloc__login__form--label--style', 'for', 'email'));
newForm.appendChild(createElm3('input', '', 'id', 'email', 'class', 'bloc__login__form--input--style', 'type', 'email'));
newForm.appendChild(createElm1('p', 'Message d\'erreur dans les champs', 'class', 'bloc__form_p--style'));

newForm.appendChild(createElm2('label', 'Mot de passe :', 'class', 'bloc__login__form--label--style', 'for', 'password'));
newForm.appendChild(createElm3('input', '', 'id', 'password', 'class', 'bloc__login__form--input--style', 'type', 'password'));
newForm.appendChild(createElm1('p', 'Message d\'erreur dans les champs', 'class', 'bloc__form_p--style'));

const newBtnConnection = mainIndex.appendChild(createElm2('button', 'Inscription', 'id', 'btn_inscrip_signup', 'class', 'bloc__form--btn'));




const btnConnection = document.getElementById('btn_inscrip_signup').addEventListener('click', () => {

    alert('envoie a l\'api pour l\'incription !');
    const regexNom = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'.-]{2,20} *$/;
    const regexPrenom = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'.-]{2,20} *$/;
    const regexEmail = /^[a-zA-Z1-9-._]+?@{1}[a-zA-Z1-9.-_]+[.]{1}[a-zA-Z1-9]{2,10}$/;
    //const password = ;

    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const contact = {
        nom: nom,
        prenom: prenom,
        email: email,
        password: password
    };

    console.log(contact);
    //const datas = send('http://localhost:3000/api/auth/signup');
    //datas.then(response => { console.log(response) });
});