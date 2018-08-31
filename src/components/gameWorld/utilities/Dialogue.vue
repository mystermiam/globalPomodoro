<template>
  <div id='dialogueContainer' v-show='showDialogueBox'>

    <div v-show='currentMessage.kindOfMessage === "normal"'>
     <span id='dialogue-name'>{{currentMessage.person}}</span><br>

     <span id='dialogue-text'>{{currentMessage.message}}</span>
    </div>

    <div v-show='currentMessage.kindOfMessage === "option"'>
      <span id='dialogue-name'>Player</span><br>

      <ul>
        <li v-for='(option, index) in currentMessage.options' 
        class='dialogue-option' 
        v-bind:class='{ optionHighlighted: currentMessage.optionSelected === index }'>{{option[0]}}
        </li>
      </ul>

    </div>



    <div v-show='currentMessage.kindOfMessage === "addLink"'>
      <span>You can add your link below:</span><br><br>
      <input id='inputToAddLink'></input><button @click='addLinkToCharacter'>Add to Character</button>
    </div>
  
  </div>

</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'Dialogue',
  
  components : {
  
  },
     
  computed : {
   ...mapState('dialogue',{
      currentMessage:'currentMessage', 
      showDialogueBox: 'showDialogueBox',   
    }),

  },

 methods: {
  ...mapActions('dialogue',{
      addLinkToCharacter: 'addLinkToCharacter',
    })
  },

 

  
};
</script>


<style scoped>
  body {
     font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  }

  #dialogueContainer{
    display: inline-block;
    padding: 10px;
    width: 800px;
    height: 120px;
    border: 4px double darkblue;
    background-color: #5AB9EA;
    color: black;
    opacity: 0.95;
    position: absolute;
    left: 0;
    top: 0;

  }

  #dialogue-name{
    font-size: 20px;
    font-weight: bold;
  }

  #dialogue-text{
    overflow: hidden; /* Ensures the content is not revealed until the animation */
    letter-spacing: .15em; /* Adjust as needed */
    animation: typing 3.5s steps(40, end), blink-caret .75s step-end infinite;
  }

/* The typing effect */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: orange; }
}




#dialogue-option {
  border: 1px solid darkblue;
  background-color: white;
  margin: 10px;
}

.optionHighlighted {
  background-color: yellow !important;
}
</style>
