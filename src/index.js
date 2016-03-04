import GameState from 'states/GameState';
import BootState from 'states/BootState';
import PreLoadState from 'states/PreLoadState';

class Game extends Phaser.Game {

	constructor() {
		super(600, 390, Phaser.AUTO, 'content', null);
		this.state.add('GameState', GameState, false);
		this.state.add('BootState', BootState, false);
		this.state.add('PreLoadState', PreLoadState, false);
		this.state.start('BootState');
	}

}

new Game();
