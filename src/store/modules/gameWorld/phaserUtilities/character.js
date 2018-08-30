import { Grow } from './../index' // necessary?

import store from '../../../index'

export default class Character extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
    	// create this.template = new Template() with config in the scene that uses the character
        super(config.scene, config.x, config.y, config.key, config.furtherVar); 
 		
 	    let scene = config.scene;
        
        //define further variables for this character

        // helps to identify in group: this.characters // not used yet
        this.characterNumber = config.furtherVar.characterNumber;

        this.name = config.furtherVar.name;
        this.interaction = config.furtherVar.interaction;

        scene.physics.world.enable(this);
        this.setSize(56, 56)
        this.setDisplaySize(56,56);
        this.setOffset(35, 28);
        this.setImmovable(true);


        scene.physics.add.collider(scene.player, this, 

            function(){
    
          if(scene.player.spaceBar.isDown){
              scene.player.actionCounter++
        
              if(scene.player.actionCounter === 1){
                // Could be useful for mapping player actions later on
                  scene.player.characterInteraction = [this.interaction, this.name]; 
                  
                  if(this.interaction === 'dialogue'){ store.dispatch('dialogue/loadDialogue'); };
        
                  //Set timeout sets this to window!
                  setTimeout(function(){ Grow.scene.scenes[2].player.actionCounter = 0}, 1000);
        
      }}}, null, this);


        scene.add.existing(this);

        scene.characters.add(this); 
    } // End of constructor

    // update different numbers
    updateDialogue(){
      // at the moment only specified for townscene!!!
      let scene = Grow.scene.scenes[2]
    // Updating different kind of actions - in this case 'Dialogue' -- move to character
        if(scene.player.spaceBar.isDown && scene.player.actionCounter === 0){

          store.dispatch('dialogue/loadDialogue', scene.player.characterLastContacted);

          scene.player.actionCounter++
          scene.player.spaceBar.isDown = false;

          // Time until people can continue the dialogue 350ms
          setTimeout(function(){ Grow.scene.scenes[2].player.actionCounter = 0}, 350);
        } 
    }

    updateOptions(){
      let scene = Grow.scene.scenes[2]

        console.log(scene.player.cursors.down.isDown, scene.player.cursors.up.isDown)

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
          setTimeout(function(){ Grow.scene.scenes[2].player.actionCounter = 0}, 100);
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
          setTimeout(function(){ Grow.scene.scenes[2].player.actionCounter = 0}, 100);
        } 
    }


//if currentOption selected is < 0 select currentOption.length;

 } // End of export