Meteor.publish('scores', function(){
  return Scores.find({}, {sort: {score: -1, name: 1}});
});

Meteor.methods({
  'insertScore': function(newScore, newPlayer){
    Scores.insert({
      score  : newScore,
      player : newPlayer
    });
  }
});
