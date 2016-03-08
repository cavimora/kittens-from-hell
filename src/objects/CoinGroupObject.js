//IMPORTS
//CONSTANTS
//Coins that we'll have to play with, killing a reviving use this when you have a item that can be created several times.
const COIN_POOL = 40;

//CLASS DEFINITION
class CoinGroupObject extends Phaser.Group{
	constructor(game){
		super(game);
		this.coinSpeed = 200;
		this.enableBody = true;
		this.physicsBodyType = Phaser.Physics.ARCADE;
		this._generateCoins(game);
		this.setAll('outOfBoundsKill', true);
    	this.setAll('checkWorldBounds', true);
    	this.keepSpawning = true;
	} 

	_generateCoins(game){
		//Your code will look neat and clean this way
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
		if(this.keepSpawning){
			for(let i = 0; i < amount; i++){
				let coin = this.getFirstDead();
				if(coin){
					coin.reset(600 + (i * 15), 315);
					coin.body.velocity.x = -this.coinSpeed;
				}
			}
		}
	}


	setCoinSpeed(speed){
		this.coinSpeed = speed;
	}

	addObstacle(cordX){
		let cont = 0;
		let pixels = 45;
		let limitL = cordX - pixels;
		let limitR = cordX + pixels;
		let log = "";
		this.forEach(function(coin){
			let isLeft = coin.x <= cordX && coin.x >= limitL;
			let isRight = coin.x >= cordX && coin.x <= limitR;
			if(isLeft){
				cont++;
				coin.y = coin.y - cont * 25
				log += `L: ${cont}\n`;
			}else if(isRight){
				cont--;
				coin.y = coin.y - cont * 25
				log += `R: ${cont}\n`;
				
			}else if(isLeft && isRight){
				cont++
				coin.y = coin.y - cont * 25
				log += `C: ${cont}\n`;
			}
		});
		// console.log(log);
	}
}
export default CoinGroupObject;