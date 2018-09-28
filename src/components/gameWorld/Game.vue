<template>
<div>
  <div id='vueInterfaceContainer' v-show='showVueInterface' v-bind:class='{ makeGameScreenClickable: makeGameScreenClickable }'>
    
    <QuestContainer/>

    <ProgressBar id='progressBarContainer' />

  </div>

  <div id="game-container" @click="gameContainerClicked" v-bind:class='{ makeVueScreenClickable: !makeGameScreenClickable }'/>
 
  <!--<iframe width="420" height="315" src="http://localhost:8080/#/pomodoro" frameborder="0" 
  allowfullscreen id='exampleContainer' v-show='escapePressed'></iframe>-->
 
  <Dialogue/>
  <CreateNPCs/>
  <!--<Chat/>-->
</div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

//Components
import Dialogue from './utilities/Dialogue'
import CreateNPCs from './utilities/CreateNPCs'
import QuestContainer from './utilities/QuestContainer'

import ProgressBar from './../menu/sidebar/ProgressBar'

import Chat from './../pomodoro/Chat'

//Functions
import launch from '../../store/modules/gameWorld/index'

export default {
  name: 'game',

  components: { Dialogue, CreateNPCs, QuestContainer, ProgressBar, Chat },

  computed: {
    ...mapState('loadInterface',{
      makeGameScreenClickable:'makeGameScreenClickable',  
      enableVueKeys: 'enableVueKeys',
      showVueInterface: 'showVueInterface',
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