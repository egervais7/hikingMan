end_game = function(game){
  this.game = game;
};

end_game.prototype = {

    create: function(){
      // set fonts for end game screen
      var font1 = { font: "40px Bangers", fill: "#FFFFFF" };
      var font2 = { font: "40px Bangers", fill: "#FF0000" };
      var font3 = { font: "40px Bangers", fill: "#32cd32" };

      // sets up screen for when game ends
      var done =  this.game.add.text(this.game.world.centerX + 20, 65, "Game Over! ", font1);
      var distance = this.game.add.text(this.game.world.centerX, 110, "Your Points : ", font1);
      this.pointsText = this.game.add.text(this.game.world.centerX + 105, 85, this.game.gameGlobal.points + " ", font2);
      var button =  this.game.add.button(this.game.world.centerX, 140, 'button', clickAction, this, 2, 1, 0);
      var restart = this.game.add.text(this.game.world.centerX, 210, "Hit Enter to Start Again! ", font3);

      done.anchor.setTo(0.5, 0.5);
      distance.anchor.setTo(0.5, 0.5);
      restart.anchor.setTo(0.5, 0.5);

      // listens for enter key to restart game
      enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
      enterKey.onDown.addOnce(gameStart, this);

      // resets stats for game to start
      function gameStart(){
        this.game.gameGlobal.points = 0;
        this.game.gameGlobal.hits = 0;
        this.game.state.start('load');
      }

      // uses click to add player to top scores
      function clickAction(){
        console.log('clicked');
        var topScore = prompt("Please Enter Initials", "NaN");
        if (topScore) {
          Meteor.call('insertScore', this.game.gameGlobal.points, topScore);
        }
      }
    }

};
