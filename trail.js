Trail = function(game) {
  this.game = game;
  this.mountainsMove = null;
  this.movingTrail = null;
};

Trail.prototype = {
  preload: function(){
    this.game.load.image('ground', 'assets/images/BrickPattern.png');
    this.game.load.image('mountainsMove', 'assets/images/country-platform-back.png');
    this.game.load.image('movingTrail', 'assets/images/country-platform.png');
    this.game.load.atlas('enemy', 'assets/images/theSprites.png', 'assets/images/theSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
  },
  create: function(){
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 900;

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

  },

  cloudOut: function(cloud){
    cloud.reset(775, cloud.y);
    cloud.body.velocity.x = this.game.rnd.integerInRange(-250, -110);
  },

  update: function(){
  if (gameGlobal.hits === 5) {
    console.log("stop?");
     myMusic.pause();
   }
    this.mountainsMove.tilePosition.x -=0.1;
    this.movingTrail.tilePosition.x -=1.5;
  }

};
