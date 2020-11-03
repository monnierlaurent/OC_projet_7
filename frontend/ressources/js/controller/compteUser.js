const urlUser = 'http://localhost:3000/api/auth/' + (new URL(window.location.href)).searchParams.get('id');
console.log(urlUser)


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
                }); //fin de then
            });
        }); //fin de then


        const datas2 = requestAuth(urlUser);
        datas2.then(userDatas => {

            createFormModifUser(userDatas.nom, userDatas.prenom, userDatas.emailRec);

            const btnModifValide = document.getElementById('btn_modif_profil_user2');
            btnModifValide.addEventListener('click', (event) => {
                event.preventDefault();
            });

            const btnAnnulModif = document.getElementById('btn_annule_modif_user');
            btnAnnulModif.addEventListener('click', (event) => {
                event.preventDefault();
                window.location = './compteUser.html?id=' + userDatas.id;
            });
        }); //fin de then
    };
}; //fin de createUsersCompte

createUsersCompte();