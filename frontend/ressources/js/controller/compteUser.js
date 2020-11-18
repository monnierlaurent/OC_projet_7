createUsersCompte = () => {

    const urlUser = 'http://localhost:3000/api/auth/' + (new URL(window.location.href)).searchParams.get('id');

    const recupStorage = sessionStorage.getItem('repAuth');
    const recupUserId1 = JSON.parse(recupStorage);

    if (!recupUserId1) {
        window.location = './index.html';
    } else {

        const datas1 = requestAuth(urlUser);
        datas1.then(userUnique => {

            createNavbar(userUnique.avatar, userUnique.nom, userUnique.prenom);

            createDisplayUers(userUnique.nom, userUnique.prenom, userUnique.emailRec, userUnique.avatar);

            displayDateInscrip('user_date', userUnique.dateInscrip);

            deconnection('deconnection');

            createFormModifUser(userUnique.nom, userUnique.prenom, userUnique.emailRec)

            createFormModifPassword();

            //----------------------------suppression du profil utilisateur------------------------//
            deleteProfil = () => {

                const btnSuppr = document.getElementById('btn_suppr_profil_user');
                btnSuppr.addEventListener('click', (event) => {

                    event.preventDefault();

                    const urlId = 'http://localhost:3000/api/auth/' + userUnique.id;

                    const supprDatas = deleteAuth(urlId);
                    supprDatas.then(response => {

                        messageConfirm2(response.message, 'main_compe_user');

                        setTimeout(() => {
                            const main = document.getElementById('main_compe_user');
                            const messageHide = document.getElementById('modal_message');
                            main.removeChild(messageHide);

                            sessionStorage.clear();

                            window.location = './index.html';
                        }, 900);

                    }).catch((error => {
                        console.log(error);
                    }));
                });
            }; // fin de deleteProfil
            deleteProfil();

            //----------------------------modification du profil utilisateur------------------------//
            modifUser = () => {
                const btnModifProfil = document.getElementById('btn_modif_profil_user');
                btnModifProfil.addEventListener('click', (event) => {
                    event.preventDefault();

                    const contentModifProfil = document.getElementById('form_modif_user');
                    contentModifProfil.setAttribute('class', 'bloc_section_form--flex');

                    const formModifpassword = document.getElementById('form_modif_password');
                    if (formModifpassword.setAttribute('class', 'display--none') !== undefined || formModifpassword.setAttribute('class', 'display--none') !== null) {
                        formModifpassword.setAttribute('class', 'display--none');
                    };

                    const btnAnnulMOdifUser = document.getElementById('btn_annule_modif_user');
                    btnAnnulMOdifUser.addEventListener('click', (event) => {
                        event.preventDefault();
                        contentModifProfil.setAttribute('class', 'display--none');
                    });

                    const datas2 = requestAuth('http://localhost:3000/api/auth/' + userUnique.id);
                    datas2.then(userDatas => {

                        const recupNom = document.getElementById('nom');
                        const recupPrenom = document.getElementById('prenom');
                        const recupEmail = document.getElementById('email');

                        const regexNomPrenom = /^([a-zA-Za-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\'.-]+([ ]){0,}){1,}$/;
                        const regexEmail = /^[a-zA-Z1-9-._]+?@{1}[groupomania]+[.]{1}[fr]{2}$/;

                        const message_1 = document.getElementById('message_1');
                        const message_2 = document.getElementById('message_2');
                        const message_3 = document.getElementById('message_3');
                        const message_4 = document.getElementById('message_4');
                        const message_5 = document.getElementById('message_5');

                        valideModifUser(recupNom, recupPrenom, recupEmail, regexNomPrenom, regexEmail);

                        const avatar1 = document.getElementById('avatars_1');
                        const avatar2 = document.getElementById('avatars_2');
                        const avatar3 = document.getElementById('avatars_3');
                        const avatar4 = document.getElementById('avatars_4');

                        let avatarChoix;

                        avatar1.addEventListener('click', (event) => {
                            event.preventDefault();
                            avatar1.setAttribute('class', 'signup--avatar--border');
                            avatar2.setAttribute('class', 'signup--avatar--style');
                            avatar3.setAttribute('class', 'signup--avatar--style');
                            avatar4.setAttribute('class', 'signup--avatar--style');
                            message_4.setAttribute('class', 'bloc__form--font--message_form');
                            return avatarChoix = avatar1.src;
                        });
                        avatar2.addEventListener('click', (event) => {
                            event.preventDefault();
                            avatar1.setAttribute('class', 'signup--avatar--style');
                            avatar2.setAttribute('class', 'signup--avatar--border');
                            avatar3.setAttribute('class', 'signup--avatar--style');
                            avatar4.setAttribute('class', 'signup--avatar--style');
                            message_4.setAttribute('class', 'bloc__form--font--message_form');
                            return avatarChoix = avatar2.src;
                        });
                        avatar3.addEventListener('click', (event) => {
                            event.preventDefault();
                            avatar1.setAttribute('class', 'signup--avatar--style');
                            avatar2.setAttribute('class', 'signup--avatar--style');
                            avatar3.setAttribute('class', 'signup--avatar--border');
                            avatar4.setAttribute('class', 'signup--avatar--style');
                            message_4.setAttribute('class', 'bloc__form--font--message_form');
                            return avatarChoix = avatar3.src;
                        });
                        avatar4.addEventListener('click', (event) => {
                            event.preventDefault();
                            avatar1.setAttribute('class', 'signup--avatar--style');
                            avatar2.setAttribute('class', 'signup--avatar--style');
                            avatar3.setAttribute('class', 'signup--avatar--style');
                            avatar4.setAttribute('class', 'signup--avatar--border');
                            message_4.setAttribute('class', 'bloc__form--font--message_form');
                            return avatarChoix = avatar4.src;
                        });




                        const formUser = document.getElementById('form_modif_user');
                        formUser.addEventListener('change', (event) => {
                            event.preventDefault();
                            if (regexNomPrenom.test(recupNom.value) !== false && regexNomPrenom.test(recupPrenom.value) !== false && regexEmail.test(recupEmail.value) !== false) {
                                message_5.setAttribute('class', 'bloc__form--font--message_form_2');
                            };
                        });


                        const btnEnvoieModif = document.getElementById('btn_modif_profil_user_2');
                        btnEnvoieModif.addEventListener('click', (event) => {


                            event.preventDefault();
                            if (regexNomPrenom.test(recupNom.value) === false) {
                                message_1.setAttribute('class', 'bloc__form--font--message_form_4');
                            } else {
                                message_1.setAttribute('class', 'bloc__form--font--message_form');
                            };
                            if (regexNomPrenom.test(recupPrenom.value) === false) {
                                message_2.setAttribute('class', 'bloc__form--font--message_form_4');
                            } else {
                                message_2.setAttribute('class', 'bloc__form--font--message_form');
                            };
                            if (regexEmail.test(recupEmail.value) === false) {
                                message_3.setAttribute('class', 'bloc__form--font--message_form_4');
                            } else {
                                message_3.setAttribute('class', 'bloc__form--font--message_form');
                            };
                            if (avatarChoix === undefined) {
                                message_4.setAttribute('class', 'bloc__form--font--message_form_4');
                            } else {
                                message_4.setAttribute('class', 'bloc__form--font--message_form');
                            };

                            if (regexNomPrenom.test(recupNom.value) !== false && regexNomPrenom.test(recupPrenom.value) !== false && regexEmail.test(recupEmail.value) !== false && avatarChoix !== undefined) {
                                message_5.setAttribute('class', 'bloc__form--font--message_form_2');

                                const contact = {
                                    nom: recupNom.value,
                                    prenom: recupPrenom.value,
                                    email: recupEmail.value,
                                    avatar: avatarChoix
                                };

                                const postModifUser = putAuthJson('http://localhost:3000/api/auth/' + userDatas.id, contact);
                                postModifUser.then(response => {

                                    const recupUser = requestAuth('http://localhost:3000/api/auth/' + userUnique.id);
                                    recupUser.then(userDatas => {

                                        const nom = document.getElementById('nom_user');
                                        nom.innerHTML = 'Nom :' + ' ' + userDatas.nom;

                                        const prenom = document.getElementById('prenom_user');
                                        prenom.innerHTML = 'Prenom :' + ' ' + userDatas.prenom;

                                        displayDateInscrip('user_date', userDatas.dateInscrip);

                                        const email = document.getElementById('email_user');
                                        email.innerHTML = 'Email :' + ' ' + userDatas.emailRec;

                                        const avatar = document.getElementById('avatar_user')
                                        avatar.setAttribute('src', userDatas.avatar);

                                        messageConfirm2(response.message, 'main_compe_user');

                                        setTimeout(() => {
                                            const main = document.getElementById('main_compe_user');

                                            contentModifProfil.setAttribute('class', 'display--none');
                                            document.getElementById('form_modif_password').reset();

                                            const messageHide = document.getElementById('modal_message');
                                            main.removeChild(messageHide);
                                        }, 900);
                                    }); //fin then recupUser
                                }); // fin postModifUser
                            } else {
                                message_5.setAttribute('class', 'bloc__form--font--message_form_4');
                            };
                        });
                    });
                }); //fin de btnModifProfils
            }; //fin de modifUser
            modifUser();

            //----------------------------modification du profil utilisateur------------------------//
            modifPassword = () => {

                const formModifpassword = document.getElementById('form_modif_password');

                const btnModifPsawword = document.getElementById('btn_modif_password_1');
                btnModifPsawword.addEventListener('click', (event) => {
                    event.preventDefault();
                    formModifpassword.setAttribute('class', 'bloc_section_form--flex');

                    const formModifUser = document.getElementById('form_modif_user');
                    if (formModifUser.setAttribute('class', 'display--none') !== undefined || formModifUser.setAttribute('class', 'display--none') !== null) {
                        formModifUser.setAttribute('class', 'display--none');
                    };

                });
                const btnAnnulPsawword = document.getElementById('btn_annule_modif_password');
                btnAnnulPsawword.addEventListener('click', (event) => {
                    event.preventDefault();

                    formModifpassword.setAttribute('class', 'display--none');
                });

                const holdPassword = document.getElementById('holdPassword');
                const newPassword = document.getElementById('newPassword');
                const confirmNewPassword = document.getElementById('confirmPassword');

                const message_1 = document.getElementById('message_11');
                const message_2 = document.getElementById('message_22');
                const message_3 = document.getElementById('message_33');
                const message_4 = document.getElementById('message_44');

                //const regexPassword = /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\#\$\(\)\*\+\,\!\"\%\&\'\.\/\?\[\]\^\_\:\;\§\~\|\`\@\¤\µ\/]{8,255}/;
                const regexPassword = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;

                valideModifPassword(holdPassword, newPassword, confirmNewPassword, regexPassword);

                const formPassword = document.getElementById('form_modif_password');
                formPassword.addEventListener('change', () => {
                    if (regexPassword.test(holdPassword.value) !== false && regexPassword.test(newPassword.value) !== false && newPassword.value === confirmNewPassword.value) {
                        message_3.setAttribute('class', 'bloc__form--font--message_form_2');

                    };
                });

                const btnModifPassword = document.getElementById('btn_modif_password');
                btnModifPassword.addEventListener('click', (event) => {
                    event.preventDefault();

                    if (regexPassword.test(holdPassword.value) === false) {
                        message_1.setAttribute('class', 'bloc__form--font--message_form_4');
                    } else {
                        message_1.setAttribute('class', 'bloc__form--font--message_form');
                    };

                    if (regexPassword.test(newPassword.value) === false) {
                        message_2.setAttribute('class', 'bloc__form--font--message_form_4');
                    } else {
                        message_2.setAttribute('class', 'bloc__form--font--message_form');
                    };

                    if (confirmNewPassword.value !== newPassword.value || regexPassword.test(confirmNewPassword.value) === false) {
                        message_3.setAttribute('class', 'bloc__form--font--message_form_4');
                    } else {
                        message_3.setAttribute('class', 'bloc__form--font--message_form');
                    };

                    if (regexPassword.test(holdPassword.value) !== false && regexPassword.test(newPassword.value) !== false && newPassword.value === confirmNewPassword.value) {
                        message_4.setAttribute('class', 'bloc__form--font--message_form_2');



                        const passwordNew = {
                            holdPassword: holdPassword.value,
                            newPassword: newPassword.value
                        };

                        const postModifUser = putAuthJson('http://localhost:3000/api/auth/password/' + userUnique.id, passwordNew);
                        postModifUser.then(response => {

                            if (response.status === 400) {
                                message_4.innerHTML = response.message;
                                message_4.setAttribute('class', 'bloc__form--font--message_form_4');

                            } else {
                                message_4.setAttribute('class', 'bloc__form--font--message_form_2');
                                messageConfirm2(response.message, 'main_compe_user');

                                const formModifpassword = document.getElementById('form_modif_password');
                                formModifpassword.setAttribute('class', 'display--none');
                                document.getElementById('form_modif_password').reset();

                                setTimeout(() => {
                                    const main = document.getElementById('main_compe_user');
                                    const messageHide = document.getElementById('modal_message');
                                    main.removeChild(messageHide);

                                }, 900);
                            };
                        }).catch((error => {
                            modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');
                        })); //fin catch 
                    } else {

                        message_4.setAttribute('class', 'bloc__form--font--message_form_4');
                    };
                });

            }; //fin de modifPassword
            modifPassword();

        }).catch((error => {

            modals('Désolé !<br>Le serveur ne repond pas', 'Connection', './index.html');
        })); //fin then userUnique
    };
}; //fin de createUsersCompte
createUsersCompte();