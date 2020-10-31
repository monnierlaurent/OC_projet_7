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
newForm.appendChild(createElm1('p', 'Message d\'erreur dans les champs', 'class', 'bloc__form_p--style'));

newForm.appendChild(createElm2('label', 'Mot de passe :', 'class', 'bloc__login__form--label--style', 'for', 'password'));
newForm.appendChild(createElm3('input', '', 'id', 'password', 'class', 'bloc__login__form--input--style', 'type', 'text'));
newForm.appendChild(createElm1('p', 'Message d\'erreur dans les champs', 'class', 'bloc__form_p--style'));

const newBtnConnection = mainIndex.appendChild(createElm2('button', 'connection', 'id', 'btn_connect_index', 'class', 'bloc__form--btn'));

mainIndex.appendChild(createElm3('img', '', 'class', 'bloc_login_img-style', 'src', './ressources/image/backgroud_index.png', 'alt', 'logo_groupomania'));


const btnConnection = document.getElementById('btn_connect_index').addEventListener('click', () => {
    alert('envoie a l\'api pour authentification !');
    const regexEmail = /^[a-zA-Z1-9-._]+?@{1}[a-zA-Z1-9.-_]+[.]{1}[a-zA-Z1-9]{2,10}$/;
    //const regexPassword = ;

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const contact = {
        email: email,
        password: password
    };

    console.log(contact);
    //const datas = send('http://localhost:3000/api/auth/login');
    //datas.then(response => { console.log(response) });
});