<template>
  <div id='toDoListContainer'>
      <p class='title'> -  Add Your Distractions here - </p>
      
      <input id='addToDoTitle' v-on:keyup.enter='addItem'>

        <ul id='toDoList'>
          
          <li class='toDoListItem' v-for='(distraction, index) in distractions' v:bind='distraction' @dblclick='editTrueFunction(index)'>
           
            {{index + 1}} - 

               <input  v-if='distraction.edit' class='toDoListEdit' v-on:keyup.enter='editItem'  @blur='editItem'> 
          
            {{distraction.name}}

            <span class='deleteToDoButton' @click='deleteToDo'> - D</span>
         
          </li>
        
        </ul>


     
   
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
#toDoListContainer {
  display: inline-block;
  margin-top: 20px;
  box-sizing: border-box;
  font-size: 40px;
}
.title {
  font-size: 0.35em;
  margin: 0;
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

.toDoListItem {
  font-size: 0.3em;
  padding: 5px;
}


.deleteToDoButton {
  color: red;
  opacity: 0;
}

.toDoListItem:hover .deleteToDoButton {
  opacity: 1;
}

#addToDoTitle {
  
}

</style>
