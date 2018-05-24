<template>
  <div id="app">
    <router-view>
    </router-view>
  </div>
</template>

<script>


import Pomodoro from '@/components/pomodoro/Pomodoro'

export default {
  name: 'App',
  components : {
    'Pomodoro' : Pomodoro,
  }
};
</script>

<style>

</style>
