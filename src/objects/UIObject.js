class UIObject extends Phaser.Group{
	constructor(game, score){
		super(game);
		this.powerTime = 15;
		this.textScore = game.add.text(20, 20, `Score: ${score}`, { fontSize: '32px', fill: 'rgb(50, 75, 84)' });
		this.textPow = game.add.text(450, 20, ``, { fontSize: '32px', fill: '#FF0000' });
		this.add(this.textScore);
		this.onNormal = new Phaser.Signal();
	}
	updateScore(score){
		this.textScore.text = `Score: ${score}`;
	}

	setPow(player){
		if(this.powerTime >= 0){
			this.textPow.text = `Pow: ${this.powerTime}s`;
			this.powerTime--;
			this.game.time.events.add(Phaser.Timer.SECOND * 1, this.setPow, this);
		}else{
			this.textPow.text = ``;
			this.onNormal.dispatch(this);
		}
	}


}
export default UIObject;