var game = new Phaser.Game(800, 600, Phaser.AUTO);
game.parent = 'game-container';
game.transparent = true;
game.resolution = window.devicePixelRatio;

var gameSettings = {
    showRightMovements: true,
    fishSprite: './assets/player/fishSprite.png',
    fishHeight: 110,
    fishWidth: 347,
    backButton: './assets/view/back-button.png',
    upKey: './assets/view/upKey.png',
    downKey: './assets/view/downKey.png',
    leftKey: './assets/view/leftKey.png',
    rightKey: './assets/view/rightKey.png',
    blueArrow: './assets/view/blueArrow.png',
    background: './assets/view/background.jpg',
    tutorialArrow: './assets/view/arrowInfo.png',
    blueButton: './assets/view/button2.png',
    velocity: 1,
    gameWidth: 800,
    gameHeight: 600
}

game.state.add('menu', demo.menu);
game.state.add('demoMode', demo.demoMode);
game.state.add('instructions', demo.instructions);
game.state.add('playGame', demo.playGame);
game.state.start('menu');