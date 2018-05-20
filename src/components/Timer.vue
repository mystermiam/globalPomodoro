<template>
  <div id='timerContainer'>
    <p>
      <span v-if="Math.floor(timeLeft / 60) < 10">0</span><span class="minutes">{{Math.floor(timeLeft / 60)}} : </span><span v-if="timeLeft % 60 < 10">0</span><span class="seconds">{{timeLeft % 60}}</span></p>
    </p>
   

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

</style>
