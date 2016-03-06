//IMPORTS
import World from 'objects/WorldGroupObject';
import Coins from 'objects/CoinGroupObject';
import Spike from 'objects/SpikeObject';
import Pow from 'objects/PowerUpObject';
import Cat from 'objects/CatObject';
import UI from 'objects/UIObject';
//CONSTANTS
const COIN_MIN = 13;
const COIN_MAX = 23;
const TIME_COIN_MIN = 7;
const TIME_COIN_MAX = 11;
const TIME_SPIKE_MIN = 7;
const TIME_SPIKE_MAX = 11;
//STATE DEFINITION
class GameState extends Phaser.State {
	
	create() {
		let spawnSpikesTime = Math.floor(Math.random() * (TIME_SPIKE_MAX - TIME_SPIKE_MIN) + TIME_SPIKE_MIN);
		this.game.world.setBounds(0, 0, 1100, 360);
		this.declareVariables();
		this.createControls();
		this.createObjects();
		this.game.time.events.add(Phaser.Timer.SECOND * 1, this.manageCoins, this);
		this.game.time.events.add(Phaser.Timer.SECOND * 1, this.manageSpike, this);
		this.game.world.camera.position.set(0);
		this.ui.onNormal.add(this.endPow, this);
	}
	createObjects(){
		this.createExplosions();
		this.world = new World(this.game);
		this.coins = new Coins(this.game);		
		this.player = new Cat(this.game);
		this.ui = new UI(this.game, 0);
		this.pows = new Pow(this.game);
		this.spikes = new Spike(this.game);
	}

	createExplosions(){
        this.explosion = this.game.add.sprite(150, this.game.world.height-130, 'explosion');
		this.explosion.animations.add();
        this.explosion.anchor.setTo(0.5,0);
        this.explosion.frame = 80;

        this.explosionSounds = [];
        this.explosionSounds.push(this.game.add.audio('explosion'));
        this.explosionSounds.push(this.game.add.audio('explosion2'));
        this.explosionSounds.push(this.game.add.audio('explosion3'));
    }

	declareVariables(){
		this.spawnCoinsTime = 7;
		this.score = 0;
		this.flag = true;
	}

	createControls(){
		this.controls = this.game.input.keyboard.addKeys({
            'space': Phaser.Keyboard.SPACEBAR, 
            'Q': Phaser.Keyboard.Q, 
            'up': Phaser.Keyboard.UP, 
            'down': Phaser.Keyboard.DOWN, 
        });
	}

	manageCoins(){
		this.coinAmount = Math.floor(Math.random() * (COIN_MAX - COIN_MIN) + COIN_MIN);
		this.coins.spawnCoins(this.coinAmount);
		let spawnCoinsTime = Math.floor(Math.random() * (TIME_COIN_MAX - TIME_COIN_MIN) + TIME_COIN_MIN);
		this.game.time.events.add(Phaser.Timer.SECOND * spawnCoinsTime, this.manageCoins, this);
	}

	manageSpike(){
		this.spikes.spawnSpike();
		this.coins.addObstacle(this.spikes._lastAlive.position.x);
		let spawnSpikesTime = Math.floor(Math.random() * (TIME_SPIKE_MAX - TIME_SPIKE_MIN) + TIME_SPIKE_MIN);
		this.game.time.events.add(Phaser.Timer.SECOND * spawnSpikesTime, this.manageSpike, this);	
	}


	collectCoins(player, coin){
		coin.kill();
		this.score++;
		//coin.coinPickUp.play();
		this.ui.updateScore(this.score);
	}

	activatePow(player, pow){
		pow.kill();
		this.ui.setPow();
		this.player.powerUp = true;
		this.player.changeScale();
		this.ui.activateFilter();
	}

	endPow(){
		this.player.powerUp = false;
		this.player.changeScale();
		this.ui.removeFilter();
	}

	crashSpike(player, spike){
		if(this.player.powerUp){
			this.explosion.position.x = spike.x;
            this.explosion.position.y = spike.y;
            this.explosion.animations.play();
            spike.kill();
			//explosion.body.velocity.x = - this.spikes.spikeSpeed;
			this.explosionSounds[Math.floor(Math.random() * this.explosionSounds.length)].play();
		}else{

		}
	}
	//In this update we only define what will happen in the collisions of the objects
	update(){
		//this.game.world.bringToTop(this.player);
		this.game.physics.arcade.collide(this.player, this.world);
		this.game.physics.arcade.overlap(this.player, this.coins, this.collectCoins, null, this);
		this.game.physics.arcade.overlap(this.player, this.spikes, this.crashSpike, null, this);
		this.game.physics.arcade.overlap(this.player, this.pows, this.activatePow, null, this);

		this.player.pressingUp = this.controls.up.isDown;
        this.player.pressingDown = this.controls.down.isDown;
        this.player.pressingSpace = this.controls.space.isDown; 
        if(this.controls.Q.isDown && this.flag){
        	this.pows.spawnPow();
        	this.flag = false;
        }  
	}

	render(){
		// if(this.spikes._lastAlive){
		// 	this.game.debug.body(this.spikes._lastAlive);
		// }
		this.game.debug.body(this.explosion);
		// this.game.debug.spriteInfo(this.spikes._lastAlive, 32, 32);
	}

}

export default GameState;
