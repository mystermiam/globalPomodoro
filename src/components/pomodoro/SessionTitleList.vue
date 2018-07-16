<template>
  <div>
  <span id='pomodoroGoalPosition'>{{pomodorosDone}} / <input type="number" name="quantity" min="1" max="16" id='pomodoroGoal' :value='pomodoroGoal' @input='changePomodoroGoal'></span>
  
	<ul id='sessionTitleList'>
    <div v-for='(session, index) in sessions'>
		<li  :class="{learningUnderline: session.learningOrPerformance === 1, performanceUnderline: session.learningOrPerformance === 2}"  v-if='session.category === "work"' @dblclick='editTrueFunction(index)'  @contextmenu='learningOrPerformance([session.sessionNumber, $event])'>

			<span :class='{ active: session.active }'>{{session.sessionNumber}} - </span>

      <!-- Replace with select? -->
			<input list='toDoListIntegration' class='sessionListEdit' v-if='session.edit' :bind='session.name' @blur='editTitle' v-on:keyup.enter='editTitle'> 
        <datalist id="toDoListIntegration">
          <option v-for='toDo in toDoListExamples' :value='toDo'>To-Dos</option>
          <option v-for='distraction in distractions' :value='distraction.name'>Distractions</option>
        </datalist>

			<span v-show='!session.edit' :class="{ active: session.active }">{{session.name}} 
     
      <!--<span v-if="currentTime[0] < 10">0</span><span class="hours">{{session.time[0]}}:</span>
      <span v-if="currentTime[1] < 10">0</span><span class="minutes">{{session.time[1]}}</span>-->
      </span> 


		</li>
    <!--If break is the last one in the row don't display it / if index of this is smaller than pomodorogoal -->
    <li v-bind:class='{ active: session.active }' v-if='session.category === "Break" && index < sessions.length - 1 && index !== 0'>---------------</li>
    <li v-bind:class='{ active: session.active }' v-if='session.category === "Long Break" && index < sessions.length - 1 && index !== 0'>-------------------------</li>
    </div>
	</ul>

  <br>
  <p class='textCenter'>Daily Winstate:</p>
  <textarea  id='winStateInput' :placeholder='winState' @blur='winStateInput'cols="30" rows="2"></textarea>

  </div>

</template>

<script>

import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'SessionTitleList',
  
  computed : {
   ...mapState('sessionTitleList',{
      sessions: 'sessions',
      pomodorosDone: 'pomodorosDone',
      pomodoroGoal: 'pomodoroGoal',
      toDoListExamples: 'toDoListExamples',
      winState: 'winState',
      currentTime: 'currentTime',
    }),

    ...mapState('distractionList',{
      distractions: 'distractions',
    }),

    ...mapGetters('sessionTitleList',{
      
    }),

  },

  methods: {

  ...mapActions('sessionTitleList',{
      createSessionList: 'createSessionList',
      changePomodoroGoal: 'changePomodoroGoal',
      editTrueFunction: 'editTrueFunction',
      editTitle: 'editTitle',    
      winStateInput: 'winStateInput',
      learningOrPerformance: 'learningOrPerformance',
      updateTime: 'updateTime',
      sessionTime: 'sessionTime',

    }),

  },

  mounted(){
  	this.createSessionList();
    //this.updateTime();
    //this.sessionTime();
  },

  
};
</script>


<style scoped>
#sessionTitleList {
   height: 8em;
   overflow-y: scroll;
}

#pomodoroGoal, #winStateInput {
  border: none;
  display: inline;
  font-family: inherit;
  font-size: inherit;
  padding: none;
  background: transparent;
  color: inherit;
  }

#pomodoroGoal {
  width: 1.72em;
}

#winStateInput {
  width: 18em;
  font-size: 1em;
  overflow-x: hidden;
  font-weight: bold;
  text-align: center;
}

.textCenter {
  text-align: center;
}

#pomodoroGoalPosition {
margin-left: 1em;
padding-bottom: 1em;
font-size: 1.4em;
}

.sessionListEdit {
	margin-top: -1em;
}

.active {
	color: #f12711;
}

.learningUnderline {
  text-decoration: underline;
  text-decoration-color: blue;
}

.performanceUnderline {
  text-decoration: underline;
  text-decoration-color: red;
}


</style>
