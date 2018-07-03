<template>
  <div>

   <div id='timerContainer' v-bind:class="{ timerBlinkAnimation: timerBlinkAnimation }">
    <p id='timerNumbers'>
      <span v-if="Math.floor(timeLeft / 60) < 10">0</span><span>{{Math.floor(timeLeft / 60)}} : </span>
      <span v-if="(timeLeft % 60) < 10">0</span><span>{{timeLeft % 60}}</span>
    </p>
    <p>

      <span v-if='sessionCategory === "Work"' id='sessionTitle'>{{sessions[sessionNumber] ? sessions[sessionNumber].name : 'Working Session'}}</span>

      <!--<input id="sessionCheckBox" @input='sessionCompleted' type="checkbox">-->

      <span id='sessionTitle' v-if='sessionCategory === "Break" || sessionCategory === "Long Break"'>{{sessions[sessionNumber] ? sessions[sessionNumber].category : 'Work'}}</span>

    </p>

    <button id='goButton' @click='countdown' v-show='showGoButton'>Go!</button>
   
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
      sessionNumber: 'sessionNumber',
      showGoButton: 'showGoButton',
      
    }),

    ...mapState('sessionTitleList',{
      sessions: 'sessions',
    }),

    ...mapGetters('sessionTitleList',{
      sessionCategory: 'sessionCategory'
    }),

  },
  methods : {
    ...mapActions('timer',{
      countdown : 'countdown',
      //fetchTimeLeft : 'fetchTimeLeft',
      setTimer: 'setTimer',    
      sessionCompleted: 'sessionCompleted',
    })

    },
  mounted(){
    //Example for how to get things from the server --> this.fetchTimeLeft(cb);
    this.setTimer([1500,300,900]);
   
  },
  
};
</script>


<style scoped>
#timerNumbers {
  color: white;
  font-size: 1.3em;
}

#timerContainer {
  margin-top: 1.5em;
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
  font-size: 0.35em;
  color: white;
}

#completeSessionBox {
  display: inline-block;
  width: 0.3em;
  height: 0.3em;
  border: 1px solid black;
  background-color: white;
  z-index: 1;
}

#goButton {
  width: 10em;
  height: 4em;
  border-radius: 20%;
  margin-bottom: 2em;
}

#sessionCheckBox {
  opacity: 0;
}

#timerContainer:hover #sessionCheckBox {
  opacity: 1;
}

</style>
