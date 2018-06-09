<template>
  <div id='timerContainer'>
   
   <p id='pomodoroGoalPosition'>{{pomodorosDone}} / <input type="number" name="quantity" min="1" max="16" id='pomodoroGoal' :value='pomodoroGoal' @blur='changePomodoroGoal'></p>
   
   <div v-bind:class="{ timerBlinkAnimation: timerBlinkAnimation }">
    <p>
      <span v-if="Math.floor(timeLeft / 60) < 10">0</span><span class="minutes">{{Math.floor(timeLeft / 60)}} : </span>
      <span v-if="timeLeft % 60 < 10">0</span><span class="seconds">{{timeLeft % 60}}</span>
    </p>

    <button @click='countdown'>Go!</button>

   
   </div>
  </div>

</template>

<script>

import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'Timer',

  computed : {
    ...mapState('timer',{
      timeLeft:'timeLeft',
      timerBlinkAnimation: 'timerBlinkAnimation',
      pomodorosDone: 'pomodorosDone',
      pomodoroGoal: 'pomodoroGoal',
      timerInterval: 'timerInterval'
    })
  },
  methods : {
    ...mapActions('timer',{
      countdown : 'countdown',
      fetchTimeLeft : 'fetchTimeLeft',
      changePomodoroGoal: 'changePomodoroGoal'
    })

    },
  mounted(){
    // fetch time from room!
    //this.fetchTimeLeft(cb)
  },
  
};
</script>


<style scoped>
p {
  color: white;
}

#pomodoroGoalPosition {
margin-left: 20px;
}

#timerContainer {
  height: 25%;
  text-align: center;
  font-size: 48px;
  border: 1px solid black;
  background-color: #001f3f;
  border-radius: 20px;
  margin: 0 auto;
  width: 60%;
  margin-top: 20px;
}

@keyframes timerBlink {
   0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }
}

.timerBlinkAnimation {
  opacity:1;  
  animation: timerBlink 1s;
  animation-iteration-count: 3;
}

#pomodoroGoal {
  border: none;
  display: inline;
  font-family: inherit;
  font-size: inherit;
  padding: none;
  width: 65px;
  background: transparent;
  color: white;
  }


</style>
