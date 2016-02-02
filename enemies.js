Enemies = function(game) {
  this.game = game;
  this.enemies = null;
};

Enemies.prototype = {
  preload: function(){
     this.game.load.atlas('enemy', 'image/theSprites.png', 'image/theSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
  },

  create: function(){
    this.enemies = this.game.add.group();

    this.makeEnemy(game.world.height - 160);

    this.game.time.events.add();
  }
};
