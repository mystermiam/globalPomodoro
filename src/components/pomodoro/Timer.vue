<template>
  <div v-bind:class='{ timerFullScreen: timerFullScreen }'>

   <div class='position-container'><div id='full-screen-button-hover-container' v-bind:class='{ positionFullScreenHoverContainer: timerFullScreen }'><i  class="fas fa-expand-arrows-alt" id='full-screen-button' @click='goFullScreen' v-bind:class='{ positionFullScreenButton: timerFullScreen }'></i></div></div>

   <div id='timerContainer' v-bind:class='{ timerBlinkAnimation: timerBlinkAnimation }'>

    <p id='timerNumbers'>
      <span v-if="Math.floor(timeLeft / 60) < 10">0</span><span>{{Math.floor(timeLeft / 60)}} : </span>
      <span v-if="(timeLeft % 60) < 10">0</span><span>{{timeLeft % 60}}</span>
    </p>
    <p>

      <span v-if='sessionCategory === "work"' id='sessionTitle'>{{sessions[sessionNumber] ? sessions[sessionNumber].name : 'Working Session'}}</span>

      <!--<input id="sessionCheckBox" @input='sessionCompleted' type="checkbox">-->

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
      timerFullScreen: 'timerFullScreen',
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
      goFullScreen: 'goFullScreen',
    }),

    ...mapActions('feedback',{
       pomodoroBreakFeedback:'pomodoroBreakFeedback',    
      }),

    },
  mounted(){
    //Example for how to get things from the server --> this.fetchTimeLeft(cb);
   this.setTimer([1500,300,900,55,'work', 1]); // work, short pause length, long pause length, current time, state of the session, number of sessions (start with 1 + 'work')
  },
  
};
</script>


<style scoped>
#timerNumbers {
  color: white;
  font-size: 1.5em;
}

#timerContainer {
  margin-top: 1.7em;
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
  font-size: 3vh;
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
  width: 20vh;
  height: 10vh;
  background-color: white;
  color: black;
  border: 2px solid #555555;
  border-radius: 20%;
  margin: 4vh;
  font-size: 5vh;
  line-height: 10vh;
  cursor: pointer;
}

#sessionCheckBox {
  opacity: 0;
}

#timerContainer:hover #sessionCheckBox {
  opacity: 1;
}

/* Bugs here: Next steps -full screen without scrolling -fixate button; */
#full-screen-button {
  font-size: 0.4em;
  position: relative;
  top: -0.7em;
  left: -2em;
  cursor: pointer;
  width: 1em;
  color:  lightgray;
  display: none;
  z-index: 5;
}

#full-screen-button-hover-container {
    width: 20vh;
    height: 20vh;
    position: relative;
    top: 0;
    z-index: 2;
}

#full-screen-button-hover-container:hover #full-screen-button {
  display: inline-block;
}

.positionFullScreenButton {
  position: absolute !important;
  top: 0.3em !important;
  left: 0.3em !important;
  z-index: 4;
}

.positionFullScreenHoverContainer {
  height: 40vh !important;
  width: 40vh !important;
  position: absolute !important;
}


.timerFullScreen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  font-size: 16vh !important;
  height: 100% !important;
  display: block;
  border-radius: 0 !important;
  overflow-x: hidden !important; /* Disable horizontal scroll */
  transition: none !important; /* How to disable animation? */
}

.position-container {
  position: absolute;
}


</style>
