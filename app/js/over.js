var OverState = function (game) {};

OverState.prototype = {
    preload: function () {
        this.game.load.image('diamond', 'assets/images/diamond.png');
        
    },
    
    create: function () {
        var title = this.game.add.text(300, 140, 'GAME OVER!', { fontSize: '40px', fill: '#fff' });
        var subtitle = this.game.add.text(300, 200, 'Press diamond to restart', { fontSize: '16px', fill: '#fff' });
        
        var button = this.game.add.button(300, 260, 'diamond', this.pressButton, this);
        button.anchor.setTo(0.5, 0.5);
        title.anchor.setTo(0.5, 0.5);
        subtitle.anchor.setTo(0.5, 0.5);
    },
    
    pressButton: function () {
        //console.log('lel');
        this.game.state.start('IngameState');
    }
};