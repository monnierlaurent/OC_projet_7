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


