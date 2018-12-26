var demo = {};

var centerX = 800 / 2,
    centerY = 600 / 2,
    gameWidth = 800,
    gameHeight = 600;

var startButton,
    demoButton;


demo.menu = function () { };
demo.menu.prototype = {
  preload: function () {
    game.load.image('button', gameSettings.blueButton);
  },
  create: function () {

    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    startButton = game.add.button(centerX, centerY - 100, 'button', startGame)
    startButton.anchor.setTo(0.5, 0.5);
    this.add.text(centerX, centerY - 100, 'Play Game').anchor.setTo(.5,.5);

    demoButton = game.add.button(centerX, centerY - 25, 'button', startDemo)
    demoButton.anchor.setTo(0.5, 0.5);
    this.add.text(centerX, centerY - 25, 'Play Demo').anchor.setTo(.5,.5);

    tutorial = game.add.button(centerX, centerY + 50, 'button', startTutorial)
    tutorial.anchor.setTo(0.5, 0.5);
    this.add.text(centerX, centerY + 50, 'Tutorial').anchor.setTo(.5,.5);

    

  },
  update: function () {

  }
};

function startGame() {
  changeState(null, 'playGame')
  console.log("start game");
}

function startDemo() {
  changeState(null, 'demoMode');
  console.log("start demo");
}

function startTutorial(){
  changeState(null, 'instructions');
  console.log("start tutorial");
}