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