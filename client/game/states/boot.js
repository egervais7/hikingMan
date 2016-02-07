boot_state = function(game){
  this.game = game;
};

boot_state.prototype = {

  preload : function() {
    // load images for load bar and background
    this.game.load.image('images/country-platform-back');
    this.game.load.image('progressBar', 'images/health_20.png');
    this.game.load.image('button', 'images/Leaderboard.png');
  },

  create: function(){
    // match background color to top of background image
    this.game.stage.backgroundColor = '#82b6ff';
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    // set for if user not on desktop
    if (!this.game.device.desktop) {
      // set to show-all scale
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      document.body.style.backgroundColor = '000';
      // set min and max width and height for game
      this.game.scale.minWidth = 250;
      this.game.scale.minHeight = 170;
      this.game.scale.maxWidth = 1000;
      this.game.scale.maxHeight = 680;
      // center game container on pageAlignVertically
      this.game.scale.pageAlignHorizontally = true;
      this.game.scale.pageAlignVertically = true;

    }
    
    // game start with menu
    this.game.state.start('menu');
  }
  
};
