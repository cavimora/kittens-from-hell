class UIObject extends Phaser.Group{
	constructor(game){
		super(game);
		this._game = game;
	}

	createInGameUI(score){
		this.powerTime = 15;
		this.textScore = this._game.add.text(20, 20, `Score: ${score}`, { fontSize: '32px', fill: 'rgb(50, 75, 84)' });
		this.textPow = this._game.add.text(450, 20, ``, { fontSize: '32px', fill: '#FF0000' });
		this.textDieded = this._game.add.text(this._game.width / 2.9 , this._game.height / 2.3, ``, { fontSize: '70px', fill: '#FF0000' });
		this.add(this.textScore);
		this.add(this.textPow);
		this.add(this.textDieded);
		this.onNormal = new Phaser.Signal();
		this.filter = this._game.add.filter('Fire', 800, 600);
		this.filter.alpha = 0.0;
	}

	updateScore(score){
		this.textScore.text = `Score: ${score}`;
	}

	setPow(){
		if(this.powerTime >= 0){
			this.textPow.text = `Pow: ${this.powerTime}s`;
			this.powerTime--;
			this.game.time.events.add(Phaser.Timer.SECOND * 1, this.setPow, this);
		}else{
			this.textPow.text = ``;
			this.onNormal.dispatch(this);
		}
	}

	setDieded(){
		this.textDieded.text = `DIEDED`;
	}

	activateFilter(){
		this.background = this._game.add.sprite(0, 0);
		this.background.width = 800;
		this.background.height = 600;
		this.background.filters = [this.filter];
	}
	removeFilter(){
		this.background.filters = null;	
	}

	update(){
		// if(this.filter){
		// 	this.filter.update();
		// }
	}

	addQuake(game) {
		// define the camera offset for the quake
		var rumbleOffset = 5;

		// we need to move according to the camera's current position
		var properties = {
			x: game.camera.x - rumbleOffset,
			y: game.camera.y + rumbleOffset,
		};

		// we make it a relly fast movement
		var duration = 50;
		// because it will repeat
		var repeat = 4;
		// we use bounce in-out to soften it a little bit
		var ease = Phaser.Easing.Bounce.InOut;
		var autoStart = false;
		// a little delay because we will run it indefinitely
		var delay = 0;
		// we want to go back to the original position
		var yoyo = true;

		var quake = game.add.tween(this)
		.to(properties, duration, ease, autoStart, delay, 10, yoyo);

		// we're using this line for the example to run indefinitely
		// quake.onComplete.addOnce(this.addQuake);

		// let the earthquake begins
		quake.start();
	}

	createGameOverUI(){

	}

}
export default UIObject;