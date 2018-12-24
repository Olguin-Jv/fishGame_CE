var game = new Phaser.Game(800, 600, Phaser.AUTO);
game.parent = 'game-container';
game.transparent = true;

var gameSettings = {
    showRightMovements: true,
    fishSprite: './assets/player/fishSprite.png',
    fishHeight: 110,
    fishWidth: 347,
    backButton: './assets/view/back-button.png',
    velocity: 1,
    gameWidth: 800,
    gameHeight: 600
}

game.state.add('menu', demo.menu);
game.state.add('demoMode', demo.demoMode);
game.state.add('playGame', demo.playGame);
game.state.start('menu');