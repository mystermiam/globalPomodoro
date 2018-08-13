import { Scene } from 'phaser'
import Phaser from 'phaser'

// All need to be reimported from static, wrong here
import sky from '../assets/sky.png'
import bomb from '../assets/bomb.png'
import ground from '../assets/platform.png'
import star from '../assets/star.png'
import dude from '../assets/dude.png'

//Town Scene
import mapTown from '../assets/maps/town.json'
import town from './../assets/maps/town.png'


import { MAP_TOWN, MAP_HOUSE_1, MAP_HOUSE_2, IMAGE_HOUSE, IMAGE_TOWN, IMAGE_PLAYER } from '../constants/assets';



export default class BootScene extends Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {
    //PlayScene
    this.load.image('sky', sky)
    this.load.image('bomb', bomb)
    this.load.image('ground', ground)
    this.load.image('star', star)
    this.load.spritesheet('dude', dude, {frameWidth: 32, frameHeight: 48});

    //TownScene
    //this.load.tilemap('map-town', '../assets/maps/town.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemapTiledJSON(MAP_TOWN, mapTown);
    this.load.image(IMAGE_TOWN, town);
    //this.load.spritesheet(IMAGE_TOWN, town, { frameWidth: 32, frameHeight: 32 });
  }

  create () {
    // Test
    //this.scene.start('PlayScene')

    // World test
    this.scene.start('TownScene')
  
  }
}

