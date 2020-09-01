<template>


<a href="#">
 <header id="header" class="header--bgc--width--flex">
               <h1><img class="bloc--header__seize" src="../assets/logo_white.png" alt="logo du reseaux social"></h1>

                <nav id="nav" class="header__nav--padding">
                    <a id="inscription" class="header__nav__a--style" >{{ lien1 }}</a>
                    <a id="connection" class="header__nav__a--style" >{{ lien2 }}</a>
                </nav>
            </header>
 </a>
 
</template>

<script>
    export default {
       data(){
          return {
            messages: 'Groupomania',
            lien1:'inscription',
            lien2:'connection',
    }
  }  
}
</script>

<style>

.header--bgc--width--flex {
  /*position: fixed;*/
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background: linear-gradient(to bottom right, var(--violet), var(--noir));
        padding-top: 0.4em;
        box-shadow: 15px 15px 15px var(--gris1);
        border: solid 1px black;
    }

    .bloc--header__seize {
        width: 45%;
        height: auto;
    }

.header__nav__a--style {
        font-size: 1.7em;
        color: var(--blanc);
        padding-right: 1.5em;
        text-decoration: none;
        font-family: sans-serif;
    }
    
.header__nav__a--style:hover {
        color: var(--vert);
        cursor: pointer;
    }
    
 .header__nav__a--style:active {
        color: var(--violet);
    }
</style>





