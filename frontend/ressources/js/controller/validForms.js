//-------validation du formulaire d'inscription---------//
valideSignup = (nom, prenom, email, password, confirmPassword, Rnom, Remail, Rpassword) => {

    const message_1 = document.getElementById('message_1');
    const message_2 = document.getElementById('message_2');
    const message_3 = document.getElementById('message_3');
    const message_4 = document.getElementById('message_4');
    const message_5 = document.getElementById('message_5');

    nom.addEventListener('change', (event) => {
        event.preventDefault();

        if (nom.value.length === 0) {
            message_1.setAttribute('class', 'bloc__form--font--message_form');
            message_1.innerHTML = '*Champ obligatoire le NOM doit comporter au moins 2 caractères sans chiffres ni caractères spéciaux !';

        } else if (Rnom.test(nom.value) === true) {
            message_1.setAttribute('class', 'bloc__form--font--message_form_5');
            message_1.innerHTML = '*Champ obligatoire le NOM doit comporter au moins 2 caractères sans chiffres ni caractères spéciaux !';

        } else if (Rnom.test(nom.value) === false) {
            message_1.setAttribute('class', 'bloc__form--font--message_form_4');
            message_1.innerHTML = '*Champ obligatoire le NOM doit comporter au moins 2 caractères sans chiffres ni caractères spéciaux !';
        };
    });
    prenom.addEventListener('change', (event) => {
        event.preventDefault();

        if (prenom.value.length === 0) {
            message_2.setAttribute('class', 'bloc__form--font--message_form');
            message_2.innerHTML = '*Champ obligatoire le PRENOM doit comporter au moins 2 caractères sans chiffres ni caractères spéciaux !';

        } else if (Rnom.test(prenom.value) === true) {
            message_2.setAttribute('class', 'bloc__form--font--message_form_5');
            message_2.innerHTML = '*Champ obligatoire le PRENOM doit comporter au moins 2 caractères sans chiffres ni caractères spéciaux !';

        } else if (Rnom.test(prenom.value) === false) {
            message_2.setAttribute('class', 'bloc__form--font--message_form_4');
            message_2.innerHTML = '*Champ obligatoire le PRENOM doit comporter au moins 2 caractères sans chiffres ni caractères spéciaux !';
        };
    });

    email.addEventListener('change', (event) => {
        event.preventDefault();

        if (email.value.length === 0) {
            message_3.setAttribute('class', 'bloc__form--font--message_form');
            message_3.innerHTML = '*Champ obligatoire l\'EMAIL doit contenir le nom de domaine @groupomania.fr !';

        } else if (Remail.test(email.value) === true) {
            message_3.setAttribute('class', 'bloc__form--font--message_form_5');
            message_3.innerHTML = '*Champ obligatoire l\'EMAIL doit contenir le nom de domaine @groupomania.fr !';

        } else if (Remail.test(email.value) === false) {
            message_3.setAttribute('class', 'bloc__form--font--message_form_4');
            message_3.innerHTML = '*Champ obligatoire l\'EMAIL doit contenir le nom de domaine @groupomania.fr !';
        };
    });

    password.addEventListener('change', (event) => {
        event.preventDefault();
        if (password.value.length === 0) {
            message_4.setAttribute('class', 'bloc__form--font--message_form');
            message_4.innerHTML = '*Champ obligatoire<br>le mot de passe doit contenir au moins 8 caractères 1 majuscule et 1 caractère spécial !';

        } else if (Rpassword.test(password.value) === true) {
            message_4.setAttribute('class', 'bloc__form--font--message_form_5');
            message_4.innerHTML = '*Champ obligatoire<br>le mot de passe doit contenir au moins 8 caractères 1 majuscule et 1 caractère spécial !';

        } else if (Rpassword.test(password.value) === false) {
            message_4.setAttribute('class', 'bloc__form--font--message_form_4');
            message_4.innerHTML = '*Champ obligatoire<br>le mot de passe doit contenir au moins 8 caractères 1 majuscule et 1 caractère spécial !';
        };
    });

    confirmPassword.addEventListener('change', (event) => {
        event.preventDefault();
        if (confirmPassword.value.length === 0) {
            message_5.setAttribute('class', 'bloc__form--font--message_form');
            message_5.innerHTML = '*Champ obligatoire saisissez a nouveau votre mot de passe';

        } else if (password.value === confirmPassword.value) {
            message_5.setAttribute('class', 'bloc__form--font--message_form_5');
            message_5.innerHTML = '*Champ obligatoire saisissez a nouveau votre mot de passe';

        } else if (password.value !== confirmPassword.value) {
            message_5.setAttribute('class', 'bloc__form--font--message_form_4');
            message_5.innerHTML = 'Attention les mots de passe de ne sont pas identiques !';
        };
    });
};

