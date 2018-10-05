/*
Bugs:
FISHING
- Create messages in Pomodoro timer (Jabol)  <--
- hide the game / iframe fit (hide progressbar)  <--
- Create left side popup (Your fishing skill has increased by 1) <-- maybe
- Add experience

Aurelie
- download sounds (success, cracking sound) / music to be played in the music rooms
- find animation for success (rpg maker has these level up animations)
- Change collision in maps. Maybe create a fourth layer 
- Make a teleporter sprite that we can use to go to the concert hall

- Make layout for paper to let people write down possible applications
  (we can frame the experience as a coexploration) (A3) <-- put it on the wall and people can explore it with you
- Make E-mail list (if you want to be updated on the project)


Quiz
- Find funny questions <--
- Link up to the solutions <--
- Attach item (really rare item) <--
- Attach dialogue function when clicking on this item (It doesn't look like it is doing 
  anything, but I will keep it because it is rare <-- or something like this)


createNPCs.js
- scene.bottle is not working

Improve on conversations (do that together in between)

Create different kind of interactions 

Potentially:
Quest: - 
Have a character standing around that you can add questions too


*/

import { Scene } from 'phaser'

import { Grow } from './../../index' // necessary? 3 times games phaser, scene, Grow

import store from '../../../../index'

// Import Tilemaps here
import tiles0 from "./../../assets/tilesets/Inside_C.png"
import tiles1 from "./../../assets/tilesets/Outside_A5.png"
import tiles2 from "./../../assets/tilesets/PathAndObjects.png"
import tiles3 from "./../../assets/tilesets/Outside_A1.png"
import tiles4 from "./../../assets/tilesets/Outside_A2.png"
import tiles5 from "./../../assets/tilesets/Outside_A3.png"
import tiles6 from "./../../assets/tilesets/Outside_B.png"
import tiles7 from "./../../assets/tilesets/Outside_C.png"
import tiles8 from "./../../assets/tilesets/town.png"
import tiles9 from "./../../assets/tilesets/wood_tileset.png"

import map from "./../../assets/tilemaps/V2.json"

// Import images

// Provisional child running around
//import dude from './../../assets/dude.png'
import quizMaster from './../../../../../../static/raw_sprites/spritesmith/npcs/npc_tyler.png'

import quizGuy from './../../assets/sprites/Arabicfullguy.png'
import red_circle from './../../assets/sprites/REDCIRCLE.png'
import fishingRod from './../../assets/sprites/fishingRod.png'
import runningChild from './../../assets/sprites/punkcompleteguy.png'
import halfbottle from './../../assets/sprites/halfbottle.png'
import bottle from './../../assets/sprites/bottle.png'
import girlinred from './../../assets/sprites/girlinred.png'
import fisherman from './../../assets/sprites/fisherman.png'

// Import Sprites.js here
import Player from './../../phaserUtilities/player'

import Character from './../../phaserUtilities/character'

import bell from './../../assets/music/sounds/bell.mp3'

// Import external functions
import movingCharacter from './../../phaserUtilities/sceneFunctions/movingCharacter'
import loadScene from './../../phaserUtilities/loadScene'
import {updateDialogue, updateOptions, updateUserInput} from './../../phaserUtilities/phaserDialogue'
   

// Steps to take: 1) Import into scenes/index.js 
export default class Town extends Scene {

