class World{

	constructor(world, game){
		world.enableBody = true;
		this._citi = game.add.tileSprite(0, 0, game.stage.width, game.stage.height, 'city');
		this._ground = world.create(game.stage.width, game.world.height - 57.8, 'ground');
		this._ground.body.immovable = true; 
		this._ground.anchor.setTo(1, 0);
		this._ground.body.setSize(600, 70, 0, 30);
	}

	update(){
		this._citi.tilePosition.x -= 0.7;
	}
}
export default World;