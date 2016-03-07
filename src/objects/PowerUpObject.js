const POW_POOL = 10;
class PowerUpObject extends Phaser.Group{
	constructor(game){
		super(game);
		this.powSpeed = 100;
		this.enableBody = true;
		this.physicsBodyType = Phaser.Physics.ARCADE;
		this.setAll('outOfBoundsKill', true);
    	this.setAll('checkWorldBounds', true);
    	this._generatePow();
	}

	_generatePow(){
		this.createMultiple(POW_POOL, 'diamond');
		this.setAll('anchor.x', 0.5);
        this.setAll('anchor.y', 0.5);
        this.setAll('position.x', 200);
        this.setAll('position.y', 200);
        this.forEach(function(_pow){
        	_pow.events.onKilled.add(function(pow){
        		
        	});
        });
	}

	spawnPow(){
		let pow = this.getFirstDead();
		if(pow){
			pow.reset(610, 200);
			console.log(pow.alive);
			pow.body.velocity.x = -this.powSpeed;
		}
	}
}
export default PowerUpObject;