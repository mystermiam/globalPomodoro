import { Scene } from 'phaser'

import { Grow } from './../../index' // necessary? 3 times games phaser, scene, Grow

import store from '../../../../index'

// Import Tilemaps here
import tiles0 from './../../assets/tilesets/Inside_A4.png'
import tiles1 from './../../assets/tilesets/Inside_B.png'
import tiles2 from './../../assets/tilesets/SF_Inside_B.png'
import tiles3 from './../../assets/tilesets/mack_char01.png'

import bedroom from './../../assets/tilemaps/bedroom.json'

// Import Music here
import backgroundMusic from './../../assets/music/background/Town_Music.mp3'

// Import images here
import star from './../../assets/star.png'

// Import Sprites.js here
import Player from './../../phaserUtilities/player'

import Character from './../../phaserUtilities/character'


// Import external functions
import loadScene from './../../phaserUtilities/loadScene'
import {updateDialogue, updateOptions, updateUserInput} from './../../phaserUtilities/phaserDialogue'


export default class Bedroom extends Scene {

  constructor () {
    super({ key: 'Bedroom' })
  }

preload() {
    // Load basic functions that exist in every map
    loadScene(this, 'preload');

    // Load MAP
    // Make sure this has the right type (name after mapName)
      this.load.image("tilesBedroom0", tiles0 );
      this.load.image("tilesBedroom1", tiles1 );
      this.load.image("tilesBedroom2", tiles2 );
      this.load.image("tilesBedroom3", tiles3 );

      this.load.image("star", star);
    
    
    this.load.tilemapTiledJSON("mapBedroom", bedroom);

    


    // Takes too damn long, load in bootscene and then play maybe
    // this.load.audio('backgroundMusic', backgroundMusic)
}

create() {
  // Add and play the music // make it toggleAble
  /*
        this.music = this.sound.add('backgroundMusic');
        this.music.play({
            loop: true
        });
  */


  this.map = this.make.tilemap({ key: "mapBedroom" });

  // Find name inside of tilemap
  const tilesetBedroom0 = this.map.addTilesetImage("Inside_A4", "tilesBedroom0");
  const tilesetBedroom1 = this.map.addTilesetImage("Inside_B", "tilesBedroom1");
  const tilesetBedroom2 = this.map.addTilesetImage("SF_Inside_B", "tilesBedroom2");
  const tilesetBedroom3 = this.map.addTilesetImage("mack_char01", "tilesBedroom3");
  
  // Parameters: layer name (or index) from Tiled, tileset, x, y
  const belowLayer = this.map.createStaticLayer("Below Player", [tilesetBedroom0,tilesetBedroom1,tilesetBedroom2,tilesetBedroom3], 0, 0);
  const worldLayer = this.map.createStaticLayer("Collision Layer", [tilesetBedroom0,tilesetBedroom1,tilesetBedroom2,tilesetBedroom3], 0, 0);
  const aboveLayer = this.map.createStaticLayer("Above Player", [tilesetBedroom0,tilesetBedroom1,tilesetBedroom2,tilesetBedroom3], 0, 0);

  worldLayer.setCollisionByProperty({ collides: true });

  // By default, everything gets depth sorted on the screen in the order we created things. Here, we
  // want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
  // Higher depths will sit on top of lower depth objects.
  aboveLayer.setDepth(10);

  // Load basic functions that exist in every scene
  loadScene(this, 'create');

  // Watch the player and worldLayer for collisions, for the duration of the scene:
  this.physics.add.collider(this.player, worldLayer);



  this.beginningScene();



} // End of Create

update(time, delta) {
  // Update movement - triggers phaserutilities/player.js
  if(this.player.isAllowedToMove){
  
    this.player.move();

  //Update dialogue functions - triggers phaserDialogue.js
  } else if(this.player.characterInteraction[0] === 'dialogue'){
    
    updateDialogue()

  } else if (this.player.characterInteraction[0] === 'option'){
    
    updateOptions()

  } else if (this.player.characterInteraction[0] === 'userInput'){
    
    updateUserInput()

  }
} // End of update



// Add functions here!
beginningScene(){

let scene = Grow.scene.scenes[store.state.player.sceneActive]; 

// Character looks down  
this.player.setTexture("atlas", "misa-back")
// Disable character movement
this.player.isAllowedToMove = false;

let BeginningDialogue = [
['Arya', 'Hey there Stranger, my Name is Arya. Welcome to Grow - A community journey.'],
['Arya', 'Before we begin. Can you tell me your name?'],
['userInput', 'What is your name?', 'player/changeUserName'],
['Arya', "Great, let's begin!"],
['Arya', "Use the arrow keys on your keyboard to move me around the place"],
['Arya', "If you want me to interact with other characters or objects, press the spacebar in the center of your keyboard!"],
['option',
  ['Okay, I understand', ["dispatch('endConversation')"]],
  ['Can you explain me the controls again?', [7]],
],
['Arya', "Sure, ask me as often as you want", 4],
];

/*
*/
// create dialogue function!

store.dispatch('dialogue/addDialogue', ['BeginningDialogue', BeginningDialogue])

scene.player.characterInteraction[0] = 'dialogue' 

store.dispatch('dialogue/loadDialogue', 'BeginningDialogue') 

// Don't show this dialogue again --> remove from scenes that are triggered // Array in player.js

}




// Movement function --> moving characters  <-- should be moved into character (external function files)
movingCharacter(character, characterKey,  movement, speedValue, i = 0){

  // Make a translate to pixels function, translates time and speed into pixels


  // I would like to be able to move characters by field?
  // There is a certain time that a character needs to move to a second field
  // Can I do this with pixels? / speed times time
  let scene = Grow.scene.scenes[store.state.player.sceneActive];

  if (i === 0 && scene.anims.anims.entries[characterKey + "-left-walk"] === undefined){
    // Load animations
    scene.anims.create({
        key: characterKey + "-left-walk",
        frames: scene.anims.generateFrameNames("atlas", { prefix: characterKey + "-left-walk.", start: 0, end: 3, zeroPad: 3 }),
        frameRate: 10,
        repeat: -1
      });
      scene.anims.create({
        key: characterKey + "-right-walk",
        frames: scene.anims.generateFrameNames("atlas", { prefix: characterKey + "-right-walk.", start: 0, end: 3, zeroPad: 3 }),
        frameRate: 10,
        repeat: -1
      });
      scene.anims.create({
        key: characterKey + "-front-walk",
        frames: scene.anims.generateFrameNames("atlas", { prefix: characterKey + "-front-walk.", start: 0, end: 3, zeroPad: 3 }),
        frameRate: 10,
        repeat: -1
      });
      scene.anims.create({
        key: characterKey + "-back-walk",
        frames: scene.anims.generateFrameNames("atlas", { prefix: characterKey + "-back-walk", start: 0, end: 3, zeroPad: 3 }),
        frameRate: 10,
        repeat: -1
      });
  }
 

  let speed = 0;
  if (speedValue !== undefined && speedValue > 0) { speed = speedValue } else { speed = 300 }

   if(movement[i][0] === 'up'){
      scene[character].body.setVelocityY(-speed)
      scene[character].anims.play(characterKey + "-back-walk", true);
   } else if(movement[i][0] === 'down'){
      scene[character].body.setVelocityY(speed)
      scene[character].anims.play(characterKey + "-front-walk", true);
   } else if(movement[i][0] === 'left'){
      scene[character].body.setVelocityX(-speed)
      scene[character].anims.play(characterKey + "-left-walk", true);
   } else if(movement[i][0] === 'right'){
      scene[character].body.setVelocityX(speed)
      scene[character].anims.play(characterKey + "-right-walk", true);
   }

     setTimeout(function(){

      let prevVelocity = scene[character].body.velocity.clone();

      scene[character].body.setVelocity(0); 

      i++;
      
      if(i < movement.length){
        
        scene.movingCharacter(character, characterKey, movement, speed, i)

      } else {
        scene[character].anims.stop();

        // If we were moving, pick an idle frame to use // Based on misa at this pointerover
        if      (prevVelocity.x < 0) scene[character].setTexture("atlas", "misa-left");
        else if (prevVelocity.x > 0) scene[character].setTexture("atlas", "misa-right");
        else if (prevVelocity.y < 0) scene[character].setTexture("atlas", "misa-back");
        else if (prevVelocity.y > 0) scene[character].setTexture("atlas", "misa-front");
      }

     }, movement[i][1]);

}  







} // End of Export