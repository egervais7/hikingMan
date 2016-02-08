end_game = function(game){
  this.game = game;
};

end_game.prototype = {

    create: function(){
      // set fonts for end game screen
      var font1 = { font: "40px Bangers", fill: "#FFFFFF" };
      var font2 = { font: "40px Bangers", fill: "#FF0000" };
      var font3 = { font: "40px Bangers", fill: "#32cd32" };

      // sets up screen for when game ends with score and ability to add score to top Scores
      var done =  this.game.add.text(this.game.world.centerX + 20, 65, "Game Over! ", font1);
      var distance = this.game.add.text(this.game.world.centerX, 110, "Your Points : ", font1);
      this.pointsText = this.game.add.text(this.game.world.centerX + 105, 85, this.game.gameGlobal.points + " ", font2);
      var button =  this.game.add.button(this.game.world.centerX, 140, 'button', clickAction, this, 2, 1, 0);
      var restart = this.game.add.text(this.game.world.centerX, 210, "Hit Enter to Start Again! ", font3);

      // sets anchor for each item on page for where to watch for click
      done.anchor.setTo(0.5, 0.5);
      distance.anchor.setTo(0.5, 0.5);
      button.anchor.setTo(0.5, 0.5);
      restart.anchor.setTo(0.5, 0.5);

      // listens for enter key to restart game
      enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
      enterKey.onDown.addOnce(gameStart, this);

      // resets stats for game to start for if user does not want to add top score to leaderboard
      function gameStart(){
        this.game.gameGlobal.points = 0;
        this.game.gameGlobal.hits = 0;
        this.game.state.start('load');
      }

      // uses click to add player to top scores
      function clickAction(){
        // gets the user initials for the leaderboard
        var topScore = prompt("Please Enter 3-4 Initials", "NaN");
        if (topScore) {
          // limits the amount of initials user can input 
          if(topScore.length < 5 && topScore.length > 2) {
          // meteor call to insert score to DB
          Meteor.call('insertScore', this.game.gameGlobal.points, topScore);
          // starts menu state so that after user inputs to leaderboard, cannot input more than once
          this.game.state.start('menu');
          } else {
            // if initials do not fit 3-4 length, recalls the prompt
            clickAction();
          }
        }
      }
    }

};
