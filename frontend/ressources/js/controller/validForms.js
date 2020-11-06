valideSignup = (nom, prenom, email, password, confirmPassword, Rnom, Remail, Rpassword) => {

    const paragErreur1 = document.getElementById('erreur1');
    const paragErreur2 = document.getElementById('erreur2');
    const paragErreur3 = document.getElementById('erreur3');
    const paragErreur4 = document.getElementById('erreur4');
    const paragErreur5 = document.getElementById('erreur5');

    nom.addEventListener('change', (event) => {
        event.preventDefault();


        if (nom.value.length === 0) {
            paragErreur1.setAttribute('class', 'bloc__form--font--erreur1');
            paragErreur1.innerHTML = '* champ obligatoire';

        } else if (Rnom.test(nom.value) === true) {
            paragErreur1.setAttribute('class', 'bloc__form--font--erreur1');
            paragErreur1.innerHTML = '* champ obligatoire';

        } else if (Rnom.test(nom.value) === false) {
            paragErreur1.setAttribute('class', 'bloc__form--font--erreur2');
            paragErreur1.innerHTML = 'le champs n\'est pas rempli correctement !';
        };
    });
    prenom.addEventListener('change', (event) => {
        event.preventDefault();

        if (prenom.value.length === 0) {
            paragErreur2.setAttribute('class', 'bloc__form--font--erreur1');
            paragErreur2.innerHTML = '* champ obligatoire';

        } else if (Rnom.test(prenom.value) === true) {
            paragErreur2.setAttribute('class', 'bloc__form--font--erreur1');
            paragErreur2.innerHTML = '* champ obligatoire';

        } else if (Rnom.test(prenom.value) === false) {
            paragErreur2.setAttribute('class', 'bloc__form--font--erreur2');
            paragErreur2.innerHTML = 'le champs n\'est pas rempli correctement !';
        };
    });

    email.addEventListener('change', (event) => {
        event.preventDefault();

        if (email.value.length === 0) {
            paragErreur3.setAttribute('class', 'bloc__form--font--erreur1');
            paragErreur3.innerHTML = '* champ obligatoire';

        } else if (Remail.test(email.value) === true) {
            paragErreur3.setAttribute('class', 'bloc__form--font--erreur1');
            paragErreur3.innerHTML = '* champ obligatoire';

        } else if (Remail.test(email.value) === false) {
            paragErreur3.setAttribute('class', 'bloc__form--font--erreur2');
            paragErreur3.innerHTML = 'le champs n\'est pas rempli correctement !';
        };
    });

    password.addEventListener('change', (event) => {
        event.preventDefault();
        if (password.value.length === 0) {
            paragErreur4.setAttribute('class', 'bloc__form--font--erreur1');
            paragErreur4.innerHTML = '* champ obligatoire';

        } else if (Rpassword.test(password.value) === true) {
            paragErreur4.setAttribute('class', 'bloc__form--font--erreur1');
            paragErreur4.innerHTML = '* champ obligatoire';

        } else if (Rpassword.test(password.value) === false) {
            paragErreur4.setAttribute('class', 'bloc__form--font--erreur2');
            paragErreur4.innerHTML = 'le champs n\'est pas rempli correctement !';
        };
    });

    confirmPassword.addEventListener('change', (event) => {
        event.preventDefault();
        if (confirmPassword.value.length === 0) {
            paragErreur5.setAttribute('class', 'bloc__form--font--erreur1');
            paragErreur5.innerHTML = '* champ obligatoire';

        } else if (password.value === confirmPassword) {
            paragErreur5.setAttribute('class', 'bloc__form--font--erreur1');
            paragErreur5.innerHTML = '* champ obligatoire';

        } else if (password.value !== confirmPassword) {
            paragErreur5.setAttribute('class', 'bloc__form--font--erreur2');
            paragErreur5.innerHTML = 'Attention les mots de passe de ne sont pas identique !';
        };
    });
}; // fin validSignup

