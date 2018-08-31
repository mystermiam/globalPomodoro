import Phaser from 'phaser'

import { Scene } from 'phaser'

import { Grow } from './../index' // necessary? 3 times games phaser, scene, Grow

import store from '../../../index'

// Import TileSets here
import house_inside from './../assets/tilesets/house_inside.png'
import interior from './../assets/tilesets/interior.png'

// Import Tilemaps here
import MusicHouse from './../assets/tilemaps/MusicHouse'
// Import Images here

// Import Sprites here 

// Import Sprite Classes here
import Player from './../phaserUtilities/player'

import Character from './../phaserUtilities/character'


// Steps to take: 1) Import into scenes/index.js 
export default class HouseOfMusicScene extends Scene {

  constructor () {
    super({ key: 'HouseOfMusicScene' })
  }

preload() {

// Can't find gid in musichouse.json (it doesn't update for some reason)
  this.load.image("tiles", house_inside );
  this.load.image("hmmmm", interior );
  this.load.tilemapTiledJSON("map", MusicHouse);
}

create() {
  const map = this.make.tilemap({ key: "map" });

  const tileset = map.addTilesetImage("TileSetImage", "tiles");

  // Parameters: layer name (or index) from Tiled, tileset, x, y
  const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
  const worldLayer = map.createStaticLayer("Collision Layer", tileset, 0, 0);
  const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);
}

update(time, delta) {

}

}