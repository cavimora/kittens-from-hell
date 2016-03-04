class WorldGroupObject extends Phaser.Group{
	constructor(game){
		super(game);
		this.enableBody = true;
		this.bg = game.add.tileSprite(0, 0, game.stage.width, 360, 'city');
		this.ground = this.create(game.stage.width, game.stage.height, 'ground');
		this.ground.body.immovable = true; 
		this.ground.anchor.setTo(1, 1);
		this.ground.body.setSize(600, 90, 0, 30);
		this.add(this.bg);
		this.add(this.ground);

	}

	update(){
		this.bg.tilePosition.x -= 1;
	}
}
export default WorldGroupObject;