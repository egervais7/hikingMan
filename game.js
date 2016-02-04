var game = new Phaser.Game(800, 320, Phaser.AUTO, 'gameContainer');

var player = null;
var trail = null;
var enterKey = null;

var gameGlobal = {
  points  : 0,
  hits    : 0,
  maxHits : 5
};

var boot_state = {
  preload : function() {
    // load images for load bar and background
    game.load.image('assets/images/country-platform-back');
    game.load.image('progressBar', 'assets/images/health_20.png');
  },

  create: function(){
    // match background color to top of background image
    game.stage.backgroundColor = '#82b6ff';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    // set for if user not on desktop
    if (!game.device.desktop) {
      // set to show-all scale
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      document.body.style.backgroundColor = '000';
      // set min and max width and height for game
      game.scale.minWidth = 250;
      game.scale.minHeight = 170;
      game.scale.maxWidth = 1000;
      game.scale.maxHeight = 680;
      // center game container on pageAlignVertically
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;

      game.scale.setScreenSize(true);
    }
    // game start with menu
    game.state.start('menu');
  },
};

  var load_state = {
    preload: function(){
      // load progress bar
      var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
      progressBar.anchor.setTo(0.5, 0.5);
      game.load.setPreloadSprite(progressBar);

      // call trail to create new trail with new game
      trail = new Trail(game);
      trail.preload();

      // call player to create new player with new game
      player = new Player(game);
      player.preload();

      // call enemy to create sprites with new game
      enemy = new Enemy(game);
      enemy.preload();

      game.load.audio('gameSong', ['assets/audio/gameSong.ogg', 'assets/audio/gameSong.mp3']);
      game.load.audio('jump', ['assets/audio/playerJump.ogg', 'assets/audio/playerJump.mp3']);
      game.load.audio('shuffles', ['assets/audio/shuffling.ogg', 'assets/audio/shuffling.mp3']);
      game.load.audio('chirp', ['assets/audio/birdChirp.ogg', 'assets/audio/birdChirp.mp3']);
      game.load.audio('hop', ['assets/audio/bunnyHop.ogg', 'assets/audio/bunnyHop.mp3']);
      game.load.audio('growl', ['assets/audio/growl.ogg', 'assets/audio/growl.mp3']);
      game.load.audio('fire', ['assets/audio/fire.ogg', 'assets/audio/fire.mp3']);
      game.load.audio('heart', ['assets/audio/Replenish.ogg', 'assets/audio/Replenish.mp3']);

    },
    create: function(){
      game.state.start('main');
    }
  };

  var menu_state = {
    create: function(){

      // set up menu page
      var font2 = { font: "30px Bangers", fill: "#FFFFFF" };

      var name = game.add.text(this.game.world.centerX, 150, "Hiking Man!", font2);
      var clicker = game.add.text(this.game.world.centerX, 200, "Hit Enter To Start", font2);
      name.anchor.setTo(0.5, 0.5);
      clicker.anchor.setTo(0.5, 0.5);

      // listen for click on enter to start game
      enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
      enterKey.onDown.addOnce(gameStart, this);

      // starts game
      function gameStart(){
        game.state.start('load');
      }
    }
  };

  var main_state = {
    create: function(){

      // creates trail, player and enemy
      trail.create();
      player.create();
      enemy.create();

    },
    update: function(){

      // updates trail, player and enemy
      trail.update();
      player.update();
      enemy.update();

    },
  };

  var end_game = {
    create: function(){

      var font1 = { font: "40px Bangers", fill: "#FFFFFF" };
      var font2 = { font: "40px Bangers", fill: "#FF0000" };
      var font3 = { font: "60px Bangers", fill: "#32cd32" };

      // sets up screen for when game ends
      var done =  game.add.text(this.game.world.centerX, 75, "Game Over! ", font1);
      var distance = game.add.text(this.game.world.centerX, 185, "Your Points : ", font1);
      var restart = game.add.text(this.game.world.centerX, 125, "Hit Enter to Start Again! ", font3);

      this.pointsText = this.game.add.text(this.game.world.centerX - 45, 205, gameGlobal.points + " ", font2);

      done.anchor.setTo(0.5, 0.5);
      distance.anchor.setTo(0.5, 0.5);
      restart.anchor.setTo(0.5, 0.5);

      enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
      enterKey.onDown.addOnce(gameStart, this);

      function gameStart(){
        gameGlobal.points = 0;
        gameGlobal.hits = 0;
        game.state.start('load');
      }
    },

  };

  game.state.add('boot', boot_state);
  game.state.add('load', load_state);
  game.state.add('menu', menu_state);
  game.state.add('main', main_state);
  game.state.add('end', end_game);

  game.state.start('boot');
