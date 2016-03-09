//IMPORTS
import Explosion from '../objects/ExplosionGroupObject'
import World from '../objects/WorldGroupObject';
import Coins from '../objects/CoinGroupObject';
import Spike from '../objects/SpikeObject';
import Pow from '../objects/PowerUpObject';
import Cat from '../objects/CatObject';
import UI from '../objects/UIObject';
//CONSTANTS
const COIN_MIN = 13;
const COIN_MAX = 23;
const TIME_COIN_MIN = 5;
const TIME_COIN_MAX = 8;
const TIME_SPIKE_MIN = 5;
const TIME_SPIKE_MAX = 8;
//STATE DEFINITION
let THISGAME = null;
class GameState extends Phaser.State {
	
	create() {
		// let neonate = this.game.add.neonate();
		let spawnSpikesTime = Math.floor(Math.random() * (TIME_SPIKE_MAX - TIME_SPIKE_MIN) + TIME_SPIKE_MIN);
		this.game.world.setBounds(0, 0, 1100, 360);
		this.declareVariables();
		this.createControls();
		this.createObjects();
		this.game.time.events.add(Phaser.Timer.SECOND * 1, this.manageCoins, this);
		this.game.time.events.add(Phaser.Timer.SECOND * 1.2, this.manageSpike, this);
		this.game.world.camera.position.set(0);
		this.ui.onNormal.add(this.endPow, this);
		THISGAME = this;
		this.player.playerDead.add(function(){
			if(THISGAME.dieOnce){
				// THISGAME.world.setTileSpeed(0);
				THISGAME.dieOnce = false;
				THISGAME.game.state.start('GameOverState');
			}
		});
	}
	createObjects(){
		this.world = new World(this.game);
		this.coins = new Coins(this.game);		
		this.ui = new UI(this.game, 0);
		this.pows = new Pow(this.game);
		this.explosions = new Explosion(this.game);
		this.spikes = new Spike(this.game);
		this.player = new Cat(this.game);
		this.ui.createInGameUI(0);
	}

	declareVariables(){
		this.score = 0;
		this.flag = true;
		this.dieOnce = true;
		this.spawnCoinsTime = 7;
		this.flagCoinUpdate = true;
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
		let spawnSpikesTime = Math.floor(Math.random() * (TIME_SPIKE_MAX - TIME_SPIKE_MIN) + TIME_SPIKE_MIN);
		this.game.time.events.add(Phaser.Timer.SECOND * spawnSpikesTime, this.manageSpike, this);	
	}


	collectCoins(player, coin){
		coin.kill();
		this.score++;
		//coin.coinPickUp.play();
		this.ui.updateScore(this.score);
		if(!this.flagCoinUpdate){
			this.flagCoinUpdate = true;
		}
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
			this.explosions.spawnExplosion(spike);
			spike.kill();
		}else{
			this.spikes.keepSpawning = false;
			this.coins.keepSpawning = false;
			this.coins.callAll('kill');
			this.spikes.callAll('kill');
			this.world.setTileSpeed(0);
			this.coins.setCoinSpeed(50);
			this.spikes.setSpikeSpeed(50);
			this.player.killPlayer();
		}
	}

	updateCoinsPosition(coin, spike){
		if(this.flagCoinUpdate){
			this.flagCoinUpdate = false;
			this.coins.addObstacle(spike.x);
		}
	}
	//In this update we only define what will happen in the collisions of the objects
	update(){
		//this.game.world.bringToTop(this.player);
		this.game.physics.arcade.collide(this.player, this.world);

		this.game.physics.arcade.overlap(this.coins, this.spikes, this.updateCoinsPosition, null, this);
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
		// this.coins.forEachAlive(this.renderGroup, this);
		// if(this.spikes._lastAlive){
		// 	this.game.debug.body(this.spikes._lastAlive);
		// }
	}

	renderGroup(member) {    this.game.debug.body(member); }

}

export default GameState;
