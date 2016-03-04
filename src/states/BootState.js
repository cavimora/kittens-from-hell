class BootState extends Phaser.State{
	preload(){
		this.game.load.image('progressBar', 'assets/images/progress_Bar.png');   
	}
	create(){
		this.game.state.start('PreLoadState');
	}
}	

export default BootState;