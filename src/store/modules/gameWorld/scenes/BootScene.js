import { Scene } from 'phaser'

export default class BootScene extends Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {

  }

  create () {
    // Test
    //this.scene.start('PlayScene')

    // Platformer test 
    //this.scene.start('platformerScene')
 
    // World test
    this.scene.start('EmptyGrassField')
    


  
  }
}

