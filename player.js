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
    this.game.load.atlas('hiker', 'assets/images/theSprites.png', 'assets/images/theSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

  },

  create: function(){
    this.hiker =  this.game.add.sprite(200, this.game.world.height - 400, 'hiker');

    this.hiker.animations.add('step', ['run1', 'run2', 'run3', 'run4', 'run5', 'run6'], 10, true);
    this.hiker.animations.add('jump', ['jump', 'jump1', 'jump'], 14, true);
    this.hiker.animations.add('duck', ['duck'], 14, true);

    this.game.camera.follow(this.hiker);

    this.game.physics.enable(this.hiker, Phaser.Physics.ARCADE);
    this.hiker.body.collideWorldBounds = true;
    this.hiker.anchor.setTo(0.5, 1.0);

    this.cursors =  this.game.input.keyboard.createCursorKeys();

    this.playerJump = this.game.add.audio('jump');
    this.playerJump.volume = 0.2;
    this.playerJump.loop = false;

    this.shuffle = this.game.add.audio('shuffles');
    this.shuffle.volume = 0.4;
    this.shuffle.loop = true;

  },

  update: function(){
    this.game.physics.arcade.collide(this.hiker, trail.ground);

    this.hiker.body.velocity.x = 0;

    if (this.cursors.up.isDown && this.hiker.body.touching.down) {
      this.hiker.body.velocity.y = -305;
      this.hiker.animations.stop();
      this.playerJump.play();
      this.hiker.frameName = 'jump1';
    } else if (this.cursors.down.isDown && this.hiker.body.touching.down) {
      this.hiker.animations.stop();
      this.hiker.frameName = 'duck';
      this.hiker.y += 3.5;
    } else if (this.cursors.left.isDown) {
      this.hiker.body.velocity.x = -150;
      this.hiker.animations.play('step');
    } else if (this.cursors.right.isDown) {
      this.hiker.body.velocity.x = 150;
      this.hiker.animations.play('step');
    } else {
      this.hiker.animations.play('step');
    }
    if (this.hiker.y < 231){
      this.hiker.animations.stop();
      this.hiker.frameName = 'jump1';
    }
  }
};
