var demo = {};

var centerX,
  centerY,
  gameWidth,
  gameHeight;

var startButton,
  demoButton;

var gameVersion;

demo.menu = function () { };
demo.menu.prototype = {
  preload: function () {
    this.load.image('button', gameSettings.blueButton);
    this.load.image('background', gameSettings.background);
  },
  create: function () {

    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    gameWidth = game.world.width;
    gameHeight = game.world.height;

    var centerX = game.world.centerX,
      centerY = game.world.centerY;

    this.add.image(0, 0, 'background');

    this.menuStyle = { font: 'Montserrat', fontSize: '32px', fill: '#000000' }

    startButton = game.add.button(centerX, centerY - 100, 'button', startGame);
    startButton.anchor.setTo(0.5, 0.5);
    startGameTxt = game.add.text(centerX, centerY - 100, 'Play Game', this.menuStyle)
    startGameTxt.anchor.setTo(.5, .5);
    startGameTxt.stroke = '#000000';
    // startGameTxt.strokeThickness = 3;

    demoButton = game.add.button(centerX, centerY - 25, 'button', startDemo);
    demoButton.anchor.setTo(0.5, 0.5);
    this.startDemo = this.add.text(centerX, centerY - 25, 'Play Demo', this.menuStyle).anchor.setTo(.5, .5);

    tutorial = game.add.button(centerX, centerY + 50, 'button', startTutorial);
    tutorial.anchor.setTo(0.5, 0.5);
    this.startTutorial = this.add.text(centerX, centerY + 50, 'Tutorial', this.menuStyle).anchor.setTo(.5, .5);
  },
};

function startGame() {
  changeState(null, 'playGame');
  gameVersion = true;
  console.log("//////////////////////////////////////////////////////");
  console.log("Scene changed to: PlayGame");
}

function startDemo() {
  changeState(null, 'playGame');
  gameVersion = false;
  console.log("//////////////////////////////////////////////////////");
  console.log("Scene changed to: DemoMode");
}

function startTutorial() {
  changeState(null, 'instructions');
  console.log("//////////////////////////////////////////////////////");
  console.log("Scene changed to: Instructions");
}