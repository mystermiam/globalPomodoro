<template>
<div>
  <div id='vueInterfaceContainer' v-show='showVueInterface' v-bind:class='{ makeGameScreenClickable: makeGameScreenClickable }'>
    
    <QuestContainer/>

    
    <TimerDisplay/>
    
    <!--<ProgressBar id='progressBarContainer' />-->


    <CreateNPCs/>

  </div>

<!-- Full Screen Application go here -->
  <Iframe/>


 <!-- End of Full Screen Applications -->

  <div id="game-container" @click="gameContainerClicked" v-bind:class='{ makeVueScreenClickable: !makeGameScreenClickable }'/>
 
 
  <Dialogue/>


</div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

//Components
import Dialogue from './utilities/Dialogue'
import CreateNPCs from './utilities/CreateNPCs'
import QuestContainer from './utilities/QuestContainer'
import Iframe from './utilities/Iframe'
import TimerDisplay from './utilities/TimerDisplay'

import ProgressBar from './../menu/sidebar/ProgressBar'

//Functions
import launch from '../../store/modules/gameWorld/index'

export default {
  name: 'game',

  components: { Dialogue, CreateNPCs, QuestContainer, ProgressBar, Iframe, TimerDisplay },

  computed: {
    ...mapState('loadInterface',{
      makeGameScreenClickable:'makeGameScreenClickable',  
      enableVueKeys: 'enableVueKeys',
      showVueInterface: 'showVueInterface',
      showPomodoroIframe: 'showPomodoroIframe',
    }),

  },

  methods: {
  ...mapActions('createNPCs',{
      gameContainerClicked: 'gameContainerClicked',
    }),

  ...mapActions('loadInterface' ,{
      getPosition: 'getPosition',
      keymonitor: 'keymonitor',
    }),

  },

  created() {
    window.addEventListener('keydown', (e) => {
      if (e.key == 'Escape' || e.key == 'i' || e.key == 'c' || e.key == 'q' || e.key == 'Enter') {
        if(this.enableVueKeys){
          this.keymonitor(e)
        }
      }
    });
  },

  mounted() {
    launch();

    // Put interface into place 
    this.getPosition();

    
  }
};
</script>

<style scoped>
#vueInterfaceContainer {
  /* aligned by function */
      display: inline-block;
      width: 0;
      height: 0;
      position: absolute;
      top: 0;
      left: 0;
      border: 1px solid black;
}

#game-container {
      min-width: 100vw;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
}

#progressBarContainer {
  position: absolute;
  top: 560px;
  left: 630px;

}

.makeGameScreenClickable {
  pointer-events: none;
}

.makeVueScreenClickable {
  pointer-events: none;
}


</style>