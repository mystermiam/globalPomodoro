import { Scene } from 'phaser'

    var platforms,
        player = {
          allowedToJump: true
        },
        stars,
        cursors,
        score,
        scoreText,
        keys = {
          spaceBar: false,
          left: false,
          right: false,
        };

export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene' })
  }

  init () 
  {
    // should define variables here
  }

  create ()
    {
         this.add.image(400, 300, 'sky');

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        player = this.physics.add.sprite(100, 450, 'dude');

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        //  Register the keys. Works with one key! But not with two!
        //keys.left = this.input.keyboard.on(Phaser.Input.Keyboard.KeyCodes.A, function () {return true});
        
        keys.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keys.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //  Stop the following keys from propagating up to the browser
       // this.Phaser.Input.Keyboard.KeyCodes.addKeyCapture([ Phaser.Input.Keyboard.KeyCodes.LEFT, Phaser.Input.Keyboard.KeyCodes.RIGHT, Phaser.Input.Keyboard.KeyCodes.SPACE ]);

        stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        stars.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);

        this.physics.add.overlap(player, stars, this.collectStar, null, this);


             //Add bomb to add game challenge
        const bomb = this.physics.add.sprite(400, 200, 'bomb')
        bomb.setCollideWorldBounds(true)
        this.physics.add.collider(bomb, platforms);
        bomb.setBounce(1)
        bomb.setVelocity(200, 20)

        this.physics.add.overlap(player, bomb, this.gameOver, null, this);
    }

  
  update ()
    {

        // With one key it works? Why? 
        if (keys.left.isDown)
        {

            player.setVelocityX(-160);

            player.anims.play('left', true);

            // Works, makes player stop, but directly, could use
            //keys.left.isDown = false;
        }
        
        else if (keys.right.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('right', true);

            //keys.right.isDown = false;
        }
        else
        {

            player.setVelocityX(0);

            player.anims.play('turn');
        }

       // The player might try to jump if the jump key has been released while standing on the ground
        if(!keys.spaceBar.isDown && player.body.touching.down){
           player.allowedToJump = true;
        }
        // The jump key is down, the body is on the ground and the player is allowed to jump => jump!
        if(keys.spaceBar.isDown && player.body.touching.down && player.allowedToJump){
           /* Insert jump code */
           player.setVelocityY(-330);
           player.allowedToJump = false;
        }
    }

    collectStar (player, star)
    {
        star.disableBody(true, true);

        score += 10;
        scoreText.setText('Score: ' + score);
    }

    gameOver()
    {
        score -= 10;
        scoreText.setText('Score: ' + score);
    }
   
}
