import { Scene } from 'phaser'
import BaseScene from './BaseScene';

export default class BootScene extends Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {
    this.load.setBaseURL('./assets/');
    this.load.json('assets');
  }

  create () {
    // Test
    //this.scene.start('PlayScene')

    // Platformer test 
    //this.scene.start('platformerScene')
 
    // World test
    //this.changeToScene('EmptyGrassField');
    //this.scene.start('EmptyGrassField')

    // DEMO
    this.scene.start('Bedroom')
  
  }
}

