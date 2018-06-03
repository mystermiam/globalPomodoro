<template>
  <div id='timerContainer'>
   <!-- on click the field transforms into a field with the already given number of pomodoroGoal and you can enter a new number (only 1-20) -->
   <p>{{pomodorosDone}} / <!--<input type="number" name="quantity" min="1" max="16" id='pomodoroGoal' :value='pomodoroGoal' @keyup='changePomodoroGoal'>--> {{pomodoroGoal}}</p>
   
   <div v-bind:class="{ timerBlinkAnimation: timerBlinkAnimation }">
    <p>
      <span v-if="Math.floor(timeLeft / 60) < 10">0</span><span class="minutes">{{Math.floor(timeLeft / 60)}} : </span><span v-if="timeLeft % 60 < 10">0</span><span class="seconds">{{timeLeft % 60}}</span></p>
    </p>

    <ReadyButton></ReadyButton>
   
   </div>
  </div>

</template>

<script>
import ReadyButton from '@/components/pomodoro/ReadyButton'

import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'Timer',
   components : {
        'ReadyButton' : ReadyButton,
      },

  computed : {
    ...mapState('timer',{
      timeLeft:'timeLeft',
      timerBlinkAnimation: 'timerBlinkAnimation',
      pomodorosDone: 'pomodorosDone',
      pomodoroGoal: 'pomodoroGoal',
    })
  },
  methods : {
    ...mapActions('timer',{
      countdown : 'countdown',
      fetchTimeLeft : 'fetchTimeLeft',
      changePomodoroGoal: 'changePomodoroGoal',
      clearTimer: 'clearTimer'
    })

    },
  mounted(){
    this.fetchTimeLeft()
  },

  beforeDestroy(){
    this.clearTimer();
  },
  
};
</script>


<style scoped>
p {
  color: white;
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

</style>
