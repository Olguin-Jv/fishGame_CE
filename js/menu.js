var demo = {};

var gameVersion;

var centerX,
  centerY,
  gameWidth,
  gameHeight;

var tabletOrientation;


demo.menu = function () { };
demo.menu.prototype = {
  preload: function () {
    this.load.image('button', gameSettings.blueButton);
    this.load.image('background', gameSettings.background);
  },
  create: function () {

    refreshCoordinates()

    function readDeviceOrientationMenu() {
      resizeCanvas();
      refreshCoordinates()
    }

    if (userDevice == "Smartphone") {
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    }
    if (userDevice != "Smartphone") {
      game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
      resizeCanvas();
    }

    if (game.renderType !== Phaser.WEBGL) {
      showRotate();
      alert('Este dispositivo no soporta WebGL. Se recomienda jugar en portrait mode')
    };

    window.onorientationchange = readDeviceOrientationMenu;


    this.bkg = this.add.image(centerX, centerY, 'background');
    this.bkg.anchor.setTo(.5);

    this.menuStyle = { font: 'Montserrat', fontSize: '32px', fill: '#000000' }

    this.startBtn = game.add.button(centerX, centerY - 100, 'button', startGame);
    this.startBtn.anchor.setTo(0.5, 0.5);
    this.startTxt = game.add.text(centerX, centerY - 100, 'Play Game', this.menuStyle)
    this.startTxt.anchor.setTo(.5, .5);

    this.demoBtn = game.add.button(centerX, centerY - 25, 'button', startDemo);/* */
    this.demoBtn.anchor.setTo(0.5, 0.5);
    this.demoTxt = this.add.text(centerX, centerY - 25, 'Play demo', this.menuStyle);
    this.demoTxt.anchor.setTo(.5, .5);

    this.tutorialBtn = game.add.button(centerX, centerY + 50, 'button', startTutorial);
    this.tutorialBtn.anchor.setTo(0.5, 0.5);
    this.tutorialTxt = this.add.text(centerX, centerY + 50, 'Tutorial', this.menuStyle)
    this.tutorialTxt.anchor.setTo(.5, .5);

  },
  resize: function () {

    refreshCoordinates();

    this.bkg.x = centerX;
    this.bkg.y = centerY;

    this.startBtn.x = centerX;
    this.startBtn.y = centerY - 100;
    this.startTxt.x = centerX;
    this.startTxt.y = centerY - 100;

    this.demoBtn.x = centerX;
    this.demoBtn.y = centerY - 25;
    this.demoTxt.x = centerX;
    this.demoTxt.y = centerY - 25;

    this.tutorialBtn.x = centerX;
    this.tutorialBtn.y = centerY + 50;
    this.tutorialTxt.x = centerX;
    this.tutorialTxt.y = centerY + 50;

  }
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
  pageNum = 1;
  console.log("//////////////////////////////////////////////////////");
  console.log("Scene changed to: Instructions");
}
