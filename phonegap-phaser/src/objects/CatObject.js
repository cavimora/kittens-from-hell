class CatObject extends Phaser.Sprite{
	constructor(game){
		super(game, 100, game.stage.height - 64, 'player');
		this.defineVariables();
        this.animations.add('run', [11, 12, 13, 14, 15, 16, 17, 18], 20, true);
		this.animations.add('jump', [10], 15, true);
		this.animations.add('die', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 13, false);
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
		this.dying = false;
		this.playerDead = new Phaser.Signal();
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

	killPlayer(){
		this.dying = true;
		this.animations.play('die');
		this.animations.currentAnim.onComplete.add(function (me) { me.playerDead.dispatch(this); });
	}

	update(){
		let grounded = this.body.touching.down;
		if(grounded && !this.dying){
			this.animations.play('run');
			this.body.velocity.x = 0;		
		}
		if((grounded && this.pressingUp && !this.dying) 
			|| (grounded && this.pressingSpace && !this.dying)){
			this.animations.play('jump');
		    this.body.velocity.y = -550;
		}
		if(!grounded && this.pressingDown){
			this.body.velocity.y = 450;	
		}
		// if(!grounded && this.dying){
		// 	this.body.velocity.y = 450;	
		// }

	}
}
export default CatObject;