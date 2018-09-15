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

// Import Sprites.js here
import Player from './../phaserUtilities/player'
import Character from './../phaserUtilities/character'


// Steps to take: 1) Import into scenes/index.js 
export default class EmptyGrassField extends Scene {

  constructor () {
    super({ key: 'EmptyGrassField' })
  }

preload() {

  //currently the image needs to be preloaded to be able to insert it into the game from createNPC
  this.load.image("star", star );
  this.load.image("vicky", vicky );
  this.load.image("thorsten", thorsten );
  this.load.image("discutor", discutor );


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
  this.createItem('star', 200,200);
  this.createItem('thorsten', 300,200);
  this.createItem('discutor', 400,200);

  this.physics.add.collider(this.player, this.itemsOneCanFind, this.collectItem, null, this); // how to find the item in itemsonecanfind?






} // End of Create

update(time, delta) {
  // Update movement
  if(this.player.isAllowedToMove){
  this.player.move();
  }

  //Update dialogue function
  if(this.player.characterInteraction[0] === 'dialogue'){
    //triggers character.js
    this[this.player.characterInteraction[1]].updateDialogue()
  } else if (this.player.characterInteraction[0] === 'option'){
    this[this.player.characterInteraction[1]].updateOptions()
  }
} // End of update

// Add functions of the Scene here


collectItem(player, item){
  // Get item name
  let name = item.texture.key; 

  // dispatch dialogue eventually, detached from character 
  // this.player.characterInteraction = ['itemFound', 'itemID']
  
  // add item to createNPC objectsInInventory
  store.dispatch('createNPCs/findItem', name)

  alert('You found an item, use "i" to open your itembox and use it')
  // Remove item
  this['item' + item.x + item.y].disableBody(true, true);
}

createItem(key, x, y){
  // Create individual name depending on location!
  this['item' + x + y] = this.itemsOneCanFind.create(x, y, key);
}




} // End of Export


