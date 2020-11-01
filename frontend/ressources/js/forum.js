console.log(sessionStorage);

createforum = () => {

    // liens nav bar
    const navBar = document.getElementById('nav_forum');
    navBar.appendChild(createElm3('a', 'Poster un message', 'id', 'poster', 'class', 'header__nav__a--style', 'href', '#'));
    navBar.appendChild(createElm3('a', 'Forum', 'id', 'retourForum', 'class', 'header__nav__a--style', 'href', './forum.html'));
    navBar.appendChild(createElm3('a', 'Mon compte', 'id', 'compteUser', 'class', 'header__nav__a--style', 'href', './compteUser.html'));
    navBar.appendChild(createElm3('a', 'Déonnection', 'id', 'deconnection', 'class', 'header__nav__a--style', 'href', './index.html'));


    const mainIndex = document.getElementById('main_forum');

    // creation du form pour poster un message
    const newForm = mainIndex.appendChild(createElm1('form', '', 'class', 'bloc_article--flex--width'));
    newForm.appendChild(createElm2('label', 'Mon post :', 'class', 'bloc__login__form--label--style-2', 'for', 'post_forum'));
    newForm.appendChild(createElm3('textarea', '', 'id', 'post_forum_text', 'rows', '5', 'class', 'bloc__login__form--input--style-2', ));

    const newDiv1 = newForm.appendChild(createElm1('div', '', 'class', 'bloc_bloc__form--btn-flex', ));
    newDiv1.appendChild(createElm2('i', '', 'title', 'ajouter_un_image', 'class', 'fas fa-images'));
    newDiv1.appendChild(createElm2('button', 'Poster', 'id', 'btn_post_forum', 'class', 'bloc__form--btn-post'));
    newDiv1.appendChild(createElm2('button', 'Annuler', 'id', 'btn_annule_forum', 'class', 'bloc__form--btn-post'));

};
createforum();