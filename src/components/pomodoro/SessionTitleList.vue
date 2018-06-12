<template>
  <div>
	<ul id='sessionTitleList'>
		<li v-for='sessionTitle in sessionTitles' @dblclick='editTrueFunction(sessionTitle.number)'  v-bind:class="{ active: sessionTitle.active }">
			{{sessionTitle.number}} - 
			<input class='sessionListEdit' v-if='sessionTitle.edit' :bind='sessionTitle.name' v-on:keyup.enter='editTitle'> 
			{{sessionTitle.name}}
		</li>
	</ul>

  </div>

</template>

<script>

// Battle plan: created: array with the length of pomodoroGoal: default name: Working Session--> populate li v-for with array --> edit function -->  highlight current task --> if pomodoroGoal changes change array (computed?)


// make edit function directly focused --> if unfocused turn it to false 

import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'SessionTitleList',
  
  computed : {
   ...mapState('sessionTitleList',{
      sessionTitles: 'sessionTitles',
    }),

   ...mapState('timer',{
   	  pomodorosDone: 'pomodorosDone'
   })
  },

  methods: {
  ...mapActions('sessionTitleList',{
      createSessionList: 'createSessionList',
      editTrueFunction: 'editTrueFunction',
      editTitle: 'editTitle',
    })
  },

  created(){
  	this.createSessionList();
  },

  
};
</script>


<style scoped>
.sessionListEdit {
	position: absolute;
}

.active {
	color: red;
}
</style>
