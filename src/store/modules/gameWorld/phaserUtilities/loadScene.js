import { Grow } from './../index'

import store from '../../../index'

import Player from './../phaserUtilities/player'

// Import Sprites here 
import exampleCharacterPNG from './../assets/atlas/atlas.png'
import exampleCharacterJSON from './../assets/atlas/atlas.json'


export default function loadScene(scene, state) {


// import happens in scene itself? (dynamic import)


// Scene preload
if(state == 'preload'){

	let numberOfActiveScene = 0;

    for(let i=0;i<Grow.scene.scenes.length;i++){
      if(Grow.scene.scenes[i].sys.config.key === scene.sys.config.key){
        numberOfActiveScene = i;
      }
    }

    store.dispatch('player/changeActiveScene', numberOfActiveScene);

    // Load PLAYER
    scene.load.atlas("atlas", exampleCharacterPNG, exampleCharacterJSON);
}




// Scene create
if(state == 'create'){


// load spawnpoint and player // if you arrive through doors find alternate spawnpoint
const spawnPoint = scene.map.findObject("Objects", obj => obj.name === "Spawn Point");
  
  // LOAD PLAYER
  scene.player = new Player({
            scene: scene,
            key: 'atlas',
            x: spawnPoint.x,
            y: spawnPoint.y
        });


  // CAMERA  // the camera is fixed to the center of the 
             //  screen if the map size is smaller than 800/600px
  const camera = scene.cameras.main;
  camera.startFollow(scene.player);
  
  let moveMapX = 0;
  let moveMapY = 0;

  if (scene.map.widthInPixels < 800){
    // Move map to the right, so that it is centered
    moveMapX = (800 - scene.map.widthInPixels) / 2
  } 

  if (scene.map.widthInPixels < 600){
    // Move map down, so that it is centered
    moveMapY = (600 - scene.map.heightInPixels) / 2
  }
  
  camera.setBounds(-moveMapX, -moveMapY, scene.map.widthInPixels, scene.map.heightInPixels);


// load doors

}

}