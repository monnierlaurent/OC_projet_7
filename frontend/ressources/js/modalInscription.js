const headerNav = new Vue({
    el: '#nav',
    data: {
        lien1: 'Inscription',
        lien2: 'Connection'
    }
})

const sectionPrincipal = new Vue({
    el: '#container-main',
    data: {
        titre: 'Bienvenue sur le réseaux social de l\'entreprise Groupomania.',
        parag1: 'Les spécialistes dans la grande distribution',
        parag2: 'Ici vous pourrez faire connaissance avec tous vos collaborateurs.'
    }
})

//---------modal d'inscription----------

document.getElementById('inscription').addEventListener('click', () => {

    const body = document.querySelector('body');

    const aside = document.createElement('aside');
    aside.setAttribute('id', 'modal1');
    aside.setAttribute('class', 'modal');
    body.appendChild(aside);

    const div1 = document.createElement('div');
    div1.setAttribute('class', 'modal-wrapper');
    aside.appendChild(div1);

    const h2 = document.createElement('h2');
    h2.setAttribute('class', 'modal__h2--style');
    h2.innerHTML = 'Inscription';
    div1.appendChild(h2);

    const div2 = document.createElement('div');
    div2.setAttribute('class', 'modal__div--seize');
    div1.appendChild(div2);

    const label1 = document.createElement('label');
    label1.setAttribute('class', 'modal__label--style');
    label1.innerHTML = 'pseudo :';
    div2.appendChild(label1);

    const input1 = document.createElement('input');
    input1.setAttribute('class', 'modal__input--style');
    div2.appendChild(input1);

    const div3 = document.createElement('div');
    div3.setAttribute('class', 'modal__div--seize');
    div1.appendChild(div3);

    const label2 = document.createElement('label');
    label2.setAttribute('class', 'modal__label--style');
    label2.innerHTML = 'password :';
    div3.appendChild(label2);

    const input2 = document.createElement('input');
    input2.setAttribute('class', 'modal__input--style');
    div3.appendChild(input2);

    const btnInscription = document.createElement('input');
    btnInscription.setAttribute('class', 'modal__btn__inscription--flex--style');
    btnInscription.setAttribute('type', 'submit');
    btnInscription.setAttribute('value', 'Inscription');

    div1.appendChild(btnInscription);

    const btnQuitter = document.createElement('input');
    btnQuitter.setAttribute('id', 'quitter');
    btnQuitter.setAttribute('class', 'modal__btn__quitter--flex--style');
    btnQuitter.setAttribute('type', 'submit');
    btnQuitter.setAttribute('value', 'Quitter');
    div1.appendChild(btnQuitter);

    document.getElementById('quitter').addEventListener('click', () => {
        window.location = 'index.html';
    });
});

//---------modal de connection----------

document.getElementById('connection').addEventListener('click', () => {

    const body = document.querySelector('body');

    const aside = document.createElement('aside');
    aside.setAttribute('id', 'modal1');
    aside.setAttribute('class', 'modal');
    body.appendChild(aside);

    const div1 = document.createElement('div');
    div1.setAttribute('class', 'modal-wrapper');
    aside.appendChild(div1);

    const h2 = document.createElement('h2');
    h2.setAttribute('class', 'modal__h2--style');
    h2.innerHTML = 'Connection';
    div1.appendChild(h2);

    const div2 = document.createElement('div');
    div2.setAttribute('class', 'modal__div--seize');
    div1.appendChild(div2);

    const label1 = document.createElement('label');
    label1.setAttribute('class', 'modal__label--style');
    label1.innerHTML = 'pseudo :';
    div2.appendChild(label1);

    const input1 = document.createElement('input');
    input1.setAttribute('class', 'modal__input--style');
    div2.appendChild(input1);

    const div3 = document.createElement('div');
    div3.setAttribute('class', 'modal__div--seize');
    div1.appendChild(div3);

    const label2 = document.createElement('label');
    label2.setAttribute('class', 'modal__label--style');
    label2.innerHTML = 'password :';
    div3.appendChild(label2);

    const input2 = document.createElement('input');
    input2.setAttribute('class', 'modal__input--style');
    div3.appendChild(input2);

    const btnInscription = document.createElement('input');
    btnInscription.setAttribute('class', 'modal__btn__inscription--flex--style');
    btnInscription.setAttribute('type', 'submit');
    btnInscription.setAttribute('value', 'Connection');

    div1.appendChild(btnInscription);

    const btnQuitter = document.createElement('input');
    btnQuitter.setAttribute('id', 'quitter');
    btnQuitter.setAttribute('class', 'modal__btn__quitter--flex--style');
    btnQuitter.setAttribute('type', 'submit');
    btnQuitter.setAttribute('value', 'Quitter');
    div1.appendChild(btnQuitter);

    document.getElementById('quitter').addEventListener('click', () => {
        window.location = 'index.html';
    });
});