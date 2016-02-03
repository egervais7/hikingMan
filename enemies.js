Enemy = function(game) {

  //call all enemies that will come in game
  this.game = game;
  this.bird = null;
  this.stump = null;
  this.boulder = null;
  this.bunny = null;
  this.deer = null;
  this.wolf = null;
  this.bigCloud = null;

};

Enemy.prototype = {
  preload: function(){
     this.game.load.atlas('enemy', 'image/theSprites.png', 'image/theSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
     this.game.load.image('cloud', 'images/cloud.png');
     this.game.load.image('pinkUnicorn', 'images/unicorn.png');
  },

  create: function(){

    // add all the enemies
    this.pinkUnicorn = this.game.add.group();
    this.bird = this.game.add.group();
    this.stump = this.game.add.group();
    this.boulder = this.game.add.group();
    this.bunny = this.game.add.group();
    this.deer = this.game.add.group();
    this.wolf = this.game.add.group();

    //  set times for all enemies to appear
    this.game.time.events.add(Phaser.Timer.SECOND * 1, this.createStump, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 10, this.createStump, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 18, this.createStump, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 30, this.createStump, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 40, this.createStump, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 50, this.createStump, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 60, this.createStump, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 70, this.createStump, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 80, this.createStump, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 90, this.createStump, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 100, this.createStump, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 110, this.createStump, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 120, this.createStump, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 130, this.createStump, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 140, this.createStump, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 150, this.createStump, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 160, this.createStump, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 170, this.createStump, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 180, this.createStump, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 190, this.createStump, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 200, this.createStump, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 5, this.createBoulder, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 15, this.createBoulder, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 35, this.createBoulder, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 45, this.createBoulder, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 58, this.createBoulder, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 75, this.createBoulder, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 93, this.createBoulder, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 105, this.createBoulder, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 122, this.createBoulder, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 135, this.createBoulder, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 157, this.createBoulder, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 165, this.createBoulder, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 188, this.createBoulder, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 195, this.createBoulder, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 11, this.createBunny, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 20, this.createBunny, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 42, this.createBunny, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 51, this.createBunny, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 68, this.createBunny, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 72, this.createBunny, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 85, this.createBunny, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 103, this.createBunny, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 124, this.createBunny, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 142, this.createBunny, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 163, this.createBunny, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 189, this.createBunny, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 205, this.createBunny, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 213, this.createBunny, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 230, this.createBunny, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 8, this.createBird, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 23, this.createBird, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 37, this.createBird, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 46, this.createBird, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 65, this.createBird, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 92, this.createBird, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 117, this.createBird, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 138, this.createBird, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 161, this.createBird, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 184, this.createBird, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 14, this.createDeer, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 33, this.createDeer, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 62, this.createDeer, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 93, this.createDeer, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 127, this.createDeer, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 155, this.createDeer, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 176, this.createDeer, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 201, this.createDeer, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 224, this.createDeer, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 240, this.createDeer, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 48, this.createWolf, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 89, this.createWolf, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 122, this.createWolf, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 169, this.createWolf, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 205, this.createWolf, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 235, this.createWolf, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 255, this.createWolf, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 60, this.createUnicorn, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 120, this.createUnicorn, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 180, this.createUnicorn, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 240, this.createUnicorn, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 300, this.createUnicorn, this);

  },

  createBird: function(){

    this.bird = this.game.add.sprite(766, 230, 'enemy');
    this.bird.enableBody = true;
    this.bird.animations.add('bird', ['bird1', 'bird2', 'bird3', 'bird4'], 7, true);
    this.game.physics.enable(this.bird, Phaser.Physics.ARCADE);
    this.bird.body.allowGravity = false;
    this.bird.name = 'Gull';
    this.bird.collideWorldBounds = false;
    this.bird.body.velocity.x = this.game.rnd.integerInRange(-250, -110);
    this.bird.body.immovable = true;
    this.bird.animations.play('bird');

  },

  createStump: function() {

    this.stump = this.game.add.sprite(766, 260, 'enemy');
    this.stump.enableBody = true;
    this.stump.animations.add('stump', ['stump'], 1, true);
    this.game.physics.enable(this.stump, Phaser.Physics.ARCADE);
    this.stump.body.allowGravity = false;
    this.stump.name = 'Stumpy';
    this.stump.checkWorldBouds = false;
    this.stump.body.velocity.x = -90;
    this.stump.body.immovable = true;
    this.stump.animations.play('stump');

  },

  createBoulder: function(){

    this.boulder = this.game.add.sprite(766, 270, 'enemy');
    this.boulder.enableBody = true;
    this.boulder.animations.add('boulder', ['boulder'], 1, true);
    this.game.physics.enable(this.boulder, Phaser.Physics.ARCADE);
    this.boulder.body.allowGravity = false;
    this.boulder.name = 'Rocky';
    this.boulder.checkWouldBounds = false;
    this.boulder.body.velocity.x = -90;
    this.boulder.body.immovable = true;
    this.boulder.animations.play('boulder');

  },

  createBunny: function() {

    this.bunny = this.game.add.sprite(766, 270, 'enemy');
    this.bunny.enableBody = true;
    this.bunny.animations.add('bunny', ['bunny1', 'bunny2', 'bunny3', 'bunny4', 'bunny5', 'bunny6'], 10, true);
    this.game.physics.enable(this.bunny, Phaser.Physics.ARCADE);
    this.bunny.body.allowGravity = false;
    this.bunny.name = 'Thumper';
    this.bunny.checkWorldBouds = false;
    this.bunny.body.velocity.x = this.game.rnd.integerInRange(-250, -110);
    this.bunny.body.immovable = true;
    this.bunny.animations.play('bunny');

  },

  createDeer: function() {

    this.deer = this.game.add.sprite(766, 250, 'enemy');
    this.deer.enableBody = true;
    this.deer.animations.add('deer', ['deer1', 'deer2', 'deer3', 'deer4', 'deer5'], 2, true);
    this.game.physics.enable(this.deer, Phaser.Physics.ARCADE);
    this.deer.body.allowGravity = false;
    this.deer.name = 'Bambi';
    this.deer.checkWorldBouds = false;
    this.deer.body.velocity.x = -90;
    this.deer.body.immovable = true;
    this.deer.animations.play('deer');

  },

  createWolf: function() {

    this.wolf = this.game.add.sprite(766, 260, 'enemy');
    this.wolf.enableBody = true;
    this.wolf.animations.add('wolf', ['wolf1', 'wolf2', 'wolf3', 'wolf4', 'wolf5', 'wolf5', 'wolf5', 'wolf5', 'wolf4', 'wolf3', 'wolf2'], 2, true);
    this.game.physics.enable(this.wolf, Phaser.Physics.ARCADE);
    this.wolf.body.allowGravity = false;
    this.wolf.name = 'Wolfy';
    this.wolf.checkWorldBouds = false;
    this.wolf.body.velocity.x = -90;
    this.wolf.body.immovable = true;
    this.wolf.animations.play('wolf');

  },

  createUnicorn: function(){

    this.pinkUnicorn = this.game.add.sprite(775, -15, 'pinkUnicorn');
    this.pinkUnicorn.scale.setTo(1, 1);
    this.game.physics.enable(this.pinkUnicorn, Phaser.Physics.ARCADE);
    this.pinkUnicorn.body.allowGravity = false;
    this.pinkUnicorn.name = 'theFog';
    this.pinkUnicorn.checkWorldBounds = true;
    this.pinkUnicorn.body.velocity.x = -90;

  },

  update: function(){
    this.game.world.bringToTop(this.pinkUnicorn);
  }
};
