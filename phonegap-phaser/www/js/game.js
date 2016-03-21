(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _statesGameState = require('./states/GameState');

var _statesGameState2 = _interopRequireDefault(_statesGameState);

var _statesBootState = require('./states/BootState');

var _statesBootState2 = _interopRequireDefault(_statesBootState);

var _statesPreLoadState = require('./states/PreLoadState');

var _statesPreLoadState2 = _interopRequireDefault(_statesPreLoadState);

var _statesGameOverState = require('./states/GameOverState');

var _statesGameOverState2 = _interopRequireDefault(_statesGameOverState);

var Game = (function (_Phaser$Game) {
	_inherits(Game, _Phaser$Game);

	function Game() {
		_classCallCheck(this, Game);

		_get(Object.getPrototypeOf(Game.prototype), 'constructor', this).call(this, 780, 390, Phaser.AUTO, 'content', null);
		this.state.add('GameState', _statesGameState2['default'], false);
		this.state.add('GameOverState', _statesGameOverState2['default'], false);
		this.state.add('BootState', _statesBootState2['default'], false);
		this.state.add('PreLoadState', _statesPreLoadState2['default'], false);
		this.state.start('BootState');
	}

	return Game;
})(Phaser.Game);

new Game();

},{"./states/BootState":9,"./states/GameOverState":10,"./states/GameState":11,"./states/PreLoadState":12}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CatObject = (function (_Phaser$Sprite) {
	_inherits(CatObject, _Phaser$Sprite);

	function CatObject(game) {
		_classCallCheck(this, CatObject);

		_get(Object.getPrototypeOf(CatObject.prototype), 'constructor', this).call(this, game, 100, game.stage.height - 64, 'player');
		this.defineVariables();
		this.animations.add('run', [11, 12, 13, 14, 15, 16, 17, 18], 20, true);
		this.animations.add('jump', [10], 15, true);
		this.animations.add('die', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 13, false);
		this.animations.play('run');

		this.scale.setTo(1);
		this.anchor.setTo(1, 1);
		this.enableBody = true;

		game.physics.arcade.enable(this);

		this.body.bounce.y = 0;
		this.body.gravity.y = 1500;
		this.body.setSize(25, 78, -40, -5);
		this.body.collideWorldBounds = true;

		game.add.existing(this);
	}

	_createClass(CatObject, [{
		key: 'defineVariables',
		value: function defineVariables() {
			this.pressingUp = false;
			this.pressingDown = false;
			this.pressingSpace = false;
			this.powerUp = false;
			this.dying = false;
			this.playerDead = new Phaser.Signal();
		}
	}, {
		key: 'changeScale',
		value: function changeScale() {
			if (this.powerUp) {
				this.scale.setTo(2);
				this.anchor.setTo(0.6, 1);
				this.body.setSize(25, 78, -20, -5);
			} else {
				this.scale.setTo(1);
				this.anchor.setTo(1, 1);
				this.body.setSize(25, 78, -40, -5);
			}
		}
	}, {
		key: 'killPlayer',
		value: function killPlayer() {
			this.dying = true;
			this.animations.play('die');
			this.animations.currentAnim.onComplete.add(function (me) {
				me.playerDead.dispatch(this);
			});
		}
	}, {
		key: 'update',
		value: function update() {
			var grounded = this.body.touching.down;
			if (grounded && !this.dying) {
				this.animations.play('run');
				this.body.velocity.x = 0;
			}
			if (grounded && this.pressingUp && !this.dying || grounded && this.pressingSpace && !this.dying) {
				this.animations.play('jump');
				this.body.velocity.y = -550;
			}
			if (!grounded && this.pressingDown) {
				this.body.velocity.y = 450;
			}
			// if(!grounded && this.dying){
			// 	this.body.velocity.y = 450;	
			// }
		}
	}]);

	return CatObject;
})(Phaser.Sprite);

exports['default'] = CatObject;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
//IMPORTS
//CONSTANTS
//Coins that we'll have to play with, killing a reviving use this when you have a item that can be created several times.
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var COIN_POOL = 40;

//CLASS DEFINITION

