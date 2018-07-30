<template>
  <div id="game-container" />
</template>

<script>
import launch from '../../store/modules/gameWorld/game'

export default {
  name: 'game',
  mounted() {
    launch()
  }
};
</script>
