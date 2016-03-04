class PhaserObject {

	constructor(x, y, group, asset_name, hasBody){
		this._posX = x;
		this._posY = y;
		this._group = group;
		this._asset_name = asset_name;
		
		this._sprite = this._group.create(this._posX, this._posY, this._asset_name);
		this._sprite.enableBody = hasBody;
	}

}
export default PhaserObject;