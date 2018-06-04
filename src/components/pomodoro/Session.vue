<template>
  <div id='sessionBody'>
    <div class='sessionContainer'><h1><router-link :to="{ name: 'Lounge' }"> Welcome to the Lounge</router-link></h1></div>

    <div class='sessionContainer'><h1><router-link :to="{ name: 'Lounge' }"> Infinite Pomodoro Timer</router-link></h1></div>

    <div class='sessionContainer'><h1><router-link :to="{ name: 'Pomodoro' }"> 25 / 5 </router-link></h1></div>

    <div class="hover panel">
      <div class="front">
        <div class="box1">
          <p>Front Side</p>
        </div>
      </div>
      <div class="back">
        <div class="box2">
          <p>Back Side</p>
        </div>
      </div>
    </div>




  </div>

</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'Session',
   components : {
      },
      
  computed : {
    ...mapState('template',{
     
    })
  },

  methods: {
    ...mapActions('template',{
   
    })

    },

  mounted(){

   function flipCard(){
        this.classList.toggle('flip');
    }
    
    document.querySelector('.hover').addEventListener('mouseenter', flipCard )
    document.querySelector('.hover').addEventListener('mouseleave', flipCard )
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
