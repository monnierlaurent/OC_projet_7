<template>
    <div class="bloc__login--flex">
    <h1 class="bloc__login--h1--style">Publier message</h1>

    <form class="bloc__login__form--flex">

        <label class="bloc__login__form--label--style" for="titre">Titre</label>
        <input class="bloc__login__form--input--style" id="titre" type="text" v-model="titre">

        <label class="bloc__login__form--label--style" for="auteur">Auteur</label>
        <input class="bloc__login__form--input--style" id="auteur" type="text" v-model="auteur">

        <label class="bloc__login__form--label--style" for="message">Message</label>
        <textarea class="bloc__login__form--input--style" id="message" type="text-area" rows="5" cols="33" v-model="message"></textarea>
      <p>{{message}}</p>
       
        <button class="bloc__form--btn" @click="send">Publier</button>
    </form>
    </div>
</template>

<script>
export default {
data(){
    return {
        titre: [],
        auteur:[],
        message:[],
    }
},
methods:{
  send(){
        const objetSend ={
            titre: this.titre,
            auteur: this.auteur,
            contenu: this.message
        };
console.log(objetSend);

/*this.$http.post('http://localhost:3000/api/post/', objetSend).then((response) =>{

      console.log('success', response);

  
}, (response)=>{

console.log('erreur', response);
     });//fin request*/
  } 
},

}// fin exports
</script>

<style>
.bloc__login--h1--style{
    padding-top: 1em;
    font-size: 3em;
    font-family: sans-serif;
    }
.bloc__login--flex{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.bloc__login__form--flex{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.bloc__login__form--label--style{
  font-size: 2em;
  padding: 0.5em 0 0.5em 0;
  font-family: sans-serif;
}
.bloc__login__form--input--style{
    font-size: 2em;
    color: var(--noir);
    border: 2px solid var(--noir);
    font-family: sans-serif;
    border-radius: 15px ;
    padding: 0 1em 0 1em;
    box-shadow: 5px 5px 5px var(--gris1);
}
.bloc__form--btn{
    margin: 1em 0 0 0;
    padding: 0.1em 0.15em 0.2em 0.15em;
    font-size: 2em;
    background-color:var(--violet);
    border:solid 1px var(--noir) ;
    color:var(--noir) ;
    border-radius: 20px;
    text-align: center;
    box-shadow: 5px 5px 5px var(--gris1);
}
.bloc__form--btn:hover{
background-color:var(--noir);
    border:solid 1px var(--violet) ;
    color:var(--violet) ;
    box-shadow: 5px 5px 5px var(--violet);
}

</style>