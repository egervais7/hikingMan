Player = function(game){
  this.game = game;
  this.group = null;
  this.hiker = null;
  this.cursors = null;
  this.wasd = null;
};

Player.prototype = {

  preload: function(){
    this.game.load.atlas('hiker', 'images/open.png');
  },

  create: function(){
    this.hiker =  this.game.add.sprite(300, this.game.world.height - 100, 'hiker');

    this.hiker.animations.add('runLeft', Phaser.Animation.generateFrameNames('left', 5, 1), 10, true);
    this.hiker.animations.add('runRight', Phaser.Animation.generateFrameNames('right', 5, 1), 15, true);
    this.hiker.animations.add('jumpLeft', Phaser.Animation.generateFrameNames('leftJump', 1, 11), 2, true);
    this.hiker.animations.add('jumpRight', Phaser.Animation.generateFrameNames('rightJump', 1, 11), 2, true);

    this.game.camera.follow(this.hiker);

    this.game.physics.enable(this.guy, Phaser.Physics.ARCADE);
    this.hiker.body.collideWorldBounds = true;
    this.hiker.anchor.setTo(0.5, 0.5);

    this.cursos =  this.game.input.keyboard.createCursorKeys();

  },

  update: function(){
    this.game.physics.arcade.collide(this.hiker, trail.movingTrail);

    this.hiker.body.velocity.x = 0;

    if (this.cursors.up.isDown && this.hiker.body.touching.down) {
      this.hiker.body.velocity.y = -305;
      this.hiker.animations.stop();
      this.hiker.frameName = 'rightJump5';
    } else if (this.cursors.down.isDown && this.hiker.body.touching.down) {
      this.hiker.animations.stop();
      this.hiker.frameName = 'rightJump8';
      this.hiker.guy.y += 3.5;
    } else if (this.cursors.left.isDown) {
      this.hiker.body.velocity.x = -150;
      this.hiker.animations.play('runRight');
    } else if (this.cursors.right.isDown) {
      this.hiker.body.velocity.x = 150;
      this.hiker.animations.play('runLeft');
    } else {
      this.hiker.animations.play('runRight');
    }
    if (this.hiker.y < 231){
      this.hiker.animations.stop();
      this.hiker.frameName = 'rightJump5';
    }
  }
};
