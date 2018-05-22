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
    max-height: 73%;
    min-height: 73%;
    display: flex;
    flex-direction: column;    
    /*padding: 1% 2%;*/
    border: solid black 1px;
    box-sizing: border-box;
    margin: 0.5% 0.5% 0 0.5%;
}


.chatBox{
    background: #eee;
    flex:1;
    padding : 0.3em 0.8em 0 0.8em;
    border:solid 1px black;
    overflow-y: scroll;
}

.inputContainer{  
  display: flex;
  flex-wrap: wrap;
  margin:0.2em 0;
  padding: 0.2em;
}

.inputContainer input, .inputContainer textarea{
  width: 100%;
  margin:0.1em 0;
}

textarea{
  resize:none;
  max-height: 40%
}

</style>
