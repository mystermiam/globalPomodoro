<template>
  <div id="app">
    <router-view/>
    <chat></chat>
  </div>
</template>

<script>
import Chat from '@/components/Chat'

export default {
  name: 'App',
  components : {
    'chat' : Chat
  }
};
</script>

<style>

</style>
