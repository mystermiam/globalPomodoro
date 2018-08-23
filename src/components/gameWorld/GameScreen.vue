<template>
  <div  id='game-screen'>
  	<GameDownloader/>
  </div>
</template>


<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import GameDownloader from './GameDownloader'

export default {
  name: 'GameScreen',
  components: { GameDownloader },

};

</script>


<style scoped>
body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* Preliminary lazyness of aligning it on my own screen */
  position: fixed;
},

#game-screen {
	/* Preliminary lazyness of aligning it on my own screen */
	/* margin-left: 200px; */
	margin-top: 50px;
}
</style>
