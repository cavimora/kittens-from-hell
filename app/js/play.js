var IngameState = function (game) { };
//FLAGS
var grounded = false;
//NUMBERS
var jumpOnce = 0;
var createOnce = 0;
var spikeSpeed = 4;
var speedIncrease = 0.2;
//OBJECTS
var fireball = null;
var spike = null;
var lastCoin = null;
var coin = null;


IngameState.prototype = {
    
    preload: function() {
        this.game.load.image('spike', 'assets/images/spike.png');        
        this.game.load.image('ground', 'assets/images/ground.png');
        this.game.load.image('city', 'assets/images/game_bg_city.png');
        this.game.load.spritesheet('fire-beam', 'assets/images/Fireball.png', 48, 0, 2);
        this.game.load.spritesheet('coins', 'assets/images/coin_copper.png', 32, 0, 8);
        this.game.load.spritesheet('player','assets/images/player.png', 100, 0, 19);
    },
    
    create: function() {
        this.game.world.setBounds(0, 0, 940,360);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.createBackGround();
        this.createGround();
        this.createPlayer();
        this.createSpikes(1);
        this.createFireBalls();
        this.createCoins();

    },

    createBackGround: function(){
        this.citiBg = this.game.add.tileSprite(0, 0, this.game.stage.width/2, this.game.stage.height/2, 'city');
    },


    createGround: function(){
        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(this.game.stage.width/2, this.game.world.height - 57.8, 'ground');  
        ground.body.immovable = true; 
        ground.anchor.setTo(1, 0);

    },

    createFireBalls: function(){
        this.fireballs = this.game.add.group();
        this.fireballs.enableBody = true;
        amount = this.game.world.height/17;
        for(var i = 0; i<amount; i++){
            fireball = this.fireballs.create(0, 0 + (i*18), 'fire-beam');
            fireball.animations.add('animate', [0,1], 15, true);
            fireball.animations.play('animate');
        }
    },

    createPlayer: function(){
        this.player = this.game.add.sprite(150, this.game.world.height - 130, 'player');
        this.player.animations.add('walk', [9,10,11,12,13,14,15,16,17,18], 20, true);
        this.player.animations.add('run', [1,2,3,4,5,6,7,8], 20, true);
        this.player.animations.add('jump', [0], 15, true);
        this.player.animations.add('idle', [5]);

        this.player.animations.play('walk');

        this.player.scale.setTo(1);
        this.player.anchor.setTo(1,1);
        
        // Enable physics
        this.game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 1500;
        this.player.body.collideWorldBounds = true;
    },

    createSpikes: function(){
        this.spikes = this.game.add.group();
        this.spikes.enableBody = true;  
        spike = this.spikes.create(640, this.game.world.height - 57.8, 'spike');
        spike.scale.setTo(0.15);
        spike.anchor.setTo(1,1);
        
    },

    createCoins: function(){
        this.coins = this.game.add.group();
        this.coins.enableBody = true;
        for(var i = 0; i<6; i++){
            coin = this.coins.create(680 + (i * 32), this.game.world.height - 85, 'coins');
            coin.animations.add('circle', [0,1,2,3,4,5,6,7], 15, true);
            coin.animations.play('circle');
            if(i + 1 == 6){
                lastCoin = coin;
            }
            //coin.position.x -= spikeSpeed;
        }
        // coin = this.coins.create(300, this.game.world.height - 86, 'coins');
        // coin.animations.add('circle', [0,1,2,3,4,5,6,7], 15, true);
        // coin.animations.play('circle');
    },

    crashSpike: function(spike, fireball){
        //this.spikes.callAll('kill');        
        this.createSpikes();
        
    },
    collectCoins: function(player, coin){
        coin.kill();
        if(coin == lastCoin){
            this.createCoins();
        }
    },
    
    
    update: function() {
        this.game.physics.arcade.collide(this.player, this.platforms);
        this.game.physics.arcade.overlap(this.spikes, this.player, this.crashSpike, null, this);
        this.game.physics.arcade.overlap(this.player, this.coins, this.collectCoins, null, this);
        
        grounded = this.player.body.touching.down;
        this.citiBg.tilePosition.x -= 0.9;
        spike.position.x -= spikeSpeed;
        this.coins.position.x -= spikeSpeed;

        //console.log(grounded);
        if (this.cursors.up.isDown ) {
            jumpOnce++;
            if(jumpOnce == 1){
                this.player.animations.play('jump');
                this.player.body.velocity.y = -450;
            }
            //console.log(grounded);
            //this.jumpSound.play();
        }
        if (grounded){
            jumpOnce= 0;
            this.player.animations.play('run');
            this.player.body.velocity.x = 0;
        }
        if(lastCoin.world.x < 40){
            //console.log('aylmao')
        }
    }
};