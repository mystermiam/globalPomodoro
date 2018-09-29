import { Scene } from 'phaser'

import { Grow } from './../../index' // necessary? 3 times games phaser, scene, Grow

import store from '../../../../index'

// Import Tilemaps here
import TryOutJson from './../../assets/tilemaps/TryOut.json'
import TryOutPNG from './../../assets/tilesets/interior.png'

// Import Music here
import backgroundMusic from './../../assets/music/background/Town_Music.mp3'


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
    this.load.image("tilesBedroom", TryOutPNG );
    this.load.tilemapTiledJSON("mapBedroom", TryOutJson);


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
  const tilesetBedroom = this.map.addTilesetImage("interior", "tilesBedroom");
  
  // Parameters: layer name (or index) from Tiled, tileset, x, y
  const belowLayer = this.map.createStaticLayer("Below Player", tilesetBedroom, 0, 0);
  const worldLayer = this.map.createStaticLayer("Collision Layer", tilesetBedroom, 0, 0);
  const aboveLayer = this.map.createStaticLayer("Above Player", tilesetBedroom, 0, 0);

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
this.player.setTexture("atlas", "misa-front")
// Disable character movement
this.player.isAllowedToMove = false;


let BeginningDialogue = [
['Arya', 'Hey there, my Name is Arya. Welcome to my world.'],
['Arya', 'Before we begin. Can you tell me your name?'],

];

// create dialogue function!

store.dispatch('dialogue/addDialogue', ['BeginningDialogue', BeginningDialogue])

scene.player.characterInteraction[0] = 'dialogue' 

store.dispatch('dialogue/loadDialogue', 'BeginningDialogue') 


}






} // End of Export