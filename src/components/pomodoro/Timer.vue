<template>
  <div id='timerContainer'>
   
   <div v-bind:class="{ timerBlinkAnimation: timerBlinkAnimation }">
    <p>
      <span v-if="Math.floor(timeLeft / 60) < 10">0</span><span class="minutes">{{Math.floor(timeLeft / 60)}} : </span>
      <span v-if="timeLeft % 60 < 10">0</span><span class="seconds">{{timeLeft % 60}}</span>
    </p>
    <p>
      <span id='sessionTitle'>{{sessionTitles[pomodorosDone - 1].name}}</span><!-- <input id="checkBox" @input='boxChecked' type="checkbox">-->
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
      timerInterval: 'timerInterval',
    }),

    ...mapState('sessionTitleList',{
      sessionTitles:'sessionTitles',
      pomodorosDone:'pomodorosDone',
    }),

  },
  methods : {
    ...mapActions('timer',{
      countdown : 'countdown',
      fetchTimeLeft : 'fetchTimeLeft',
      setTimer: 'setTimer',
      completeSession: 'completeSession',
      boxChecked: 'boxChecked',
    })

    },
  mounted(){
    //Example for how to get things from the server --> this.fetchTimeLeft(cb);
    this.setTimer([1500,300,false]);
   
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
  width: 50%;
  margin-top: 20px;
  float: left;
  box-sizing: border-box;
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

#sessionTitle {
  font-size: 0.3em;
}

#completeSessionBox {
  display: inline-block;
  width: 0.3em;
  height: 0.3em;
  border: 1px solid black;
  background-color: white;
  z-index: 1;
}

</style>
