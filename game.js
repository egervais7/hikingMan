var game = new Phaser.Game(800, 320, Phaser.AUTO, 'gameContainer');

var player = null;
var trail = null;
var enterKey = null;

var boot_state = {
  preload : function() {
    // load images for load bar and background
    game.load.image('images/country-platform-back');
    game.load.image('progressBar', 'images/health_20.png');
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

      // stats
      this.hits = 0;
      this.points = 0;
      this.maxHits = 5;

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

    },
    update: function(){

      // this.game.physics.arcade.collide(this.player, this.enemy, this.playerBit, null, this);

      // updates trail, player and enemy
      trail.update();
      player.update();
      enemy.update();

    },
    refreshStats: function(){

      // called this to update stats
      this.pointsText.text = this.points;
      this.hitsText.text = this.maxHits - this.hits;

    },
    playerBit: function(){

      // update stats
      this.maxHits++;
      this.refreshStats();
    },
  };

  var end_game = {
    create: function(){

      var font1 = { font: "30px Bangers", fill: "#FFFFFF" };

      // sets up screen for when game ends
      var done =  game.add.text(this.game.world.centerX, 150, "Game Over!", font1);
      var distance = game.add.text(this.game.world.centerX, 250, "You went this far", font1);
      var restart = game.add.text(this.game.world.centerX, 200, "Hit Enter to Start Again!", font1);

      done.anchor.setTo(0.5, 0.5);
      distance.anchor.setTo(0.5, 0.5);
      restart.anchor.setTo(0.5, 0.5);

      enterKey = game.input.keyboard.addKet(Phaser.Keyboard.ENTER);
      enterKey.onDown.addOnce(gameStart, this);

      function gameStart(){
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
