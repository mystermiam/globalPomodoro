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
html,body,#app{ height: 100%; }


.chatContainer{
    height: 65%;
    padding: 1% 2%;
    border: solid black 1px;
    box-sizing: border-box;
    margin: 5%;
}


.chatBox{
    border:solid 1px black;
    overflow-y: scroll;
    height: 80%;
}

</style>