//-------validation du formulaire d'authentification ---------//
valideLogin = (email, password, Remail, Rpassword) => {

    const message_1 = document.getElementById('message_1');
    const message_2 = document.getElementById('message_2');

    email.addEventListener('change', (event) => {
        event.preventDefault();

        if (email.value.length === 0) {
            message_1.setAttribute('class', 'bloc__form--font--message_form');
            message_1.innerHTML = '*champ obligatoire l\'email doit contenir le nom de domaine @groupomania.fr !';

        } else if (Remail.test(email.value) === true) {
            message_1.setAttribute('class', 'bloc__form--font--message_form_5');
            message_1.innerHTML = '*champ obligatoire l\'email doit contenir le nom de domaine @groupomania.fr !';

        } else if (Remail.test(email.value) === false) {
            message_1.setAttribute('class', 'bloc__form--font--message_form_4');
            message_1.innerHTML = '*champ obligatoire l\'email doit contenir le nom de domaine @groupomania.fr !';
        };
    });

    password.addEventListener('change', (event) => {
        event.preventDefault();

        if (password.value.length === 0) {
            message_2.setAttribute('class', 'bloc__form--font--message_form');
            message_2.innerHTML = '*champ obligatoire<br>le mot de passe doit contenir au mois 8 caractères 1 majuscule et 1 caractère spécial !';

        } else if (Rpassword.test(password.value) === true) {
            message_2.setAttribute('class', 'bloc__form--font--message_form_5');
            message_2.innerHTML = '*champ obligatoire<br>le mot de passe doit contenir au mois 8 caractères 1 majuscule et 1 caractère spécial !';

        } else if (Rpassword.test(password.value) === false) {
            message_2.setAttribute('class', 'bloc__form--font--message_form_4');
            message_2.innerHTML = '*champ obligatoire<br>le mot de passe doit contenir au mois 8 caractères 1 majuscule et 1 caractère spécial !';
        };
    });
};

//-------validation du formulaire de création de publication ---------//
validPosts = (titre, contenu, Rdatas) => {

    const message_1 = document.getElementById('message_1');
    const message_2 = document.getElementById('message_2');

    titre.addEventListener('change', (event) => {
        event.preventDefault();

        if (titre.value.length === 0) {
            message_1.setAttribute('class', 'bloc__form--font--message_form');
            message_1.innerHTML = '*champ obligatoire, le titre doit contenir au minum 2 caractères<br>sans caractères spéciaux !';

        } else if (Rdatas.test(titre.value) === true) {
            message_1.setAttribute('class', 'bloc__form--font--message_form');
            message_1.innerHTML = '*champ obligatoire, le titre doit contenir au minum 2 caractères<br>sans caractères spéciaux !';

        } else if (Rdatas.test(titre.value) === false) {
            message_1.setAttribute('class', 'bloc__form--font--message_form_4');
            message_1.innerHTML = '*champ obligatoire, le titre doit contenir au minum 2 caractères<br>sans caractères spéciaux !';
        };
    });
    contenu.addEventListener('change', (event) => {
        event.preventDefault();

        if (contenu.value.length === 0) {
            message_2.setAttribute('class', 'bloc__form--font--message_form');
            message_2.innerHTML = 'Le contenu doit contenir au minum 2 caractères !';

        } else if (Rdatas.test(contenu.value) === true) {
            message_2.setAttribute('class', 'bloc__form--font--message_form');
            message_2.innerHTML = 'Le contenu doit contenir au minum 2 caractères !';

        } else if (Rdatas.test(contenu.value) === false) {
            message_2.setAttribute('class', 'bloc__form--font--message_form_4');
            message_2.innerHTML = 'Le contenu doit contenir au minum 2 caractères ! !';
        };
    });
};

