import { Scene } from 'phaser'

import { Grow } from './../index' // necessary? 3 times games phaser, scene, Grow

import store from '../../../index'

// Import Tilemaps here
import tiles from "./../assets/tilesets/PathAndObjects.png"
import map from "./../assets/tilemaps/EmptyGrassField.json"

// Import Images here
import star from './../assets/star.png'
import bomb from './../assets/bomb.png'
import vicky from './../assets/sprites/npc_vicky.png'
import thorsten from './../../../../../static/raw_sprites/spritesmith/npcs/npc_aprilFool.png'
import discutor from './../../../../../static/raw_sprites/spritesmith/npcs/npc_tyler.png'

// Import Sprites here 
import exampleCharacterPNG from './../assets/atlas/atlas.png'
import exampleCharacterJSON from './../assets/atlas/atlas.json'

// Import Sprites.js here (should be bundled)
import Player from './../phaserUtilities/player'
import Character from './../phaserUtilities/character'
import Shelf from './../phaserUtilities/shelf'


// Steps to take: 1) Import into scenes/index.js 
export default class EmptyGrassField extends Scene {

  constructor () {
    super({ key: 'EmptyGrassField' })
  }

preload() {

  //currently the image needs to be preloaded to be able to insert it into the game from createNPC
  this.load.image("star", star );
  this.load.image("bomb", bomb );

  this.load.spritesheet("thorsten", thorsten,  {frameWidth: 120, frameHeight: 120} );
  this.load.spritesheet("discutor", discutor,  {frameWidth: 100, frameHeight: 100} );
  this.load.spritesheet("vicky", vicky,  {frameWidth: 100, frameHeight: 100} );

  // Update which scene is currently active for Vue 
    let numberOfActiveScene = 0;
    for(let i=0;i<Grow.scene.scenes.length;i++){
      if(Grow.scene.scenes[i].sys.config.key === this.sys.config.key){
        numberOfActiveScene = i;
      }
    }
    store.dispatch('player/changeActiveScene', numberOfActiveScene);

    // Load PLAYER
    this.load.atlas("atlas", exampleCharacterPNG, exampleCharacterJSON);
    
    // Load MAP
    // Make sure this has the right type
    this.load.image("tiles", tiles );
    this.load.tilemapTiledJSON("map", map);

} // End of Preload

create() {
  // Loading TileMap
  this.map = this.make.tilemap({ key: "map" });

  // Parameters are the name character gave the tileset in Tiled and then the key of the tileset image in
  // Phaser's cache (i.e. the name character used in preload)
  const tileset = this.map.addTilesetImage("EmptyGrassField", "tiles");

  // Parameters: layer name (or index) from Tiled, tileset, x, y
  const belowLayer = this.map.createStaticLayer("Below Player", tileset, 0, 0);
  const worldLayer = this.map.createStaticLayer("Collision Layer", tileset, 0, 0);
  const aboveLayer = this.map.createStaticLayer("Above Player", tileset, 0, 0);

  worldLayer.setCollisionByProperty({ collides: true });

  // By default, everything gets depth sorted on the screen in the order we created things. Here, we
  // want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
  // Higher depths will sit on top of lower depth objects.
  aboveLayer.setDepth(10);

  // Object layers in Tiled let character embed extra info into a map - like a spawn point or custom
  // collision shapes. In the tmx file, there's an object layer with a point named "Spawn Point"
  const spawnPoint = this.map.findObject("Objects", obj => obj.name === "Spawn Point");
  
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
  camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);


  // Items one can find 
  this.itemsOneCanFind = this.physics.add.group()

  // Create as characters
  this.createItem('bomb', 260,140, 'https://docs.google.com/document/d/13BDpVuM0gMo8xoHvfJcf-uKYH0UxXiBJc2mBm0ZftHk/edit', 'Gaell - Data Visualization');
  this.createItem('star', 340,150, 'https://www.youtube.com/watch?v=Gzm_mcLyMVo', 'Classcraft - using games to display content');

  this.physics.add.collider(this.player, this.itemsOneCanFind, this.collectItem, null, this); // how to find the item in itemsonecanfind?



