var IngameState = function (game) { };
//FLAGS
var powerUp = false;
var grounded = false;
//NUMBERS
var time = 0;
var jumpOnce = 0;
var downOnce = 0;
var timeleft = 15;
var scoreStep = 1;
var createOnce = 0;
var spikeSpeed = 4;
var coinsAmount = 12;
var diamondSpeed = 2;
var speedIncrease = 0.2;
//OBJECTS
var coin = null;
var spike = null;
var timer = null;
var player = null;
var diamond = null;
var fireball = null;
var lastCoin = null;
var background = null;
var explosionArray = null;

IngameState.prototype = {
    
    preload: function() {
        this.game.load.image('spike', 'assets/images/spike.png');        
        this.game.load.image('ground', 'assets/images/ground.png');
        this.game.load.image('diamond', 'assets/images/diamond.png');
        this.game.load.image('city', 'assets/images/game_bg_city.png');
        this.game.load.spritesheet('player','assets/images/player.png', 100, 0, 19);
        this.game.load.spritesheet('coins', 'assets/images/coin_copper.png', 32, 0, 8);
        this.game.load.spritesheet('fire-beam', 'assets/images/Fireball.png', 48, 0, 2);
        this.game.load.spritesheet('explosion', 'assets/images/explosion.png', 100, 100, 81);
        this.game.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/Fire.js');
    },

    // fillArray: function(){
    //     var foo = [];
    //     for(var i = 0; i<81; i){
    //         foo.push(i);
    //     }
    //     return foo;
    // },
    
    create: function() {

        this.game.world.setBounds(0, 0, 600,360);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.createBackGround();
        this.createGround();
        this.createCoins();
        this.createExplosion();
        this.createSpikes();
        this.createPlayer();
        this.createFireBalls();
        filter = game.add.filter('Fire', 800, 600);
        filter.alpha = 0.0;
        this.score = 0;
        this.scoreText = this.game.add.text(50, 10, 'Score: 0', { fontSize: '15px', fill: '#000' });
        this.powerUpText = this.game.add.text(200, 10, '', { fontSize: '15px', fill: '#000' });
        timer = game.time.create(false);
        timer.loop(1000, this.killPowerUp, this);

    },

    createBackGround: function(){
        this.citiBg = this.game.add.tileSprite(0, 0, this.game.stage.width, this.game.stage.height, 'city');
    },


    createGround: function(){
        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(this.game.stage.width, this.game.world.height - 57.8, 'ground');  
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

    createPowerUp: function(){
        this.diamonds = this.game.add.group();
        this.diamonds.enableBody = true;
        diamond = this.diamonds.create(780, 150, 'diamond');

    },

    createPlayer: function(){
        player = this.player = this.game.add.sprite(150, this.game.world.height - 130, 'player');
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
        player.body.setSize(25, 78, -40, -5);
    },

    createSpikes: function(){
        this.spikes = this.game.add.group();
        this.spikes.enableBody = true;  
        spike = this.spikes.create(700, this.game.world.height - 57.8, 'spike');
        spike.scale.setTo(0.15);
        spike.anchor.setTo(1,1);
        spike.body.setSize(180, 300, -8, 0);
        
    },

    createCoins: function(){
        this.coins = this.game.add.group();
        this.coins.enableBody = true;
        for(var i = 0; i< coinsAmount; i++){
            coin = this.coins.create(800 + (i * 32), this.game.world.height - 85, 'coins');
            coin.animations.add('circle', [0,1,2,3,4,5,6,7], 15, true);
            coin.animations.play('circle');
            //coin.body.setSize(20, 20, -35, 0);
            if(i + 1 == coinsAmount){
                coin.isLast = true;
                lastCoin = coin;
            }else{
                coin.isLast = false;
            }
            //coin.position.x -= spikeSpeed;
        }
        // coin = this.coins.create(300, this.game.world.height - 86, 'coins');
        // coin.animations.add('circle', [0,1,2,3,4,5,6,7], 15, true);
        // coin.animations.play('circle');
    },

    reSpawnCoins: function() {
        var i = 0;
        coinsAmount = Math.floor(Math.random() * (12 - 8) + 8);
        this.coins.forEach(function (coin) {
            coin.reset(800 + i * 32, this.game.world.height - 85);
            i++;
        });
    },

    createExplosion: function(){
        this.explosion = this.game.add.sprite(150, this.game.world.height-130, 'explosion');
        this.explosion.animations.add();
        this.explosion.anchor.setTo(0.5,0);
        this.explosion.frame = 80;
    },

    crashSpike: function(spike, fireball){
        if(!powerUp){
            this.spikes.callAll('kill');        
            this.createSpikes();
            this.player.kill();
            this.resetValues();
            this.game.state.start('OverState');
        }else{
            this.explosion.position.x = spike.x;
            this.explosion.position.y = spike.y;
            this.spikes.callAll('kill');
            this.explosion.animations.play();
        }
    },

    resetValues: function(){
        spikeSpeed = 4;
        powerUp = false;
        diamond = null;
        timeleft = 15;
        this.player.scale.setTo(1);
        this.player.anchor.setTo(1,1);
    },

    crashFireSpike: function(spike, fireball){
        this.spikes.callAll('kill');
        //this.createSpikes();
        //this.reSpawnSpike();
    },

    reSpawnSpike: function(){
        spike.reset(700, this.game.world.height - 57.8);
    },

    collectCoins: function(player, coin){
        this.score += scoreStep;
        if(coin.isLast){
            //this.coins.callAll('kill');
            coin.kill();
            this.reSpawnCoins();
            this.reSpawnSpike();
        }else{
            coin.kill();
        }
        this.scoreText.text = 'Score: ' + this.score;
        this.scoreCheck();
    },


    coinCrashFire: function(coin, fire){
        var flag = coin.isLast;
        coin.kill();
        if (flag) {
            console.log('lel');
            this.coins.callAll('kill');
            //this.createCoins()
            this.reSpawnSpike();
            this.reSpawnCoins();
        }
    },

    scoreCheck: function(){
        //To increase speed
        if(this.score % 50 == 0){
            spikeSpeed += speedIncrease;
            scoreStep += 1;
            if(scoreStep == 9){
                scoreStep--;
            }
        }
        //To create the powerUp
        if(this.score % 14 == 0){
            if(!diamond){
               this.createPowerUp();
            }
        }
    },

    activatePowerUp: function(){
        powerUp = true;
        this.powerUpText.text = 'Pow: 15s';
        this.diamonds.callAll('kill');
        timer.start();
        this.player.scale.setTo(1.6);
        this.player.anchor.setTo(0.8,0.5);
        background = game.add.sprite(0, 0);
        background.width = 800;
        background.height = 600;
        background.filters = [filter];
    },

    killPowerUp: function(){
        if(powerUp){
            time++;
            timeleft--;
            this.powerUpText.text = 'Pow: '+ timeleft+'s';
            if(timeleft == 0){
                timeleft = 15;
                diamond = null;
                powerUp = false;
                this.powerUpText.text = '';
                this.player.scale.setTo(1);
                this.player.anchor.setTo(1,1);
                background.filters = null;
            }
        }
    },

    
    update: function() {
        this.game.physics.arcade.collide(this.player, this.platforms);
        this.game.physics.arcade.overlap(this.spikes, this.player, this.crashSpike, null, this);
        this.game.physics.arcade.overlap(this.player, this.coins, this.collectCoins, null, this);
        this.game.physics.arcade.overlap(this.coins, this.fireballs, this.coinCrashFire, null, this);
        this.game.physics.arcade.overlap(this.spikes, this.fireballs, this.crashFireSpike, null, this);
        this.game.physics.arcade.overlap(this.player, this.diamonds, this.activatePowerUp, null, this);

        grounded = this.player.body.touching.down;
        this.citiBg.tilePosition.x -= 0.9;
        //spike.position.x -= spikeSpeed;
        //this.coins.position.x -= spikeSpeed;
        this.spikes.addAll("position.x", -spikeSpeed);
        this.coins.addAll("position.x", -spikeSpeed);
        this.explosion.x -= spikeSpeed;

        if (this.cursors.up.isDown ) {
            jumpOnce++;
            if(jumpOnce == 1){
                this.player.animations.play('jump');
                this.player.body.velocity.y = -550;
            }
            //this.jumpSound.play();
        }
        //Fall Fast
        if (this.cursors.down.isDown && !grounded) {
            downOnce++;
            if(downOnce == 1){
                //this.player.animations.play('jump');
                this.player.body.velocity.y = 550;
            }
            //console.log(grounded);
            //this.jumpSound.play();
        }
        if (grounded){
            downOnce=0;
            jumpOnce= 0;
            this.player.animations.play('run');
            this.player.body.velocity.x = 0;
        }
        if(diamond){
            diamond.position.x -= diamondSpeed; 
        }
        if(!explosionArray){
            //explosionArray = this.fillArray();
        }
        filter.update();
    },

    render: function(){
        // game.debug.body(this.player);
        // game.debug.body(lastCoin);
        // game.debug.body(spike);
        // this.fireballs.forEachAlive(renderGroup, this);
        // this.coins.forEachAlive(renderGroup, this);
        // function renderGroup(member) {    game.debug.body(member);}
    }
};