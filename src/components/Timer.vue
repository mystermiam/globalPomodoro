<template>
  <div>
    <p>
      <span v-if="Math.floor(timeLeft / 60)<10">0</span><span class="minutes">{{Math.floor(timeLeft / 60)}} : </span><span v-if="timeLeft % 60 <10">0</span><span class="seconds">{{timeLeft % 60}}</span></p>
    </p>
    <p><span>Minutes</span> <span>Seconds</span></p>


  <audio v-if="timeLeft == 0" src="/music/good_enough.mp3" autoplay></audio>
  </div>

</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'Timer',
  computed : {
    ...mapState('timer',{
      timeLeft:'timeLeft'
    })
  },
  methods : {
    ...mapActions('timer',{
      countdown : 'countdown',
      fetchTimeLeft : 'fetchTimeLeft'
    })

    },
  created(){
    this.fetchTimeLeft().then(() =>{ 
      this.countdown()});
  }
};
</script>


<style scoped>
.minutes{

}

</style>
