<template>
  <div>
  
      <input id='addToDoTitle' placeholder='What do you need to do?' v-on:keyup.enter='addItem'>

        <ul id='toDoList'>

          <li v-for='(distraction, index) in distractions' v:bind='distraction' @dblclick='editTrueFunction(index)' class='toDoListItem'>
           
            <span class='index'>{{index + 1}}</span>

               <input  v-if='distraction.edit' v-on:keyup.enter='editItem'  @blur='editItem' class='toDoListEdit'> 
          
            {{distraction.name}}

            <span @click='deleteItem(index)' class='deleteToDoButton'><i class="fas fa-trash-alt"></i></span>
         
          </li>
        
        </ul>



  <!--

    <draggable v-model="myArray">
      <transition-group>  
       
          <div v-for="element in myArray" :key="element.id">
            {{element}}
          </div>
    
      </transition-group>
    </draggable>

  -->   
   
  </div>

</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import draggable from 'vuedraggable'

export default {
  name: 'DistractionList',

  components: {
    draggable,
  },
      
  computed : {
   ...mapState('distractionList',{
    distractions: 'distractions',
    myArray: 'myArray',
  }),
  },

  methods: {
    ...mapActions('distractionList', {
       addItem: 'addItem',
       editTrueFunction: 'editTrueFunction',
       editItem: 'editItem',
       deleteItem: 'deleteItem',
    })
  },


  
};
</script>


<style scoped>

#addToDoTitle {
  margin-top: 0.5em;
}

.index {
  display: inline-block;
  width: 1.7em;
  height: 1.7em;
  text-align: center;
  line-height: 1.7em;
  border-radius: 50%; 
  background-color: darkgrey;
  color: lightgrey;
}

.title {
  font-size: 1em;
  margin: 0;
}

#toDoList {
   height: 11.5em;
   text-align: left;
   overflow-y: scroll;
   margin-top: 0.7em;
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
  font-size: 1em;
  padding: 5px;
}


.deleteToDoButton {
  opacity: 0;
}

.toDoListItem:hover .deleteToDoButton {
  opacity: 1;
  float: right;
}

.fa-trash-alt{
color: black;
}

</style>
