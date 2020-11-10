createUsersCompte = () => {
    const urlUser = 'http://localhost:3000/api/auth/' + (new URL(window.location.href)).searchParams.get('id');

    const recupStorage = sessionStorage.getItem('repAuth');
    const recupUserId4 = JSON.parse(recupStorage);

    if (recupUserId4 === null) {
        modals('Vous n\avez pas accès a cette ressource !', 'Inscription', './signup.html')
    } else {

        createNavbar();

        const datas1 = requestAuth(urlUser);
        datas1.then(userUnique => {
            console.log(userUnique)
            createDisplayUers(userUnique.nom, userUnique.prenom, userUnique.emailRec, userUnique.avatar);

            displayDateInscrip('user_date', userUnique.dateInscrip);

            const btnModif = document.getElementById('btn_modif_profil_user');
            const idUser = 'http://localhost:3000/api/auth/' + userUnique.id;
            console.log(idUser)

            btnModif.addEventListener('click', (event) => {
                event.preventDefault();

                const recupForm = document.getElementById('form_modif_user');
                recupForm.removeAttribute('class');
                recupForm.setAttribute('class', 'bloc_section_form--flex')
            });

            const btnSuppr = document.getElementById('btn_suppr_profil_user');
            btnSuppr.addEventListener('click', (event) => {
                event.preventDefault();

                const supprDatas = deleteAuth(idUser);
                supprDatas.then(response => {
                    modals('Profil supprimé !', 'Inscription', 'signup.html');
                }).catch((error => {
                    modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');
                })); //fin catch
            });
        }).catch((error => {
            modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');
        })); //fin catch
        //valideModifUser();
        const datas2 = requestAuth(urlUser);
        datas2.then(userDatas => {

            createFormModifUser(userDatas.nom, userDatas.prenom, userDatas.emailRec);
            createFormModifPassword();


            const recupNom = document.getElementById('nom');
            const recupPrenom = document.getElementById('prenom');
            const recupEmail = document.getElementById('email');
            //const recupPassword = document.getElementById('password');

            const regexNomPrenom = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'.-]{2,20} *$/;
            const regexEmail = /^[a-zA-Z1-9-._]+?@{1}[groupomania.fr]+[.]{1}[a-zA-Z1-9]{2,10}$/;
            const regexPassword = /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\#\$\(\)\*\+\,\!\"\%\&\'\.\/\?\[\]\^\_\:\;\§\~\|\`\@\¤\µ\/]{4,255}/;

            valideModifUser = () => {
                const erreur1 = document.getElementById('erreur1');
                const erreur2 = document.getElementById('erreur2');
                const erreur3 = document.getElementById('erreur3');
                // const erreur4 = document.getElementById('erreur4');

                recupNom.addEventListener('change', (event) => {
                    event.preventDefault();

                    if (recupNom.value.length === 0) {
                        erreur1.setAttribute('class', 'bloc__form--font--erreur');
                    } else if (regexNomPrenom.test(recupNom.value) === true) {
                        erreur1.setAttribute('class', 'bloc__form--font--erreur');
                    } else if (regexNomPrenom.test(recupNom.value) === false) {
                        erreur1.setAttribute('class', 'bloc__form--font--erreur2');
                    };
                });

                recupPrenom.addEventListener('change', (event) => {
                    event.preventDefault();

                    if (recupPrenom.value.length === 0) {
                        erreur2.setAttribute('class', 'bloc__form--font--erreur');
                    } else if (regexNomPrenom.test(recupPrenom.value) === true) {
                        erreur2.setAttribute('class', 'bloc__form--font--erreur');
                    } else if (regexNomPrenom.test(recupPrenom.value) === false) {
                        erreur2.setAttribute('class', 'bloc__form--font--erreur2');
                    };
                });
                recupEmail.addEventListener('change', (event) => {
                    event.preventDefault();

                    if (recupEmail.value.length === 0) {
                        erreur3.setAttribute('class', 'bloc__form--font--erreur');
                    } else if (regexEmail.test(recupEmail.value) === true) {
                        erreur3.setAttribute('class', 'bloc__form--font--erreur');
                    } else if (regexEmail.test(recupEmail.value) === false) {
                        erreur3.setAttribute('class', 'bloc__form--font--erreur2');
                    };
                });

            }; // fin de valide
            valideModifUser();

            const btnAnnulModif = document.getElementById('btn_annule_modif_user');
            btnAnnulModif.addEventListener('click', (event) => {
                event.preventDefault();
                window.location = './compteUser.html?id=' + userDatas.id;
            });

            const btnModifUers = document.getElementById('btn_modif_profil_user2');
            btnModifUers.addEventListener('click', (event) => {
                event.preventDefault();
                if (regexNomPrenom.test(recupNom.value) !== false && regexNomPrenom.test(recupPrenom.value) !== false && regexEmail.test(recupEmail.value) !== false /*&& regexPassword.test(recupPassword.value) !== false*/ ) {
                    const contact = {
                        nom: recupNom.value,
                        prenom: recupPrenom.value,
                        email: recupEmail.value,
                    };

                    const postModifUser = putAuthJson('http://localhost:3000/api/auth/' + userDatas.id, contact);

                    postModifUser.then(response => {

                        window.location = './compteUser.html?id=' + userDatas.id;
                    }).catch((error => {
                        modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');
                    })); //fin catch
                } else {
                    const erreur5 = document.getElementById('erreur5');
                    erreur5.setAttribute('class', 'bloc__form--font--erreur2');
                };
            });

            // gestion de l'apparietion de la fenetre de la modification du password
            const formModifpassword = document.getElementById('form_modif_password');

            const btnModifPsawword = document.getElementById('btn_modif_password_1');
            btnModifPsawword.addEventListener('click', (event) => {
                event.preventDefault();
                formModifpassword.setAttribute('class', 'bloc_section_form--flex');
            });
            const btnAnnulPsawword = document.getElementById('btn_annule_modif_password');
            btnAnnulPsawword.addEventListener('click', (event) => {
                event.preventDefault();
                formModifpassword.setAttribute('class', 'display--none');
            });

            const holdPassword = document.getElementById('holdPassword');
            const newPassword = document.getElementById('newPassword');

            const confirmNewPassword = document.getElementById('confirmPassword');

            const paragErreur1 = document.getElementById('erreur_1');
            const paragErreur2 = document.getElementById('erreur_2');
            const paragErreur3 = document.getElementById('erreur_3');
            const paragErreur4 = document.getElementById('erreur_4');


            holdPassword.addEventListener('change', (event) => {
                if (holdPassword.value.length === 0) {
                    paragErreur1.setAttribute('class', 'bloc__form--font--erreur');
                    paragErreur1.innerHTML = '* champ obligatoire';

                } else if (regexPassword.test(holdPassword.value) === true) {
                    paragErreur1.setAttribute('class', 'bloc__form--font--erreur');
                    paragErreur1.innerHTML = '* champ obligatoire';

                } else if (regexPassword.test(holdPassword.value) === false) {
                    paragErreur1.setAttribute('class', 'bloc__form--font--erreur2');
                    paragErreur1.innerHTML = 'Format de l\'email est non  conforme !!!';
                };
            });

            newPassword.addEventListener('change', (event) => {
                if (newPassword.value.length === 0) {
                    paragErreur2.setAttribute('class', 'bloc__form--font--erreur');
                    paragErreur2.innerHTML = '* champ obligatoire';

                } else if (regexPassword.test(newPassword.value) === true) {
                    paragErreur2.setAttribute('class', 'bloc__form--font--erreur');
                    paragErreur2.innerHTML = '* champ obligatoire';

                } else if (regexPassword.test(newPassword.value) === false) {
                    paragErreur2.setAttribute('class', 'bloc__form--font--erreur2');
                    paragErreur2.innerHTML = 'Format de l\'email est non  conforme !!!';
                };
            });
            confirmNewPassword.addEventListener('change', (event) => {
                if (confirmNewPassword.value.length === 0) {
                    paragErreur3.setAttribute('class', 'bloc__form--font--erreur');
                    paragErreur3.innerHTML = '* champ obligatoire';
                } else if (newPassword.value === confirmNewPassword.value) {
                    paragErreur3.setAttribute('class', 'bloc__form--font--erreur');
                    paragErreur3.innerHTML = '* champ obligatoire';

                } else if (newPassword.value !== confirmNewPassword.value) {
                    paragErreur3.setAttribute('class', 'bloc__form--font--erreur2');
                    paragErreur3.innerHTML = 'Format de l\'email est non  conforme !!!';
                };
            });
            const btnModifPassword = document.getElementById('btn_modif_password');
            btnModifPassword.addEventListener('click', (event) => {
                event.preventDefault();
                if (regexPassword.test(holdPassword.value) !== false && regexPassword.test(newPassword.value) !== false && newPassword.value === confirmNewPassword.value) {

                    const passwordNew = {
                        holdPassword: holdPassword.value,
                        newPassword: newPassword.value
                    };

                    const postModifUser = putAuthJson('http://localhost:3000/api/auth/password/' + userDatas.id, passwordNew);
                    console.log(postModifUser)
                    postModifUser.then(response => {

                        window.location = './compteUser.html?id=' + userDatas.id;
                    }).catch((error => {
                        modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');
                    })); //fin catch
                };
            });
        }).catch((error => {
            modals('Désolé !<br>Le serveur ne repond pas10', 'Connection', './index.html');
        })); //fin catch
    };
}; //fin de createUsersCompte

createUsersCompte();