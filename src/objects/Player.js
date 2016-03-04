class Player{
	constructor(game){
		this._player = game.add.sprite(150, game.world.height - 130, 'player');
		this._player.animations.add('walk', [9,10,11,12,13,14,15,16,17,18], 20, true);
        this._player.animations.add('run', [1,2,3,4,5,6,7,8], 20, true);
        this._player.animations.add('jump', [0], 15, true);
        this._player.animations.add('idle', [5]);

        this._player.animations.play('walk');

        this._player.scale.setTo(1);
        this._player.anchor.setTo(1,1);
        
        // Enable physics
        game.physics.arcade.enable(this._player);
        this._player.body.bounce.y = 0;
        this._player.body.gravity.y = 1500;
        this._player.body.collideWorldBounds = true;
        this._player.body.setSize(25, 78, -40, -5);
	}
}
export default Player;