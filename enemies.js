Enemy = function(game) {

  //call all enemies that will come in game
  this.game = game;
  this.bird = null;
  this.stump = null;
  this.boulder = null;
  this.bunny = null;
  this.deer = null;
  this.wolf = null;
  this.fire = null;
  this.bigCloud = null;
  this.birdChirp = null;
  this.bunnyHop = null;
  this.growl = null;
  this.flame = null;

};

Enemy.prototype = {
  preload: function(){
     this.game.load.atlas('enemy', 'assets/image/theSprites.png', 'assets/image/theSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
     this.game.load.image('cloud', 'assets/images/cloud.png');
     this.game.load.image('pinkUnicorn', 'assets/images/unicorn.png');
  },

  create: function(){

    // // stats
    // this.hits = 0;
    // this.points = 0;
    // this.maxHits = 5;

    // set up stats
    var style1 = { font: "20px Bangers", fill: "#ff0"};
    var t1 = this.game.add.text(10, 20, "Points:", style1);
    var t2 = this.game.add.text(10, 45, "Remaining Hits:", style1);
    t1.fixedToCamera = true;
    t2.fixedToCamera = true;

    var style2 = { font: "20px Bangers", fill: "rgb(165, 15, 172)"};
    this.pointsText = this.game.add.text(80, 20, "", style2);
    this.hitsText = this.game.add.text(130, 45, "", style2);
    this.refreshStats();
    this.pointsText.fixedToCamera = true;
    this.hitsText.fixedToCamera = true;

    // add all the enemies
    this.pinkUnicorn = this.game.add.group();
    this.bird = this.game.add.group();
    this.stump = this.game.add.group();
    this.boulder = this.game.add.group();
    this.bunny = this.game.add.group();
    this.deer = this.game.add.group();
    this.wolf = this.game.add.group();
    this.fire = this.game.add.group();

    //  set times for all enemies to appear
    this.game.time.events.add(Phaser.Timer.SECOND * 1, this.createStump, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 10, this.createStump, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 3, this.createBoulder, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 15, this.createBoulder, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 8, this.createBunny, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 30, this.createBunny, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 60, this.createBunny, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 12, this.createBird, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 30, this.createBird, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 45, this.createBird, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 8, this.createDeer, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 35, this.createDeer, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 70, this.createDeer, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 25, this.createWolf, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 50, this.createWolf, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 80, this.createWolf, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 33, this.createFire, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 66, this.createFire, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 99, this.createFire, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 60, this.createUnicorn, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 120, this.createUnicorn, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 180, this.createUnicorn, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 240, this.createUnicorn, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 300, this.createUnicorn, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 360, this.createUnicorn, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 420, this.createUnicorn, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 480, this.createUnicorn, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 540, this.createUnicorn, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 600, this.createUnicorn, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 660, this.createUnicorn, this);

    // set up audio for animals
    this.birdChirp = this.game.add.audio('chirp');
    this.birdChirp.volume = 0.4;
    this.birdChirp.loop = true;

    this.bunnyHop = this.game.add.audio('hop');
    this.bunnyHop.volume = 0.2;
    this.bunnyHop.loop = false;

    this.growl = this.game.add.audio('growl');
    this.growl.volume = 0.5;
    this.growl.loop = false;

    this.flame = this.game.add.audio('fire');
    this.flame.volume = 0.7;
    this.flame.loop = true;

  },

  createBird: function(){

    this.bird = this.game.add.sprite(766, 230, 'enemy');
    this.bird.enableBody = true;
    this.bird.animations.add('bird', ['bird1', 'bird2', 'bird3', 'bird4'], 7, true);
    this.game.physics.enable(this.bird, Phaser.Physics.ARCADE);
    this.bird.body.allowGravity = false;
    this.bird.name = 'Gull';
    this.bird.collideWorldBounds = false;
    this.bird.checkWorldBounds = true;
    this.bird.events.onOutOfBounds.add(this.birdOut, this);
    this.bird.body.velocity.x = this.game.rnd.integerInRange(-250, -110);
    this.bird.body.immovable = true;
    this.bird.animations.play('bird');
    this.birdChirp.play();

  },

  birdOut: function(){
    this.game.time.events.add(Phaser.Timer.SECOND * (this.game.rnd.integerInRange(10, 15)), this.createBird, this);
  },

  createStump: function() {

    this.stump = this.game.add.sprite(766, 260, 'enemy');
    this.stump.enableBody = true;
    this.stump.animations.add('stump', ['stump'], 1, true);
    this.game.physics.enable(this.stump, Phaser.Physics.ARCADE);
    this.stump.body.allowGravity = false;
    this.stump.name = 'Stumpy';
    this.stump.collideWorldBounds = false;
    this.stump.checkWorldBounds = true;
    this.stump.events.onOutOfBounds.add(this.stumpOut, this);
    this.stump.body.velocity.x = -90;
    this.stump.body.immovable = true;
    this.stump.animations.play('stump');

  },

  stumpOut: function(){
    this.game.time.events.add(Phaser.Timer.SECOND * (this.game.rnd.integerInRange(1, 4)), this.createStump, this);
  },

  createBoulder: function(){

    this.boulder = this.game.add.sprite(766, 270, 'enemy');
    this.boulder.enableBody = true;
    this.boulder.animations.add('boulder', ['boulder'], 1, true);
    this.game.physics.enable(this.boulder, Phaser.Physics.ARCADE);
    this.boulder.body.allowGravity = false;
    this.boulder.name = 'Rocky';
    this.boulder.collideWorldBounds = false;
    this.boulder.checkWorldBounds = true;
    this.boulder.events.onOutOfBounds.add(this.boulderOut, this);
    this.boulder.body.velocity.x = -90;
    this.boulder.body.immovable = true;
    this.boulder.animations.play('boulder');

  },

  boulderOut: function(){
    this.game.time.events.add(Phaser.Timer.SECOND * (this.game.rnd.integerInRange(1, 4)), this.createBoulder, this);
  },

  createBunny: function() {

    this.bunny = this.game.add.sprite(766, 270, 'enemy');
    this.bunny.enableBody = true;
    this.bunny.animations.add('bunny', ['bunny1', 'bunny2', 'bunny3', 'bunny4', 'bunny5', 'bunny6'], 10, true);
    this.game.physics.enable(this.bunny, Phaser.Physics.ARCADE);
    this.bunny.body.allowGravity = false;
    this.bunny.name = 'Thumper';
    this.bunny.collideWorldBouds = false;
    this.bunny.checkWorldBounds = true;
    this.bunny.events.onOutOfBounds.add(this.bunnyOut, this);
    this.bunny.body.velocity.x = this.game.rnd.integerInRange(-250, -110);
    this.bunny.body.immovable = true;
    this.bunny.animations.play('bunny');
    this.bunnyHop.play();

  },

  bunnyOut: function(){
    this.game.time.events.add(Phaser.Timer.SECOND * (this.game.rnd.integerInRange(5, 10)), this.createBunny, this);
  },

  createDeer: function() {

    this.deer = this.game.add.sprite(766, 270, 'enemy');
    this.deer.enableBody = true;
    this.deer.animations.add('deer', ['deer1', 'deer2', 'deer3', 'deer4', 'deer5'], 2, true);
    this.game.physics.enable(this.deer, Phaser.Physics.ARCADE);
    this.deer.body.allowGravity = false;
    this.deer.name = 'Bambi';
    this.deer.collideWorldBouds = false;
    this.deer.checkWorldBounds = true;
    this.deer.events.onOutOfBounds.add(this.deerOut, this);
    this.deer.body.velocity.x = -90;
    this.deer.body.immovable = true;
    this.deer.animations.play('deer');

  },

  deerOut: function(){
    this.game.time.events.add(Phaser.Timer.SECOND * (this.game.rnd.integerInRange(10, 20)), this.createDeer, this);
  },


  createWolf: function() {

    this.wolf = this.game.add.sprite(766, 260, 'enemy');
    this.wolf.enableBody = true;
    this.wolf.animations.add('wolf', ['wolf1', 'wolf2', 'wolf3', 'wolf4', 'wolf5', 'wolf5', 'wolf5', 'wolf5', 'wolf4', 'wolf3', 'wolf2'], 2, true);
    this.game.physics.enable(this.wolf, Phaser.Physics.ARCADE);
    this.wolf.body.allowGravity = false;
    this.wolf.name = 'Wolfy';
    this.wolf.collideWorldBouds = false;
    this.wolf.checkWorldBounds = true;
    this.wolf.events.onOutOfBounds.add(this.wolfOut, this);
    this.wolf.body.velocity.x = -90;
    this.wolf.body.immovable = true;
    this.wolf.animations.play('wolf');
    this.growl.play();

  },

  wolfOut: function(){
    this.game.time.events.add(Phaser.Timer.SECOND * (this.game.rnd.integerInRange(20, 40)), this.createWolf, this);
  },

  createFire: function() {

    this.fire = this.game.add.sprite(766, 260, 'enemy');
    this.fire.enableBody = true;
    this.fire.animations.add('flame', ['fire1', 'fire2', 'fire3'], 5, true);
    this.game.physics.enable(this.fire, Phaser.Physics.ARCADE);
    this.fire.body.allowGravity = false;
    this.fire.name = 'FlameBoy';
    this.fire.collideWorldBouds = false;
    this.fire.checkWorldBounds = true;
    this.fire.events.onOutOfBounds.add(this.fireOut, this);
    this.fire.body.velocity.x = -90;
    this.fire.body.immovable = true;
    this.fire.animations.play('flame');
    this.flame.play();

  },

  fireOut: function(){
    this.game.time.events.add(Phaser.Timer.SECOND * (this.game.rnd.integerInRange(20, 40)), this.createFire, this);
  },

  createUnicorn: function(){

    this.pinkUnicorn = this.game.add.sprite(775, -15, 'pinkUnicorn');
    this.pinkUnicorn.scale.setTo(1, 1);
    this.game.physics.enable(this.pinkUnicorn, Phaser.Physics.ARCADE);
    this.pinkUnicorn.body.allowGravity = false;
    this.pinkUnicorn.name = 'Pinky';
    this.pinkUnicorn.checkWorldBounds = true;
    this.pinkUnicorn.body.velocity.x = -90;

  },

  update: function(){
    gameGlobal.points += (Phaser.Timer.SECOND / 1000);
    this.refreshStats();
    this.game.world.bringToTop(this.stump);
    this.game.world.bringToTop(this.boulder);
    this.game.world.bringToTop(this.bunny);
    this.game.world.bringToTop(this.deer);
    this.game.world.bringToTop(this.wolf);
    this.game.world.bringToTop(this.fire);
    this.game.world.bringToTop(this.pinkUnicorn);

    this.game.physics.arcade.collide(this.bird, player.hiker, this.birdCollide, null, this);
    this.game.physics.arcade.collide(this.stump, player.hiker, this.stumpCollide, null, this);
    this.game.physics.arcade.collide(this.boulder, player.hiker, this.boulderCollide, null, this);
    this.game.physics.arcade.collide(this.bunny, player.hiker, this.bunnyCollide, null, this);
    this.game.physics.arcade.collide(this.deer, player.hiker, this.deerCollide, null, this);
    this.game.physics.arcade.collide(this.wolf, player.hiker, this.wolfCollide, null, this);
    this.game.physics.arcade.collide(this.fire, player.hiker, this.fireCollide, null, this);

    if (gameGlobal.hits === 5) {
      this.birdChirp.stop();
      this.flame.stop();
      this.game.state.start('end');
    }
  },

  birdCollide: function(){
    this.birdChirp.stop();
  },
  stumpCollide: function(){},
  boulderCollide: function(){},
  bunnyCollide: function(enemy, player){
    enemy.destroy();
    gameGlobal.hits++;
    gameGlobal.points += 5;
    this.refreshStats();
    this.game.time.events.add(Phaser.Timer.SECOND * (this.game.rnd.integerInRange(7, 12)), this.createBunny, this);
  },
  deerCollide: function(enemy, player){
    enemy.destroy();
    gameGlobal.hits++;
    gameGlobal.points += 5;
    this.refreshStats();
    this.game.time.events.add(Phaser.Timer.SECOND * (this.game.rnd.integerInRange(10, 15)), this.createDeer, this);
  },
  wolfCollide: function(enemy, player){
    enemy.destroy();
    gameGlobal.hits++;
    gameGlobal.points += 5;
    this.refreshStats();
    this.game.time.events.add(Phaser.Timer.SECOND * (this.game.rnd.integerInRange(20, 30)), this.createWolf, this);
  },
  fireCollide: function(enemy, player){
    enemy.destroy();
    this.flame.stop();
    gameGlobal.hits++;
    gameGlobal.points += 5;
    this.refreshStats();
    this.game.time.events.add(Phaser.Timer.SECOND * (this.game.rnd.integerInRange(20, 30)), this.createFire, this);
  },
  refreshStats: function(){

    // called this to update stats
    this.pointsText.text = gameGlobal.points;
    this.hitsText.text = gameGlobal.maxHits - gameGlobal.hits;
  },
};
