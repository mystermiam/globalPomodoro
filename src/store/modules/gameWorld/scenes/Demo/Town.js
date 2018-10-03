import { Scene } from 'phaser'

import { Grow } from './../../index' // necessary? 3 times games phaser, scene, Grow

import store from '../../../../index'

// Import Tilemaps here
import tiles0 from "./../../assets/tilesets/Inside_C.png"
import tiles1 from "./../../assets/tilesets/Outside_A5.png"
import tiles2 from "./../../assets/tilesets/PathAndObjects.png"
import tiles3 from "./../../assets/tilesets/Outside_A1.png"
import tiles4 from "./../../assets/tilesets/Outside_A2.png"
import tiles5 from "./../../assets/tilesets/Outside_A3.png"
import tiles6 from "./../../assets/tilesets/Outside_B.png"
import tiles7 from "./../../assets/tilesets/Outside_C.png"
import tiles8 from "./../../assets/tilesets/town.png"
import tiles9 from "./../../assets/tilesets/wood_tileset.png"

import map from "./../../assets/tilemaps/V2.json"

// Import Sprites.js here
import Player from './../../phaserUtilities/player'

import Character from './../../phaserUtilities/character'


// Import external functions
import loadScene from './../../phaserUtilities/loadScene'
import {updateDialogue, updateOptions, updateUserInput} from './../../phaserUtilities/phaserDialogue'
   

// Steps to take: 1) Import into scenes/index.js 
export default class Town extends Scene {

  constructor () {
    super({ key: 'Town' })
  }

preload() {
    // Load basic functions that exist in every map
    loadScene(this, 'preload');

    // Load MAP
    // Make sure this has the right type (name after mapName)
      this.load.image("tilesTown0", tiles0 );
      this.load.image("tilesTown1", tiles1 );
      this.load.image("tilesTown2", tiles2 );
      this.load.image("tilesTown3", tiles3 );
      this.load.image("tilesTown4", tiles4 );
      this.load.image("tilesTown5", tiles5 );
      this.load.image("tilesTown6", tiles6 );
      this.load.image("tilesTown7", tiles7 );
      this.load.image("tilesTown8", tiles8 );
      this.load.image("tilesTown9", tiles9 );

      this.load.tilemapTiledJSON("DemoTown", map);


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


  this.map = this.make.tilemap({ key: "DemoTown" });

  // Find name inside of tilemap
  // Parameters are the name character gave the tileset in Tiled and then the key of the tileset image in
  // Phaser's cache (i.e. the name character used in preload)
  const tilesetTown0 = this.map.addTilesetImage("Inside_C", "tilesTown0");
  const tilesetTown1 = this.map.addTilesetImage("Outside_A5", "tilesTown1");
  const tilesetTown2 = this.map.addTilesetImage("PathAndObjects", "tilesTown2");
  const tilesetTown3 = this.map.addTilesetImage("Outside_A1", "tilesTown3");
  const tilesetTown4 = this.map.addTilesetImage("Outside_A2", "tilesTown4");
  const tilesetTown5 = this.map.addTilesetImage("Outside_A3", "tilesTown5");
  const tilesetTown6 = this.map.addTilesetImage("Outside_B", "tilesTown6");
  const tilesetTown7 = this.map.addTilesetImage("Outside_C", "tilesTown7");
  const tilesetTown8 = this.map.addTilesetImage("town", "tilesTown8");
  const tilesetTown9 = this.map.addTilesetImage("wood_tileset", "tilesTown9");

  let tilesets = [tilesetTown1, tilesetTown2, tilesetTown3, tilesetTown4, tilesetTown5, tilesetTown6, tilesetTown7, tilesetTown8, tilesetTown9];
  const belowLayer = this.map.createStaticLayer("Below Player", tilesets, 0, 0);
  const worldLayer = this.map.createStaticLayer("Collision Layer", tilesets, 0, 0);
  const aboveLayer = this.map.createStaticLayer("Above Player", tilesets, 0, 0);

  worldLayer.setCollisionByProperty({ collides: true });

  // By default, everything gets depth sorted on the screen in the order we created things. Here, we
  // want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
  // Higher depths will sit on top of lower depth objects.
  aboveLayer.setDepth(10);

  // Load basic functions that exist in every scene
  loadScene(this, 'create');

  // Watch the player and worldLayer for collisions, for the duration of the scene:
  this.physics.add.collider(this.player, worldLayer);

} // End of Create



update(time, delta) {
  // Update movement - triggers phaserutilities/player.js
  if(this.player.isAllowedToMove){
  
    this.player.move();

  //Update dialogue functions - triggers phaserDialogue.js
  } else if(this.player.characterInteraction[0] === 'dialogue'){
    Town
    updateDialogue()

  } else if (this.player.characterInteraction[0] === 'option'){
    
    updateOptions()

  } else if (this.player.characterInteraction[0] === 'userInput'){
    
    updateUserInput()

  }
} // End of update



// Add functions here!







} // End of Export







/*

 /*    
  for (let i = 0; i<map.tilesets.length; i++){
    let name = 'tileSet' + i
    import { name } from './../../assets/tilesets/' + map.tilesets[i].name + '.png'  
  }
  */
        
      // for loop through map.json --> find length
      
      // import all tileset names 
      // load images from paths of imported modules
   
    /*

      let name = map.tilesets[i].name;
        let path = './../' + map.tilesets[i].image + '';
        import eval(name) from path


      https://stackoverflow.com/questions/46253183/es6-import-in-for-of-loop

      const moduleNames = ['NumberUtils', 'StringUtils', 'ArrayUtils', 'MyModule', 'AnotherModule', 'BaseModule']

      let modules = {}

      for (const moduleName of moduleNames) {
        import module from './' + moduleName
        modules.moduleName = module
      }

      export modules

    */
