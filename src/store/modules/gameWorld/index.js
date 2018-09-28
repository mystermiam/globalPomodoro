import Phaser from 'phaser'

//Examples
import PlayScene from './scenes/PlayScene'
import platformerScene from './scenes/DynamicPlatformer/platformer-scene'

import BootScene from './scenes/BootScene'
import TownScene from './scenes/TownScene'
import HouseOfMusicScene from './scenes/HouseOfMusicScene'
import EmptyGrassField from './scenes/EmptyGrassField'
import NuitBlancheTown from './scenes/NuitBlancheTown'

var Grow = [];

function launch() {
  Grow = new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    pixelArt: true,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 }, // Top down game, so no gravity
        debug: false
      }
    },
    scene: [BootScene, HouseOfMusicScene, TownScene, EmptyGrassField, NuitBlancheTown] // this defines, which number the scene has: Grow.scene.scenes[2].player;

    //scene: [BootScene, PlayScene]
    //scene: [BootScene, platformerScene]
  })
}

export default launch
export { launch }

export { Grow }