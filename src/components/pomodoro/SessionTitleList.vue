<template>
  <div>
  <span id='pomodoroGoalPosition'>{{pomodorosDone}} / <input type="number" name="quantity" min="1" max="16" id='pomodoroGoal' :value='pomodoroGoal' @input='changePomodoroGoal'></span>
  
	<ul id='sessionTitleList'>

<<<<<<< HEAD
		<li v-for='sessionTitle in sessions' @dblclick='editTrueFunction(sessionTitle.number)' v-bind:id="sessionTitle.id">

			<span v-bind:class="{ active: sessionTitle.active }">{{sessionTitle.number}} - </span>

			<input list='toDoListIntegration' class='sessionListEdit' v-if='sessionTitle.edit' :bind='sessionTitle.name' v-bind:id="sessionTitle.inputId" @blur='editTitle' v-on:keyup.enter='editTitle'> 
=======
    <div v-for='(session, index) in sessions'>
		<li v-if='session.category === "Work"' @dblclick='editTrueFunction(index)'>

			<span v-bind:class="{ active: session.active }">{{index / 2 + 1}} - </span>


			<input list='toDoListIntegration' class='sessionListEdit' v-if='session.edit' :bind='session.name' @blur='editTitle' v-on:keyup.enter='editTitle'> 
>>>>>>> f859d0b... commit mine, ignore Jabol
        <datalist id="toDoListIntegration">
          <option value='To-Dos'/></option>
          <option v-for='toDo in toDoListExamples' :value='toDo'></option>
          <option value='Distractions'></option>   <!-- How to make the option disabled? -->
          <option v-for='distraction in distractions' :value='distraction.name'></option>
        </datalist>

<<<<<<< HEAD
			<span v-bind:class="{ active: sessionTitle.active }">{{sessionTitle.name}}</span> 
      
		</li>
=======
			<span v-bind:class="{ active: session.active }">{{session.name}}</span> 
      
		</li>
    <li v-bind:class='{ active: session.active }' v-if='session.category === "Break"'>---------------</li>
    <li v-bind:class='{ active: session.active }' v-if='session.category === "Long Break"'>-------------------------</li>
    </div>
>>>>>>> f859d0b... commit mine, ignore Jabol
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
      sessions: 'sessions',
      pomodorosDone: 'pomodorosDone',
      pomodoroGoal: 'pomodoroGoal',
      toDoListExamples: 'toDoListExamples',
    }),

    ...mapState('distractionList',{
      distractions: 'distractions',
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

.optionHorizontalLine {
  border-top: 1px solid black;
}


</style>
