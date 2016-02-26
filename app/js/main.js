var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'gameDiv');

game.state.add('IngameState', IngameState);
game.state.add('BootState', BootState);
game.state.start('IngameState');