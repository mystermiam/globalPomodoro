<template>
  <div>
  <span id='pomodoroGoalPosition'>{{pomodorosDone}} / <input type="number" name="quantity" min="1" max="16" id='pomodoroGoal' :value='pomodoroGoal' @input='changePomodoroGoal'></span>
  
	<ul id='sessionTitleList'>

		<li v-for='sessionTitle in sessionTitles' @dblclick='editTrueFunction(sessionTitle.number)' v-bind:id="sessionTitle.id" v-bind:class="{ active: sessionTitle.active }">

			{{sessionTitle.number}} - 

			<input list='toDoListIntegration' class='sessionListEdit' v-if='sessionTitle.edit' :bind='sessionTitle.name' v-bind:id="sessionTitle.inputId" @blur='editTitle' v-on:keyup.enter='editTitle'> 
        <datalist id="toDoListIntegration">
          <option v-for='toDo in toDoListExamples' :value='toDo'></option>
        </datalist>


			{{sessionTitle.name}}
		</li>
	</ul>

  </div>

</template>

<script>

// Battle plan: make edit function directly focused --> if unfocused turn it to false 

import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'SessionTitleList',
  
  computed : {
   ...mapState('sessionTitleList',{
      sessionTitles: 'sessionTitles',
      pomodorosDone: 'pomodorosDone',
      pomodoroGoal: 'pomodoroGoal',
      toDoListExamples: 'toDoListExamples',
    }),
  },

  methods: {
  ...mapActions('sessionTitleList',{
      createSessionList: 'createSessionList',
      changePomodoroGoal: 'changePomodoroGoal',
      editTrueFunction: 'editTrueFunction',
      editTitle: 'editTitle',    
    }),

  },

  mounted(){
  	this.createSessionList();
  },

  
};
</script>


<style scoped>
#pomodoroGoal {
  border: none;
  display: inline;
  font-family: inherit;
  font-size: inherit;
  padding: none;
  width: 1.5em;
  background: transparent;
  color: inherit;
  }

#pomodoroGoalPosition {
margin-left: 2.3em;
font-size: 1.4em;
}




.sessionListEdit {
	position: absolute;
}

.active {
	color: red;
}


</style>