  constructor () {
    super({ key: 'Town' })
  }

preload() {
    // Load basic functions that exist in every map
    loadScene(this, 'preload');

    // Load MAP
    // Make sure this has the right type (name after mapName)
      this.load.image("tilesTown0", tiles0 );
      this.load.image("tilesTown1", tiles1 );
      this.load.image("tilesTown2", tiles2 );
      this.load.image("tilesTown3", tiles3 );
      this.load.image("tilesTown4", tiles4 );
      this.load.image("tilesTown5", tiles5 );
      this.load.image("tilesTown6", tiles6 );
      this.load.image("tilesTown7", tiles7 );
      this.load.image("tilesTown8", tiles8 );
      this.load.image("tilesTown9", tiles9 );

      this.load.tilemapTiledJSON("DemoTown", map);

      this.load.image('runningChild', runningChild)
      this.load.image('quizMaster', quizMaster)
      this.load.image('red_circle', red_circle)

      this.load.image('quizGuy', quizGuy)
      this.load.image('fishingRod', fishingRod)
      this.load.image('red_circle', red_circle)
      this.load.image('halfbottle', halfbottle)
      this.load.image('bottle', bottle)
      this.load.image('quizMaster', quizMaster)
      this.load.image('red_circle', red_circle)
      this.load.image('girlinred', girlinred)
      this.load.image('fisherman', fisherman)

    // Takes too damn long, load in bootscene and then play maybe
    // this.load.audio('backgroundMusic', backgroundMusic)
    this.load.audio('bell', bell)
    

}

create() {
  // Add and play the music // make it toggleAble
  /*
        this.music = this.sound.add('backgroundMusic');
        this.music.play({
            loop: true
        });
  */


  this.map = this.make.tilemap({ key: "DemoTown" });

  // Find name inside of tilemap
  // Parameters are the name character gave the tileset in Tiled and then the key of the tileset image in
  // Phaser's cache (i.e. the name character used in preload)
  const tilesetTown0 = this.map.addTilesetImage("Inside_C", "tilesTown0");
  const tilesetTown1 = this.map.addTilesetImage("Outside_A5", "tilesTown1");
  const tilesetTown2 = this.map.addTilesetImage("PathAndObjects", "tilesTown2");
  const tilesetTown3 = this.map.addTilesetImage("Outside_A1", "tilesTown3");
  const tilesetTown4 = this.map.addTilesetImage("Outside_A2", "tilesTown4");
  const tilesetTown5 = this.map.addTilesetImage("Outside_A3", "tilesTown5");
  const tilesetTown6 = this.map.addTilesetImage("Outside_B", "tilesTown6");
  const tilesetTown7 = this.map.addTilesetImage("Outside_C", "tilesTown7");
  const tilesetTown8 = this.map.addTilesetImage("town", "tilesTown8");
  const tilesetTown9 = this.map.addTilesetImage("wood_tileset", "tilesTown9");

  let tilesets = [tilesetTown1, tilesetTown2, tilesetTown3, tilesetTown4, tilesetTown5, tilesetTown6, tilesetTown7, tilesetTown8, tilesetTown9];
  const belowLayer = this.map.createStaticLayer("Below Player", tilesets, 0, 0);
  const worldLayer = this.map.createStaticLayer("Collision Layer", tilesets, 0, 0);
  const aboveLayer = this.map.createStaticLayer("Above Player", tilesets, 0, 0);

  worldLayer.setCollisionByProperty({ collides: true });

  // By default, everything gets depth sorted on the screen in the order we created things. Here, we
  // want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
  // Higher depths will sit on top of lower depth objects.
  aboveLayer.setDepth(10);

  // Load basic functions that exist in every scene
  loadScene(this, 'create');

  // Watch the player and worldLayer for collisions, for the duration of the scene:
  this.physics.add.collider(this.player, worldLayer);

// Everything previous to this should be automatized

// ALL THE TOWN CHARACTERS







/************************** TOMMY THE RUNNING CHILD ********************************/
// BUGS: - ChangeDialogueStartsAt Doesn't work yet
//       - Phaser sprite doesnt load animations correctly

// maybe put in first message a stop signal   
let RunningChildDialogue = [
['Tommy', "I'm so excited, I'm so excited"],
['option', 
  ['What are you so excited about?', [2]],
  ['Keep on running Tommy, you will catch the stars', ["dispatch('endConversation')"]],  
],
['Tommy', "I'm excited about all the updates that are gonna come soon!"],
['Arya', "What are you talking about?"],
['Tommy', "Multiplayer, ... *drools on the floor* "],
['Tommy', "I can't wait anymore!", ["endConversation","vueStore.dispatch('dialogue/changeDialogueStartsAt', [3, 'RunningChild', 6])"]],
['Tommy', "Waaaaahh"],
];

// Keeps on running


this.RunningChild = new Character({
          scene: this,
          key: 'runningChild',
          x: 120,
          y: 730,
          furtherVar: [
            ['characterNumber', 0],
            ['name', 'Tommy'],
            ['interaction', 'dialogue'],
            ['dialogue', RunningChildDialogue],
            ['dialogueStartsAt', 0],
            ['size', [60,60]],
            ['offSet', [35,20]],
          ]
      });

this.anims.create({
            key: 'runningChild_left',
            frames: this.anims.generateFrameNumbers('runningChild', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

this.anims.create({
            key: 'runningChild_right',
            frames: this.anims.generateFrameNumbers('runningChild', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

// Battle plan: 
// create two objects with the child in between --> give the child a speed to run to the left
// If it collides with one of the objects it changes speed - create colliders with the two objects and with player
// If you talk to the child it stop and sets the frame to turn 
// When you end the conversation it runs back to the left 
console.log(this.RunningChild.anims)

this.physics.add.collider(this.RunningChild, this.player);
//this.physics.add.collider(this.RunningChild, this.runningChildCollisonPointLeft, this.childCollidesWithObject('right'));
//this.physics.add.collider(this.RunningChild, this.runningChildCollisonPointRight, this.childCollidesWithObject('left'));

//this.RunningChild.anims.play("misa-left-walk", true);
this.RunningChild.body.setVelocityX(300);



/************************** END: TOMMY THE RUNNING CHILD ********************************/






/************************** The Quiz Master ********************************/
// Turn the screen dark and you sit in a chair opposite him?

 let QuizDialogue = [
['Quizzor', "Would you like to participate in the CRI quiz? if you answer all the questions correctly, you will earn a neat reward!"],
['option', 
  ['Sure, I have nothing to lose', [2]], 
  ["I tried already one too many times", [100]],
],
['Quizzor', "Cool! First question: What is the principal value of the CRI?"],
['option', 
  ['#Yolo', [10]], 
  ['#Open', [4]],
  ['#Freedom', [10]],
],
['Quizzor', "Next up! Second question: What can you find on the lowest floor of the CRI?"],
['option', 
  ['Free Hotdogs', [10]], 
  ['A Book Archive', [10]],
  ['Gender Free Toilets', [6]]
],
['Quizzor', "Next up! Third and last question: Who has access to the CRI on Saturday afternoons?"],
['option', 
  ['Only Francois Taddei', [10]], 
  ['No one', [10]],
  ['Everyone, all the time!', [8]]
],
['Quizzor', "That's correct! Claim your reward!"],
['option', 
  ['Claim reward, check your inventory by pressing "i"', ["commit('endConversation')"]],
],
['Quizzor', "That's not correct. Try again!"],


];

this.Quizzor = new Character({
          scene: this,
          key: 'quizMaster',
          x: 320,
          y: 200,
          furtherVar: [
            ['characterNumber', 1],
            ['name', 'Quizzor'],
            ['interaction', 'dialogue'],
            ['dialogue', QuizDialogue],
            ['dialogueStartsAt', 0],
            ['size', [60,60]],
            ['offSet', [35,20]],
          ]
      });



/************************** End: The Quiz Master ********************************/






/************************** Buy a Book - Go on a journey ********************************/
let BookGuyDialogue = [
['Boken', "Hey, there my name is Boken and my role in this town to take you on magic journeys"],
['option', 
  ['Whatever it is, I want it!', [8]], 
  ["Magic Journeys?", [2]],
],

['Boken', "Yeah. Magic journeys are created by your fellow World Wanderers to guide you along different experiences."],
['Arya', "What kind of experiences?"],
['Boken', "We have experiences around books and podcasts so far, but it is also possible to enrich other experiences with it"],
['Arya', "How does it work?"],
['Boken', "You choose an experience and if you are prepared for the journey (e.g. you have the book), you travel through the world of Elyrion t"],
['option', 
  ['How does it work?', [8]], 
  ['When do we start?', [8]],
],
['Boken', "The only journey that I have for you right now is: 'Mastery of love' from Don Miguel Ruiz"],
['Boken', "Do you have that book?"],

['option', 
  ["No, I don't have it yet", [12]], 
  ['Yes, I have it at home', [11]],
],
['Boken', "Sorry, that answer doesn't work yet. I mean, what did you expect, it's just a demo", [10]],
['Boken', "So, your first quest will be to get the book. I will attach to the quest the amazon link, but feel free to buy it anywhere you want or get it from someone in the community"],

['option', 
  ['Accept Quest', [14]], 
  ["Leave him behind", [100]],
],
['Boken', "I see you soon. I attached the quest to your questlog."],
['Boken', "You can open the questlog with Q"],

['option', 
  ["I'll come back soon", [100]], 
]

];

// Add quest
this.BookGuy = new Character({
          scene: this,
          key: 'quizMaster',
          x: 500,
          y: 200,
          furtherVar: [
            ['characterNumber', 1],
            ['name', 'BookGuy'],
            ['interaction', 'dialogue'],
            ['dialogue', BookGuyDialogue],
            ['dialogueStartsAt', 0],
            ['size', [60,60]],
            ['offSet', [35,20]],
          ]
      });



/************************** End: Buy a Book - Go on a journey ********************************/





/************************** Fishing ********************************/
let FishingDialogue = [

['Arya', "This is the spot!"],
['Arya', "Fishing is just one example of how we can use external functionalities in this world to improve their impact."],
['Arya', "The application that we are going to show you here is a 'global' pomodoro timer."],
['Arya', "Pomodoro is a working technique that helps you to stay focused."],
['Arya', "The visualization inside of the game serves as a reward system that is custom built around the functionality."],
['Arya', "For how long do you want to fish?"],
['option', 
  ['60 seconds', [8]], 
  ["25 minutes", [7]],
  ["40 minutes", [7]],
],
['Arya', "Do you want to sit here the whole day? This is just a demo", [3]],
['Arya', "Okay, let's go. When you start fishing it will bring up the pomodoro Interface for a few seconds ", ['endConversation','scene.fishingScene(1)']],
['Arya', "I don't feel like fishing right now", [100]],
];

this.Fishing = new Character({
          scene: this,
          key: 'red_circle',
          x: 374,
          y: 80,
          furtherVar: [
            ['characterNumber', 2],
            ['name', 'Fishing'],
            ['interaction', 'dialogue'],
            ['dialogue', FishingDialogue],
            ['dialogueStartsAt', 0],
            ['size', [40,40]],
            ['offSet', [-20,30]],
          ]
      });

//this.fishingScene(1)
// Add item 
    
/************************** End: Fishing ********************************/


} // End of Create



update(time, delta) {
  // Update movement - triggers phaserutilities/player.js
  if(this.player.isAllowedToMove){
  
    this.player.move();

  //Update dialogue functions - triggers phaserDialogue.js
  } else if(this.player.characterInteraction[0] === 'dialogue'){
    Town
    updateDialogue()

  } else if (this.player.characterInteraction[0] === 'option'){
    
    updateOptions()

  } else if (this.player.characterInteraction[0] === 'userInput'){
    
    updateUserInput()

  }
} // End of update



// Add functions here!

fishingScene(part){
  let scene = Grow.scene.scenes[store.state.player.sceneActive];
  if (part == 1){
    store.commit('loadInterface/openPomodoroIframe')

    // Make player unable to move
    scene.player.isAllowedToMove = false;
    
    this.player.setTexture("atlas", "misa-right")

    // change frame of picture from red circle to fishing route 
    this.Fishing.setTexture("fishingRod");
    this.Fishing.setDisplaySize(66, 66);
   
    // add timer below 
    setTimeout(() =>{
      store.commit('loadInterface/showTimerDisplay')
      store.dispatch('timer/setTimer', [1500,300,900,30,'work', 1])
    }, 5000);
    

    // Post something in chat to explain the pomodoro timer
    
    // Click on the X in the upper right corner to switch back to other view
    
    // After 30 seconds closePomodoroIframe and see your character fishing
    setTimeout(() =>{
      store.commit('loadInterface/closePomodoroIframe')
      this.fishingScene(2)
    }, 10000);

  } else if (part == 2){


    setTimeout(() =>{
      // Before dialogue starts - move the bottle towards the fishing rope
    this.Bottle = new Character({
          scene: this,
          key: 'halfbottle',
          x: 460,
          y: 0,
          furtherVar: [
            ['characterNumber', 4],
            ['name', 'Bottle'],
            ['interaction', 'floating_around'],
            ['size', [22,22]],
            ['offSet', [35,20]],
          ]
      });

    movingCharacter('Bottle','none', 
      [['down',250],['left',250],
       ['down',250],['left',250],
       ['down',250],['left',250],
       ['down',250],['left',250],
       ['down',100],['left',100], 
       ['down',300],['left',100], 
       ['down',550]],
       50);

    }, 16500)
    


    let CaughtSomethingDialogue = [

      ['Arya', "I think we have caught something!"],
      ['Arya', "What's this? Apparently I'm not that good at fishing!", ["scene.Fishing.setTexture('red_circle');","scene.Fishing.setDisplaySize(40, 40);"]],
      ['Arya', "It's a bottle!"],
      ['Arya', "I added the bottle to the inventory. You can check it out yourself if you want to"],
    ];
    
    // Make a 20 seconds timeout here --> start dialogue once timer ends
    store.dispatch('dialogue/addDialogue', ['CaughtSomethingDialogue', CaughtSomethingDialogue])

    this.bell = this.sound.add('bell');

    setTimeout(()=>{
      this.player.characterInteraction[0] = 'dialogue' 

      this.bell.play();

      store.dispatch('createNPCs/findItem', ['bottle','bottle'])

      // maybe have a timeout before this one
      store.dispatch('dialogue/loadDialogue', 'CaughtSomethingDialogue')

      //Make bottle disappear 
      this.Bottle.disableBody(true,true)

      // Change dialogue starts at
      this.Fishing.dialogueStartsAt = 9;

      // Make timer disappear
      store.commit('loadInterface/hideTimerDisplay')

      // Finish quest
      dispatch('quests/removeActiveQuest', 'test', {root:true})

      dispatch('quests/questAccomplished', [3, 5], {root:true})



    }, 20000)
    


    
  }
}



childCollidesWithObject(direction){
let scene = Grow.scene.scenes[store.state.player.sceneActive];

if(direction == 'left') {
scene.RunningChild.anims.play("runningChild_left", true);
scene.RunningChild.body.setVelocityX(-300 );
} else if(direction == 'right') {
scene.RunningChild.anims.play("runningChild_right", true);
scene.RunningChild.body.setVelocityX(-300 );
}

}




} // End of Export


























/*

 /*    
  for (let i = 0; i<map.tilesets.length; i++){
    let name = 'tileSet' + i
    import { name } from './../../assets/tilesets/' + map.tilesets[i].name + '.png'  
  }
  */
        
      // for loop through map.json --> find length
      
      // import all tileset names 
      // load images from paths of imported modules
   
    /*

      let name = map.tilesets[i].name;
        let path = './../' + map.tilesets[i].image + '';
        import eval(name) from path


      https://stackoverflow.com/questions/46253183/es6-import-in-for-of-loop

      const moduleNames = ['NumberUtils', 'StringUtils', 'ArrayUtils', 'MyModule', 'AnotherModule', 'BaseModule']

      let modules = {}

      for (const moduleName of moduleNames) {
        import module from './' + moduleName
        modules.moduleName = module
      }

      export modules

    */
