<template>

<section id="container-main" class="section--style--width">

            <h2>{{ titre }}</h2>

            <p>{{ parag1 }}</p>

            <p>{{ parag2 }}</p>

            <img class="bloc--section--index__style" src="../assets/backgroud_index.png" alt="logo de groupomania">{{ image }}
            
        </section>

 
</template>


<script>

export default {
  data(){
      return {
          titre: 'Groupomania',
          parag1:'Bienvenue sur les réseaux sociaux de Groupomania',
          parag2:'Les spécialistes de la grande distribution',
          
    }
  }  
}
</script>

<style>

.section--style--width {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 3em;
        height: auto;
        text-align: center;
    }
    
    .bloc--section--index__style {
        opacity: 0.3;
        width: 30%;
        height: auto;
    }
</style>