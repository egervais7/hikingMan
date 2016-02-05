Meteor.subscribe('scores');

Template.leaderboard.helpers({
  'scores': function(){
    return Scores.find({}, {sort: {score: -1, name: 1}});
  }
});

Meteor.methods({
  'insertScore': function(newScore, newPlayer){
    Score.insert({
      score  : newScore,
      player : newPlayer
    });
  }
});

var game = new Phaser.Game(800, 320, Phaser.AUTO, 'gameContainer');

var player = null;
var trail = null;
var enterKey = null;
// create global variables
game.gameGlobal = {
  points  : 0,
  hits    : 0,
  maxHits : 5,
  music   : null
};

Template.game.helpers({
  // set up meteor helpers
  'game': function (){

    // adds states and starts the boot state
    game.state.add('boot', boot_state);
    game.state.add('load', load_state);
    game.state.add('menu', menu_state);
    game.state.add('main', main_state);
    game.state.add('end', end_game);

    game.state.start('boot');
  }
});
