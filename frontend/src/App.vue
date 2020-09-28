<template>
  <div >
      <navBar/>

      <div class="bloc__link--flex">
          <router-link class="bloc__link--padding" :to="{name: 'home'}">home</router-link>
          <router-link class="bloc__link--padding" :to="{name: 'login'}">Login</router-link>
          <router-link class="bloc__link--padding" :to="{name: 'signup'}">Signup</router-link>
          <router-link class="bloc__link--padding" :to="{name: 'forum'}">Forum</router-link>
          <router-link class="bloc__link--padding" :to="{name: 'post'}">Post</router-link>
     
      </div>

    <router-view/>

  </div>

 
   
</template>

<script>
import navBar from '@/components/navBar.vue'

export default {
   components: {
    navBar,
    }
}
</script>


<style>
 html {
        --noir: #212121;
        --blanc: #FAFAFA;
        --violet: #9C27B0;
        --vert: #76FF03;
        --gris1: #616161;
    }
    
    * {
        margin: 0;
        padding: 0;
    }
    a{
      text-decoration: none;
    }
.bloc__link--flex{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  padding-right: 1.5em;
  }
.bloc__link--padding{
  font-family: sans-serif;
  padding:1em 1em 0 0 ;
  color: var(--noir);
  font-size: 1.7em;
}

</style>
