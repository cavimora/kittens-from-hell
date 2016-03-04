import Spike from 'objects/Spike';
import Coin from 'objects/Coin';
import World from 'objects/World';
import Player from 'objects/Player';

const COIN_MAX_AMOUNT = 13;
const COIN_MIN_AMOUNT = 7;


const COIN_POOL_AMOUNT = 100;
let amount = 0;
let lastIndex = 0;
class GameState extends Phaser.State {
	
	create() {
		this.game.world.setBounds(0, 0, 600,360);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this._center = { x: this.game.world.centerX, y: this.game.world.centerY }
        this.createGroups();

        this._worldG = new World(this._world, this.game);
        this._player = new Player(this.game);
        //this._player.body.setSize(25, 78, -40, -5);

		this.createCoins();
		this.respawnCoins();
	}

	createGroups(){
		this._world = this.game.add.group();
		this._spikes = this.game.add.group();
		this._coins = this.game.add.group();
		this._coins.enableBody = true;
		this._platforms = this.game.add.group();
	}

	createCoins(){
		this._coinList = [];
		for(let i =0; i<COIN_POOL_AMOUNT; i++){
			this._coinList[i] = new Coin(this._center.x + i*30, this._center.y + 150,this._coins);	
			this._coinList[i].alive = false;
			this._coins.callAll('kill');
		}
	}

	respawnCoins(){
		if(lastIndex == 100){
			lastIndex = 0;
		}
		amount = Math.floor(Math.random() * (COIN_MAX_AMOUNT - COIN_MIN_AMOUNT) + COIN_MIN_AMOUNT);
		let ind = 0;
		//console.log(lastIndex + amount);
		if(lastIndex + amount >= COIN_POOL_AMOUNT){
			let dif = (lastIndex + amount) - COIN_POOL_AMOUNT;
			amount = amount - dif;
			//console.log(lastIndex + amount);
		}
		let cont = 0;
		for(let i = lastIndex; i<(lastIndex+amount);i++){			
			cont++;
			this._coinList[i]._sprite.reset(this._center.x + 350 + cont*30, this._center.y + 125);
			this._coinList[i].alive = true;
		}
		lastIndex = lastIndex+amount;
	}

	collectCoins(player, coin){
		console.log('MAMA');
	}
	
	update(){
		this.game.physics.arcade.collide(this._player._player, this._world);
		this.game.physics.arcade.overlap(this._player, this._coins, this.collectCoins, null, this);

		let grounded = this._player._player.body.touching.down;
		//this.game.world.bringToTop(this._coins);
		this._coins.addAll('position.x', -2);
		for(let i = 0; i < this._coinList.length; i++){
			this._coinList[i].update();
		}
		if(!this._coinList[lastIndex - 3]._sprite.alive){
			this.respawnCoins();
		}
		this._worldG.update();
	}

	render(){
		this.game.debug.body(this._player._player);
		// this.game.debug.body(this._worldG._ground);
        //game.debug.body(spike);
        //this.fireballs.forEachAlive(renderGroup, this);
        this._coins.forEachAlive(renderGroup, this);
        function renderGroup(member) {    this.game.debug.body(member);}
	}

}

export default GameState;
