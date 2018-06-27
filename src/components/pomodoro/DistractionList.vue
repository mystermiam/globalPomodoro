<template>
  <div id='toDoListContainer'>

      <p class='title'> -  Add Your Distractions here - </p>
      
      <input id='addToDoTitle' v-on:keyup.enter='addItem'>

        <ul id='toDoList'>

          <li v-for='(distraction, index) in distractions' v:bind='distraction' @dblclick='editTrueFunction(index)' class='toDoListItem' >
           
            {{index + 1}} - 

               <input  v-if='distraction.edit' v-on:keyup.enter='editItem'  @blur='editItem' class='toDoListEdit'> 
          
            {{distraction.name}}

            <span @click='deleteItem(index)' class='deleteToDoButton'> - D</span>
         
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
