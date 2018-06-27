<template>
  <div id='timerContainer'>
   
   <div v-bind:class="{ timerBlinkAnimation: timerBlinkAnimation }">
    <p>
      <span v-if="Math.floor(timeLeft / 60) < 10">0</span><span class="minutes">{{Math.floor(timeLeft / 60)}} : </span>
      <span v-if="(timeLeft % 60) < 10">0</span><span class="seconds">{{timeLeft % 60}}</span>
    </p>
    <p>

      <span v-if='sessionCategory === "Work"' id='sessionTitle'>{{sessionName}}</span>

      <!--<input id="checkBox" @input='sessionCompleted' type="checkbox">-->

      <span id='sessionTitle' v-if='sessionCategory === "Break" || sessionCategory === "Long Break"'>{{sessionCategory}}</span>

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
      sessions: 'sessions'
    }),

    ...mapGetters('sessionTitleList',{
      sessionCategory: 'sessionCategory',
      sessionName: 'sessionName'
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
p {
  color: white;
}

#timerContainer {
  display: flex;
  text-align: center;
  flex-direction: column;
  font-size: 48px;
  border: 1px solid black;
  background-color: #001f3f;
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

#goButton {
  width: 10em;
  height: 4em;
  border-radius: 20%;
  margin-bottom: 2em;
}

#checkBox {
  opacity: 0;
}

#timerContainer:hover #checkBox {
  opacity: 1;
}

</style>
