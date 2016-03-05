//IMPORTS
import World from 'objects/WorldGroupObject';
import Coins from 'objects/CoinGroupObject';
import Spike from 'objects/SpikeObject';
import Pow from 'objects/PowerUpObject';
import Cat from 'objects/CatObject';
import UI from 'objects/UIObject';
//CONSTANTS
const COIN_MIN = 7;
const COIN_MAX = 13;
const TIME_MIN = 7;
const TIME_MAX = 11;
//STATE DEFINITION
class GameState extends Phaser.State {
	
	create() {
		this.game.world.setBounds(0, 0, 1100, 360);
		this.declareVariables();
		this.createControls();
		this.createObjects();
		this.game.time.events.add(Phaser.Timer.SECOND * 1, this.coinManager, this);
		this.game.world.camera.position.set(0);
	}
	createObjects(){
		this.spikes = new Spike(this.game);
		this.world = new World(this.game);
		this.coins = new Coins(this.game);		
		this.player = new Cat(this.game);
		this.ui = new UI(this.game, 0);
		this.ui.onNormal.add(this.endPow, this);
		this.pows = new Pow(this.game);
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

	coinManager(){
		this.coinAmount = Math.floor(Math.random() * (COIN_MAX - COIN_MIN) + COIN_MIN);
		this.coins.spawnCoins(this.coinAmount);
		let spawnCoinsTime = Math.floor(Math.random() * (TIME_MAX - TIME_MIN) + TIME_MIN);
		this.game.time.events.add(Phaser.Timer.SECOND * spawnCoinsTime, this.coinManager, this);
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
	}

	endPow(){
		this.player.powerUp = false;
		this.player.changeScale();
	}
	//In this update we only define what will happen in the collisions of the objects
	update(){
		//this.game.world.bringToTop(this.player);
		this.game.physics.arcade.collide(this.player, this.world);
		this.game.physics.arcade.overlap(this.player, this.coins, this.collectCoins, null, this);
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
		this.game.debug.body(this.player);
		// this.game.debug.body(this.world.ground);
	}

}

export default GameState;
