main_state = function(game){
  this.game = game;
};

main_state.prototype = {

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