var CoinGroupObject = (function (_Phaser$Group) {
	_inherits(CoinGroupObject, _Phaser$Group);

	function CoinGroupObject(game) {
		_classCallCheck(this, CoinGroupObject);

		_get(Object.getPrototypeOf(CoinGroupObject.prototype), 'constructor', this).call(this, game);
		this.coinSpeed = 200;
		this.enableBody = true;
		this.physicsBodyType = Phaser.Physics.ARCADE;
		this._generateCoins(game);
		this.setAll('outOfBoundsKill', true);
		this.setAll('checkWorldBounds', true);
		this.keepSpawning = true;
	}

	_createClass(CoinGroupObject, [{
		key: '_generateCoins',
		value: function _generateCoins(game) {
			//Your code will look neat and clean this way
			this.createMultiple(COIN_POOL, 'coin');
			this.setAll('anchor.x', 0.5);
			this.setAll('anchor.y', 0.5);
			this.setAll('position.x', 200);
			this.setAll('position.y', 200);
			this.forEach(function (_coin) {
				_coin.body.setSize(15, 15, -5, -4);
				_coin.animations.add('spin_w_shadow', [8, 9, 10, 11, 12, 13, 14, 15], 15, true);
				_coin.animations.add('spin_wo_shadow', [0, 1, 2, 3, 4, 5, 6, 7], 15, true);
				_coin.animations.play('spin_w_shadow');
				_coin.coinPickUp = game.add.audio('pickup');
				_coin.events.onKilled.add(function (coin) {
					//coin.coinPickUp.play();
				});
			});
		}
	}, {
		key: 'spawnCoins',
		value: function spawnCoins(amount) {
			if (this.keepSpawning) {
				for (var i = 0; i < amount; i++) {
					var coin = this.getFirstDead();
					if (coin) {
						coin.reset(600 + i * 15, 315);
						coin.frame = 1;
						coin.animations.play('spin_w_shadow');
						coin.body.velocity.x = -this.coinSpeed;
					}
				}
			}
		}
	}, {
		key: 'setCoinSpeed',
		value: function setCoinSpeed(speed) {
			this.coinSpeed = speed;
		}
	}, {
		key: 'addObstacle',
		value: function addObstacle(cordX) {
			var cont = 0;
			var pixels = 45;
			var limitL = cordX - pixels;
			var limitR = cordX + pixels;
			var log = "";
			this.forEach(function (coin) {
				var isLeft = coin.x <= cordX && coin.x >= limitL;
				var isRight = coin.x >= cordX && coin.x <= limitR;
				if (isLeft) {
					cont++;
					coin.y = coin.y - cont * 25;
					coin.animations.play('spin_wo_shadow');
					log += 'L: ' + cont + '\n';
				} else if (isRight) {
					cont--;
					coin.y = coin.y - cont * 25;
					if (cont != 0) {
						coin.animations.play('spin_wo_shadow');
					}
					log += 'R: ' + cont + '\n';
				} else if (isLeft && isRight) {
					cont++;
					coin.y = coin.y - cont * 25;
					coin.animations.play('spin_wo_shadow');
					log += 'C: ' + cont + '\n';
				}
			});
			// console.log(log);
		}
	}]);

	return CoinGroupObject;
})(Phaser.Group);

exports['default'] = CoinGroupObject;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EXPLOSION_POOL = 10;

var ExplosionGroupObject = (function (_Phaser$Group) {
	_inherits(ExplosionGroupObject, _Phaser$Group);

	function ExplosionGroupObject(game) {
		_classCallCheck(this, ExplosionGroupObject);

		_get(Object.getPrototypeOf(ExplosionGroupObject.prototype), 'constructor', this).call(this, game);
		this.explosionSpeed = 200;
		this.enableBody = true;
		this.physicsBodyType = Phaser.Physics.ARCADE;
		this._generateExplosions(game);
		this.setAll('frame', 80);
		this._lastAlive = null;
	}

	_createClass(ExplosionGroupObject, [{
		key: '_generateExplosions',
		value: function _generateExplosions(game) {
			this.createMultiple(EXPLOSION_POOL, 'explosion-sprite');
			// game.physics.arcade.enable(this);
			this.setAll('anchor.x', 0.5);
			this.setAll('anchor.y', 0.5);
			this.setAll('position.x', 200);
			this.setAll('position.y', 200);
			this.forEach(function (_explosion) {
				_explosion.animations.add('explode', [], null, false);
				_explosion.scale.setTo(1);
				_explosion.anchor.setTo(1, 1);
			});
		}
	}, {
		key: 'spawnExplosion',
		value: function spawnExplosion(spike) {
			// console.log(spike);
			var activeExplosion = this.getFirstDead();
			activeExplosion.reset(spike.x, spike.y);
			activeExplosion.body.velocity.x = -this.explosionSpeed;
			activeExplosion.animations.play('explode');
			// console.log(activeExplosion);
			this._lastAlive = activeExplosion;
		}
	}]);

	return ExplosionGroupObject;
})(Phaser.Group);

