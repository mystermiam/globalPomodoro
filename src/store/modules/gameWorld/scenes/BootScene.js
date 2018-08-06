import { Scene } from 'phaser'
import sky from '../assets/sky.png'
import bomb from '../assets/bomb.png'
import ground from '../assets/platform.png'
import star from '../assets/star.png'
import dude from '../assets/dude.png'

export default class BootScene extends Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {
    this.load.image('sky', sky)
    this.load.image('bomb', bomb)
    this.load.image('ground', ground)
    this.load.image('star', star)
    this.load.spritesheet('dude', 'assets/dude.png', {frameWidth: 32, frameHeight: 48});
  }

  create () {
    this.scene.start('PlayScene')
  
  }
}

