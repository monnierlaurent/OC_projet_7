const urlUser = 'http://localhost:3000/api/auth/' + (new URL(window.location.href)).searchParams.get('id');

const mainUsers = document.getElementById('main_compe_user');

createUsersCompte = () => {

    createDisplayUserDatas = () => {
        const datas = requestAuth(urlUser);
        datas.then(userUnique => {

            const newSection = mainUsers.appendChild(createElm1('section', '', 'class', 'bloc_section_form--flex'));
            newSection.appendChild(createElm1('h2', 'Compte utilisateur', 'class', 'bloc_section_form_heading--style'));

            newSection.appendChild(createElm1('p', 'Nom :' + ' ' + userUnique.nom, 'class', 'bloc__login__form--label--style-2'));
            newSection.appendChild(createElm1('p', 'Prenom :' + ' ' + userUnique.prenom, 'class', 'bloc__login__form--label--style-2'));
            newSection.appendChild(createElm1('p', 'date d\'incription :' + ' ' + userUnique.dateInscrip, 'class', 'bloc__login__form--label--style-2'));
            newSection.appendChild(createElm1('p', 'Email :' + ' ' + userUnique.emailRec, 'class', 'bloc__login__form--label--style-2'));

            const newDiv = newSection.appendChild(createElm1('div', '', 'class', 'bloc_section_form_btn--flex'));
            newDiv.appendChild(createElm2('button', 'Modifier mon profil', 'id', 'btn_modif_profil_user', 'class', 'bloc__form--btn-2'));
            newDiv.appendChild(createElm2('button', 'Supprimer mon compte', 'id', 'btn_suppr_profil_user', 'class', 'bloc__form--btn-2'));

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
                }); //fin de then
            });
        }); //fin de then
    }; //fin de  createDisplayUserDatas

    createDisplayUserDatas();


    // creation du form de modification
    createFormModifUser = () => {

        const datas = requestAuth(urlUser);
        datas.then(userDatas => {
            console.log(userDatas)
            const newForm = mainUsers.appendChild(createElm2('form', '', 'id', 'form_modif_user', 'class', 'display--none ')); // bloc_section_form--flex
            newForm.appendChild(createElm2('label', 'Nom', 'class', 'bloc__login__form--label--style-2', 'for', 'nom'));
            newForm.appendChild(createInputs('input', '', 'id', 'nom', 'class', 'bloc__login__form--input--style-2', 'type', 'text', 'value', userDatas.nom));
            newForm.appendChild(createElm1('p', 'Message d\'erreur dans le champ', 'class', 'bloc__form_p--style2'));

            newForm.appendChild(createElm2('label', 'Prenom', 'class', 'bloc__login__form--label--style-2', 'for', 'prenom'));
            newForm.appendChild(createInputs('input', '', 'id', 'prenom', 'class', 'bloc__login__form--input--style-2', 'type', 'text', 'value', userDatas.prenom));
            newForm.appendChild(createElm1('p', 'Message d\'erreur dans le champ', 'class', 'bloc__form_p--style2'));

            newForm.appendChild(createElm2('label', 'email', 'class', 'bloc__login__form--label--style-2', 'for', 'email'));
            newForm.appendChild(createInputs('input', '', 'id', 'email', 'class', 'bloc__login__form--input--style-2', 'type', 'email', 'value', userDatas.emailRec));
            newForm.appendChild(createElm1('p', 'Message d\'erreur dans le champ', 'class', 'bloc__form_p--style2'));

            newForm.appendChild(createElm2('label', 'Password', 'class', 'bloc__login__form--label--style-2', 'for', 'password'));
            newForm.appendChild(createInputs('input', '', 'id', 'password', 'class', 'bloc__login__form--input--style-2', 'type', '', 'value', ''));
            newForm.appendChild(createElm1('p', 'Message d\'erreur dans le champ', 'class', 'bloc__form_p--style2'));

            const newDiv2 = newForm.appendChild(createElm1('div', '', 'class', 'bloc_section_form_btn--flex'));
            newDiv2.appendChild(createElm2('button', 'Modifer mon profil', 'id', 'btn_modif_profil_user2', 'class', 'bloc__form--btn-2'));
            newDiv2.appendChild(createElm2('button', 'Annuler', 'id', 'btn_annule_modif_user', 'class', 'bloc__form--btn-2'));

            const btnModifValide = document.getElementById('btn_modif_profil_user2');
            btnModifValide.addEventListener('click', (event) => {
                event.preventDefault();
            });
            const btnAnnulModif = document.getElementById('btn_annule_modif_user');
            btnAnnulModif.addEventListener('click', (event) => {
                event.preventDefault();
                window.location = './forum.html';
            });
        }); //fin de then
    }; //fin de createFormModifUser
    createFormModifUser();
}; //fin de createUsersCompte

createUsersCompte();