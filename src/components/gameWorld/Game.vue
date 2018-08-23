<template>
<div>
  <div id="game-container" @click="keymonitor" />
  <iframe width="420" height="315" src="" frameborder="0" allowfullscreen id='exampleContainer' v-show='escapePressed'></iframe>
</div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

import launch from '../../store/modules/gameWorld/index'

export default {
  name: 'game',

  computed: {
  ...mapState('player',{
      leftKey: 'leftKey',
      escapePressed: 'escapePressed',
    }),
  },

  methods: {
  ...mapActions('player',{
      keymonitor: 'keymonitor',
    })
  },

  mounted() {
    launch()
    
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