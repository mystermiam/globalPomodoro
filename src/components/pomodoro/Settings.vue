<template>
  <div id='container' v-bind:class="{ 'hidden': !showSettings, 'shown': showSettings}">
    Settings: <br><br>
    Automatic Work  <input type="checkbox" v-model='automaticWork' @click='toggleSettings("automaticWork")'> <br>
    Automatic Pause <input type="checkbox" v-model='automaticPause' @click='toggleSettings("automaticPause")'> <br><br>
    Display Session Title <input type="checkbox" v-model='displaySessionTitle' @click='toggleSettings("displaySessionTitle")'> <br>
    Beep every X minutes <input type="number" name="quantity" min="1" max="16" id='beepEveryXMinutes' :value='beepEveryXMinutes' @input='toggleSettings("beepEveryXMinutes")'>
  </div>

</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'Template',
  
  components : {
  
  },
      
  computed : {
   ...mapState('pomodoroSettings',{
      showSettings: 'showSettings',
      automaticPause: 'automaticPause',
      automaticWork: 'automaticWork',
      displaySessionTitle: 'displaySessionTitle', 
      beepEveryXMinutes: 'beepEveryXMinutes'
    })
  },
 
 methods: {
  ...mapActions('pomodoroSettings',{
      addEventListener: 'addEventListener',
      toggleSettings: 'toggleSettings'
    })
  },
 
 mounted(){
    this.addEventListener();
 }

 

  
};
</script>


<style scoped>
  #container{
    position: absolute;
    top: 0;
    left: 0;
  }

  .hidden{
    display: none;
  }

  .shown{
    display: block;
    width: 300px;
    height: 300px;
    border: 1px solid black;
    background-color: white;
  }
</style>
