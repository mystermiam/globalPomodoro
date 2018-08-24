<template>
  <div id='dialogueContainer' v-show='showDialogueBox'>
     {{currentMessage.person}} - {{currentMessage.message}}
  </div>

</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'Dialogue',
  
  components : {
  
  },
     
  computed : {
   ...mapState('dialogue',{
      currentMessage:'currentMessage', 
      showDialogueBox: 'showDialogueBox',   
    }),

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
  #dialogueContainer{
    display: inline-block;
    width: 800px;
    height: 120px;
    background-color: blue;
    color: white;
    opacity: 0.8;
    position: absolute;
    left: 45vh;
    top: 86.5vh;
  }
</style>
