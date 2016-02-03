var game = new Phaser.Game(800, 320, Phaser.AUTO, 'gameContainer');

var player = null;
var trail = null;
var enterKey = null;

var boot_state = {
  preload : function() {
    game.load.image('images/country-platform-back');
    game.load.image('progressBar', 'images/health_20.png');
  },

  create: function(){
    game.stage.backgroundColor = '#82b6ff';
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

      enemy = new Enemy(game);
      enemy.preload();

      // this.game.load.atlas('obstacle', 'images/theSprites.png', 'images/theSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    },
    create: function(){
      game.state.start('main');
      // this.bird.animations.add('fly', ['bird1', 'bird2', 'bird3', 'bird4', 'bird5'], 10, true);
    }
  };

  var menu_state = {
    create: function(){
      var font = {font: "30px Bangers", fill: "#FFFFFF"};

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
      enemy.create();
      // this.generateBird();
      // this.generateDeer();
      // this.generateFireman();
    },
    update: function(){
      trail.update();
      player.update();
      enemy.update();
    }
  };

  var end_game = {
    create: function(){
      var font = {font: "30px Bangers", fill: "#FFFFFF"};

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

  // var generateBird = {
  //   create: function(){
  //     this.birds = this.game.add.group();
  //
  //     this.birds.enableBody = true;
  //     var numBird = this.game.rnd.integerInRange(1,5);
  //     var bird;
  //
  //     for (var i = 0; i < numBird; i++) {
  //       var x = this.game.rnd.integerInRange(this.game.width, this.game.world.width - this.game.width);
  //       bird = this.birds.create(x, this.game.height-115, 'obstacle');
  //     }
  //   },
  // };

  game.state.add('boot', boot_state);
  game.state.add('load', load_state);
  game.state.add('menu', menu_state);
  game.state.add('main', main_state);
  game.state.add('end', end_game);

  game.state.start('boot');
