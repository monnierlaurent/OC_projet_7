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
            paragErreur4.innerHTML = '* champ obligatoire exemple : @Modepasse';

        } else if (Rpassword.test(password.value) === true) {
            paragErreur4.setAttribute('class', 'bloc__form--font--erreur1');
            paragErreur4.innerHTML = '* champ obligatoire exemple : @Modepasse';

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

        } else if (password.value === confirmPassword.value) {
            paragErreur5.setAttribute('class', 'bloc__form--font--erreur1');
            paragErreur5.innerHTML = '* champ obligatoire';

        } else if (password.value !== confirmPassword.value) {
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
            erreurPost.setAttribute('class', 'bloc__form--font--erreur3');
            erreurPost.innerHTML = 'le champs n\'est pas rempli correctement !';
            console.log('ok1 blanc');
        } else if (Rdatas.test(titre.value) === true) {
            erreurPost.setAttribute('class', 'bloc__form--font--erreur3');
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
            erreurPost.setAttribute('class', 'bloc__form--font--erreur3');
            erreurPost.innerHTML = 'le champs n\'est pas rempli correctement !';

        } else if (Rdatas.test(contenu.value) === true) {
            erreurPost.setAttribute('class', 'bloc__form--font--erreur3');
            erreurPost.innerHTML = 'le champs n\'est pas rempli correctement !';

        } else if (Rdatas.test(contenu.value) === false) {
            erreurPost.setAttribute('class', 'bloc__form--font--erreur2');
            erreurPost.innerHTML = 'le champs n\'est pas rempli correctement !';
        };
    });
};


validComs = (id, contenu, Rdatas) => {

    const erreurComs1 = document.getElementById(id); //'erreur_coms1'

    contenu.addEventListener('change', (event) => {
        event.preventDefault();

        if (contenu.value.length === 0) {
            erreurComs1.setAttribute('class', 'bloc__form--font--erreur3');
            erreurComs1.innerHTML = 'le champs n\'est pas rempli correctement !';
            console.log('ok1 blanc');
        } else if (Rdatas.test(contenu.value) === true) {
            erreurComs1.setAttribute('class', 'bloc__form--font--erreur3');
            erreurComs1.innerHTML = 'le champs n\'est pas rempli correctement !';
            console.log('ok2');
        } else if (Rdatas.test(contenu.value) === false) {
            erreurComs1.setAttribute('class', 'bloc__form--font--erreur2');
            erreurComs1.innerHTML = 'le champs n\'est pas rempli correctement !';
            console.log('pas ok');
        };
    });
};

validComsModif = (contenu, Rdatas, idErreur) => {

    const erreurComs1 = document.getElementById(idErreur); //'erreur_coms1'

    contenu.addEventListener('change', (event) => {
        event.preventDefault();

        if (contenu.value.length === 0) {
            erreurComs1.setAttribute('class', 'bloc__form--font--erreur3');
            erreurComs1.innerHTML = 'le champs n\'est pas rempli correctement !';
            console.log('ok1 blanc');
        } else if (Rdatas.test(contenu.value) === true) {
            erreurComs1.setAttribute('class', 'bloc__form--font--erreur3');
            erreurComs1.innerHTML = 'le champs n\'est pas rempli correctement !';
            console.log('ok2');
        } else if (Rdatas.test(contenu.value) === false) {
            erreurComs1.setAttribute('class', 'bloc__form--font--erreur2');
            erreurComs1.innerHTML = 'le champs n\'est pas rempli correctement !';
            console.log('pas ok');
        };
    });
};

valideModifUser = (recupNom, recupPrenom, recupEmail, recupPassword, Rnom, Remail, Rpassword) => {

    const erreur1 = document.getElementById('erreur1');
    const erreur2 = document.getElementById('erreur2');
    const erreur3 = document.getElementById('erreur3');
    const erreur4 = document.getElementById('erreur4');

    recupNom.addEventListener('change', (event) => {
        event.preventDefault();

        if (recupNom.value.length === 0) {
            erreur1.setAttribute('class', 'bloc__form--font--erreur');
        } else if (Rnom.test(recupNom.value) === true) {
            erreur1.setAttribute('class', 'bloc__form--font--erreur');
        } else if (Rnom.test(recupNom.value) === false) {
            erreur1.setAttribute('class', 'bloc__form--font--erreur2');
        };
    });

    recupPrenom.addEventListener('change', (event) => {
        event.preventDefault();

        if (recupPrenom.value.length === 0) {
            erreur2.setAttribute('class', 'bloc__form--font--erreur');
        } else if (Rnom.test(recupPrenom.value) === true) {
            erreur2.setAttribute('class', 'bloc__form--font--erreur');
        } else if (Rnom.test(recupPrenom.value) === false) {
            erreur2.setAttribute('class', 'bloc__form--font--erreur2');
        };
    });
    recupEmail.addEventListener('change', (event) => {
        event.preventDefault();

        if (recupEmail.value.length === 0) {
            erreur3.setAttribute('class', 'bloc__form--font--erreur');
        } else if (Remail.test(recupEmail.value) === true) {
            erreur3.setAttribute('class', 'bloc__form--font--erreur');
        } else if (Remail.test(recupEmail.value) === false) {
            erreur3.setAttribute('class', 'bloc__form--font--erreur2');
        };
    });
    recupPassword.addEventListener('change', (event) => {
        event.preventDefault();

        if (recupPassword.value.length === 0) {
            erreur4.setAttribute('class', 'bloc__form--font--erreur');
        } else if (Rpassword.test(recupPassword.value) === true) {
            erreur4.setAttribute('class', 'bloc__form--font--erreur');
        } else if (Rpassword.test(recupPassword.value) === false) {
            erreur4.setAttribute('class', 'bloc__form--font--erreur2');
        };
    });
};

valideUserCreateur = (recupUserId, repuserId, reppostId) => {
    if (recupUserId === repuserId) {
        const btnModifier = document.getElementById('btn_modif_publication' + reppostId, );
        btnModifier.removeAttribute('class');
        btnModifier.setAttribute('class', 'fas fa-pen bloc_article_div_a--hover bloc_article_p--padding');

        const btnSupprimer = document.getElementById('btn_suppr_publication' + reppostId);
        btnSupprimer.removeAttribute('class');
        btnSupprimer.setAttribute('class', 'far fa-trash-alt bloc_article_div_a--hover bloc_article_p--padding');
    };
};
valideUserCreateurCom = (recupUserId, repsuserId, repscomId) => {
    if (recupUserId.userId === repsuserId) {
        const btnModifierCom = document.getElementById('btn_com_modif1' + repscomId);
        btnModifierCom.removeAttribute('class');
        btnModifierCom.setAttribute('class', 'fas fa-pen bloc_article_div_a--hover bloc_article_p--padding');

        const btnSupprimerCom = document.getElementById('btn_com_suppr' + repscomId);
        btnSupprimerCom.removeAttribute('class');
        btnSupprimerCom.setAttribute('class', 'far fa-trash-alt bloc_article_div_a--hover bloc_article_p--padding');
    };
};