validModifPosts = (titre, contenu, Rdatas) => {

    const message_1 = document.getElementById('message_11');
    const message_2 = document.getElementById('message_22');

    titre.addEventListener('change', (event) => {
        event.preventDefault();

        if (titre.value.length === 0) {
            message_1.setAttribute('class', 'bloc__form--font--message_form');
            message_1.innerHTML = '*champ obligatoire, le titre doit contenir au minum 2 caractères<br>sans caractères spéciaux !';

        } else if (Rdatas.test(titre.value) === true) {
            message_1.setAttribute('class', 'bloc__form--font--message_form');
            message_1.innerHTML = '*champ obligatoire, le titre doit contenir au minum 2 caractères<br>sans caractères spéciaux !';

        } else if (Rdatas.test(titre.value) === false) {
            message_1.setAttribute('class', 'bloc__form--font--message_form_4');
            message_1.innerHTML = 'Ce champ est obligatoire et doit contenir au minum 2 caractères<br>sans caractères spéciaux !';
        };
    });
    contenu.addEventListener('change', (event) => {
        event.preventDefault();

        if (contenu.value.length === 0) {
            message_2.setAttribute('class', 'bloc__form--font--message_form');
            message_2.innerHTML = 'Le contenu doit contenir au minimum 2 caractères !';

        } else if (Rdatas.test(contenu.value) === true) {
            message_2.setAttribute('class', 'bloc__form--font--message_form');
            message_2.innerHTML = 'Le contenu doit contenir au minimum 2 caractères !';

        } else if (Rdatas.test(contenu.value) === false) {
            message_2.setAttribute('class', 'bloc__form--font--message_form_4');
            message_2.innerHTML = 'Le contenu doit contenir au minimum 2 caractères ! !';
        };
    });
};


//-------validation du formulaire de création de commentaire ---------//
validComs = (id, contenu, Rdatas) => {

    const message_1 = document.getElementById(id);
    contenu.addEventListener('change', (event) => {
        event.preventDefault();

        if (contenu.value.length === 0) {
            message_1.setAttribute('class', 'bloc__form--font--message_form');
            message_1.innerHTML = '*Champs commentaire et obligatoire et doit contenir au minimum 2 caratères !';

        } else if (Rdatas.test(contenu.value) === true) {
            message_1.setAttribute('class', 'bloc__form--font--message_form');
            message_1.innerHTML = '*Champs commentaire et obligatoire et doit contenir au minimum 2 caratères !';

        } else if (Rdatas.test(contenu.value) === false) {
            message_1.setAttribute('class', 'bloc__form--font--message_form_4');
            message_1.innerHTML = '*Champs commentaire et obligatoire et doit contenir au minimum 2 caratères !';

        };
    });
};

//-------validation du formulaire de modification de commentaire ---------//
validComsModif = (contenu, Rdatas, idErreur) => {

    const message_1 = document.getElementById(idErreur); //'erreur_coms1'

    contenu.addEventListener('change', (event) => {
        event.preventDefault();

        if (contenu.value.length === 0) {
            message_1.setAttribute('class', 'bloc__form--font--message_form');


        } else if (Rdatas.test(contenu.value) === true) {
            message_1.setAttribute('class', 'bloc__form--font--message_form');


        } else if (Rdatas.test(contenu.value) === false) {
            message_1.setAttribute('class', 'bloc__form--font--message_form_4');

        };
    });
};
//-------validation du formulaire de modification du profil utilisateur---------//
valideModifUser = (recupNom, recupPrenom, recupEmail, regexNomPrenom, regexEmail) => {
    const message_1 = document.getElementById('message_1');
    const message_2 = document.getElementById('message_2');
    const message_3 = document.getElementById('message_3');

    recupNom.addEventListener('change', (event) => {
        event.preventDefault();

        if (recupNom.value.length === 0) {
            message_1.setAttribute('class', 'bloc__form--font--message_form');
        } else if (regexNomPrenom.test(recupNom.value) === true) {
            message_1.setAttribute('class', 'bloc__form--font--message_form_5');
        } else if (regexNomPrenom.test(recupNom.value) === false) {
            message_1.setAttribute('class', 'bloc__form--font--message_form_4');
        };
    });

    recupPrenom.addEventListener('change', (event) => {
        event.preventDefault();

        if (recupPrenom.value.length === 0) {
            message_2.setAttribute('class', 'bloc__form--font--message_form');
        } else if (regexNomPrenom.test(recupPrenom.value) === true) {
            message_2.setAttribute('class', 'bloc__form--font--message_form_5');
        } else if (regexNomPrenom.test(recupPrenom.value) === false) {
            message_2.setAttribute('class', 'bloc__form--font--message_form_4');
        };
    });
    recupEmail.addEventListener('change', (event) => {
        event.preventDefault();

        if (recupEmail.value.length === 0) {
            message_3.setAttribute('class', 'bloc__form--font--message_form');
        } else if (regexEmail.test(recupEmail.value) === true) {
            message_3.setAttribute('class', 'bloc__form--font--message_form_5');
        } else if (regexEmail.test(recupEmail.value) === false) {
            message_3.setAttribute('class', 'bloc__form--font--message_form_4');
        };
    });
};


