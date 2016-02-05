load_state = function(game){
  this.game = game;
};

load_state.prototype = {

  preload: function(){
    // load progress bar
    var progressBar = this.game.add.sprite(this.game.world.centerX, 200, 'progressBar');
    progressBar.anchor.setTo(0.5, 0.5);
    this.game.load.setPreloadSprite(progressBar);

    // call trail to create new trail with new game
    trail = new Trail(this.game);
    trail.preload();

    // call player to create new player with new game
    player = new Player(this.game);
    player.preload();

    // call enemy to create sprites with new game
    enemy = new Enemy(this.game);
    enemy.preload();

    // load all audio for the game
    this.game.load.audio('gameSong', ['audio/gameSong.ogg', 'audio/gameSong.mp3']);
    this.game.load.audio('jingle', ['audio/Jingle.ogg', 'audio/Jingle.mp3']);
    this.game.load.audio('jump', ['audio/playerJump.ogg', 'audio/playerJump.mp3']);
    this.game.load.audio('shuffles', ['audio/shuffling.ogg', 'audio/shuffling.mp3']);
    this.game.load.audio('chirp', ['audio/birdChirp.ogg', 'audio/birdChirp.mp3']);
    this.game.load.audio('hop', ['audio/bunnyHop.ogg', 'audio/bunnyHop.mp3']);
    this.game.load.audio('growl', ['audio/growl.ogg', 'audio/growl.mp3']);
    this.game.load.audio('fire', ['audio/fire.ogg', 'audio/fire.mp3']);
    this.game.load.audio('heart', ['audio/Replenish.ogg', 'audio/Replenish.mp3']);
    this.game.load.audio('hit', ['audio/hit1.ogg', 'audio/hit1.mp3']);
    this.game.load.audio('jet', ['audio/engine1.ogg', 'audio/engine1.mp3']);

  },
  create: function(){
    // load main state
    this.game.state.start('main');
  }
  
};
