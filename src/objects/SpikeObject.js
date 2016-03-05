const SPIKE_POOL = 20;
class SpikeObject extends Phaser.Group{
	constructor(game){
		super(game);
		this.spikeSpeed = 100;
		this.enableBody = true;
		this.physicsBodyType = Phaser.Physics.ARCADE;
		this._generateSpikes(game);
		this.setAll('outOfBoundsKill', true);
    	this.setAll('checkWorldBounds', true);
	}
	_generateSpikes(game){
		this.createMultiple(SPIKE_POOL, 'spike');
		this.setAll('anchor.x', 0.5);
        this.setAll('anchor.y', 0.5);
        this.setAll('position.x', 200);
        this.setAll('position.y', 200);
        this.forEach(function(_spike){
        	_spike.spikeCrash = game.add.audio('pickup');
        	_spike.events.onKilled.add(function(spike){
        		//coin.coinPickUp.play();
        	});
        });
	}

	
}
export default SpikeObject;