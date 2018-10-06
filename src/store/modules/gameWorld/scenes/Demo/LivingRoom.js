// BUGS: 

import { Scene } from 'phaser'

import { Grow } from './../../index' // necessary? 3 times games phaser, scene, Grow

import store from '../../../../index'

// Import Tilemaps here
import map from './../../assets/tilemaps/mamsfloor.json'

import tiles0 from './../../assets/tilesets/Inside_B.png'
import tiles1 from './../../assets/tilesets/Inside_A4.png'
import tiles2 from './../../assets/tilesets/SF_Inside_B.png'

// Import Music here
import backgroundMusic from './../../assets/music/background/Town_Music.mp3'



// Import Sprites.js here
import Player from './../../phaserUtilities/player'

import Character from './../../phaserUtilities/character'


// Import images here
import star from './../../assets/star.png'
import vicky from './../../assets/sprites/npc_vicky.png'

// Import external functions
import loadScene from './../../phaserUtilities/loadScene'
import {updateDialogue, updateOptions, updateUserInput} from './../../phaserUtilities/phaserDialogue'


export default class LivingRoom extends Scene {

  constructor () {
    super({ key: 'LivingRoom' })
  }

preload() {
    // Load basic functions that exist in every map
    loadScene(this, 'preload');

      this.load.image("vicky", vicky );

    // Load MAP
    // Make sure this has the right type (name after mapName)
      this.load.image("tilesLivingRoom0", tiles0 );
      this.load.image("tilesLivingRoom1", tiles1 );
      this.load.image("tilesLivingRoom2", tiles2 );
    
      this.load.image("star", star);
    
    this.load.tilemapTiledJSON("LivingRoom", map);

    


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


  this.map = this.make.tilemap({ key: "LivingRoom" });

  // Find name inside of tilemap
  const tilesetBedroom0 = this.map.addTilesetImage("Inside_B", "tilesLivingRoom0");
  const tilesetBedroom1 = this.map.addTilesetImage("Inside_A4", "tilesLivingRoom1");
  const tilesetBedroom2 = this.map.addTilesetImage("SF_Inside_B", "tilesLivingRoom2");
  
  // Parameters: layer name (or index) from Tiled, tileset, x, y
  const belowLayer = this.map.createStaticLayer("Below Player", [tilesetBedroom0,tilesetBedroom1,tilesetBedroom2], 0, 0);
  const worldLayer = this.map.createStaticLayer("Collision Layer", [tilesetBedroom0,tilesetBedroom1,tilesetBedroom2], 0, 0);
  const aboveLayer = this.map.createStaticLayer("Above Player", [tilesetBedroom0,tilesetBedroom1,tilesetBedroom2], 0, 0);

  worldLayer.setCollisionByProperty({ collides: true });

  // By default, everything gets depth sorted on the screen in the order we created things. Here, we
  // want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
  // Higher depths will sit on top of lower depth objects.
  aboveLayer.setDepth(10);

  // Load basic functions that exist in every scene
  loadScene(this, 'create');

  // Watch the player and worldLayer for collisions, for the duration of the scene:
  this.physics.add.collider(this.player, worldLayer);
  
let MomDialogue = [
['Mom', "Hey Arya! Before you go out, can you please put the memory that you dropped on the floor back into your room"],
['option', 
  ["Sure, just give me a second and I'll be back!", [3]],
  ["What do you mean with 'memory', I don't understand?", [2]],  
],
['Mom', "Since a few years, when you like things on the web, the government drop things in your house. Stars, Teddybears, those people drop all kinds of stuff", [1]],
['Mom', 'Make sure you place it somewhere, where you can access it! Remember that the space detection does not work properly yet', 
  [100, 
  "scene.star.enableBody(true, scene.star.x, scene.star.y, true, true);", 
  "vueStore.dispatch('dialogue/changeDialogueStartsAt', [2, 'Mom', 4])", 
  "vueStore.commit('player/addSceneToList', 'PlaceStarScene')"],
],


['Mom', "Grab the stars and take it"],
];


this.Mom = new Character({
          scene: this,
          key: 'vicky',
          x: 100,
          y: 100,
          furtherVar: [
            ['characterNumber', 0],
            ['name', 'Mom'],
            ['interaction', 'dialogue'],
            ['dialogue', MomDialogue],  
            ['dialogueStartsAt', 0],
            ['size', [60,60]],
            ['offSet', [-10,10]],
          ]
      }); 

  // Items one can find 
  this.itemsOneCanFind = this.physics.add.group()

  this.createItem('star', 90 , 340 , 'https://www.youtube.com/watch?v=Gzm_mcLyMVo', 'Classcraft - games in the classroom');


  this.star.disableBody(true, true);



  this.physics.add.collider(this.player, this.itemsOneCanFind, this.collectItem, null, this); // how to find the item in itemsonecanfind?

  
  
  // Search for objects --> townSpawn

  // Maybe change the condition eventually
if(Grow.townDoorBlock){
  let doorBlock = this.map.findObject("Objects", obj => obj.name === "TownDoorBlock");
  this.doorBlock = this.physics.add.sprite(doorBlock.x, doorBlock.y);
  this.doorBlock.body.width = doorBlock.width;
  this.doorBlock.body.height = doorBlock.height;
  this.doorBlock.displayOriginX = 0;
  this.doorBlock.displayOriginY = 0;
  this.doorBlock.setImmovable(true);
  this.physics.add.collider(this.player, this.doorBlock, this.townDoorBlock, null, this); 
  
  let townDoorBlockDialogue = [
    ['Arya', "We should first talk to mom and see what she says!"],
  ]

  store.dispatch('dialogue/addDialogue', ['townDoorBlockDialogue', townDoorBlockDialogue])
} 
  // Create collide function
  // remove if the star is placed



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



// Add functions here
townDoorBlock(){
 let scene = Grow.scene.scenes[store.state.player.sceneActive]; 

  scene.player.characterInteraction[0] = 'dialogue' 

  store.dispatch('dialogue/loadDialogue', 'townDoorBlockDialogue') 
};


collectItem(player, item){
  let scene = Grow.scene.scenes[store.state.player.sceneActive]; 

  let FindingStar = [
    ['Arya', "Okay, let's place it in the bedroom."],
  ]


  store.dispatch('dialogue/addDialogue', ['FindingStar', FindingStar])

  scene.player.characterInteraction[0] = 'dialogue' 

  

  store.dispatch('dialogue/loadDialogue', 'FindingStar') 
  
  store.commit('player/addSceneToList', 'PlaceStarScene')

  


  // Get item name
  
  // dispatch dialogue eventually, detached from character 
  // this.player.characterInteraction = ['itemFound', 'itemID']
  
  // add item to createNPC objectsInInventory // push whatever information is needed
    store.dispatch('createNPCs/findItem', [item.name,item.key,item.link])
  
  //alert('You found an item, use "i" to open your itembox and use it')
  // Remove item 
  this[item.key].disableBody(true, true);


}

createItem(key, x, y, link, linkTitle){
  // Create individual name depending on location! 
  // Unfinished: this['item' + x + y] - Should it mention or be equal to scene number like in createNPCs/gameContainerClicked
  this[key] = this.itemsOneCanFind.create(x, y, key);
 

  // Add a link to the item
  if (link && linkTitle) { 
    this[key].link = link;
    this[key].linkTitle = linkTitle;
  } else if (link){ this[key].link = link; }
 
  this[key].key = key;
  this[key].name = 'item' + x + y;

  // Make character interactive so that he reacts to click events
  this[key].setInteractive();

  this[key].on('pointerover', () => { 

  // should be only added once
  this.hoverText = this.add.text(x + 110, y + 95, 'Pick up this star',
                                        {
                                          font: "10px monospace",
                                          fill: "#000000",
                                          padding: { x: 20, y: 10 },
                                          backgroundColor: "#ffffff"
                                        })
                                        .setScrollFactor(0)
                                        .setDepth(30);


  });

  this[key].on('pointerout', () => {
    this.hoverText.setText('')
  });

}







} // End of Export