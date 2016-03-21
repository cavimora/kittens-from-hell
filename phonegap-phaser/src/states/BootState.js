class BootState extends Phaser.State{
	preload(){
		this.game.load.image('progressBar', 'assets/images/progress_Bar.png');   
	}
	create(){
		this.game.state.start('PreLoadState');
	}

	init(){
		this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; 
        this.game.scale.pageAlignHorizontally = true; 
        this.game.scale.pageAlignVertically = true;
	}
}	

export default BootState;