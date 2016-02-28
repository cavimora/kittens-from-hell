var BootState = function (game) {};


BootState.prototype = {
    
    preload: function () {
        this.game.load.image('progressBar', 'assets/images/progress_Bar.png');
    }, 
    
    create: function () {
        
        // Set progress text
        this.progress = this.game.add.text(
            this.game.world.centerX, 
            this.game.world.centerY - 30,
            '0%', { fill: 'white' });
        this.progress.anchor.setTo(0.5, 0.5);
        
        // Show progress bar
        var progressBar = this.game.add.sprite(
            this.game.world.centerX, this.game.world.centerY, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        this.game.load.setPreloadSprite(progressBar);
        
        
        // Set callbacks
        this.game.load.onLoadStart.add(this.loadStart, this);
        this.game.load.onFileComplete.add(this.fileComplete, this);
        this.game.load.onLoadComplete.add(this.loadComplete, this);
        
        // Load all assets
        
        this.game.load.image('spike', 'assets/images/spike.png');
        this.game.load.image('ground', 'assets/images/ground.png');
        this.game.load.image('city', 'assets/images/game_bg_city.png');
        this.game.load.spritesheet('fire-beam', 'assets/images/Fireball.png', 48, 0, 2);
        //this.game.load.spritesheet('fire-beam-up', 'assets/images/fireball-up.png', 48, 0, 2);
        this.game.load.spritesheet('player','assets/images/player.png', 100, 0, 19);
        
        this.game.load.start();
    },
    
    loadStart : function () {
        
    },
    
    fileComplete: function (progress) {
        //console.log(progress);
        this.progress.text = progress + '%';
    },
    
    loadComplete: function () {
        this.game.state.start('IngameState');
    }
};