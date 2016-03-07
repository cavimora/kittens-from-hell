class CatObject extends Phaser.Sprite{
	constructor(game){
		super(game, 100, game.stage.height - 64, 'player');
		this.defineVariables();
		
		this.animations.add('walk', [9,10,11,12,13,14,15,16,17,18], 20, true);
        this.animations.add('run', [1,2,3,4,5,6,7,8], 20, true);
		this.animations.add('jump', [0], 15, true);
		this.animations.play('run');
		
		this.scale.setTo(1);
		this.anchor.setTo(1,1);
		this.enableBody = true;

		game.physics.arcade.enable(this);
		
		this.body.bounce.y = 0;
		this.body.gravity.y = 1500;
		this.body.setSize(25, 78, -40, -5);
		this.body.collideWorldBounds = true;
		
		game.add.existing(this);
	}

	defineVariables(){
		this.pressingUp =false;
		this.pressingDown =false;
		this.pressingSpace =false;
		this.powerUp = false;
	}

	changeScale(){
		if(this.powerUp){
			this.scale.setTo(2);
			this.anchor.setTo(0.6,1);
			this.body.setSize(25, 78, -20, -5);
		}else{
			this.scale.setTo(1);
			this.anchor.setTo(1,1);
			this.body.setSize(25, 78, -40, -5);
		}
	}

	update(){
		let grounded = this.body.touching.down;
		if(grounded){
			this.animations.play('run');
			this.body.velocity.x = 0;		
		}
		if((grounded && this.pressingUp) 
			|| (grounded && this.pressingSpace)){
			this.animations.play('jump');
		    this.body.velocity.y = -550;
		}
		if(!grounded && this.pressingDown){
			this.body.velocity.y = 450;	
		}

	}
}
export default CatObject;