  // CREATE CHARACTERS

  let DiscutorDialogue = [
['Discutor', "Hey there wanderer, would you like to work more efficiently?"],
['option', 
  ['Sure, I would like to learn more about learning', [4]],
  ['I want to have a tool that can help me!', [2]],  
  ["No, I'm currently not interested", [10]]
],
['Discutor', 'Then check out this new tool'],
['option', 
  ['try out tool', [10, 'http://grow.cri-paris.org/#/pomodoro']], 
  ['Leave him behind', [10]]
],
['Discutor', 'Did you ever hear about the last lecture of Randy Pusch from MIT?'],
['option', 
  ['No I have never heard about it', [6]], 
  ['Actually I know this one already', [1]]
],
['option', 
  ['let me check it out', [10, 'https://www.youtube.com/watch?v=ji5_MqicxSo']], 
  ['Actually I have better things to do', [10]]
],
];
this.Discutor = new Character({
          scene: this,
          key: 'discutor',
          x: 150,
          y: 540,
          furtherVar: [
            ['characterNumber', 0],
            ['name', 'Discutor'],
            ['interaction', 'dialogue'],
            ['dialogue', DiscutorDialogue],
            ['dialogueStartsAt', 0],
            ['size', [60,60]],
            ['offSet', [35,20]],
          ]
      });

let ThorstenDialogue = [
['Thorsten', 'Hey there new one. Do you need some good music to focus?'],
['option', 
  ['Yeah, I could need some music right now!', [10, 'https://www1.brain.fm/']], 
  ["I'm searching for something else ;) ", [10]]
]
];

this.Thorsten = new Character({
          scene: this,
          key: 'thorsten',
          x: 425,
          y: 170,
          furtherVar: [
            ['characterNumber', 1],
            ['name', 'Thorsten'],
            ['interaction', 'dialogue'],
            ['dialogue', ThorstenDialogue],  
            ['dialogueStartsAt', 0],
            ['size', [80,80]],
            ['offSet', [20,20]],
          ]
      }); 



let VickyDialogue = [
['Vicky', 'Hey there wanderer! I have the pleasure to be your personal coach today. Your first task is to do 10 push ups'],
['option', 
  ['Accept Quest', [10, 
      "dispatch('loadInterface/openQuestContainer', 'exercise', {root:true})", 
      "dispatch('changeDialogueStartsAt', [3, 'QuestGiver', 5])",
      "dispatch('changeDialogueStartsAt', [3, 'QuestGiver', 2, 15000])",]], 
  ["Leave", [10]]
],

['Quest', 'Did you finish the Quest?'],
['option', 
  ['Yes, I finished', [4, 
      "dispatch('setCurrentMessageType', 'userInput')", 
      "dispatch('changeDialogueStartsAt', [3, 'QuestGiver', 2])"]], 
  ["No, not yet", [10]]
],
['How do you feel after the exercise?', null],


['Quest', 'It should take more time to finish this quest'],
  
];

this.QuestGiver = new Character({
          scene: this,
          key: 'vicky',
          x: 270,
          y: 300,
          furtherVar: [
            ['characterNumber', 2],
            ['name', 'QuestGiver'],
            ['interaction', 'dialogue'],
            ['dialogue', VickyDialogue],  
            ['dialogueStartsAt', 0],
            ['size', [60,60]],
            ['offSet', [0,0]],
          ]
      }); 


/*
let QuestDialogue2 = [
['Coach', "I have the honor to be your fitness coach for today! Your first exercise is to do 10 push ups. Return to me after you finished"],
['option', 
  ['Accept Quest', [10, 
      "dispatch('loadInterface/openQuestContainer', 'exercise', {root:true})", 
      "dispatch('changeDialogueStartsAt', [3, 'QuestGiver', 5])",
      "dispatch('changeDialogueStartsAt', [3, 'QuestGiver', 2, 15000])",]], 
  ["I feel lazy today", [10]]
],

['Quest', 'Did you finish the Quest?'],
['option', 
  ['Yes, I finished!', [4, 
      "dispatch('setCurrentMessageType', 'userInput')", 
      "dispatch('changeDialogueStartsAt', [3, 'QuestGiver', 2])"]], 
  ["No, not yet", [10]]
],
['What did you learn?', null],


['Quest', 'It should take more time to finish this quest'],

];

this.QuestGiver = new Character({
          scene: this,
          key: 'vicky',
          x: 270,
          y: 300,
          furtherVar: [
            ['characterNumber', 2],
            ['name', 'QuestGiver'],
            ['interaction', 'dialogue'],
            ['dialogue', QuestDialogue],  
            ['dialogueStartsAt', 2],
            ['size', [60,60]],
            ['offSet', [0,0]],
          ]
      }); 
*/


// Doors to other instances (to be continued)
  //const doorMusicHouse = this.map.findObject("Objects", obj => obj.name === "Door_ValueGuy");

/*
  this.doorMusicHouse = this.physics.add.sprite(200, 200, 'thorsten');
  
  this.physics.add.collider(this.player, this.doorMusicHouse, 
    function(){
      console.log(this.scene)
      this.scene.stop(this.sys.config.key); 
      this.scene.start('TownScene');
    }, null, this); 
*/













/*  // Create a shelf

  //Battle plan: 

  //Create shelf in map: Objects
  const shelf_1 = this.map.findObject("Objects", obj => obj.name === "shelf_1");

  //Create an empty sprite to collide with
  this.shelf_3_1 = new Shelf({
    scene: this,
    key: null,
    x: shelf_1.x,
    y: shelf_1.y,
    furtherVar: [
      ['name', 'shelf_1'],
      ['shelfType', 1],
      ['size', [shelf_1.width, shelf_1.height]],
      ['offSet', [0,0]],
    ]
  })

  // Call shelf function in utilities 
  // if one collides with shelf it opens up shelf container
  // */

