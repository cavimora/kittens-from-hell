const EXPLOSION_POOL = 10;
class ExplosionGroupObject extends Phaser.Group{
	constructor(game){
		super(game);
		this.explosionSpeed = 200;
		this.enableBody = true;
		this.physicsBodyType = Phaser.Physics.ARCADE;
		this._generateExplosions(game);
		this.setAll('frame', 80);
		this._lastAlive = null;
	}

	_generateExplosions(game){
		this.createMultiple(EXPLOSION_POOL, 'explosion-sprite');
        // game.physics.arcade.enable(this);
        this.setAll('anchor.x', 0.5);
        this.setAll('anchor.y', 0.5);
        this.setAll('position.x', 200);
        this.setAll('position.y', 200);
        this.forEach(function(_explosion){
        	_explosion.animations.add('explode', [], null, false);
	        _explosion.scale.setTo(1);
	        _explosion.anchor.setTo(1,1);
        });
	}

	spawnExplosion(spike){
		// console.log(spike);
		let activeExplosion = this.getFirstDead();
		activeExplosion.reset(spike.x, spike.y);
		activeExplosion.body.velocity.x = -this.explosionSpeed;
		activeExplosion.animations.play('explode');
		// console.log(activeExplosion);
		this._lastAlive = activeExplosion;

	}

}
export default ExplosionGroupObject;