//-------validation du formulaire de modification du mot de passe du profil utilisateur---------//
valideModifPassword = (holdPassword, newPassword, confirmNewPassword, regexPassword) => {
    const message_1 = document.getElementById('message_11');
    const message_2 = document.getElementById('message_22');
    const message_3 = document.getElementById('message_33');

    holdPassword.addEventListener('change', (event) => {
        if (holdPassword.value.length === 0) {
            message_1.setAttribute('class', 'bloc__form--font--message_form');

        } else if (regexPassword.test(holdPassword.value) === true) {
            message_1.setAttribute('class', 'bloc__form--font--message_form_5');

        } else if (regexPassword.test(holdPassword.value) === false) {
            message_1.setAttribute('class', 'bloc__form--font--message_form_4');

        };
    });

    newPassword.addEventListener('change', (event) => {
        if (newPassword.value.length === 0) {
            message_2.setAttribute('class', 'bloc__form--font--message_form');

        } else if (regexPassword.test(newPassword.value) === true) {
            message_2.setAttribute('class', 'bloc__form--font--message_form_5');


        } else if (regexPassword.test(newPassword.value) === false) {
            message_2.setAttribute('class', 'bloc__form--font--message_form_4');

        };
    });

    confirmNewPassword.addEventListener('change', (event) => {
        if (confirmNewPassword.value.length === 0) {
            message_3.setAttribute('class', 'bloc__form--font--message_form');
            message_3.innerHTML = '*champ obligatoire saisissez a nouveau votre mon de passe';
        } else if (newPassword.value === confirmNewPassword.value) {
            message_3.setAttribute('class', 'bloc__form--font--message_form_5');
            message_3.innerHTML = '*champ obligatoire saisissez a nouveau votre mon de passe';

        } else if (newPassword.value !== confirmNewPassword.value) {
            message_3.setAttribute('class', 'bloc__form--font--message_form_4');
            message_3.innerHTML = 'Les mots de passe ne sont pas identiques !';
        };
    });
};

//-------validation pour savoir si on est le créateur de la publication---------//
valideUserCreateur = (recupUserId, repuserId, reppostId, role) => {
    if (recupUserId === repuserId || role === 1) {
        const btnModifier = document.getElementById('btn_modif_publication' + reppostId, );
        btnModifier.removeAttribute('class');
        btnModifier.setAttribute('class', 'fas fa-pen bloc_article_div_a--hover bloc_article_p--padding');

        const btnSupprimer = document.getElementById('btn_suppr_publication' + reppostId);
        btnSupprimer.removeAttribute('class');
        btnSupprimer.setAttribute('class', 'far fa-trash-alt bloc_article_div_a--hover bloc_article_p--padding');
    };
};

//-------validation pour savoir si on est le créateur du commentaire---------//
valideUserCreateurCom = (recupUserId, repsuserId, repscomId, role) => {
    if (recupUserId === repsuserId || role === 1) {
        const btnModifierCom = document.getElementById('btn_com_modif1' + repscomId);
        btnModifierCom.removeAttribute('class');
        btnModifierCom.setAttribute('class', 'fas fa-pen bloc_article_div_a--hover bloc_article_p--padding');

        const btnSupprimerCom = document.getElementById('btn_com_suppr' + repscomId);
        btnSupprimerCom.removeAttribute('class');
        btnSupprimerCom.setAttribute('class', 'far fa-trash-alt bloc_article_div_a--hover bloc_article_p--padding');
    };
};