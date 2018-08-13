import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import PlayScene from './scenes/PlayScene'
import TownScene from './scenes/TownScene'

function launch() {
  new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    pixelArt: true,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 }, // Top down game, so no gravity
        debug: true
      }
    },
    scene: [BootScene, PlayScene, TownScene]
  })
}

export default launch
export { launch }