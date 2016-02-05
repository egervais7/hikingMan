Player = function(game){
  this.game = game;
  this.group = null;
  this.hiker = null;
  this.cursors = null;
  this.playerJump = null;
  this.shuffle = null;
};

Player.prototype = {

  preload: function(){
    // preloads hiker animation from sprite sheet
    this.game.load.atlas('hiker', 'images/theSprites.png', 'images/theSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
  },

  create: function(){

    // adds hiker to game page
    this.hiker =  this.game.add.sprite(200, this.game.world.height - 400, 'hiker');

    // adds the different animations for the hiker
    this.hiker.animations.add('step', ['run1', 'run2', 'run3', 'run4', 'run5', 'run6'], 10, true);
    this.hiker.animations.add('jump', ['jump', 'jump1', 'jump'], 14, true);
    this.hiker.animations.add('duck', ['duck'], 14, true);
    this.hiker.animations.add('stuck', ['jump'], 14, true);

    // tells camera to follow the hiker
    this.game.camera.follow(this.hiker);

    // allowing game physics to be on hiker
    this.game.physics.enable(this.hiker, Phaser.Physics.ARCADE);
    this.hiker.body.collideWorldBounds = true;
    this.hiker.anchor.setTo(0.5, 1.0);
    this.hiker.body.setSize(20, 30, 0, -10);

    // allows player to use keys to move hiker
    this.cursors =  this.game.input.keyboard.createCursorKeys();

    // set up sounds for the hiker
    this.playerJump = this.game.add.audio('jump');
    this.playerJump.volume = 0.2;
    this.playerJump.loop = false;

    this.shuffle = this.game.add.audio('shuffles');
    this.shuffle.volume = 0.4;
    this.shuffle.loop = true;

  },

  update: function(){

    // telling game that the hiker walks along the set ground
    this.game.physics.arcade.collide(this.hiker, trail.ground);

    // setting hiker speed
    this.hiker.body.velocity.x = 0;

    // set up the different key functions that the player uses to control the hiker
    if (this.cursors.up.isDown && this.hiker.body.touching.down) {
      this.hiker.body.velocity.y = -305;
      this.hiker.animations.stop();
      this.playerJump.play();
      this.hiker.frameName = 'jump1';
    } else if (this.cursors.down.isDown && this.hiker.body.touching.down) {
      this.hiker.animations.stop();
      this.hiker.frameName = 'duck';
      this.hiker.body.velocity.x = -90;
      this.hiker.y += 3.5;
    } else if (this.cursors.left.isDown) {
      this.hiker.body.velocity.x = -150;
      this.hiker.animations.play('step');
    } else if (this.cursors.right.isDown) {
      this.hiker.body.velocity.x = 150;
      this.hiker.animations.play('step');
    } else if (!this.hiker.body.touching.down){
      this.hiker.animations.play('stuck');
    } else {
      this.hiker.animations.play('step');
    }
    if (this.hiker.y < 231){
      this.hiker.animations.stop();
      this.hiker.frameName = 'jump1';
    }
  },

  // used to debug game
  render: function(){
      // this.game.debug.body(this.hiker);
  }
};
