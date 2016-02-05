Scores = new Mongo.Collection('scores');

if (Meteor.isClient){
  Meteor.subscribe('score');

  Template.leaderboard.helpers({
    'score': function(){
      return Scores.find({}, {sort: {score: -1, name: 1}});
    }
  });

  Template.addScore.events({
    'submit form': function(event){
      event.preventDefault();
      var newScore = event.target.topScore.value;
      var newPlayer = event.target.topPlayer.value;
      Meteor.call('insertScore', newScore, newPlayer);
    }
  });
}

if (Meteor.isServer){
  Meteor.publish('scores', function(){
    return Scores.find({}, {sort: {score: -1, name: 1}});
  });

  Meteor.methods({
    'insertScore': function(newScore, newPlayer){
      Score.insert({
        score: newScore,
        player : newPlayer
      });
    }
  });
}
