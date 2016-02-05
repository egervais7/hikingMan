menu_state = function(game){
  this.game = game;
};

menu_state.prototype = {

  create: function(){

    // set up menu page
    var font2 = { font: "30px Bangers", fill: "#FFFFFF" };

    // add text for menu page
    var name = this.game.add.text(this.game.world.centerX, 150, "Hiking Man!", font2);
    var clicker = this.game.add.text(this.game.world.centerX, 200, "Hit Enter To Start", font2);
    name.anchor.setTo(0.5, 0.5);
    clicker.anchor.setTo(0.5, 0.5);

    // listen for click on enter to start game
    enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.addOnce(gameStart, this);

    // starts game
    function gameStart(){
      this.game.state.start('load');
    }
  }
  
};
