import UI from '../objects/UIObject';
class GameOverState extends Phaser.State{
	create(){
		this.ui = new UI(this.game, 0);
	}
	
	update(){
		
	}
}
export default GameOverState;