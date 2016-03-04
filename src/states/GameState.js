//IMPORTS
import Coins from 'objects/CoinGroupObject';
import World from 'objects/WorldGroupObject';
import Cat from 'objects/CatObject';
//CONSTANTS
const COIN_MIN = 7;
const COIN_MAX = 13;
const TIME_MIN = 7;
const TIME_MAX = 11;
//STATE DEFINITION
class GameState extends Phaser.State {
	
	create() {
		this.spawnCoinsTime = 7;
		this.game.world.setBounds(0, 0, 1100, 360);
		this.world = new World(this.game);
		this.coins = new Coins(this.game)
		this.player = new Cat(this.game);
		this.coinAmount = Math.floor(Math.random() * (COIN_MAX - COIN_MIN) + COIN_MIN);
		this.coins.spawnCoins(this.coinAmount);
		this.game.time.events.add(Phaser.Timer.SECOND * this.spawnCoinsTime, this.coinManager, this);
	}

	coinManager(){
		this.coinAmount = Math.floor(Math.random() * (COIN_MAX - COIN_MIN) + COIN_MIN);
		this.coins.spawnCoins(this.coinAmount);
		this.spawnCoinsTime = Math.floor(Math.random() * (TIME_MAX - TIME_MIN) + TIME_MIN);
		this.game.time.events.add(Phaser.Timer.SECOND * this.spawnCoinsTime, this.coinManager, this);
	}

	collectCoins(player, coin){
		coin.kill();
		console.log()
	}

	update(){
		//this.game.world.bringToTop(this.player);
		this.game.physics.arcade.collide(this.player, this.world);
		this.game.physics.arcade.overlap(this.player, this.coins, this.collectCoins, null, this);
	}

	render(){
		this.game.debug.body(this.player);
		// this.game.debug.body(this.world.ground);
	}

}

export default GameState;
