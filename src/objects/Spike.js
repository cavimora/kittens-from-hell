import PhaserObject from 'objects/PhaserObject';
class Spike extends PhaserObject{

	constructor(x, y, group){
		super(x, y, group, 'spike');
	}
	
	setScale(value){
		this._sprite.scale.setTo(value);
	}

	update(){
		this._sprite.position.x -= 0.1;
	}
}
export default Spike;