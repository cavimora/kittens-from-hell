import PhaserObject from 'objects/PhaserObject';
class Coin extends PhaserObject{

	constructor(x, y, group){
		super(x, y, group, 'coins', true);
		//this.coin = this.create_with_body();
		this._sprite.scale.setTo(1);
		//this._sprite.update = function(){ this.update() }
		this._speed = 3;
		this.animation();
		this._sprite.body.setSize(20, 20, -10, 0);
	}

	animation(){
		this._sprite.animations.add('animate_coin', [0,1,2,3,4,5,6,7], 15, true);
		this._sprite.animations.play('animate_coin');
	}

	update(){
		if(this._sprite.alive){
			//this._sprite.x -= this._speed;
			if(this._sprite.x < -30){
				this._sprite.kill();
			}
		}
	}
}
export default Coin;