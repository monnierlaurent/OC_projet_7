createElm1 = (balise, value, attribut, attributValue) => {
    const newElm1 = document.createElement(balise);
    newElm1.setAttribute(attribut, attributValue);
    newElm1.innerHTML = value;
    return newElm1;
};

createElm2 = (balise, value, attribut1, attributValue1, attribut2, attributValue2) => {
    const newElm2 = document.createElement(balise);
    newElm2.setAttribute(attribut1, attributValue1);
    newElm2.setAttribute(attribut2, attributValue2);
    newElm2.innerHTML = value;
    return newElm2;
};
createElm3 = (balise, value, attribut1, attributValue1, attribut2, attributValue2, attribut3, attributValue3) => {
    const newElm3 = document.createElement(balise);
    newElm3.setAttribute(attribut1, attributValue1);
    newElm3.setAttribute(attribut2, attributValue2);
    newElm3.setAttribute(attribut3, attributValue3);
    newElm3.innerHTML = value;
    return newElm3;
};
createElm4 = (balise, value, attribut1, attributValue1, attribut2, attributValue2, attribut3, attributValue3, attribut4, attributValue4) => {
    const newElm4 = document.createElement(balise);
    newElm4.setAttribute(attribut1, attributValue1);
    newElm4.setAttribute(attribut2, attributValue2);
    newElm4.setAttribute(attribut3, attributValue3);
    newElm4.setAttribute(attribut4, attributValue4);
    newElm4.innerHTML = value;
    return newElm4;
};

createInputs = (balise, value, atb1, atbVal1, atb2, atbVal2, atb3, atbVal3, atb4, atbVal4, atb5, atbVal5) => {
    const newInput = document.createElement(balise);
    newInput.setAttribute(atb1, atbVal1);
    newInput.setAttribute(atb2, atbVal2);
    newInput.setAttribute(atb3, atbVal3);
    newInput.setAttribute(atb4, atbVal4);
    newInput.setAttribute(atb5, atbVal5);
    newInput.innerHTML = value;
    return newInput;
};

modals = (nom, prenom) => {
    const main = document.querySelector('main');
    const newAside = main.appendChild(createElm2('aside', '', 'id', 'modal1', 'class', 'modal')); //
    const newDivAside = newAside.appendChild(createElm1('div', '', 'class', 'modal-wrapper')); //
    newDivAside.appendChild(createElm1('h2', 'Veuillez nous excuser', 'class', 'bloc__login__form--label--style--create--post')); //
    newDivAside.appendChild(createElm1('p', 'notre serveur rencontre des problemes inattendu', 'class', 'bloc__login__form--label--style--create--post')); //
    newDivAside.appendChild(createElm4('a', 'Connection', 'id', 'btn_envoyer_coms', 'class', 'bloc__form--create--post--btn--post', 'href', 'index.html', 'title', 'doutton de retour a la page de connection')); //


};

compterHours = (id, repPostId, repdateCrea) => {

    const dateDisplay = document.getElementById(id + repPostId);
    const dateCrea = Date.parse(repdateCrea);
    const dateCrea2 = Date.now();
    const calcul = dateCrea2 - dateCrea;

    const date = new Date(calcul);
    const jour = date.getDay() - 4;
    const heure = date.getHours() - 1;
    const minute = date.getMinutes();

    if (jour > 0) {

        dateDisplay.innerHTML = jour + ' Jour ';
        if (jour > 1) {
            dateDisplay.innerHTML = jour + ' Jours ';
        };

    } else if (heure > 0) {
        dateDisplay.innerHTML = heure + ' Heure ';
        if (heure > 1) {
            dateDisplay.innerHTML = heure + ' Heures ';
        };
    } else if (minute > 0) {
        dateDisplay.innerHTML = 'Il y a ' + minute + ' Minute';
        if (minute > 1) {
            dateDisplay.innerHTML = 'Il y a ' + minute + ' Minutes';
        };
    } else if (minute <= 0) {
        dateDisplay.innerHTML = 'A l\'instant';
    };
};

displayDateInscrip = (id, repdateCrea) => {

    const dateDisplay = document.getElementById(id);
    const dateCrea = Date.parse(repdateCrea);

    const date = new Date(dateCrea);
    const jour = date.getDay() + 8;
    const mois = date.getMonth() + 1;
    const année = date.getFullYear();

    dateDisplay.innerHTML = 'date d\'incription : ' + jour + '/' + mois + '/' + année;
};



deconnection = (id) => {
    const bTnDeconnection = document.getElementById(id);
    bTnDeconnection.addEventListener('click', (event) => {
        event.preventDefault();
        sessionStorage.clear();
        window.location = './index.html';
    });
};

deleteImg = (repimageUrl, reppostId) => {
    if (!repimageUrl) {
        const imqAltParent = document.getElementById('lien_article' + reppostId);
        const imgBalise = document.getElementById('img_post_display' + reppostId);
        imqAltParent.removeChild(imgBalise);
    };
};

deletetitre = (repcontenu, reppostId) => {
    if (repcontenu === 'vide') {
        const contenuParent = document.getElementById('lien_article' + reppostId);
        const contenuBalise = document.getElementById('contenu' + reppostId);
        contenuParent.removeChild(contenuBalise);
    };
};

messageConfirm = (message, idMain) => {
    const main = document.getElementById(idMain);
    const NenDiv = main.appendChild(createElm2('div', '', 'id', 'modal_message', 'class', 'modal', ));
    NenDiv.appendChild(createElm2('p', message, 'id', 'message_confirm', 'class', 'modal-confirm-style modal-wrapper')); //'Message bien supprimé'
};