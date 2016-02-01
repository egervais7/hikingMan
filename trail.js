Trail = function(game) {
  this.game = game;
  this.movingTrail = null;
  this.cloud = null;
};

Trail.prototype = {
  preload: function(){
    this.game.load.image('movingTrail', 'images/country-platform.png');
    this.game.load.image('cloud', 'images/cloud.png');
  },
  create: function(){
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 500;

    this.movingTrail = this.game.add.tileSprite(0.5, 0.5, 800, 320, 'movingTrail');
    this.game.physics.enable(this.movingTrail, Phaser.Physics.ARCADE);
    this.movingTrail.body.immovable = true;
    this.movingTrail.body.allowGravity = false;
    this.movingTrail.body.serSize(800, 33, 0, 287);

    this.cloud = this.game.add.sprite(450, 25, 'cloud');
    this.game.physics.enable(this.cloud, Phaser.Physics.ARCADE);
    this.cloud.body.allowGravity = false;
    thie.cloud.name = 'cloudy';
    this.cloud.checkWorldBounds = true;
    this.cloud.events.onOutOfBounds.add(this.cloudOut, this);
    this.ciud.body.velocity.x = -75;
  },

  cloudOut: function(cloud){
    cloud.reset(775, cloud.y);
    cloud.body.velocity.x = -75;
  },

  update: function(){
    this.movingTrail.tilePosition.x -=1.5;
  }
  
};
