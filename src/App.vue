<template>
  <div id="app">
    <router-view>
    </router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
};

</script>

<style>
  @import '../node_modules/bulma/css/bulma.css';
html,body,#app{ height: 100%; margin: 0; }




.chatContainer{
    max-height: 400px;
    min-height: 400px;
    display: flex;
    flex-direction: column;    
    /*padding: 1% 2%;*/
    box-sizing: border-box;
    margin: 0.5% 0.5% 0 0.5%;
    clear: both;
}


.chatBox{
    overflow-y: scroll;
    background: #003C7A;
    max-height: 73%;
    min-height: 73%;
    flex:1;
    padding : 0.3em 0.8em 0 0.8em;
    box-sizing: border-box;
    border:solid 1px blue;
}

.inputContainer{  
  max-height: 26.5%;
  min-height: 26.5%;
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
  overflow: hidden;
  max-height: 40%
}

p {
  color: white;
}


</style>
