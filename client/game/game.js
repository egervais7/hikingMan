Meteor.startup(function(){});

Meteor.subscribe('scores');

var game = new Phaser.Game(800, 320, Phaser.AUTO, 'gameContainer');

var player = null;
var trail = null;
var enterKey = null;
// create global variables
var gameGlobal = {
  points  : 0,
  hits    : 0,
  maxHits : 5,
  music   : null
};

Template.game.helpers({
  // set up meteor helpers
  'game': function (){
    var boot_state = {
      preload : function() {
        // load images for load bar and background
        game.load.image('public/images/country-platform-back');
        game.load.image('progressBar', 'public/images/health_20.png');
        game.load.image('button', 'public/images/Leaderboard.png');
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

        // load all audio for the game
        game.load.audio('gameSong', ['public/audio/gameSong.ogg', 'public/audio/gameSong.mp3']);
        game.load.audio('jingle', ['public/audio/Jingle.ogg', 'public/audio/Jingle.mp3']);
        game.load.audio('jump', ['public/audio/playerJump.ogg', 'public/audio/playerJump.mp3']);
        game.load.audio('shuffles', ['public/audio/shuffling.ogg', 'public/audio/shuffling.mp3']);
        game.load.audio('chirp', ['public/audio/birdChirp.ogg', 'public/audio/birdChirp.mp3']);
        game.load.audio('hop', ['public/audio/bunnyHop.ogg', 'public/audio/bunnyHop.mp3']);
        game.load.audio('growl', ['public/audio/growl.ogg', 'public/audio/growl.mp3']);
        game.load.audio('fire', ['public/audio/fire.ogg', 'public/audio/fire.mp3']);
        game.load.audio('heart', ['public/audio/Replenish.ogg', 'public/audio/Replenish.mp3']);
        game.load.audio('hit', ['public/audio/hit1.ogg', 'public/audio/hit1.mp3']);
        game.load.audio('jet', ['public/audio/engine1.ogg', 'public/audio/engine1.mp3']);

      },
      create: function(){
        // load main state
        game.state.start('main');
      }
    };

    var menu_state = {
      create: function(){

        // set up menu page
        var font2 = { font: "30px Bangers", fill: "#FFFFFF" };

        // add text for menu page
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
      }
    };

    var end_game = {
      create: function(){
        // set fonts for end game screen
        var font1 = { font: "40px Bangers", fill: "#FFFFFF" };
        var font2 = { font: "40px Bangers", fill: "#FF0000" };
        var font3 = { font: "40px Bangers", fill: "#32cd32" };

        // sets up screen for when game ends
        var done =  game.add.text(this.game.world.centerX + 20, 65, "Game Over! ", font1);
        var distance = game.add.text(this.game.world.centerX, 110, "Your Points : ", font1);
        this.pointsText = this.game.add.text(this.game.world.centerX + 105, 85, gameGlobal.points + " ", font2);
        var button =  game.add.button(this.game.world.centerX, 140, 'button', clickAction, this, 2, 1, 0);
        var restart = game.add.text(this.game.world.centerX, 210, "Hit Enter to Start Again! ", font3);

        done.anchor.setTo(0.5, 0.5);
        distance.anchor.setTo(0.5, 0.5);
        restart.anchor.setTo(0.5, 0.5);

        // listens for enter key to restart game
        enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.addOnce(gameStart, this);

        // resets stats for game to start
        function gameStart(){
          gameGlobal.points = 0;
          gameGlobal.hits = 0;
          game.state.start('load');
        }

        // uses click to add player to top scores
        function clickAction(){
          console.log('clicked');
          var topScore = prompt("Please Enter Initials", "NaN");
          if (topScore) {
            Meteor.call('insertScore', gameGlobal.points, topScore);
          }
        }
      }

    };

    // adds states and starts the boot state
    game.state.add('boot', boot_state);
    game.state.add('load', load_state);
    game.state.add('menu', menu_state);
    game.state.add('main', main_state);
    game.state.add('end', end_game);

    game.state.start('boot');
  }
});
