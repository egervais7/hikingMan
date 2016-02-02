Trail = function(game) {
  this.game = game;
  this.mountainsMove = null;
  this.movingTrail = null;
  this.cloud = null;
  this.bunny = null;
  this.bird = null;
  this.deer = null;
  this.wolf = null;
  this.boulder = null;
  this.stump = null;
};

Trail.prototype = {
  preload: function(){
    this.game.load.image('ground', 'images/BrickPattern.png');
    this.game.load.image('mountainsMove', 'images/country-platform-back.png');
    this.game.load.image('movingTrail', 'images/country-platform.png');
    this.game.load.image('cloud', 'images/cloud.png');
    this.game.load.atlas('enemy', 'images/theSprites.png', 'images/theSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
  },
  create: function(){
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 650;

    this.ground = this.game.add.tileSprite(0,this.game.height-25,this.game.world.width,70,'ground');
    this.game.physics.arcade.enable(this.ground);
    this.ground.body.immovable = true;
    this.ground.body.allowGravity = false;

    this.mountainsMove = this.game.add.tileSprite(0.5, 90, 800, 450, 'mountainsMove');
    this.game.physics.enable(this.mountainsMove, Phaser.Physics.ARCADE);
    this.mountainsMove.body.immovable = true;
    this.mountainsMove.body.allowGravity = false;
    this.mountainsMove.body.setSize(700, 33, 0, 287);

    this.movingTrail = this.game.add.tileSprite(0.5, 100, 800, 300, 'movingTrail');
    this.game.physics.enable(this.movingTrail, Phaser.Physics.ARCADE);
    this.movingTrail.body.immovable = true;
    this.movingTrail.body.allowGravity = false;
    this.movingTrail.body.setSize(700, 33, 0, 287);

    this.cloud = this.game.add.sprite(450, 25, 'cloud');
    this.cloud.scale.setTo(0.3, 0.3);
    this.game.physics.enable(this.cloud, Phaser.Physics.ARCADE);
    this.cloud.body.allowGravity = false;
    this.cloud.name = 'cloudy';
    this.cloud.checkWorldBounds = true;
    this.cloud.events.onOutOfBounds.add(this.cloudOut, this);
    this.cloud.body.velocity.x = -35;

    this.bunny = this.game.add.sprite(775, 260, 'enemy');
    this.bunny.animations.add('hop', ['bunny1', 'bunny2', 'bunny3', 'bunny4', 'bunny5', 'bunny6'], 10, true);
    this.game.physics.enable(this.bunny, Phaser.Physics.ARCADE);
    this.bunny.body.allowGravity = false;
    this.bunny.name = 'bunny';
    this.bunny.checkWorldBounds = true;
    this.bunny.events.onOutOfBounds.add(this.bunnyOut, this);
    this.bunny.body.velocity.x = -95;

    this.deer = this.game.add.sprite(775, 260, 'enemy');
  },

  cloudOut: function(cloud){
    cloud.reset(775, cloud.y);
    cloud.body.velocity.x = -105;
  },

  bunnyOut: function(bunny){
    bunny.reset(775, bunny.y);
    bunny.body.velocity.x = -95;
  },

  update: function(){
    this.mountainsMove.tilePosition.x -=0.1;
    this.movingTrail.tilePosition.x -=1.5;
    this.bunny.animations.play('hop');
  }

};
