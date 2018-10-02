import { Grow } from './../index'

import store from '../../../index'

export function updateDialogue(){
       let scene = Grow.scene.scenes[store.state.player.sceneActive];
       

      
        // Updating different kind of actions - in this case 'Dialogue' -- move to character
        if(scene.player.cursors.space.isDown && scene.player.actionCounter === 0){
          // Variable is set to 'string (function in string form) that can be evaluated'

          if (store.state.dialogue.functionToBeCalled){

            eval ( 

              store.state.dialogue.functionToBeCalled 

              )

          } 

          store.commit('dialogue/emptyDialogueFunction')
          // If variable is defined it is evaluated here
          // otherwise proceed as normal
          // Clean out afterwards
          store.dispatch('dialogue/loadDialogue', scene.player.characterLastContacted)

          scene.player.actionCounter++
          scene.player.cursors.space.isDown = false;

          // Time until people can continue the dialogue 350ms
          setTimeout(function(){ scene.player.actionCounter = 0}, 350);
        } 
}

    // Called in scene
export function updateOptions(){
       let scene = Grow.scene.scenes[store.state.player.sceneActive];

        if(scene.player.cursors.down.isDown && scene.player.actionCounter === 0){
          

          //if currentOption selected > length select 0;  
          if(store.state.dialogue.currentMessage.optionSelected === store.state.dialogue.currentMessage.options.length - 1){
            store.dispatch('dialogue/selectDifferentOption', 0);
          } else {
          //else currentOption++
            store.dispatch('dialogue/selectDifferentOption', 1)
          }

          scene.player.actionCounter++
          scene.player.cursors.down.isDown = false;

          // Time until people can continue the dialogue 350ms
          setTimeout(function(){ scene.player.actionCounter = 0}, 100);
        } else if(scene.player.cursors.up.isDown && scene.player.actionCounter === 0){
       
          //if currentOption selected > length select 0;  
          if(store.state.dialogue.currentMessage.optionSelected === 0){
            store.dispatch('dialogue/selectDifferentOption', store.state.dialogue.currentMessage.options.length - 1);
          } else {
          //else currentOption++
            store.dispatch('dialogue/selectDifferentOption', -1)
          }

          scene.player.actionCounter++
          scene.player.cursors.up.isDown = false;

          // Time until people can continue the dialogue 350ms
          setTimeout(function(){ scene.player.actionCounter = 0}, 100);
        } else if(scene.player.cursors.space.isDown && scene.player.actionCounter === 0){
          
          store.dispatch('dialogue/takeOption')

          scene.player.actionCounter++
          scene.player.cursors.space.isDown = false;

          // Time until people can continue the dialogue 350ms
          setTimeout(function(){ scene.player.actionCounter = 0}, 350);
        }
}

export function updateUserInput(){
       let scene = Grow.scene.scenes[store.state.player.sceneActive];

        if(scene.player.cursors.space.isDown && scene.player.actionCounter === 0){
           
           scene.player.actionCounter++
           scene.player.cursors.space.isDown = false;

           document.getElementById('dialogueUserInput').value = document.getElementById('dialogueUserInput').value + ' ';

           setTimeout(function(){ scene.player.actionCounter = 0 }, 10);
}
}