valideLogin = (email, password, Remail, Rpassword) => {

    const paragErreur1 = document.getElementById('erreur1');
    const paragErreur2 = document.getElementById('erreur2');

    email.addEventListener('change', (event) => {
        event.preventDefault;

        if (email.value.length === 0) {
            paragErreur1.setAttribute('class', 'bloc__form--font--erreur1');
            paragErreur1.innerHTML = '* champ obligatoire';

        } else if (Remail.test(email.value) === true) {
            paragErreur1.setAttribute('class', 'bloc__form--font--erreur1');
            paragErreur1.innerHTML = '* champ obligatoire';

        } else if (Remail.test(email.value) === false) {
            paragErreur1.setAttribute('class', 'bloc__form--font--erreur2');
            paragErreur1.innerHTML = 'Format de l\'email est non  conforme !!!';
        };
    });

    password.addEventListener('change', (event) => {
        event.preventDefault;

        if (password.value.length === 0) {
            paragErreur2.setAttribute('class', 'bloc__form--font--erreur1');
            paragErreur2.innerHTML = '* champ obligatoire';

        } else if (Rpassword.test(email.value) === true) {
            paragErreur2.setAttribute('class', 'bloc__form--font--erreur1');
            paragErreur2.innerHTML = '* champ obligatoire';

        } else if (Rpassword.test(email.value) === false) {
            paragErreur2.setAttribute('class', 'bloc__form--font--erreur2');
            paragErreur2.innerHTML = 'Format de l\'email est non  conforme !!!';
        };
    });
};

validPosts = (titre, contenu, Rdatas, idErreur) => {

    const erreurPost = document.getElementById(idErreur); // 'erreur_posts'

    titre.addEventListener('change', (event) => {
        event.preventDefault;

        if (titre.value.length === 0) {
            erreurPost.setAttribute('class', 'bloc__form--font--erreur');
            erreurPost.innerHTML = 'le champs n\'est pas rempli correctement !';
            console.log('ok1 blanc');
        } else if (Rdatas.test(titre.value) === true) {
            erreurPost.setAttribute('class', 'bloc__form--font--erreur');
            erreurPost.innerHTML = 'le champs n\'est pas rempli correctement !';
            console.log('ok2');
        } else if (Rdatas.test(titre.value) === false) {
            erreurPost.setAttribute('class', 'bloc__form--font--erreur2');
            erreurPost.innerHTML = 'le champs n\'est pas rempli correctement !';
            console.log('pas ok');
        };
    });
    contenu.addEventListener('change', (event) => {
        event.preventDefault;

        if (contenu.value.length === 0) {
            erreurPost.setAttribute('class', 'bloc__form--font--erreur');
            erreurPost.innerHTML = 'le champs n\'est pas rempli correctement !';

        } else if (Rdatas.test(contenu.value) === true) {
            erreurPost.setAttribute('class', 'bloc__form--font--erreur');
            erreurPost.innerHTML = 'le champs n\'est pas rempli correctement !';

        } else if (Rdatas.test(contenu.value) === false) {
            erreurPost.setAttribute('class', 'bloc__form--font--erreur2');
            erreurPost.innerHTML = 'le champs n\'est pas rempli correctement !';
        };
    });
};


validComs = (contenu, Rdatas) => {

    const erreurComs1 = document.getElementById('erreur_coms_1'); //'erreur_coms1'

    contenu.addEventListener('change', (event) => {
        event.preventDefault();

        if (contenu.value.length === 0) {
            erreurComs1.setAttribute('class', 'bloc__form--font--erreur');
            erreurComs1.innerHTML = 'le champs n\'est pas rempli correctement !';
            console.log('ok1 blanc');
        } else if (Rdatas.test(contenu.value) === true) {
            erreurComs1.setAttribute('class', 'bloc__form--font--erreur');
            erreurComs1.innerHTML = 'le champs n\'est pas rempli correctement !';
            console.log('ok2');
        } else if (Rdatas.test(contenu.value) === false) {
            erreurComs1.setAttribute('class', 'bloc__form--font--erreur2');
            erreurComs1.innerHTML = 'le champs n\'est pas rempli correctement !';
            console.log('pas ok');
        };
    });
};

validComsModif = (contenu, Rdatas) => {

    const erreurComs1 = document.getElementById('erreur4'); //'erreur_coms1'

    contenu.addEventListener('change', (event) => {
        event.preventDefault();

        if (contenu.value.length === 0) {
            erreurComs1.setAttribute('class', 'bloc__form--font--erreur');
            erreurComs1.innerHTML = 'le champs n\'est pas rempli correctement !';
            console.log('ok1 blanc');
        } else if (Rdatas.test(contenu.value) === true) {
            erreurComs1.setAttribute('class', 'bloc__form--font--erreur');
            erreurComs1.innerHTML = 'le champs n\'est pas rempli correctement !';
            console.log('ok2');
        } else if (Rdatas.test(contenu.value) === false) {
            erreurComs1.setAttribute('class', 'bloc__form--font--erreur2');
            erreurComs1.innerHTML = 'le champs n\'est pas rempli correctement !';
            console.log('pas ok');
        };
    });
};