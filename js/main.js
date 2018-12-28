var gameX,
	gameY,
	showControls = false;


if (!window.orientation) {
	gameX = 800;
	gameY = 600;
}
if (window.orientation == 0 || window.orientation == 90 || window.orientation == -90) {
	gameX = 420;
	gamey = 500;
	showControls = true;
}

var game = new Phaser.Game(gameX, gameY, Phaser.AUTO);
game.parent = 'game-container';
game.transparent = true;

//this cause issues in mobile devices
game.resolution = window.devicePixelRatio / window.devicePixelRatio;

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
	movementAlert: './assets/view/01_640x332.png',
	velocity: 1,
	gameWidth: 800,
	gameHeight: 600
}

game.state.add('menu', demo.menu);
game.state.add('instructions', demo.instructions);
game.state.add('playGame', demo.playGame);
game.state.start('playGame');