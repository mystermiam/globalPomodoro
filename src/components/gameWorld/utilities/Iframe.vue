<template>
  <div>
    <iframe v-if='showPomodoroIframe' src="http://localhost:8080/#/pomodoro" frameborder="0" 
    allowfullscreen id='pomodoroIframeContainer'></iframe>
  </div>

</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'Iframe',
  
  computed : {
   ...mapState('loadInterface',{
      showPomodoroIframe:'showPomodoroIframe',    
    })
  },
  
};
</script>


<style scoped>
#pomodoroIframeContainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
