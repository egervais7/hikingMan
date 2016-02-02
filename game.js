var game = new Phaser.Game(800, 320, Phaser.AUTO, 'gameContainer');

var player = null;
var trail = null;
var enterKey = null;
var bird = null;
var deer = null;
var fireman = null;

var boot_state = {
  preload : function() {
    game.load.image('images/country-platform-back');
    game.load.image('progressBar', 'images/textures/health_20.png');
    this.game.load.atlas('sprites', 'images/hikingManSprites.png', 'images/hikerSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
  },

  create: function(){
    game.stage.backgroundColor = '#83bdfa';
    game.physics.startSystem(Phaser.Physics.ARCADE);

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

    game.state.start('menu');
  },
};

  var load_state = {
    preload: function(){

      var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
      progressBar.anchor.setTo(0.5, 0.5);
      game.load.setPreloadSprite(progressBar);

      trail = new Trail(game);
      trail.preload();

      player = new Player(game);
      player.preload();

      this.bird.animations.add('fly', ['bird1', 'bird2', 'bird3', 'bird4', 'bird5'], 10, true);
      this.deer.animations.add('eat', ['deer1', 'deer2', 'deer3', 'deer4', 'deer5'], 10, true);
      this.fireman.animations.add('burn', ['fireman1', 'fireman2', 'fireman3'], 10, true);
    },
    create: function(){
      game.state.start('main');
    }
  };

  var menu_state = {
    create: function(){
      var font = {font: "30px Frijole", fill: "#FFFFFF"};

      var name = game.add.text(this.game.world.centerX, 150, "Hiking Man!", font);
      var clicker = game.add.text(this.game.world.centerX, 200, "Hit Enter To Start", font);

      name.anchor.setTo(0.5, 0.5);
      clicker.anchor.setTo(0.5, 0.5);

      enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
      enterKey.onDown.addOnce(gameStart, this);

      function gameStart(){
        game.state.start('load');
      }
    }
  };

  var main_state = {
    create: function(){
      trail.create();
      player.create();
      bird.create();
      deer.create();
      fireman.create();
    },
    update: function(){
      trail.update();
      player.update();
    }
  };

  var end_game = {
    create: function(){
      var font = {font: "30px Frijole", fill: "#FFFFFF"};

      var done =  game.add.text(this.game.world.centerX, 150, "Game Over!", font);
      var distance = game.add.text(this.game.world.centerX, 250, "You went this far", font);
      var restart = game.add.text(this.game.world.centerX, 200, "Hit Enter to Start Again!", font);

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
