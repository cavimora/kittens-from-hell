class PreLoadState extends Phaser.State{
    preload(){
        this.progress = this.game.add.text(
            this.game.world.centerX, 
            this.game.world.centerY - 30,
            '0%', { fill: 'white' });
        this.progress.anchor.setTo(0.5, 0.5);
        
        // Show progress bar
        let progressBar = this.game.add.sprite(
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
        this.game.load.audio('pickup', 'assets/sounds/pickup.wav');
        this.game.load.image('diamond', 'assets/images/diamond.png');
        this.game.load.image('city', 'assets/images/game_bg_city.png');
        this.game.load.audio('explosion', 'assets/sounds/explosion.wav');
        this.game.load.audio('explosion3', 'assets/sounds/explosion3.wav');
        this.game.load.audio('explosion2', 'assets/sounds/explosion2.wav');
        this.game.load.spritesheet('player','assets/images/cat.png', 100, 0, 19);
        this.game.load.spritesheet('coin', 'assets/images/coin_copper.png', 32, 0, 16);
        this.game.load.spritesheet('fire-beam', 'assets/images/Fireball.png', 48, 0, 2);
        this.game.load.spritesheet('explosion-sprite', 'assets/images/explosion.png', 100, 100, 81);
        this.game.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/Fire.js');

    }
    
    fileComplete(progress){
        this.progress.text = progress + '%';
        //console.log(this.progress.text);
    }
    loadStart(){

    }
    loadComplete(){
        this.game.state.start('GameState');
    }
}   

export default PreLoadState;