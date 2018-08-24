import { Scene } from 'phaser'

import createNPCs from './../utilities/createNPCs'
import playerModule from './../utilities/player'
import dialogueModule from './../utilities/dialogue'

import Phaser from 'phaser'

import { MAP_TOWN, IMAGE_TOWN } from '../constants/assets';

//Town Scene
import examplePNG from "./../assets/tilesets/tuxmon-sample-32px-extruded.png"
import exampleJSON from "./../assets/tilemaps/tuxemon-town.json"

import exampleCharacterPNG from './../assets/atlas/atlas.png'
import exampleCharacterJSON from './../assets/atlas/atlas.json'

import exampleCharacter from './../assets/sprites/player.png'
import thorsten from './../../../../../static/raw_sprites/spritesmith/npcs/npc_aprilFool.png'
import discutor from './../../../../../static/raw_sprites/spritesmith/npcs/npc_tyler.png'


let cursors;
let keys = {
          spaceBar: false,
        };
let you = {
          inAction: false,
          isAllowedToMove: true,
          contactWithCharacter: false,
          characterLastContacted: null,
        };
let player;
let showDebug = false;
let anims;

let NPCs;
let Tommy;
let Thorsten;
let Discutor;
let conversation = {
  'pointInConversation': 0,
  'discutor': ['1','2','3'],
};


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
  const map = this.make.tilemap({ key: "map" });

  // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
  // Phaser's cache (i.e. the name you used in preload)
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

  // Object layers in Tiled let you embed extra info into a map - like a spawn point or custom
  // collision shapes. In the tmx file, there's an object layer with a point named "Spawn Point"
  const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");

  // Create a sprite with physics enabled via the physics system. The image used for the sprite has
  // a bit of whitespace, so I'm using setSize & setOffset to control the size of the player's body.
  player = this.physics.add
    .sprite(spawnPoint.x, spawnPoint.y, "atlas", "misa-front")
    .setSize(30, 40)
    .setOffset(0, 24);

  // Watch the player and worldLayer for collisions, for the duration of the scene:
  this.physics.add.collider(player, worldLayer);

  // Create the player's walking animations from the texture atlas. These are stored in the global
  // animation manager so any sprite can access them.
  anims = this.anims;
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
  });

  const camera = this.cameras.main;
  camera.startFollow(player);
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  cursors = this.input.keyboard.createCursorKeys();

  // Help text that has a "fixed" position on the screen
  this.add
    .text(16, 16, 'Welcome to Grow Playground', {
      font: "18px monospace",
      fill: "#000000",
      padding: { x: 20, y: 10 },
      backgroundColor: "#ffffff"
    })
    .setScrollFactor(0)
    .setDepth(30);

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
  });

  keys.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  // Add character to scene
  //NPCs = scene.physics.add.group(children, npcConfig).setImmovable(true);;

  // Thorsten techno music
  Thorsten = this.physics.add
    .sprite(370, 840, 'thorsten')
    .setSize(80,80)
    .setOffset(20,20)
    .setImmovable(true)

  Thorsten.setDisplaySize(80,80)
  
  this.physics.add.collider(player, Thorsten, function(){you.contactWithCharacter = true; you.characterLastContacted = 'Thorsten'; setTimeout(function(){ you.contactWithCharacter = false; }, 1000);}, null, this);

  // Tommy epic music
  Tommy = this.physics.add
    .sprite(440,840, 'exampleCharacter')
    .setSize(32, 32)
    .setOffset(0, 0)
    .setImmovable(true);

  Tommy.setDisplaySize(40,40)

 
  this.physics.add.collider(player, Tommy, function(){you.contactWithCharacter = true; you.characterLastContacted = 'Tommy'; setTimeout(function(){ you.contactWithCharacter = false; }, 1000);}, null, this);
  

  // Discutor! Discussion
  Discutor = this.physics.add
    .sprite(340,1120, 'discutor')
    .setSize(60, 60)
    .setOffset(30, 30)
    .setImmovable(true);

  Discutor.setDisplaySize(60,60)

 
  this.physics.add.collider(player, Discutor, function(){you.contactWithCharacter = true; you.characterLastContacted = 'Discutor'; setTimeout(function(){ you.contactWithCharacter = false; }, 1000);}, null, this);
  
  


}

