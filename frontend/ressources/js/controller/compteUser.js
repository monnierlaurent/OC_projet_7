const urlUser = 'http://localhost:3000/api/auth/' + (new URL(window.location.href)).searchParams.get('id');

const recupStorage = sessionStorage.getItem('repAuth');
const recupUserId4 = JSON.parse(recupStorage);

const mainUsers = document.getElementById('main_compe_user');

createUsersCompte = () => {

    if (recupUserId4 === null) {
        modals('Vous n\avez pas accès a cette ressource !', 'Inscription', './signup.html')
    } else {

        createNavbar();

        const datas1 = requestAuth(urlUser);
        datas1.then(userUnique => {

            createDisplayUers(userUnique.nom, userUnique.prenom, userUnique.dateInscrip, userUnique.emailRec);

            const btnModif = document.getElementById('btn_modif_profil_user');
            const idUser = 'http://localhost:3000/api/auth/' + userUnique.id;

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
                    modals(response.error, 'Inscription', 'signup.html');
                }).catch((error => {

                    // faire spinner
                    modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');

                })); //fin catch
            });
        }).catch((error => {

            // faire spinner
            modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');

        })); //fin catch
        //valideModifUser();
        const datas2 = requestAuth(urlUser);
        datas2.then(userDatas => {

            createFormModifUser(userDatas.nom, userDatas.prenom, userDatas.emailRec);

            const recupNom = document.getElementById('nom');
            const recupPrenom = document.getElementById('prenom');
            const recupEmail = document.getElementById('email');
            const recupPassword = document.getElementById('password');



            const regexNomPrenom = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'.-]{2,20} *$/;
            const regexEmail = /^[a-zA-Z1-9-._]+?@{1}[a-zA-Z1-9.-_]+[.]{1}[a-zA-Z1-9]{2,10}$/;
            const regexPassword = /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'.-]{4,255}/;
            valideModifUser = () => {
                const erreur1 = document.getElementById('erreur1');
                const erreur2 = document.getElementById('erreur2');
                const erreur3 = document.getElementById('erreur3');
                const erreur4 = document.getElementById('erreur4');




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
                recupPassword.addEventListener('change', (event) => {
                    event.preventDefault();

                    if (recupPassword.value.length === 0) {
                        erreur4.setAttribute('class', 'bloc__form--font--erreur');
                    } else if (regexPassword.test(recupPassword.value) === true) {
                        erreur4.setAttribute('class', 'bloc__form--font--erreur');
                    } else if (regexPassword.test(recupPassword.value) === false) {
                        erreur4.setAttribute('class', 'bloc__form--font--erreur2');
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
                if (regexNomPrenom.test(recupNom.value) !== false && regexNomPrenom.test(recupPrenom.value) !== false && regexEmail.test(recupEmail.value) !== false && regexPassword.test(recupPassword.value) !== false) {
                    const contact = {
                        nom: recupNom.value,
                        prenom: recupPrenom.value,
                        email: recupEmail.value,
                        password: recupPassword.value
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
        }).catch((error => {
            modals('Désolé !<br>Le serveur ne repond pas10', 'Connection', './index.html');
        })); //fin catch
    };
}; //fin de createUsersCompte

createUsersCompte();