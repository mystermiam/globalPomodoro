<template>
  <div>
    <!-- Battle Plan: Div that is the container for the box, full width - span that fills it up in different colours connected to dust / dustTotal - fill up with different colour depending on which dust its filled up with? - v-for loop with array filled up with different colours  -->
    <div class='progress-bar-container'>
      <span v-for='dust in dustProgressBar' class='progress-bar' :style='{ "width": (dust[1] / (levelBoundaries[user.level]) * 100) + "%"}' :class="{progressBarWater: dust[0] === 0, progressBarFire: dust[0] === 1, progressBarEarth: dust[0] === 2,progressBarAir: dust[0] === 3, progressBarSteel: dust[0] === 4}"></span>
    </div>
  </div>

</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'ProgressBar',
  
  components : {
  
  },
      
  computed : {
   ...mapState('progressBar',{
      dustProgressBar:'dustProgressBar',    
    }),

   ...mapState('dailies',{
      user:'user',
      levelBoundaries: 'levelBoundaries'    
    }),
  },
  
 methods: {
  ...mapActions('progressBar',{
    })
  },  
};

</script>


<style scoped>
  .progress-bar-container {
    display: block;
    width: 15em;
    height: 2em;
    border: 1px solid black;
    border-radius: 10%;
  }

  .progress-bar {
    width: 100%;
    display: inline-block;
    height: 1.5em;
    margin-top: 0.25em;
  }

  .progressBarWater {
    background-color: blue;
  }

  .progressBarFire {
    background-color: red;
  }

  .progressBarEarth {
    background-color: brown;
  }

  .progressBarAir {
    background-color: lightgray;
  }

  .progressBarSteel {
    background-color: darkgray;
  }
</style>
