HikingMan.StartMenu = function(game){
  this.startBG;
  this.startPrompt;
};

HikingMan.StartMenu.prototype = {
  create: function(){

    var styleFont = {font: "30px Frijole", fill: "#FFFFFF"};

    startBG = this.add.image(0, 0, 'titlescreen');
    startBG.inputEnabled = true;
    startBG.events.onInputDown.addOnce(this.startGame, this);

    startPrompt = this.add.text(this.world.centerX-155, this.world.centerY+180, 'Click To Start!', {font: "30px Frijole", fill: "#FFFFFF"});
  },

  startGame : function(pointer) {
    this.state.start('Game');
  }
};
