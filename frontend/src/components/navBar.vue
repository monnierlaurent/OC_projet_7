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

