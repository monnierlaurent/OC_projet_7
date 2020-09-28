<template>
<div class="flex">

      <div v-for="post in postID" :key="post.post" id="app" class="bloc__post--flex" >

        <h2 >{{ post.titre }}</h2>
        <p class="bloc__post__p--style">{{ post.auteur }}</p>
        <p class="bloc__post__p--style">{{ post.contenu}}</p>
            
      </div>
    
</div>
</template>
 

<script>



export default {

data(){
    return {
          postID: [],
          }// fin return
    },







mounted () {

  this.$http.get('http://localhost:3000/api'+ document.location.pathname).then((response) =>{

      console.log('success', response);

      this.postID = response.body.results
  
}, (response)=>{

console.log('erreur', response);
     });

    },//fin mounted



methods:{
  
}// fin methode


    
}//fin exports

 
</script>


<style>

.flex{
  width: 40%;
  margin: auto;
}
.bloc__post--flex{
  margin-bottom: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  border: solid 2px var(--violet);
}
.bloc__post__p--style{
  margin-top: 1em;
  margin-bottom: 1em;
  text-align: center;
}
</style>
