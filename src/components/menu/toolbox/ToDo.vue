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

<div>


<div id="main">
  <button class="btn btn-success" @click="insertItem">Insert Item</button>
  <ul class="list-group drag">
    <draggable :list="toDos" class="dragArea"
               :options="{handle:'.handle'}">


      <div id='iu-container' class='container'>
          <p>Important and Urgent</p>
          <li class="list-group-item to-do-item" v-for='toDo, index in toDos' :key="toDo.number">
            <span class="handle" ><i>------</i></span> 
           <label>
            {{toDo.name}} {{toDo.number}}
           </label>
          </li>
        </div>



        <div id='i-container' class='container'>
          <p>Important</p>
          <li class="list-group-item to-do-item" v-for='toDo, index in toDos' :key="toDo.number">
            <span class="handle" ><i>------</i></span> 
           <label>
            {{toDo.name}}
           </label>
          </li>
        </div>


      <li class="list-group-item"
          v-for="toDo, index in toDos"
          :key="toDo.number">
        <span class="handle" >
          <i>------</i>
        </span>
        <label>
          {{toDo.name}}-(No.{{toDo.no}}) <button class="btn btn-danger" @click="deleteItem">Remove</button>
        </label>
      </li>
    </draggable>
  </ul>
</div>


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
            <li v-for='item in toDos' class='to-do-item' v-if='item.category === "IU" && !item.displayed'>{{item.name}}</li>
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


</div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import draggable from 'vuedraggable'

export default {
  name: 'ToDo',
  
  components : {
    draggable,
  },
      
  computed : {
   ...mapState('toDo',{ 
      toDos: 'toDos',     
    }),

    

  },
  
 data(){

    return {
    items:[
      {no:1, name:'cabbage', categoryNo:'1'},
      {no:2, name:'steak', categoryNo:'2'},
      {no:3, name:'Apple', categoryNo:'3'},
      {no:4, name:'refrigerator', categoryNo:'4'},
      {no:5, name:'Cucumber', categoryNo:'1'},
      {no:6, name:'hamburger', categoryNo:'2'},
      {no:7, name:'banana', categoryNo:'3'},
      {no:8, name:'PS4', categoryNo:'4'},
      ],
    }
 },

 methods: {
  ...mapActions('toDo',{
    addToDo: 'addToDo'
    }),

 onEnd: function(evt){
    },
    checkMove: function(evt,originalEvent){
      console.log('draggedContext', evt.draggedContext);
      console.log('relatedContext', evt.relatedContext);
      // I can not drag with an apple
      return (evt.draggedContext.element.name!=='Apple');
    },
    insertItem: function(){
      var self = this;
      var newNo = 1;
      
      if(self.items.concat().length > 0)
        newNo =  Math.max.apply(null, self.items.concat().map(function(item){return item.no;})) +1;
      
      this.items.push(
        {
          no:　newNo,
          name:'banana'+newNo,
          categoryNo:'3'
        }
        );
      self.count =  self.count+1;
    },
    deleteItem: function(item, index){
      this.items.splice(index, 1);
    },

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
  width: 100%;
}

#iu-container {
  background-color: red;
  text-align: center; 
  width: 100%;

}

#i-container {
  background-color: green;
  width: 100%;
}

#u-container {
  background-color: orange;
  width: 100%;
}

#ninu-container {
  background-color: lightgray;
  width: 100%;
}

.to-do-item {
  color: red;
  border: 1px solid black;
  margin: 1em;
  padding: 0.4em;
  background-color: white;
}
</style>
