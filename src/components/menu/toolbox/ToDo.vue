<!--
- Creating Masterlist:
    - Creating array with items: Name, Category  :check
    - Creating five lists that things can be appended to :check
    - pushing things from input to list :check
    - move things from one list to another (vue draggable?)
    - Edit items
    - Delete items
    - Push items to front (dbl click? or enter on selected?)
    - Move item with css animation to the left

- Creating todo display:
    - Show no more than three todos
    - Do later option, push back
    - check off option to get reward 

Optional: 
    - Create sub-todos
    - Add to google calendar

-->
<template>
  <div id='toDoContainer'>

    
    <div id='master-list-container'>
      <h1> Master List </h1>
      <input id='toDoInput' placeholder="Add all your To Do's here!" @keyup.enter='addToDo'>
      <br><br>
    
      <ul id='not distributed'>
        <li v-for='item in toDos' v-if='item.category === "not distributed" && !item.displayed'>{{item.name}}</li>
        

        <!-- Complete one item and then copy it -->

        <div id='iu-container' class='container'>
          <p>Important and Urgent</p>
            <li v-for='item in toDos' v-if='item.category === "IU" && !item.displayed'>{{item.name}}</li>
        </div>




        <div id='i-container' class='container'>
          <p>Important</p>
            <li v-for='item in toDos' v-if='item.category === "I" && !item.displayed'>{{item.name}}</li>
        </div>

        <div id='u-container' class='container'>
          <p>Urgent</p>
            <li v-for='item in toDos' v-if='item.category === "U" && !item.displayed'>{{item.name}}</li>
        </div>

        <div id='ninu-container' class='container'>
          <p>Not important and not urgent</p>
            <li v-for='item in toDos' v-if='item.category === "NINU" && !item.displayed'>{{item.name}}</li>
        </div>
      </ul>
    </div>
    
    <br> <br>
    <div id='to-do-display-container'>
      <h1> To Do Display </h1>
       <ul>
        <li v-for='item in toDos' v-if='item.displayed'>{{item.name}}</li>
       </ul>
    </div>





  </div>

</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import draggable from 'vuedraggable'

export default {
  name: 'ToDo',
  
  components : {
    draggable: 'draggable'
  },
      
  computed : {
   ...mapState('toDo',{ 
      toDos: 'toDos'
    }),

  },
  
 methods: {
  ...mapActions('toDo',{
    addToDo: 'addToDo'
    })
  },

 

  
};
</script>


<style scoped>
#toDoContainer {
  width: 50%;
  border: 1px solid black;
  float: left;
  display: block;
  box-sizing: border-box;
}

.container {
  border: 1px solid black;
}

#iu-container {
  background-color: red;
}

#i-container {
  background-color: green;
}

#u-container {
  background-color: orange;
}

#ninu-container {
  background-color: lightgray;
}
</style>