  // Welcome text that has a "fixed" position on the screen
  this.add
    .text(16, 16, "When you program, be in the moment!", {
      font: "18px monospace",
      fill: "#000000",
      padding: { x: 20, y: 10 },
      backgroundColor: "#ffffff"
    })
    .setScrollFactor(0)
    .setDepth(30);



} // End of Create

update(time, delta) {
  // Update movement
  if(this.player.isAllowedToMove){
  this.player.move();

  //Update dialogue function - triggers character.js
  } else if(this.player.characterInteraction[0] === 'dialogue'){
    
    this[this.player.characterInteraction[1]].updateDialogue()

  } else if (this.player.characterInteraction[0] === 'option'){
    this[this.player.characterInteraction[1]].updateOptions()

  } else if (this.player.characterInteraction[0] === 'userInput'){
    this[this.player.characterInteraction[1]].updateUserInput()

  }
} // End of update

// Add functions of the Scene here


collectItem(player, item){
  // Get item name
  
  // dispatch dialogue eventually, detached from character 
  // this.player.characterInteraction = ['itemFound', 'itemID']
  
  // add item to createNPC objectsInInventory // push whatever information is needed
    store.dispatch('createNPCs/findItem', [item.name,item.key,item.link])
  
  

  alert('You found an item, use "i" to open your itembox and use it')
  // Remove item 
  this['item' + item.x + item.y].disableBody(true, true);
}

createItem(key, x, y, link, linkTitle){
  // Create individual name depending on location! 
  // Unfinished: Should it mention or be equal to scene number like in createNPCs/gameContainerClicked
  this['item' + x + y] = this.itemsOneCanFind.create(x, y, key);

  // Add a link to the item
  if (link && linkTitle) { 
    this['item' + x + y].link = link;
    this['item' + x + y].linkTitle = linkTitle;
  } else if (link){ this['item' + x + y].link = link; }
 
  this['item' + x + y].key = key;
  this['item' + x + y].name = 'item' + x + y;

  


  // Make character interactive so that he reacts to click events
  this['item' + x + y].setInteractive();

  this['item' + x + y].on('pointerover', () => { 

  // should be only added once
  if (linkTitle) { this.hoverText = this.add.text(x - 100, y - 40, this['item' + x + y].linkTitle) 


  };
  

  });

  this['item' + x + y].on('pointerout', () => {
    this.hoverText.setText('')
  });

}




} // End of Export


