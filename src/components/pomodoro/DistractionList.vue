<template>
  <div>
    <div id='toDoListContainer'>
      <span class='title'> -  Add Your Distractions here - </span>
      
      <input id='addToDoTitle' v-on:keyup.enter="addItem">

        <ul id='toDoList'>
          
          <li class='toDoListItem' @dblclick='editTrueFunction(distraction.number)' v:bind='distraction' v-for='distraction in distractions'>
           
            {{distraction.number}} - 

               <input class='toDoListEdit' v-if='distraction.edit' v-on:keyup.enter="editItem"> 
          
            {{distraction.name}}

            <span class='deleteToDoButton' @click='deleteToDo'> - D</span>
         
          </li>
        
        </ul>


    </div>
     
   
  </div>

</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'DistractionList',
      
  computed : {
     ...mapState('distractionList',{
      distractions: 'distractions',
    }),


  },

  methods: {
    ...mapActions('distractionList', {
       addItem: 'addItem',
       editTrueFunction: 'editTrueFunction',
       editItem: 'editItem',
       deleteToDo: 'deleteToDo',
    })
  },


  
};
</script>


<style scoped>
.title {
  font-size: 0.7em;
}


#toDoListContainer {
	display: inline-block;
	width: 25%;
	height: 25%;
	font-size: 48px;
  border: 1px solid black;
  margin-top: 20px;
	float: left;
  box-sizing: border-box;
}

.toDoListItem {
  display: inline-block;
  width: 80%;
  height: 2em;
  font-size: 0.28em;
  padding: 5px;
  margin: 0;
  border-bottom: 1px solid black;
}

.toDoListEdit {
  border: none;
  display: inline;
  font-family: inherit;
  font-size: inherit;
  padding: none;
  width: 100px;
  color: inherit;
  position: absolute;
}

.deleteToDoButton {
  color: red;
  opacity: 0;
}

.toDoListItem:hover .deleteToDoButton {
  opacity: 1;
}

</style>
