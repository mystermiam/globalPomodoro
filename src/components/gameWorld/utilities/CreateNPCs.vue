<template>
  <div v-show='showObjectContainer' id='objectContainer'>
   <div v-for='(object,index) in objectsInInventory'>
    
    <img class='boxForObject' :value='objects[object].name' :src="objects[object].image" @click='showUrlInputField(objects[object].name)'></img>

    <div v-show='objects[object].showURL'>

      <input :value='objects[object].link'></input><button @click='saveInput(index)'>SAVE</button>

      <button @click='addIntoGame(objects[object])'>ADD!</button>
      <br><br>
    </div>

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
      showObjectContainer:'showObjectContainer', 
      objectsInInventory:'objectsInInventory',
      objects:'objects',
    })
  },
 
 methods: {
  ...mapActions('createNPCs',{
      showUrlInputField: 'showUrlInputField',
      saveInput: 'saveInput',
      addIntoGame: 'addIntoGame',
    })
  },
  

  
};
</script>


<style scoped>
#objectContainer {
  display: inline-block;
  width: 300px;
  height: 300px;
  border: 4px double darkgray;
  border-radius: 10%;
  background-color: lightgray;
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
}

.boxForObject  {
  display: inline-block;
  width: 40px;
  height: 40px;
  padding: 10px;
  border: 1px solid black;
  background-color: white;

}

</style>
