const SPIKE_POOL = 20;
class SpikeObject extends Phaser.Group{
	constructor(game){
		super(game);
		this.spikeSpeed = 200;
		this.enableBody = true;
		this.physicsBodyType = Phaser.Physics.ARCADE;
		this._generateSpikes(game);
		this.setAll('outOfBoundsKill', true);
    	this.setAll('checkWorldBounds', true);
    	this._lastAlive = null;
    	this.keepSpawning = true;
	}
	_generateSpikes(game){
		this.createMultiple(SPIKE_POOL, 'spike');
		this.setAll('anchor.x', 0.5);
        this.setAll('anchor.y', 0.5);
        this.setAll('position.x', 200);
        this.setAll('position.y', 200);
        this.forEach(function(_spike){
        	_spike.spikeCrash = game.add.audio('pickup');
	        _spike.scale.setTo(0.15);
	        _spike.anchor.setTo(1,1);
			_spike.body.setSize(20, 38, -4.9, 0);
        	_spike.events.onKilled.add(function(spike){
        		//coin.coinPickUp.play();
        	});
        });
	}

	spawnSpike(){
		if(this.keepSpawning){
			let activeSpike = this.getFirstDead();
			activeSpike.reset(640, 330);
			activeSpike.body.velocity.x = -this.spikeSpeed;
			this._lastAlive = activeSpike;
		}
	}

	setSpikeSpeed(speed){
		this.spikeSpeed = speed;
	}

	
}
export default SpikeObject;