exports['default'] = ExplosionGroupObject;
module.exports = exports['default'];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var POW_POOL = 10;

var PowerUpObject = (function (_Phaser$Group) {
	_inherits(PowerUpObject, _Phaser$Group);

	function PowerUpObject(game) {
		_classCallCheck(this, PowerUpObject);

		_get(Object.getPrototypeOf(PowerUpObject.prototype), 'constructor', this).call(this, game);
		this.powSpeed = 100;
		this.enableBody = true;
		this.physicsBodyType = Phaser.Physics.ARCADE;
		this.setAll('outOfBoundsKill', true);
		this.setAll('checkWorldBounds', true);
		this._generatePow();
	}

	_createClass(PowerUpObject, [{
		key: '_generatePow',
		value: function _generatePow() {
			this.createMultiple(POW_POOL, 'diamond');
			this.setAll('anchor.x', 0.5);
			this.setAll('anchor.y', 0.5);
			this.setAll('position.x', 200);
			this.setAll('position.y', 200);
			this.forEach(function (_pow) {
				_pow.events.onKilled.add(function (pow) {});
			});
		}
	}, {
		key: 'spawnPow',
		value: function spawnPow() {
			var pow = this.getFirstDead();
			if (pow) {
				pow.reset(610, 200);
				console.log(pow.alive);
				pow.body.velocity.x = -this.powSpeed;
			}
		}
	}]);

	return PowerUpObject;
})(Phaser.Group);

exports['default'] = PowerUpObject;
module.exports = exports['default'];

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SPIKE_POOL = 20;

var SpikeObject = (function (_Phaser$Group) {
	_inherits(SpikeObject, _Phaser$Group);

	function SpikeObject(game) {
		_classCallCheck(this, SpikeObject);

		_get(Object.getPrototypeOf(SpikeObject.prototype), 'constructor', this).call(this, game);
		this.spikeSpeed = 200;
		this.enableBody = true;
		this.physicsBodyType = Phaser.Physics.ARCADE;
		this._generateSpikes(game);
		this.setAll('outOfBoundsKill', true);
		this.setAll('checkWorldBounds', true);
		this._lastAlive = null;
		this.keepSpawning = true;
	}

	_createClass(SpikeObject, [{
		key: '_generateSpikes',
		value: function _generateSpikes(game) {
			this.createMultiple(SPIKE_POOL, 'spike');
			this.setAll('anchor.x', 0.5);
			this.setAll('anchor.y', 0.5);
			this.setAll('position.x', 200);
			this.setAll('position.y', 200);
			this.forEach(function (_spike) {
				_spike.spikeCrash = game.add.audio('pickup');
				_spike.scale.setTo(0.15);
				_spike.anchor.setTo(1, 1);
				_spike.body.setSize(20, 38, -4.9, 0);
				_spike.events.onKilled.add(function (spike) {
					//coin.coinPickUp.play();
				});
			});
		}
	}, {
		key: 'spawnSpike',
		value: function spawnSpike() {
			if (this.keepSpawning) {
				var activeSpike = this.getFirstDead();
				activeSpike.reset(640, 330);
				activeSpike.body.velocity.x = -this.spikeSpeed;
				this._lastAlive = activeSpike;
			}
		}
	}, {
		key: 'setSpikeSpeed',
		value: function setSpikeSpeed(speed) {
			this.spikeSpeed = speed;
		}
	}]);

	return SpikeObject;
})(Phaser.Group);

