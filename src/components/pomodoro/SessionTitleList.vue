<template>
  <div>
  <span id='pomodoroGoalPosition'>{{pomodorosDone}} / <input type="number" name="quantity" min="1" max="16" id='pomodoroGoal' :value='pomodoroGoal' @input='changePomodoroGoal'></span>
  
	<ul id='sessionTitleList'>
		<li v-for='sessionTitle in sessionTitles' @dblclick='editTrueFunction(sessionTitle.number)' v-bind:id="sessionTitle.id" v-bind:class="{ active: sessionTitle.active }">
			{{sessionTitle.number}} - 
			<input class='sessionListEdit' v-if='sessionTitle.edit' :bind='sessionTitle.name' @blur='editTitle' v-bind:id="sessionTitle.inputId" v-on:keyup.enter='editTitle'> 
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
