import exampleCharacterPNG from './../assets/atlas/atlas.png'
import exampleCharacterJSON from './../assets/atlas/atlas.json'


// Could be relevant

//   this.scene.manager.keys.GamepadScene.stop();
 //   this.input.keyboard.removeAllListeners();
  //  this.input.removeAllListeners();
   // this.server.removeAllListeners();


// Sensor field (solves collide problem)
//I've set a key-less child sprite to the player in the same size and set the anchor depending on the direction the player look (0.5 +/- 0.25, 0.5 +/- 0.25), to let it leap a bit of.
// With this "sensor-field" I can work with overlap to pass the object for evaluation.
   
export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
 		
 	      this.scene = config.scene;
        let scene = this.scene;
        
        this.actionCounter = 0;

        // are probably not necessary
        this.inAction = false;
        this.inDialogue = false;
        this.contactWithCharacter = false;

        this.characterLastContacted = null;

        this.isAllowedToMove = true;
        this.characterInteraction = [];

        // Cursors registered by Phaser!
        this.cursors = scene.input.keyboard.createCursorKeys();
            
        
        scene.physics.world.enable(this);

        //Later on spawn character from this position on login
	 	/*this.lastPosition = {
	      x: x,
	      y: y,
	      emittedOn: Date.now()
	    };*/

        
  // Create a sprite with physics enabled via the physics system. The image used for the sprite has
  // a bit of whitespace, so I'm using setSize & setOffset to control the size of the player's body.
	 	this.setSize(30, 40);
    this.setOffset(0, 24);
        
        
		scene.anims.create({
		    key: "misa-left-walk",
		    frames: scene.anims.generateFrameNames("atlas", { prefix: "misa-left-walk.", start: 0, end: 3, zeroPad: 3 }),
		    frameRate: 10,
		    repeat: -1
		  });
		  scene.anims.create({
		    key: "misa-right-walk",
		    frames: scene.anims.generateFrameNames("atlas", { prefix: "misa-right-walk.", start: 0, end: 3, zeroPad: 3 }),
		    frameRate: 10,
		    repeat: -1
		  });
		  scene.anims.create({
		    key: "misa-front-walk",
		    frames: scene.anims.generateFrameNames("atlas", { prefix: "misa-front-walk.", start: 0, end: 3, zeroPad: 3 }),
		    frameRate: 10,
		    repeat: -1
		  });
		  scene.anims.create({
		    key: "misa-back-walk",
		    frames: scene.anims.generateFrameNames("atlas", { prefix: "misa-back-walk.", start: 0, end: 3, zeroPad: 3 }),
		    frameRate: 10,
		    repeat: -1
		  });

	 	  config.scene.add.existing(this);

	 	} // End of constructor

preloading(){
  this.load.atlas("atlas", exampleCharacterPNG, exampleCharacterJSON);
}

move(time, delta) {
// Movement
  if (this.isAllowedToMove === true){
  const speed = 300
  const prevVelocity = this.body.velocity.clone();
  

  //console.log(player.x, player.y)

  // Stop any previous movement from the last frame
  this.body.setVelocity(0);

  // Horizontal movement
  if (this.cursors.left.isDown) {
    this.body.setVelocityX(-speed);
  } else if (this.cursors.right.isDown) {
   this.body.setVelocityX(speed);
  }

  // Vertical movement
  if (this.cursors.up.isDown) {
    this.body.setVelocityY(-speed);
  } else if (this.cursors.down.isDown) {
    this.body.setVelocityY(speed);
  }

  // Normalize and scale the velocity so that this can't move faster along a diagonal
  this.body.velocity.normalize().scale(speed);

  // Update the animation last and give left/right animations precedence over up/down animations
  if (this.cursors.left.isDown) {
    this.anims.play("misa-left-walk", true);
  } else if (this.cursors.right.isDown) {
    this.anims.play("misa-right-walk", true);
  } else if (this.cursors.up.isDown) {
    this.anims.play("misa-back-walk", true);
  } else if (this.cursors.down.isDown) {
    this.anims.play("misa-front-walk", true);
  } else {
    this.anims.stop();

    // If we were moving, pick an idle frame to use
    if      (prevVelocity.x < 0) this.setTexture("atlas", "misa-left");
    else if (prevVelocity.x > 0) this.setTexture("atlas", "misa-right");
    else if (prevVelocity.y < 0) this.setTexture("atlas", "misa-back");
    else if (prevVelocity.y > 0) this.setTexture("atlas", "misa-front");
  }
 
  /*if(this.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
    console.log('yeeehaaa')
  }*/

  // I don't know yet how to stop the animation after keypress, this should happen automatically
  // but this is currently not the case, I think because of how we installed the thing, maybe it will work if we run it like a vue app?
   this.cursors.left.isDown = false;
   this.cursors.right.isDown = false;
   this.cursors.up.isDown = false;
   this.cursors.down.isDown = false;
  
  } //End of player is allowed to move function


// Player functions
}




} // End of export

