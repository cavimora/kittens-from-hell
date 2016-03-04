//IMPORTS
//CONSTANTS
const COIN_POOL = 40;

//CLASS DEFINITION
class CoinGroupObject extends Phaser.Group{
	constructor(game){
		super(game);
		this.coinSpeed = 100;
		this.enableBody = true;
		this.physicsBodyType = Phaser.Physics.ARCADE;
		this._generateCoins(game);
		this.setAll('outOfBoundsKill', true);
    	this.setAll('checkWorldBounds', true);
	} 

	_generateCoins(game){
		this.createMultiple(COIN_POOL, 'coin');
		this.setAll('anchor.x', 0.5);
        this.setAll('anchor.y', 0.5);
        this.setAll('position.x', 200);
        this.setAll('position.y', 200);
        this.forEach(function(_coin){
        	_coin.animations.add('spin', [0,1,2,3,4,5,6,7], 15, true);
        	_coin.animations.play('spin');
        	_coin.coinPickUp = game.add.audio('pickup');
        	_coin.events.onKilled.add(function(coin){
        		//coin.coinPickUp.play();
        	});
        });
	}

	spawnCoins(amount){
		for(let i = 0; i < amount; i++){
			let coin = this.getFirstDead();
			coin.reset(600 + (i * 40), 315);
			coin.body.velocity.x = -this.coinSpeed;
		}
	}

	setCoinSpeed(speed){
		this.coinSpeed = speed;
	}
}
export default CoinGroupObject;