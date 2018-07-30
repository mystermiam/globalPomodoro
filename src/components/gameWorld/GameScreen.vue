//maybe remove if possible

<template>
  <GameDownloader />
</template>


<script>
import GameDownloader from './GameDownloader'

export default {
  name: 'GameScreen',
  components: { GameDownloader }
};

</script>


<style scoped>
body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}
</style>