exports['default'] = SpikeObject;
module.exports = exports['default'];

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UIObject = (function (_Phaser$Group) {
	_inherits(UIObject, _Phaser$Group);

	function UIObject(game) {
		_classCallCheck(this, UIObject);

		_get(Object.getPrototypeOf(UIObject.prototype), 'constructor', this).call(this, game);
		this._game = game;
	}

	_createClass(UIObject, [{
		key: 'createInGameUI',
		value: function createInGameUI(score) {
			this.powerTime = 15;
			this.textScore = this._game.add.text(20, 20, 'Score: ' + score, { fontSize: '32px', fill: 'rgb(50, 75, 84)' });
			this.textPow = this._game.add.text(450, 20, '', { fontSize: '32px', fill: '#FF0000' });
			this.textDieded = this._game.add.text(this._game.width / 2.9, this._game.height / 2.3, '', { fontSize: '70px', fill: '#FF0000' });
			this.add(this.textScore);
			this.add(this.textPow);
			this.add(this.textDieded);
			this.onNormal = new Phaser.Signal();
			this.filter = this._game.add.filter('Fire', 800, 600);
			this.filter.alpha = 0.0;
		}
	}, {
		key: 'updateScore',
		value: function updateScore(score) {
			this.textScore.text = 'Score: ' + score;
		}
	}, {
		key: 'setPow',
		value: function setPow() {
			if (this.powerTime >= 0) {
				this.textPow.text = 'Pow: ' + this.powerTime + 's';
				this.powerTime--;
				this.game.time.events.add(Phaser.Timer.SECOND * 1, this.setPow, this);
			} else {
				this.textPow.text = '';
				this.onNormal.dispatch(this);
			}
		}
	}, {
		key: 'setDieded',
		value: function setDieded() {
			this.textDieded.text = 'DIEDED';
		}
	}, {
		key: 'activateFilter',
		value: function activateFilter() {
			this.background = this._game.add.sprite(0, 0);
			this.background.width = 800;
			this.background.height = 600;
			this.background.filters = [this.filter];
		}
	}, {
		key: 'removeFilter',
		value: function removeFilter() {
			this.background.filters = null;
		}
	}, {
		key: 'update',
		value: function update() {
			// if(this.filter){
			// 	this.filter.update();
			// }
		}
	}, {
		key: 'addQuake',
		value: function addQuake(game) {
			// define the camera offset for the quake
			var rumbleOffset = 5;

			// we need to move according to the camera's current position
			var properties = {
				x: game.camera.x - rumbleOffset,
				y: game.camera.y + rumbleOffset
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

			var quake = game.add.tween(this).to(properties, duration, ease, autoStart, delay, 10, yoyo);

			// we're using this line for the example to run indefinitely
			// quake.onComplete.addOnce(this.addQuake);

			// let the earthquake begins
			quake.start();
		}
	}, {
		key: 'createGameOverUI',
		value: function createGameOverUI() {}
	}]);

	return UIObject;
})(Phaser.Group);

exports['default'] = UIObject;
module.exports = exports['default'];

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WorldGroupObject = (function (_Phaser$Group) {
	_inherits(WorldGroupObject, _Phaser$Group);

	function WorldGroupObject(game) {
		_classCallCheck(this, WorldGroupObject);

		_get(Object.getPrototypeOf(WorldGroupObject.prototype), 'constructor', this).call(this, game);
		this.enableBody = true;
		this.bg = game.add.tileSprite(0, 0, game.stage.width, 360, 'city');
		this.ground = this.create(game.stage.width, game.stage.height, 'ground');
		this.ground.body.immovable = true;
		this.ground.anchor.setTo(1, 1);
		this.ground.body.setSize(this.game.stage.width, 90, 0, 30);
		this.add(this.bg);
		this.add(this.ground);
		this.tileSpeed = 1;
	}

	_createClass(WorldGroupObject, [{
		key: 'setTileSpeed',
		value: function setTileSpeed(speed) {
			this.tileSpeed = speed;
		}
	}, {
		key: 'update',
		value: function update() {
			this.bg.tilePosition.x -= this.tileSpeed;
		}
	}]);

	return WorldGroupObject;
})(Phaser.Group);

exports['default'] = WorldGroupObject;
module.exports = exports['default'];

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BootState = (function (_Phaser$State) {
	_inherits(BootState, _Phaser$State);

	function BootState() {
		_classCallCheck(this, BootState);

		_get(Object.getPrototypeOf(BootState.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(BootState, [{
		key: 'preload',
		value: function preload() {
			this.game.load.image('progressBar', 'assets/images/progress_Bar.png');
		}
	}, {
		key: 'create',
		value: function create() {
			this.game.state.start('PreLoadState');
		}
	}, {
		key: 'init',
		value: function init() {
			this.input.maxPointers = 1;
			this.stage.disableVisibilityChange = true;
			this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.game.scale.pageAlignHorizontally = true;
			this.game.scale.pageAlignVertically = true;
		}
	}]);

	return BootState;
})(Phaser.State);

exports['default'] = BootState;
module.exports = exports['default'];

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _objectsUIObject = require('../objects/UIObject');

var _objectsUIObject2 = _interopRequireDefault(_objectsUIObject);

var GameOverState = (function (_Phaser$State) {
	_inherits(GameOverState, _Phaser$State);

	function GameOverState() {
		_classCallCheck(this, GameOverState);

		_get(Object.getPrototypeOf(GameOverState.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(GameOverState, [{
		key: 'create',
		value: function create() {
			this.ui = new _objectsUIObject2['default'](this.game, 0);
		}
	}, {
		key: 'update',
		value: function update() {}
	}]);

	return GameOverState;
})(Phaser.State);

exports['default'] = GameOverState;
module.exports = exports['default'];

},{"../objects/UIObject":7}],11:[function(require,module,exports){
//IMPORTS
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _objectsExplosionGroupObject = require('../objects/ExplosionGroupObject');

var _objectsExplosionGroupObject2 = _interopRequireDefault(_objectsExplosionGroupObject);

var _objectsWorldGroupObject = require('../objects/WorldGroupObject');

var _objectsWorldGroupObject2 = _interopRequireDefault(_objectsWorldGroupObject);

var _objectsCoinGroupObject = require('../objects/CoinGroupObject');

var _objectsCoinGroupObject2 = _interopRequireDefault(_objectsCoinGroupObject);

var _objectsSpikeObject = require('../objects/SpikeObject');

var _objectsSpikeObject2 = _interopRequireDefault(_objectsSpikeObject);

var _objectsPowerUpObject = require('../objects/PowerUpObject');

var _objectsPowerUpObject2 = _interopRequireDefault(_objectsPowerUpObject);

var _objectsCatObject = require('../objects/CatObject');

var _objectsCatObject2 = _interopRequireDefault(_objectsCatObject);

var _objectsUIObject = require('../objects/UIObject');

var _objectsUIObject2 = _interopRequireDefault(_objectsUIObject);

//CONSTANTS
var COIN_MIN = 13;
var COIN_MAX = 23;
var TIME_COIN_MIN = 5;
var TIME_COIN_MAX = 8;
var TIME_SPIKE_MIN = 5;
var TIME_SPIKE_MAX = 8;
//STATE DEFINITION
var THISGAME = null;

var GameState = (function (_Phaser$State) {
	_inherits(GameState, _Phaser$State);

	function GameState() {
		_classCallCheck(this, GameState);

		_get(Object.getPrototypeOf(GameState.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(GameState, [{
		key: 'create',
		value: function create() {
			// let neonate = this.game.add.neonate();
			var spawnSpikesTime = Math.floor(Math.random() * (TIME_SPIKE_MAX - TIME_SPIKE_MIN) + TIME_SPIKE_MIN);
			this.game.world.setBounds(0, 0, 1100, 360);
			this.declareVariables();
			this.createControls();
			this.createObjects();
			this.game.time.events.add(Phaser.Timer.SECOND * 1, this.manageCoins, this);
			this.game.time.events.add(Phaser.Timer.SECOND * 1.2, this.manageSpike, this);
			this.game.world.camera.position.set(0);
			this.ui.onNormal.add(this.endPow, this);
			THISGAME = this;
			this.player.playerDead.add(function () {
				if (THISGAME.dieOnce) {
					// THISGAME.world.setTileSpeed(0);
					THISGAME.dieOnce = false;
					THISGAME.game.state.start('GameOverState');
				}
			});
		}
	}, {
		key: 'createObjects',
		value: function createObjects() {
			this.world = new _objectsWorldGroupObject2['default'](this.game);
			this.coins = new _objectsCoinGroupObject2['default'](this.game);
			this.ui = new _objectsUIObject2['default'](this.game);
			this.pows = new _objectsPowerUpObject2['default'](this.game);
			this.explosions = new _objectsExplosionGroupObject2['default'](this.game);
			this.spikes = new _objectsSpikeObject2['default'](this.game);
			this.player = new _objectsCatObject2['default'](this.game);
			this.ui.createInGameUI(0);
		}
	}, {
		key: 'declareVariables',
		value: function declareVariables() {
			this.score = 0;
			this.flag = true;
			this.dieOnce = true;
			this.spawnCoinsTime = 7;
			this.flagCoinUpdate = true;
		}
	}, {
		key: 'createControls',
		value: function createControls() {
			this.controls = this.game.input.keyboard.addKeys({
				'Q': Phaser.Keyboard.Q,
				'A': Phaser.Keyboard.A,
				'up': Phaser.Keyboard.UP,
				'down': Phaser.Keyboard.DOWN,
				'space': Phaser.Keyboard.SPACEBAR
			});
		}
	}, {
		key: 'manageCoins',
		value: function manageCoins() {
			this.coinAmount = Math.floor(Math.random() * (COIN_MAX - COIN_MIN) + COIN_MIN);
			this.coins.spawnCoins(this.coinAmount);
			var spawnCoinsTime = Math.floor(Math.random() * (TIME_COIN_MAX - TIME_COIN_MIN) + TIME_COIN_MIN);
			this.game.time.events.add(Phaser.Timer.SECOND * spawnCoinsTime, this.manageCoins, this);
		}
	}, {
		key: 'manageSpike',
		value: function manageSpike() {
			this.spikes.spawnSpike();
			var spawnSpikesTime = Math.floor(Math.random() * (TIME_SPIKE_MAX - TIME_SPIKE_MIN) + TIME_SPIKE_MIN);
			this.game.time.events.add(Phaser.Timer.SECOND * spawnSpikesTime, this.manageSpike, this);
		}
	}, {
		key: 'collectCoins',
		value: function collectCoins(player, coin) {
			coin.kill();
			this.score++;
			//coin.coinPickUp.play();
			this.ui.updateScore(this.score);
			if (!this.flagCoinUpdate) {
				this.flagCoinUpdate = true;
			}
		}
	}, {
		key: 'activatePow',
		value: function activatePow(player, pow) {
			pow.kill();
			this.ui.setPow();
			this.player.powerUp = true;
			this.player.changeScale();
			this.ui.activateFilter();
		}
	}, {
		key: 'endPow',
		value: function endPow() {
			this.player.powerUp = false;
			this.player.changeScale();
			this.ui.removeFilter();
		}
	}, {
		key: 'crashSpike',
		value: function crashSpike(player, spike) {
			if (this.player.powerUp) {
				this.explosions.spawnExplosion(spike);
				spike.kill();
			} else {
				this.spikes.keepSpawning = false;
				this.coins.keepSpawning = false;
				this.coins.callAll('kill');
				this.spikes.callAll('kill');
				this.world.setTileSpeed(0);
				this.coins.setCoinSpeed(50);
				this.spikes.setSpikeSpeed(50);
				this.player.killPlayer();
				this.ui.setDieded();
				this.ui.addQuake(this.game);
			}
		}
	}, {
		key: 'updateCoinsPosition',
		value: function updateCoinsPosition(coin, spike) {
			if (this.flagCoinUpdate) {
				this.flagCoinUpdate = false;
				this.coins.addObstacle(spike.x);
			}
		}

		//In this update we only define what will happen in the collisions of the objects
	}, {
		key: 'update',
		value: function update() {
			//this.game.world.bringToTop(this.player);
			this.game.physics.arcade.collide(this.player, this.world);

			this.game.physics.arcade.overlap(this.coins, this.spikes, this.updateCoinsPosition, null, this);
			this.game.physics.arcade.overlap(this.player, this.coins, this.collectCoins, null, this);
			this.game.physics.arcade.overlap(this.player, this.spikes, this.crashSpike, null, this);
			this.game.physics.arcade.overlap(this.player, this.pows, this.activatePow, null, this);

			this.player.pressingUp = this.controls.up.isDown;
			this.player.pressingDown = this.controls.down.isDown;
			this.player.pressingSpace = this.controls.space.isDown;
			if (this.controls.Q.isDown && this.flag) {
				this.pows.spawnPow();
				this.flag = false;
			}
			// if(this.controls.Q.isUp && !this.flag){
			// 	this.flag = true;
			// } 
			if (this.controls.A.isDown && this.flag) {
				console.log(this.game.camera);
				this.ui.addQuake(this.game);
				this.flag = false;
			}
			// if(this.controls.A.isUp && !this.flag){
			// 	this.flag = true;
			// }
		}
	}, {
		key: 'render',
		value: function render() {
			// this.coins.forEachAlive(this.renderGroup, this);
			// if(this.spikes._lastAlive){
			// this.game.debug.body(this.world.ground);
			// }
		}
	}, {
		key: 'renderGroup',
		value: function renderGroup(member) {
			this.game.debug.body(member);
		}
	}]);

	return GameState;
})(Phaser.State);

exports['default'] = GameState;
module.exports = exports['default'];

},{"../objects/CatObject":2,"../objects/CoinGroupObject":3,"../objects/ExplosionGroupObject":4,"../objects/PowerUpObject":5,"../objects/SpikeObject":6,"../objects/UIObject":7,"../objects/WorldGroupObject":8}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PreLoadState = (function (_Phaser$State) {
    _inherits(PreLoadState, _Phaser$State);

    function PreLoadState() {
        _classCallCheck(this, PreLoadState);

        _get(Object.getPrototypeOf(PreLoadState.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(PreLoadState, [{
        key: 'preload',
        value: function preload() {
            this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 30, '0%', { fill: 'white' });
            this.progress.anchor.setTo(0.5, 0.5);

            // Show progress bar
            var progressBar = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'progressBar');
            progressBar.anchor.setTo(0.5, 0.5);
            this.game.load.setPreloadSprite(progressBar);

            // Set callbacks
            this.game.load.onLoadStart.add(this.loadStart, this);
            this.game.load.onFileComplete.add(this.fileComplete, this);
            this.game.load.onLoadComplete.add(this.loadComplete, this);

            // Load all assets      
            this.game.load.image('spike', 'assets/images/spike.png');
            this.game.load.image('ground', 'assets/images/ground.png');
            this.game.load.audio('pickup', 'assets/sounds/pickup.wav');
            this.game.load.image('diamond', 'assets/images/diamond.png');
            this.game.load.image('city', 'assets/images/game_bg_city.png');
            this.game.load.audio('explosion', 'assets/sounds/explosion.wav');
            this.game.load.audio('explosion3', 'assets/sounds/explosion3.wav');
            this.game.load.audio('explosion2', 'assets/sounds/explosion2.wav');
            this.game.load.spritesheet('player', 'assets/images/cat.png', 100, 0, 19);
            this.game.load.spritesheet('coin', 'assets/images/coin_copper.png', 32, 0, 16);
            this.game.load.spritesheet('fire-beam', 'assets/images/Fireball.png', 48, 0, 2);
            this.game.load.spritesheet('explosion-sprite', 'assets/images/explosion.png', 100, 100, 81);
            this.game.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/Fire.js');
        }
    }, {
        key: 'fileComplete',
        value: function fileComplete(progress) {
            this.progress.text = progress + '%';
            //console.log(this.progress.text);
        }
    }, {
        key: 'loadStart',
        value: function loadStart() {}
    }, {
        key: 'loadComplete',
        value: function loadComplete() {
            this.game.state.start('GameState');
        }
    }]);

    return PreLoadState;
})(Phaser.State);

exports['default'] = PreLoadState;
module.exports = exports['default'];

},{}]},{},[1])
//# sourceMappingURL=game.js.map
