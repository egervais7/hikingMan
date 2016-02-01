var HikingMan = {};

HikingMan.Boot = function(game){};

HikingMan.Boot.prototype = {
  preload: function() {
    this.load.image('preloadBar', 'images/textures/health_20.png');
    this.load.image('titleimage', 'images/parallax-mountain-mountains.png');
  },

  create: function(){
    this.input.maxPointers = 1;
    this.stage.disableVisibilityChange = false;
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; 
    this.scale.minWidth = 270;
    this.scale.minHeight = 480;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.stage.forcePortrait = true;

    this.input.addPointer();
    this.stage.backgroundColor = '#9e9eff';

    this.state.start('Preloader');
  }
};
