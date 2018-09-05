import Phaser from 'phaser'

import { Scene } from 'phaser'

import { Grow } from './../index' // necessary? 3 times games phaser, scene, Grow

import store from '../../../index'

// Import Tilemaps here
import examplePNG from "./../assets/tilesets/tuxmon-sample-32px-extruded.png"
import exampleJSON from "./../assets/tilemaps/tuxemon-town.json"

// Import Images here

// Import Sprites here 
import exampleCharacterPNG from './../assets/atlas/atlas.png'
import exampleCharacterJSON from './../assets/atlas/atlas.json'

// Import Sprites.js here
import Player from './../phaserUtilities/player'

import Character from './../phaserUtilities/character'


// Steps to take: 1) Import into scenes/index.js 
export default class TemplateScene extends Scene {

  constructor () {
    super({ key: 'TemplateScene' })
  }

preload() {
	// Update which scene is currently active for Vue 
    let numberOfActiveScene = 0;
    for(let i=0;i<Grow.scene.scenes.length;i++){
      if(Grow.scene.scenes[i].sys.config.key === this.sys.config.key){
        numberOfActiveScene = i;
      }
    }
    store.dispatch('player/changeActiveScene', numberOfActiveScene);

    
} // End of Preload

create() {

} // End of Create

update(time, delta) {

} // End of update

// Add functions of the Scene here


} // End of Export