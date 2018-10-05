<template>
  <div v-show='showObjectContainer' id='objectContainer'>
   <div v-for='(object,index) in objectsInInventory'>
    
    <img class='boxForObject' :value='object[0]' :src="objects[object[1]].image" @click='objectClicked(objects[object[1]].name)' v-bind:class='{ objectClicked: objects[object[1]].objectClicked }'></img>

   </div>

  </div>

</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'CreateNPCs',
  
  components : {
  
  },
     
  computed : {
   ...mapState('createNPCs',{
      objectsInInventory:'objectsInInventory',
      objects:'objects',
    }),

   ...mapState('loadInterface',{
      showObjectContainer:'showObjectContainer', 
    }),


  },
 
 methods: {
  ...mapActions('createNPCs',{
      objectClicked: 'objectClicked',
      addIntoGame: 'addIntoGame',
    })
  },
  

  
};
</script>


<style scoped>
#objectContainer {
  display: inline-block;
  width: 150px;
  height: 150px;
  border: 4px double darkgray;
  border-radius: 2%;
  background-color: lightgray;
  position: absolute;
  top: 450px;
  left: 650px;
  padding: 20px;
  opacity: 0.95;
}

.boxForObject  {
  display: inline-block;
  width: 40px;
  height: 40px;
  padding: 10px;
  border: 1px solid black;
  background-color: white;
}

#dropObjectButton{
  font-size: 0.7em;
  display: inline-block;
}

.objectClicked {
  border: 1px solid red !important;
}

</style>











<!--
GRAVEYARD

<input :value='objects[object].link'></input><button @click='saveInput(index)'>SAVE</button>    saveInput: 'saveInput',




URL INPUT FIELD: 
    <img class='boxForObject' :value='objects[object].name' :src="objects[object].image" @click='showUrlInputField(objects[object].name)'></img>

    <div v-show='objects[object].showURL'>

      <button id='dropObjectButton' @click='addIntoGame(objects[object])'>Drop into game</button>
      <br><br>
    </div>


















--> 