update(time, delta) {
  



  // Movement
  if (you.isAllowedToMove === true){
  const speed = 300
  const prevVelocity = player.body.velocity.clone();
  

  //console.log(player.x, player.y)

  // Stop any previous movement from the last frame
  player.body.setVelocity(0);

  // Horizontal movement
  if (cursors.left.isDown) {
    player.body.setVelocityX(-speed);
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(speed);
  }

  // Vertical movement
  if (cursors.up.isDown) {
    player.body.setVelocityY(-speed);
  } else if (cursors.down.isDown) {
    player.body.setVelocityY(speed);
  }

  // Normalize and scale the velocity so that player can't move faster along a diagonal
  player.body.velocity.normalize().scale(speed);

  // Update the animation last and give left/right animations precedence over up/down animations
  if (cursors.left.isDown) {
    player.anims.play("misa-left-walk", true);
  } else if (cursors.right.isDown) {
    player.anims.play("misa-right-walk", true);
  } else if (cursors.up.isDown) {
    player.anims.play("misa-back-walk", true);
  } else if (cursors.down.isDown) {
    player.anims.play("misa-front-walk", true);
  } else {
    player.anims.stop();

    // If we were moving, pick an idle frame to use
    if      (prevVelocity.x < 0) player.setTexture("atlas", "misa-left");
    else if (prevVelocity.x > 0) player.setTexture("atlas", "misa-right");
    else if (prevVelocity.y < 0) player.setTexture("atlas", "misa-back");
    else if (prevVelocity.y > 0) player.setTexture("atlas", "misa-front");
  }
 
  /*if(this.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
    console.log('yeeehaaa')
  }*/

  // I don't know yet how to stop the animation after keypress, this should happen automatically
  // but this is currently not the case, I think because of how we installed the thing, maybe it will work if we run it like a vue app?
   cursors.left.isDown = false;
   cursors.right.isDown = false;
   cursors.up.isDown = false;
   cursors.down.isDown = false;
  
  } //End of player is allowed to move function


  // Check if player is colliding with action layer of the world!
  if(!keys.spaceBar.isDown && you.inAction){
           you.inAction = false;
        }
        
        if(keys.spaceBar.isDown && !you.inAction && you.contactWithCharacter){
           you.inAction = true;

           console.log(you.characterLastContacted)

           if(you.characterLastContacted === 'Tommy' || you.characterLastContacted === 'Thorsten'){
             this.playMusic();
           } else if (you.characterLastContacted === 'Discutor'){
             this.dialogue();
           }


          
           
        }
}


playMusic(){
  // Load iframe with youtube music

  // 1st try: Load element outside of phaser game: Box :check!
  //playerModule.state.escapePressed = true;

  // 2nd try: Open new tab with music :check! with several NPCs :check
  if(you.characterLastContacted === 'Thorsten'){
    console.log('Thorsten: opening tab to play music: Techno!')
    window.open('https://music.youtube.com/watch?v=wNPiGiQNNrU&list=RDAMPLPLhc9cpTh-PxX1cw-8qEfEKUSlTzY3l3Dw');
  } if(you.characterLastContacted === 'Tommy'){
    console.log('Tommy: opening tab to play music: Epic!')
    window.open('https://music.youtube.com/watch?v=fuO2JWumMZ0&list=RDQMoLN4u0LZsho');
  }  
}


dialogue(){
  // player is locked to conversation until he finished all the boxes! 

  // lock player's movement // Collide doesn't work with no moving
  //you.isAllowedToMove = false;
 
  // have a console.log with the first message
  dialogueModule.state.showDialogueBox = true
  //dialogueModule.$emit('toggleDialogueBox');
  //store.dialogue.dispatch('toggleDialogueBox');
  //dialogueModule.dialogue()

  store.dispatch('dialogueExample')

  console.log('3,2,'+ conversation.discutor[conversation.pointInConversation] +'')
  
  // if the person presses space it continues to the next message until conversation ends
  conversation.pointInConversation++
  
  // if the conversation ends make player move again
  if (conversation.pointInConversation >=  conversation.discutor.length){
    conversation.pointInConversation = 0;
    you.isAllowedToMove = true; 
  }

}

};