<template>

 <div id="app">

<navBar />
<vmain />

</div>

</template>
  
<script>

import navBar from './components/navBar.vue'
import vmain from './components/vmain.vue'

export default {
  name: 'App',
  components: {
   navBar,
   vmain,
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

a {
  text-decoration: none;
   }
</style>
