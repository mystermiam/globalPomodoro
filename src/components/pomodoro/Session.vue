<template>
  <div id='sessionBody'>
    <div class='sessionContainer'><h1><router-link :to="{ name: 'Lounge' }"> Welcome to the Lounge</router-link></h1></div>

    <div class='sessionContainer'><h1><router-link :to="{ name: 'Lounge' }"> Infinite Pomodoro Timer</router-link></h1></div>

    <div class='sessionContainer'><h1 @click='setTimer(room1)'><router-link :to="{ name: 'Pomodoro' }" > 25 / 5 </router-link></h1></div>

    <div class='sessionContainer'><router-link :to="{ name: 'Pomodoro' }" ><h1 @click='setTimer(room3)'> 40 / 7 </h1></router-link></div>




    <div class='sessionContainer'>

      <span>Work: <input type="number" name="quantity" min="1" max="300" id='changeWorkTime' value='25'></span>

      <span>Short Break: <input type="number" name="quantity" min="1" max="300" id='changeShortPauseTime' value='5'></span>

      <span>Long Break: <input type="number" name="quantity" min="1" max="300" id='changeLongPauseTime' value='15'></span>

      <span @click='setTimer'><router-link :to="{ name: 'Pomodoro' }"> Enter Room </router-link></span>
    
    </div>


<!--
    <div class="hover panel">
      <div class="front">
        <div class="box1">
          <p>Timer + How much time left + Amount of people</p>
        </div>
      </div>
      <div class="back">
        <div class="box2">
          <p>List of People</p>
        </div>
      </div>
    </div>
-->

  </div>

</template>

<script>

// Create new Room with own timer

import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'Session',
      
  computed : {
    ...mapState('session',{
     room1: 'room1',
     room2: 'room2',
     room3: 'room3'
    }),
  },

  methods: {
    ...mapActions('timer',{
      setTimer: 'setTimer',
    }),

    },

  mounted(){
/*
   function flipCard(){
        this.classList.toggle('flip');
    }

    document.querySelector('.hover').addEventListener('mouseenter', flipCard )
    document.querySelector('.hover').addEventListener('mouseleave', flipCard )
*/
    }

};

</script>


<style scoped>
  #sessionBody {
    height: 100%;
  }

  .sessionContainer {
    width: 80%;
    height: 15%;
    box-sizing: border-box;
    display: block;
    margin: 20px auto;
    text-align: center;
    border: 2px solid black;
    background-color: white;

  }




  /*-=-=-=-=-=-=-=-=-=-=- */
/* Flip Panel */
/*-=-=-=-=-=-=-=-=-=-=- */

.panel {
  margin: 0 auto;
  width: 250px;
  height: 150px;  
  position: relative;
  -webkit-perspective: 600px;
  -moz-perspective: 600px;
}

.panel .front,
.panel .back {
  text-align: center;
}
  
.panel .front {
  height: inherit;
  position: absolute;
  top: 0;
  z-index: 900;
  text-align: center;
  -webkit-transform: rotateX(0deg) rotateY(0deg);
     -moz-transform: rotateX(0deg) rotateY(0deg);
  -webkit-transform-style: preserve-3d;
     -moz-transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
     -moz-backface-visibility: hidden;
  -webkit-transition: all .4s ease-in-out;
     -moz-transition: all .4s ease-in-out;
    -ms-transition: all .4s ease-in-out;
     -o-transition: all .4s ease-in-out;
      transition: all .4s ease-in-out;
}

.panel .back {
  height: inherit;
  position: absolute;
  top: 0;
  z-index: 1000;
  -webkit-transform: rotateY(-180deg);
     -moz-transform: rotateY(-180deg);
  -webkit-transform-style: preserve-3d;
     -moz-transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
     -moz-backface-visibility: hidden;
  -webkit-transition: all .4s ease-in-out;
     -moz-transition: all .4s ease-in-out;
    -ms-transition: all .4s ease-in-out;
     -o-transition: all .4s ease-in-out;
      transition: all .4s ease-in-out;
}
.panel.flip .front {
  z-index: 900;
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
}
.panel.flip .back {
  z-index: 1000;
  -webkit-transform: rotateX(0deg) rotateY(0deg);
  -moz-transform: rotateX(0deg) rotateY(0deg);
}
.box1{
  background-color: #14bcc8;
  width: 250px;
  height: 150px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
}
.box2{
  background-color: #ff7e70;
  width: 250px;
  height: 150px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
}

</style>
