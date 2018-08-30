import { Grow } from './../index' // necessary?

import store from '../../../index'

export default class Character extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
    	// create this.template = new Template() with config in the scene that uses the character
        super(config.scene, config.x, config.y, config.key, config.furtherVar); 
 		
 	    let scene = config.scene;
        
        this.variable = 0;
        this.call = config.furtherVar.realName

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

                  scene.player.characterInteraction = ['dialogue', 'Discutor']; 

                  store.dispatch('dialogue/loadDialogue');
        
                  //Set timeout sets this to window!
                  setTimeout(function(){ Grow.scene.scenes[2].player.actionCounter = 0}, 1000);
        
      }}}, null, this);


        config.scene.add.existing(this);
    } // End of constructor


    updateFunction(time, delta) {
    	// call from scene
        console.log('hello')
    }

    calling(){
            console.log('helloooo')
    }


 } // End of export