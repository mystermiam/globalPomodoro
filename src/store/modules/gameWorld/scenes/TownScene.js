// Example code:

//store.getters['moduleName/getterName']
//store.state.dialogue.showDialogueBox = true;
//store.dispatch('dialogue/startDialogue', Player.characterLastContacted);

import { Scene } from 'phaser'

import createNPCs from './../utilities/createNPCs'
//import dialogueModule from './../utilities/dialogue'


import { Grow } from './../index' // necessary?

import store from '../../../index'

import Phaser from 'phaser'

import { MAP_TOWN, IMAGE_TOWN } from '../constants/assets';

//Town Scene
import examplePNG from "./../assets/tilesets/tuxmon-sample-32px-extruded.png"
import exampleJSON from "./../assets/tilemaps/tuxemon-town.json"

import exampleCharacterPNG from './../assets/atlas/atlas.png'
import exampleCharacterJSON from './../assets/atlas/atlas.json'

import exampleCharacter from './../assets/sprites/player.png'
//import exampleCharacter from '@/store/assets/sprites/player.png'

import thorsten from './../../../../../static/raw_sprites/spritesmith/npcs/npc_aprilFool.png'
import discutor from './../../../../../static/raw_sprites/spritesmith/npcs/npc_tyler.png'


import Player from './../phaserUtilities/player'


let cursors;
let keys = {
          spaceBar: false,
        };

let showDebug = false;
let anims;

let NPCs;
let Tommy;
let Thorsten;
let Discutor;
 
export default class TownScene extends Scene {

  constructor () {
    super({ key: 'TownScene' })
  }

preload() {
  this.load.image("tiles", examplePNG );
  this.load.tilemapTiledJSON("map", exampleJSON);
  // An atlas is a way to pack multiple images together into one texture. I'm using it to load all
  // the player animations (walking left, walking right, etc.) in one image. For more info see:
  //  https://labs.phaser.io/view.html?src=src/animation/texture%20atlas%20animation.js
  // If you don't use an atlas, you can do the same thing with a spritesheet, see:
  //  https://labs.phaser.io/view.html?src=src/animation/single%20sprite%20sheet.js
  this.load.atlas("atlas", exampleCharacterPNG, exampleCharacterJSON);
  
  this.load.spritesheet('exampleCharacter', exampleCharacter, {frameWidth: 32, frameHeight: 32});
  this.load.spritesheet("thorsten", thorsten,  {frameWidth: 120, frameHeight: 120} );
  this.load.spritesheet("discutor", discutor,  {frameWidth: 100, frameHeight: 100} );
}

create() {
  // Loading TileMap
  const map = this.make.tilemap({ key: "map" });

  // Parameters are the name character gave the tileset in Tiled and then the key of the tileset image in
  // Phaser's cache (i.e. the name character used in preload)
  const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");

  // Parameters: layer name (or index) from Tiled, tileset, x, y
  const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
  const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
  const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

  worldLayer.setCollisionByProperty({ collides: true });

  // By default, everything gets depth sorted on the screen in the order we created things. Here, we
  // want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
  // Higher depths will sit on top of lower depth objects.
  aboveLayer.setDepth(10);

  // Object layers in Tiled let character embed extra info into a map - like a spawn point or custom
  // collision shapes. In the tmx file, there's an object layer with a point named "Spawn Point"
  const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");

  // LOAD PLAYER
  this.player = new Player({
            scene: this,
            key: 'atlas',
            x: spawnPoint.x,
            y: spawnPoint.y
        });

  // Watch the player and worldLayer for collisions, for the duration of the scene:
  this.physics.add.collider(this.player, worldLayer);

  // CAMERA
  const camera = this.cameras.main;
  camera.startFollow(this.player);
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);


  // ADD KEYS
  keys.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  // Welcome text that has a "fixed" position on the screen
  this.add
    .text(16, 16, 'Welcome to Grow Playground', {
      font: "18px monospace",
      fill: "#000000",
      padding: { x: 20, y: 10 },
      backgroundColor: "#ffffff"
    })
    .setScrollFactor(0)
    .setDepth(30);


// CHARACTERS 

  // Thorsten techno music
  Thorsten = this.physics.add
    .sprite(370, 840, 'thorsten')
    .setSize(80,80)
    .setOffset(20,20)
    .setImmovable(true)

  Thorsten.setDisplaySize(80,80)
  
  this.physics.add.collider(this.player, Thorsten, function(){this.player.contactWithCharacter = true; this.player.characterLastContacted = 'Thorsten'; setTimeout(function(){ this.player.contactWithCharacter = false; }, 1000);}, null, this);

