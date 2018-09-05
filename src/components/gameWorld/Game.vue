<template>
<div>
  <div id='vueInterfaceContainer'>
    <QuestContainer/>

  </div>


  <div id="game-container" @click="gameContainerClicked"/>
  <!--<iframe width="420" height="315" src="http://localhost:8080/#/pomodoro" frameborder="0" allowfullscreen id='exampleContainer' v-show='escapePressed'></iframe>-->
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

import Chat from './../pomodoro/Chat'

//Functions
import launch from '../../store/modules/gameWorld/index'

export default {
  name: 'game',

  components: { Dialogue, CreateNPCs, QuestContainer, Chat },

  computed: {
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
      if (e.key == 'Escape' || e.key == 'i' || e.key == 'c') {
        this.keymonitor(e)
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

#exampleContainer {
	display: inline-block;
	width: 400px;
	height: 400px;
	background-color: black;
	color: white;
	position: absolute;
	top: 0;
	left: 0;
}


</style>