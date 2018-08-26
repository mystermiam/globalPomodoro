<template>
<div>
  <div id="game-container" @click="gameContainerClicked()" />
  <!--<iframe width="420" height="315" src="http://localhost:8080/#/pomodoro" frameborder="0" allowfullscreen id='exampleContainer' v-show='escapePressed'></iframe>-->
  <Dialogue/>
  <CreateNPCs/>
</div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

//Components
import Dialogue from './utilities/Dialogue'
import CreateNPCs from './utilities/CreateNPCs'

//Functions
import launch from '../../store/modules/gameWorld/index'

export default {
  name: 'game',

  components: { Dialogue, CreateNPCs },

  computed: {
  ...mapState('player',{
      escapePressed: 'escapePressed',
    }),
  },

  methods: {
  ...mapActions('player',{
      // keymonitor: 'keymonitor',
    }),

  ...mapActions('createNPCs',{
      gameContainerClicked: 'gameContainerClicked',
    }),

  ...mapActions('dialogue',{
      getPosition: 'getPosition',
    })
  },

  mounted() {
    launch();

    this.getPosition();
    
  }
};
</script>

<style scoped>
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