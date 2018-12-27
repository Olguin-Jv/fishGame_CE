var demo = {};

var centerX = 800 / 2,
  centerY = 600 / 2,
  gameWidth = 800,
  gameHeight = 600;

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

    this.add.image(0, 0, 'background');

    startButton = game.add.button(centerX, centerY - 100, 'button', startGame);
    startButton.anchor.setTo(0.5, 0.5);
    this.startGame = this.add.text(centerX, centerY - 100, 'Play Game').anchor.setTo(.5, .5);

    demoButton = game.add.button(centerX, centerY - 25, 'button', startDemo);
    demoButton.anchor.setTo(0.5, 0.5);
    this.startDemo = this.add.text(centerX, centerY - 25, 'Play Demo').anchor.setTo(.5, .5);

    tutorial = game.add.button(centerX, centerY + 50, 'button', startTutorial);
    tutorial.anchor.setTo(0.5, 0.5);
    this.startTutorial = this.add.text(centerX, centerY + 50, 'Tutorial').anchor.setTo(.5, .5);
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