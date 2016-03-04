class CatObject extends Phaser.Sprite{
	constructor(game){
		super(game, 100, 100, 'player');
		
		this.animations.add('walk', [9,10,11,12,13,14,15,16,17,18], 20, true);
        this.animations.add('run', [1,2,3,4,5,6,7,8], 20, true);
		this.animations.add('jump', [0], 15, true);
		this.animations.play('walk');

		this.scale.setTo(1);
		this.anchor.setTo(1,1);
		this.enableBody = true;
		game.physics.arcade.enable(this);
		this.body.bounce.y = 0;
		this.body.gravity.y = 1500;
		this.body.collideWorldBounds = true;
		this.body.setSize(25, 78, -40, -5);
		game.add.existing(this);
	}
}
export default CatObject;