  // Tommy epic music
  Tommy = this.physics.add
    .sprite(440,840, 'exampleCharacter')
    .setSize(32, 32)
    .setOffset(0, 0)
    .setImmovable(true);

  Tommy.setDisplaySize(40,40)

 
  this.physics.add.collider(this.player, Tommy, function(){Player.contactWithCharacter = true; Player.characterLastContacted = 'Tommy'; setTimeout(function(){ Player.contactWithCharacter = false; }, 1000);}, null, this);
  

  // Discutor! Discussion
  Discutor = this.physics.add
    .sprite(340,1120, 'discutor')
    .setSize(60, 60)
    .setOffset(30, 30)
    .setImmovable(true);

  Discutor.setDisplaySize(60,60)

 
  //this.physics.add.collider(this.player, Discutor, function(){Player.contactWithCharacter = true; Player.characterLastContacted = 'Discutor'; setTimeout(function(){ Player.contactWithCharacter = false; }, 1000);}, null, this);
  this.physics.add.collider(this.player, Discutor, 

      function(){
      this.player.actionCounter++
      console.log(this.player.actionCounter)
      if(this.player.actionCounter === 1){
      console.log('triggered')
      this.player.characterInteraction = ['dialogue', 'Discutor']; 

      store.dispatch('dialogue/loadDialogue');
      // This.player is not accessible in timeout, this = window
      setTimeout(function(){ Grow.scene.scenes[2].player.actionCounter = 0}, 1000);
   
    }}, null, this);

}

update(time, delta) {
  // Update movement
  this.player.move();
  
  if(keys.spaceBar.isDown && !this.player.inAction && this.player.contactWithCharacter){
     
     this.player.inAction = true;
    
     if(this.player.characterLastContacted === 'Tommy' || this.player.characterLastContacted === 'Thorsten'){
       this.playMusic();
     } 
  
  // After 250 ms set playerinaction to false?

   // keys.spaceBar.isDown = false;
}

   if(keys.spaceBar.isDown && this.player.actionCounter === 0 && this.player.inDialogue){

      store.dispatch('dialogue/loadDialogue', this.player.characterLastContacted);

      this.player.actionCounter++
      keys.spaceBar.isDown = false;

      setTimeout(function(){ Grow.scene.scenes[2].player.actionCounter = 0}, 1000);
  }

} // End of update







playMusic(){
  // Load iframe with youtube music

  // 2nd try: Open new tab with music :check! with several NPCs :check
  if(Player.characterLastContacted === 'Thorsten'){
    console.log('Thorsten: opening tab to play music: Techno!')
    window.open('https://music.youtube.com/watch?v=wNPiGiQNNrU&list=RDAMPLPLhc9cpTh-PxX1cw-8qEfEKUSlTzY3l3Dw');
  } if(Player.characterLastContacted === 'Tommy'){
    console.log('Tommy: opening tab to play music: Epic!')
    window.open('https://music.youtube.com/watch?v=fuO2JWumMZ0&list=RDQMoLN4u0LZsho');
  }  
}

getPositionOfCursor() {
  return [this.input.activePointer.x,this.input.activePointer.y]
}

}












/* Graveyard

/*let you = {
          inAction: false,
          isAllowedToMove: true,
          contactWithCharacter: false,
          characterLastContacted: null,
        };*/

  /*
  player = this.physics.add
    .sprite(spawnPoint.x, spawnPoint.y, "atlas", "misa-front")
    .setSize(30, 40)
    .setOffset(0, 24);

  */


  // Create the player's walking animations from the texture atlas. These are stored in the global
  // animation manager so any sprite can access them.
  /*anims = this.anims;
  anims.create({
    key: "misa-left-walk",
    frames: anims.generateFrameNames("atlas", { prefix: "misa-left-walk.", start: 0, end: 3, zeroPad: 3 }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: "misa-right-walk",
    frames: anims.generateFrameNames("atlas", { prefix: "misa-right-walk.", start: 0, end: 3, zeroPad: 3 }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: "misa-front-walk",
    frames: anims.generateFrameNames("atlas", { prefix: "misa-front-walk.", start: 0, end: 3, zeroPad: 3 }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: "misa-back-walk",
    frames: anims.generateFrameNames("atlas", { prefix: "misa-back-walk.", start: 0, end: 3, zeroPad: 3 }),
    frameRate: 10,
    repeat: -1
  });*/




    /*
  // Debug graphics
  this.input.keyboard.once("keydown_D", event => {
    // Turn on physics debugging to show player's hitbox
    this.physics.world.createDebugGraphic();

    // Create worldLayer collision graphic above the player, but below the help text
    const graphics = this.add
      .graphics()
      .setAlpha(0.75)
      .setDepth(20);
    worldLayer.renderDebug(graphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });
*/

