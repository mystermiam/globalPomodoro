import { Scene } from 'phaser'

import { Grow } from './../../index' // necessary? 3 times games phaser, scene, Grow

import store from '../../../../index'

// Import Tilemaps here
/*
import tiles1 from "./../../assets/tilesets/Inside_C.png"
import tiles2 from "./../../assets/tilesets/Outside_A5.png"
import tiles3 from "./../../assets/tilesets/PathAndObjects.png"
import tiles4 from "./../../assets/tilesets/Outside_A1.png"
import tiles5 from "./../../assets/tilesets/Outside_A2.png"
import tiles6 from "./../../assets/tilesets/Outside_A3.png"
import tiles7 from "./../../assets/tilesets/Outside_B.png"
import tiles8 from "./../../assets/tilesets/Outside_C.png"
import tiles9 from "./../../assets/tilesets/town.png"
import tiles10 from "./../../assets/tilesets/wood_tileset.png"
*/
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
    // Load basic functions that exist in every map
    loadScene(this, 'preload');

    // Load MAP
    // Make sure this has the right type
     this.load.image('tiles1', tiles1)

    for(let i = 1; i<11; i++){
      console.log()
      this.load.image("tiles" + i, map.tilesets[i].name );
    }
    
    this.load.tilemapTiledJSON("townMap", map);
} // End of Preload

create() {
  // Loading TileMap
  this.map = this.make.tilemap({ key: "townMap" });

  // Parameters are the name character gave the tileset in Tiled and then the key of the tileset image in
  // Phaser's cache (i.e. the name character used in preload)
  const tileset1 = this.map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles1");
  const tileset2 = this.map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles2");
  const tileset3 = this.map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles3");
  const tileset4 = this.map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles4");
  const tileset5 = this.map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles5");
  const tileset6 = this.map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles6");
  const tileset7 = this.map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles7");
  const tileset8 = this.map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles8");
  const tileset9 = this.map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles9");
  const tileset10 = this.map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles10");

  // Parameters: layer name (or index) from Tiled, tileset, x, y --> for each tileset!!!

  let belowLayer = [];
  let worldLayer = [];
  let aboveLayer = [];

  for(let i = 1; i < 11; i++){
    belowLayer[i] = this.map.createStaticLayer("Below Player", eval('tileset' + i), 0, 0);
    worldLayer[i] = this.map.createStaticLayer("World", eval('tileset' + i), 0, 0);
    aboveLayer[i] = this.map.createStaticLayer("Above Player", eval('tileset' + i), 0, 0);
  }
  

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
    
    updateDialogue()

  } else if (this.player.characterInteraction[0] === 'option'){
    
    updateOptions()

  } else if (this.player.characterInteraction[0] === 'userInput'){
    
    updateUserInput()

  }
} // End of update



// Add functions here!







} // End of Export