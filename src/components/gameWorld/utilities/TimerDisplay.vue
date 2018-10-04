<template>
  <div id='timerDisplayContainer' v-if='showTimerDisplay'>
    <p id='timerDisplayNumbers'>
      <span v-if="Math.floor(timeLeft / 60) < 10">0</span><span>{{Math.floor(timeLeft / 60)}} : </span>
      <span v-if="(timeLeft % 60) < 10">0</span><span>{{timeLeft % 60}}</span>
    </p>
  </div>

</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'TimerDisplay',
  
  components : {
  
  },
   
  computed : {
   ...mapState('timer',{
      timeLeft:'timeLeft',    
    }),

   ...mapState('loadInterface',{
      showTimerDisplay:'showTimerDisplay',    
    })
  },
 
 
 /*
 methods: {
  ...mapActions('template',{
      template: 'template',
    })
  },
  */

  
};
</script>


<style scoped>
#timerDisplayContainer {
  position: absolute;
  top: 100px;
  left: 350px;
}

#timerDisplayNumbers {
  color: white;
  font-size: 0.8em;
}

</style>
