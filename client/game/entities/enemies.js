Enemy = function(game) {

  //call all enemies that will come in game
  this.game = game;
};

Enemy.prototype = {
  preload: function(){
    // load all images for enemy sprites
     this.game.load.atlas('enemy', 'image/theSprites.png', 'image/theSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
     this.game.load.image('cloud', 'images/cloud.png');
     this.game.load.image('pinkUnicorn', 'images/unicorn.png');
     this.game.load.image('heart', 'images/Heart.png');
     this.game.load.image('shrub', 'images/shrub.png');
     this.game.load.image('play', 'images/GreenMusic.png');
     this.game.load.image('mute', 'images/RedMusic.png');
  },

  create: function(){

    // set up stats to show on the page and a mute button
    var style1 = { font: "20px Bangers", fill: "#ff0"};
    var t1 = this.game.add.text(10, 20, "Points:", style1);
    var t2 = this.game.add.text(10, 45, "Remaining Hits:", style1);
    var t3 = this.game.add.button(750, 20, 'play', this.muteMusic, this, 2, 1, 0);
    t1.fixedToCamera = true;
    t2.fixedToCamera = true;

    // display points count and refresh those stats
    var style2 = { font: "20px Bangers", fill: "rgb(165, 15, 172)"};
    this.pointsText = this.game.add.text(80, 20, "", style2);
    this.hitsText = this.game.add.text(160, 45, "", style2);
    this.refreshStats();
    this.pointsText.fixedToCamera = true;
    this.hitsText.fixedToCamera = true;

    // add all the enemies, obstacles, distractions and bonuses
    this.pinkUnicorn = this.game.add.group();
    this.pinkUnicorn.enableBody = true;
    this.pinkUnicorn.physicsBodyType = Phaser.Physics.ARCADE;
    this.pinkUnicorn.createMultiple(5, 'pinkUnicorn');
    this.pinkUnicorn.setAll('anchor.x', 0.5);
    this.pinkUnicorn.setAll('anchor.y', 0.5);

    this.heart = this.game.add.group();
    this.heart.enableBody = true;
    this.heart.physicsBodyType = Phaser.Physics.ARCADE;
    this.heart.createMultiple(5, 'heart');
    this.heart.setAll('anchor.x', 0.5);
    this.heart.setAll('anchor.y', 0.5);

    this.pack = this.game.add.group();
    this.pack.enableBody = true;
    this.pack.physicsBodyType = Phaser.Physics.ARCADE;
    this.pack.createMultiple(5, 'enemy');
    this.pack.setAll('anchor.x', 0.5);
    this.pack.setAll('anchor.y', 0.5);
    this.pack.callAll('body.setSize', 'body', 30, 10, 0, 0);

    this.plane = this.game.add.group();
    this.plane.enableBody = true;
    this.plane.physicsBodyType = Phaser.Physics.ARCADE;
    this.plane.createMultiple(5, 'enemy');
    this.plane.setAll('anchor.x', 0.5);
    this.plane.setAll('anchor.y', 0.5);
    this.plane.callAll('animations.add', 'animations', 'theJet', ['plane1', 'plane2', 'plane3', 'plane4', 'plane5'], 10, true);

    this.bird = this.game.add.group();
    this.bird.enableBody = true;
    this.bird.physicsBodyType = Phaser.Physics.ARCADE;
    this.bird.createMultiple(5, 'enemy');
    this.bird.setAll('anchor.x', 0.5);
    this.bird.setAll('anchor.y', 0.5);
    this.bird.callAll('animations.add', 'animations', 'iago', ['bird1', 'bird2', 'bird3', 'bird4'], 10, true);

    this.stump = this.game.add.group();
    this.stump.enableBody = true;
    this.stump.physicsBodyType = Phaser.Physics.ARCADE;
    this.stump.createMultiple(10, 'enemy');
    this.stump.setAll('anchor.x', 0.5);
    this.stump.setAll('anchor.y', 0.5);
    this.stump.callAll('body.setSize', 'body', 30, 10, 0, 0);

    this.boulder = this.game.add.group();
    this.boulder.enableBody = true;
    this.boulder.physicsBodyType = Phaser.Physics.ARCADE;
    this.boulder.createMultiple(10, 'enemy');
    this.boulder.setAll('anchor.x', 0.5);
    this.boulder.setAll('anchor.y', 0.5);
    this.boulder.callAll('body.setSize', 'body', 23, 23, 0, 0);

    this.bush = this.game.add.group();
    this.bush.enableBody = true;
    this.bush.physicsBodyType = Phaser.Physics.ARCADE;
    this.bush.createMultiple(10, 'shrub');
    this.bush.setAll('anchor.x', 0.5);
    this.bush.setAll('anchor.y', 0.5);
    this.bush.callAll('body.setSize', 'body', 23, 23, 0, 0);

    this.bunny = this.game.add.group();
    this.bunny.enableBody = true;
    this.bunny.physicsBodyType = Phaser.Physics.ARCADE;
    this.bunny.createMultiple(5, 'enemy');
    this.bunny.setAll('anchor.x', 0.5);
    this.bunny.setAll('anchor.y', 0.5);
    this.bunny.callAll('animations.add', 'animations', 'thumper', ['bunny1', 'bunny2', 'bunny3', 'bunny4', 'bunny5', 'bunny6'], 10, true);

    this.deer = this.game.add.group();
    this.deer.enableBody = true;
    this.deer.physicsBodyType = Phaser.Physics.ARCADE;
    this.deer.createMultiple(5, 'enemy');
    this.deer.setAll('anchor.x', 0.5);
    this.deer.setAll('anchor.y', 0.5);
    this.deer.callAll('animations.add', 'animations', 'bambi', ['deer1', 'deer2', 'deer3', 'deer4', 'deer5'], 10, true);

    this.wolf = this.game.add.group();
    this.wolf.enableBody = true;
    this.wolf.physicsBodyType = Phaser.Physics.ARCADE;
    this.wolf.createMultiple(5, 'enemy');
    this.wolf.setAll('anchor.x', 0.5);
    this.wolf.setAll('anchor.y', 0.5);
    this.wolf.callAll('animations.add', 'animations', 'balto', ['wolf1', 'wolf2', 'wolf3', 'wolf4', 'wolf5', 'wolf5', 'wolf5', 'wolf5', 'wolf4', 'wolf3', 'wolf2'], 5, true);

    this.fire = this.game.add.group();
    this.fire.enableBody = true;
    this.fire.physicsBodyType = Phaser.Physics.ARCADE;
    this.fire.createMultiple(5, 'enemy');
    this.fire.setAll('anchor.x', 0.5);
    this.fire.setAll('anchor.y', 0.5);
    this.fire.callAll('animations.add', 'animations', 'flameboy', ['fire1', 'fire2', 'fire3'], 10, true);

    this.wasp = this.game.add.group();
    this.wasp.enableBody = true;
    this.wasp.physicsBodyType = Phaser.Physics.ARCADE;
    this.wasp.createMultiple(5, 'enemy');
    this.wasp.setAll('anchor.x', 0.5);
    this.wasp.setAll('anchor.y', 0.5);
    this.wasp.callAll('animations.add', 'animations', 'buzzer', ['wasp1', 'wasp2', 'wasp3', 'wasp4'], 20, true);

    // set up random timer for spawning of enemies and helpers
    randObs = this.game.rnd.integerInRange(2, 4);
    randEn = this.game.rnd.integerInRange(3, 5);
    randPlane = this.game.rnd.integerInRange(30, 60);

    this.game.time.events.loop(Phaser.Timer.SECOND * randObs, this.spawnObstacle, this);
    this.game.time.events.loop(Phaser.Timer.SECOND * randEn, this.spawnEnemy, this);
    this.game.time.events.loop(Phaser.Timer.SECOND * 94, this.spawnHeart, this);
    this.game.time.events.loop(Phaser.Timer.SECOND * 63, this.spawnPack, this);
    this.game.time.events.loop(Phaser.Timer.SECOND * randPlane, this.spawnPlane, this);
    this.game.time.events.loop(Phaser.Timer.SECOND * 76, this.spawnUnicorn, this);

    if (this.game.gameGlobal.points === 3000) {
      this.game.time.events.loop(Phaser.Timer.SECOND * 6, this.spawnObstacle, this);
    } 

    if (this.game.gameGlobal.points === 6000) {
      this.game.time.events.loop(Phaser.Timer.SECOND * 7, this.spawnEnemy, this);
    }

    // set up audio for animals
    this.birdChirp = this.game.add.audio('chirp');
    this.birdChirp.volume = 1.4;
    this.birdChirp.loop = true;

    this.bunnyHop = this.game.add.audio('hop');
    this.bunnyHop.volume = 1.2;
    this.bunnyHop.loop = false;

    this.growl = this.game.add.audio('growl');
    this.growl.volume = 1.5;
    this.growl.loop = false;

    this.flame = this.game.add.audio('fire');
    this.flame.volume = 1.7;
    this.flame.loop = true;

    this.heartSound = this.game.add.audio('heart');
    this.heartSound.volume = 1.5;
    this.heartSound.loop = false;

    this.hurt = this.game.add.audio('hit');
    this.hurt.volume = 1.0;
    this.hurt.loop = false;

    this.planeSound = this.game.add.audio('jet');
    this.planeSound.volume = 1.5;
    this.planeSound.loop = false;

  },

  muteMusic: function(){
    // mutes music with user button click
    if (this.game.gameGlobal.music.paused) {
      this.game.gameGlobal.music.resume();
      t3 = this.game.add.button(750, 20, 'play', this.muteMusic, this, 2, 1, 0);
    } else {
      this.game.gameGlobal.music.pause();
      t3 = this.game.add.button(750, 20, 'mute', this.muteMusic, this, 2, 1, 0);
    }
  },

  update: function(){

    // adds points as time goes on
    this.game.gameGlobal.points += (Phaser.Timer.SECOND / 1000);
    this.refreshStats();

    // sets up which sprites are on top versus on bottom
    this.game.world.bringToTop(this.stump);
    this.game.world.bringToTop(this.boulder);
    this.game.world.bringToTop(this.bush);
    this.game.world.bringToTop(this.bunny);
    this.game.world.bringToTop(this.deer);
    this.game.world.bringToTop(this.wolf);
    this.game.world.bringToTop(this.fire);
    this.game.world.bringToTop(this.plane);
    this.game.world.bringToTop(this.pack);
    this.game.world.bringToTop(this.heart);
    this.game.world.bringToTop(this.pinkUnicorn);

    // set up collide event with all the different sprites
    this.game.physics.arcade.overlap(this.bird, player.hiker, this.enemyCollide, null, this);
    this.game.physics.arcade.collide(this.stump, player.hiker, this.obstacleCollide, null, this);
    this.game.physics.arcade.collide(this.boulder, player.hiker, this.obstacleCollide, null, this);
    this.game.physics.arcade.collide(this.bush, player.hiker, this.obstacleCollide, null, this);
    this.game.physics.arcade.overlap(this.bunny, player.hiker, this.enemyCollide, null, this);
    this.game.physics.arcade.overlap(this.deer, player.hiker, this.enemyCollide, null, this);
    this.game.physics.arcade.overlap(this.wolf, player.hiker, this.enemyCollide, null, this);
    this.game.physics.arcade.overlap(this.fire, player.hiker, this.enemyCollide, null, this);
    this.game.physics.arcade.overlap(this.wasp, player.hiker, this.enemyCollide, null, this);
    this.game.physics.arcade.overlap(this.heart, player.hiker, this.heartCollide, null, this);
    this.game.physics.arcade.overlap(this.pack, player.hiker, this.heartCollide, null, this);

    // updates for end of game when
    if (this.game.gameGlobal.hits === 5) {
      this.hurt.play();
      this.birdChirp.stop();
      this.flame.stop();
      this.game.gameGlobal.music.stop();
      this.game.state.start('end');
    }
  },

  // creates either a stump or boulder obstacle that cannot be walked through
  spawnObstacle: function(){
    var type = this.game.rnd.integerInRange(1,3);

    if (type === 1) {
      var obstacle = this.stump.getFirstExists(false);
      obstacle.frameName = "stump";
      obstacle.body.immovable = true;
    } else if (type === 2) {
      var obstacle = this.boulder.getFirstExists(false);
      obstacle.frameName = "boulder";
      obstacle.body.immovable = true;
    } else if (type === 3) {
      var obstacle = this.bush.getFirstExists(false);
      obstacle.body.immovable = true;
    }

    obstacle.anchor.setTo(0.5, 0);
    obstacle.checkWorldBounds = true;
    obstacle.body.allowGravity = false;
    obstacle.outOfBoundsKill = true;
    obstacle.reset(this.game.world.width - 5, 270);
    obstacle.hasCollided = false;
    obstacle.body.velocity.x = -90;
  },

  // creates an enemy sprite, either bird, bunny, deer, or wolf
  spawnEnemy: function(){

    var type = this.game.rnd.integerInRange(1, 6);

    if (type === 1) {
      var enemy = this.bird.getFirstExists(false);
      enemy.animations.play('iago');
      enemy.reset(this.game.world.width - 5, 227);
      enemy.body.velocity.x = this.game.rnd.integerInRange(-250, -90);
      this.birdChirp.play();
    } else if (type === 2) {
      var enemy = this.bunny.getFirstExists(false);
      enemy.animations.play('thumper');
      enemy.reset(this.game.world.width - 5, 290);
      enemy.body.velocity.x = this.game.rnd.integerInRange(-250, -90);
      this.bunnyHop.play();
    } else if (type === 3) {
      var enemy = this.deer.getFirstExists(false);
      enemy.animations.play('bambi');
      enemy.reset(5, 290);
      enemy.body.velocity.x = this.game.rnd.integerInRange(100, 150);
    } else if (type === 4) {
      var enemy = this.wolf.getFirstExists(false);
      enemy.animations.play('balto');
      enemy.reset(this.game.world.width - 5, 290);
      enemy.body.velocity.x = -90;
      this.growl.play();
    } else if (type === 5) {
      var enemy = this.fire.getFirstExists(false);
      enemy.animations.play('flameboy');
      enemy.reset(this.game.world.width - 5, 290);
      enemy.body.velocity.x = -90;
      this.flame.play();
    } else if (type === 6){
      var enemy = this.wasp.getFirstExists(false);
      enemy.animations.play('buzzer');
      enemy.reset(5, 233);
      enemy.body.velocity.x = this.game.rnd.integerInRange(90, 250);
    }

    enemy.anchor.setTo(0.5, 0.5);
    enemy.body.allowGravity = false;
    enemy.body.immovable = true;
    enemy.checkWorldBounds = true;
    enemy.outOfBoundsKill = true;
    enemy.hasCollided = false;

  },

  // creates a heart which gives another life
  spawnHeart: function(){

    var life = this.heart.getFirstExists(false);

    life.anchor.setTo(0.5, 0.5);
    life.checkWorldBounds = true;
    life.body.allowGravity = false;
    life.outOfBoundsKill = true;
    life.reset(this.game.world.width - 5, 200);
    life.hasCollided = false;
    life.body.velocity.x = -90;
  },

  // creates a backpack of supplies that adds to life
  spawnPack: function(){

    var life = this.pack.getFirstExists(false);

    life.frameName = "backpack";
    life.anchor.setTo(0.5, 0.5);
    life.checkWorldBounds = true;
    life.body.allowGravity = false;
    life.outOfBoundsKill = true;
    life.reset(this.game.world.width - 5, 290);
    life.hasCollided = false;
    life.body.velocity.x = -90;
  },

  // creates a plane flying over head for entertainment purposes
  spawnPlane: function(){

    var airplane = this.plane.getFirstExists(false);

    airplane.anchor.setTo(0.5, 0.5);
    airplane.checkWorldBounds = true;
    airplane.body.allowGravity = false;
    airplane.outOfBoundsKill = true;
    airplane.reset(5, 50);
    airplane.hasCollided = false;
    airplane.body.velocity.x = 500;
    airplane.animations.play('theJet');
    this.planeSound.play();
  },

  // creates a giant unicorn head to distract and make play tougher for a moment
  spawnUnicorn: function(){

    var unicorn = this.pinkUnicorn.getFirstExists(false);

    unicorn.anchor.setTo(0.5, 0.5);
    unicorn.checkWorldBounds = true;
    unicorn.body.allowGravity = false;
    unicorn.outOfBoundsKill = true;
    unicorn.reset(this.game.world.width - 5 , 200);
    unicorn.hasCollided = false;
    unicorn.body.velocity.x = -50;
  },

  // function for when player collides with enemy. Plays sounds. Kills enemy. Affects players points and life
  enemyCollide: function(player, enemy){
    if (!enemy.hasCollided) {
      enemy.hasCollided = true;
    }
    this.hurt.play();
    enemy.kill();
    this.game.gameGlobal.hits++;
    this.game.gameGlobal.points -= 50;
    this.refreshStats();
    if ( this.birdChirp || this.flameboy) {
      this.birdChirp.stop();
      this.flame.stop();
    } 
  },

  // function for when player runs into obstacle. No damage, but must go over obstacle
  obstacleCollide: function(player, obstacle){
    if (!obstacle.hasCollided) {
      obstacle.hasCollided = true;
    }
  },

  // function for when player hits a heart or backpack. Adds to life and points
  heartCollide:function(player, life){
    if (!life.hasCollided) {
      life.hasCollided = true;
    }
    life.kill();
    this.heartSound.play();
    this.game.gameGlobal.hits--;
    this.game.gameGlobal.points += 100;
    this.refreshStats();
  },

  // refreshes game stats to keep points accurate
  refreshStats: function(){

    // called this to update stats
    this.pointsText.text = this.game.gameGlobal.points;
    this.hitsText.text = this.game.gameGlobal.maxHits - this.game.gameGlobal.hits;
  },
};
