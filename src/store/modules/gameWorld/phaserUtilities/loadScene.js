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


// load spawnpoint and player
const spawnPoint = scene.map.findObject("Objects", obj => obj.name === "Spawn Point");
  
  // LOAD PLAYER
  scene.player = new Player({
            scene: scene,
            key: 'atlas',
            x: spawnPoint.x,
            y: spawnPoint.y
        });

// load doors

}

}