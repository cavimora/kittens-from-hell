var game = new Phaser.Game(783, 390, Phaser.AUTO, 'gameDiv');

game.state.add('IngameState', IngameState);
game.state.add('BootState', BootState);
game.state.add('OverState', OverState);
game.state.start('IngameState');