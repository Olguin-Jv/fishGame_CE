//fondo
var prof1, prof1_wave,
  prof2, prof2_wave,
  prof3, prof3_wave,
  prof4, prof4_wave,
  algaLeft,
  algaRight, algaRightMove,
  canResize = false;

//sprites
var arrow, fish1, fish2, fish3, fish4, movAlert;

//lógica
var directionOrdered = "none",
  viewDirection,
  rightMovement,
  levelStats,
  gameStatus = false,
  canMove = false,
  fade = false,
  index,
  color;

//text
var cardNumber,
  aciertos,
  levelLenght,
  movementChecker,
  userInput,
  cantAciertos,
  endGameTXT;

//text style
var style,
  txtEndGameStyle;

//teclas en pantalla
var upKeyX,
  upKeyY,
  buttonUp,
  buttonDown,
  buttonLeft,
  buttonRight;

// ui
var uiVisible;

demo.playGame = function () { };

demo.playGame.prototype = {
  preload: function () {

    game.load.image('algaLeft', './assets/view/alga2.png');
    game.load.image('algaRight', './assets/view/alga.png');
    game.load.image('prof1', './assets/view/profundidad1.png');
    game.load.image('prof2', './assets/view/profundidad2.png');
    game.load.image('prof3', './assets/view/profundidad3.png');
    game.load.image('prof4', './assets/view/profundidad4.png');
    game.load.image('backButton', gameSettings.btn_blue);

    game.load.image('downKey', gameSettings.blueKeyDown);
    game.load.image('leftKey', gameSettings.blueKeyLeft);
    game.load.image('rightKey', gameSettings.blueKeyRight);
    game.load.image('gameBkg', gameSettings.gameBackground);

    game.load.spritesheet('movementAlert', gameSettings.movementAlert, 320, 332, 2);
    game.load.spritesheet('fish', gameSettings.fishSprite, 110, 347, 2);

    game.load.atlas('fishAtlas', './assets/player/spritesheet.png', './assets/player/sprites.json')

    txtEndGameStyle = { font: 'Staatliches', fontSize: '60px', fill: '#004bc4' }
    txtInfoStyle = { font: 'Staatliches', fontSize: '20px', fill: '#004bc4' }
  },

  create: function () {

    this.stage.disableVisibilityChange = true;

    refreshCoordinates()

    function readDeviceOrientationMenu() {
      resizeCanvas();
      refreshCoordinates();
    }

    window.onorientationchange = readDeviceOrientationMenu;

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

    uiVisible = false;

    this.gameBkg = this.add.image(centerX, centerY, 'gameBkg');
    this.gameBkg.alpha = .7;
    this.gameBkg.anchor.setTo(.5);

    algaLeft = game.add.image(90, 0, 'algaLeft');
    algaLeft.anchor.setTo(0.5, 0);
    algaLeft.scale.setTo(0.3, 0.3);

    var algaLeftIn = game.add.tween(algaLeft).from({ x: -200 }, 1000, "Bounce");
    algaLeftIn.onComplete.add(algaLeftOn, this);
    algaLeftIn.start();
    function algaLeftOn() {
      game.add.tween(algaLeft).to({ x: '+12', angle: -6 }, 3500, 'Bounce.easeInOut', true, 0, -1, true);
    }

    algaRight = game.add.image(game.world.width - 90, game.world.height + 5, 'algaRight');
    algaRight.anchor.setTo(0.5, 1);
    algaRight.scale.setTo(0.35, 0.35);

    var algaRightIn = game.add.tween(algaRight);
    algaRightIn.from({ x: game.world.width + 200 }, 1000, "Bounce");
    algaRightIn.onComplete.add(algaRightOn, this);
    algaRightIn.start();
    function algaRightOn() {
      algaRightMove = game.add.tween(algaRight).to({ angle: -6 }, 4000, 'Bounce.easeInOut', true, 0, -1, true);
    };

    prof1 = game.add.image(centerX, centerY, 'prof1');
    prof1.alpha = 0;
    prof1.anchor.setTo(0.5, 0.5);
    var prof1In = game.add.tween(prof1).to({ alpha: 1 }, 1000, "Linear", false, 500, 0, false);
    prof1In.onComplete.add(prof1_move, this);
    prof1In.start();
    function prof1_move() {
      prof1_wave = game.add.tween(prof1).to({ angle: -6 }, 15000, "Bounce.easeInOut", true, 0, -1, true)
    }

    prof2 = game.add.image(centerX, centerY, 'prof2');
    prof2.alpha = 0;
    prof2.anchor.setTo(0.5, 0.5);
    var prof2In = game.add.tween(prof2).to({ alpha: 1 }, 1000, "Linear", false, 1000, 0, false);
    prof2In.onComplete.add(prof2_move, this);
    prof2In.start();
    function prof2_move() {
      prof2_wave = game.add.tween(prof2).to({ angle: -7 }, 15000, "Bounce.easeInOut", true, 1000, -1, true)
    }

    prof3 = game.add.image(centerX, centerY, 'prof3');
    prof3.alpha = 0;
    prof3.anchor.setTo(0.5, 0.5);
    var prof3In = game.add.tween(prof3).to({ alpha: 1 }, 1000, "Linear", false, 1500, 0, false);
    prof3In.onComplete.add(prof3_move, this);
    prof3In.start();
    function prof3_move() {
      prof3_wave = game.add.tween(prof3).to({ angle: -6 }, 15000, "Bounce.easeInOut", true, 2000, -1, true)
    }

    prof4 = game.add.image(centerX, centerY, 'prof4');
    prof4.alpha = 0;
    prof4.anchor.setTo(0.5, 0.5);
    var prof4In = game.add.tween(prof4).to({ alpha: 1 }, 1000, "Linear", false, 2000, 0, false);
    prof4In.onComplete.add(prof4_move, this);
    prof4In.start();
    function prof4_move() {
      prof4_wave = game.add.tween(prof4).to({ angle: 6 }, 15000, "Bounce.easeInOut", true, 3000, -1, true);
      console.log('Preparing PlayGame');
      canResize = true;
      start();
    }

    fish1 = game.add.sprite(centerX, centerY, 'fishAtlas');
    fish1.animations.add('f1_orange', Phaser.Animation.generateFrameNames('pez', 1, 6), 5, true);
    fish1.animations.add('f1_blue', Phaser.Animation.generateFrameNames('pez', 7, 12), 5, true);
    fish1.alpha = 0;
    fish1.anchor.setTo(.5, .5);
    fish1.scale.setTo(.5);

    fish2 = game.add.sprite(centerX, centerY, 'fishAtlas');
    fish2.animations.add('f2_orange', Phaser.Animation.generateFrameNames('pez', 1, 6), 5, true);
    fish2.animations.add('f2_blue', Phaser.Animation.generateFrameNames('pez', 7, 12), 5, true);
    fish2.alpha = 0;
    fish2.anchor.setTo(.5, .5);
    fish2.scale.setTo(.2);

    fish3 = game.add.sprite(centerX, centerY, 'fishAtlas');
    fish3.animations.add('f3_orange', Phaser.Animation.generateFrameNames('pez', 1, 6), 5, true);
    fish3.animations.add('f3_blue', Phaser.Animation.generateFrameNames('pez', 7, 12), 5, true);
    fish3.alpha = 0;
    fish3.anchor.setTo(.5, .5);
    fish3.scale.setTo(.4);

    fish4 = game.add.sprite(centerX, centerY, 'fishAtlas');
    fish4.animations.add('f4_orange', Phaser.Animation.generateFrameNames('pez', 1, 6), 5, true);
    fish4.animations.add('f4_blue', Phaser.Animation.generateFrameNames('pez', 7, 12), 5, true);
    fish4.alpha = 0;
    fish4.anchor.setTo(.5, .5);
    fish4.scale.setTo(.3);

    fish5 = game.add.sprite(centerX, centerY, 'fishAtlas');
    fish5.animations.add('f5_orange', Phaser.Animation.generateFrameNames('pez', 1, 6), 5, true);
    console.log(Phaser.Animation.generateFrameNames('pez', 1, 6));
    fish5.animations.add('f5_blue', Phaser.Animation.generateFrameNames('pez', 7, 12), 5, true);
    fish5.alpha = 0;
    fish5.anchor.setTo(.5, .5);
    fish5.scale.setTo(.3);

    fish6 = game.add.sprite(centerX, centerY, 'fishAtlas');
    fish6.animations.add('f6_orange', Phaser.Animation.generateFrameNames('pez', 1, 6), 5, true);
    fish6.animations.add('f6_blue', Phaser.Animation.generateFrameNames('pez', 7, 12), 5, true);
    fish6.alpha = 0;
    fish6.anchor.setTo(.5, .5);
    fish6.scale.setTo(.4);

    cardNumber = game.add.text(gameWidth * .08, gameHeight * .055, '', globalStyle);
    movementChecker = game.add.text(gameWidth * .08, gameHeight * .1, '', globalStyle);
    aciertos = game.add.text(gameWidth * .73, gameHeight * .055, '', globalStyle);

    endGameTXT = game.add.text(game.world.centerX, -300, 'Fin del juego', txtEndGameStyle);
    endGameTXT.anchor.setTo(.5, .5);
    endGameTXT.stroke = '#7fb0ff';
    endGameTXT.strokeThickness = 6;
    endGameTXT.alpha = 0;

    backButton = game.add.button(gameWidth * .2, gameHeight * .8, 'backButton', backToMenu);
    backButton.anchor.setTo(.5);
    backButtonTxt = this.add.text(gameWidth * .2, gameHeight * .8, 'Volver al menú', globalStyle);
    backButtonTxt.anchor.setTo(.5, .4);

    if (showControls) {

      upKeyX = centerX;
      upKeyY = gameHeight * .8;

      if (userDevice == "Tablet" && tabletOrientation == 'Landscape') {
        upKeyX = gameWidth * .8;
        upKeyY = gameHeight * .7;
        console.log('tablet land')
      }

      buttonUp = this.add.button(upKeyX, upKeyY, 'downKey', pressUp);
      buttonUp.angle = 180;
      buttonUp.anchor.setTo(.5, .5);
      buttonUp.scale.setTo(.7);

      buttonDown = this.add.button(upKeyX, upKeyY + 75, 'downKey', pressDown);
      buttonDown.anchor.setTo(.5, .5);
      buttonDown.scale.setTo(.7);

      buttonLeft = this.add.button(upKeyX - 71, upKeyY + 75, 'leftKey', pressLeft);
      buttonLeft.anchor.setTo(.5, .5);
      buttonLeft.scale.setTo(.7);

      buttonRight = this.add.button(upKeyX + 71, upKeyY + 75, 'rightKey', pressRight);
      buttonRight.anchor.setTo(.5, .5);
      buttonRight.scale.setTo(.7);
    }

    var keyW = game.input.keyboard.addKey(Phaser.Keyboard.W);
    keyW.onDown.add(pressUp, this);

    var keyS = game.input.keyboard.addKey(Phaser.Keyboard.S);
    keyS.onDown.add(pressDown, this);

    var keyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
    keyA.onDown.add(pressLeft, this);

    var keyD = game.input.keyboard.addKey(Phaser.Keyboard.D);
    keyD.onDown.add(pressRight, this);

    var keyUp = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    keyUp.onDown.add(pressUp, this);

    var keyDown = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    keyDown.onDown.add(pressDown, this);

    var keyLeft = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    keyLeft.onDown.add(pressLeft, this);

    var keyRight = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    keyRight.onDown.add(pressRight, this);



    movAlert = game.add.sprite(centerX, centerY, 'movementAlert');
    movAlert.anchor.setTo(.5, .5);
    movAlert.scale.setTo(.4);
    movAlert.alpha = 0;

    function readDeviceOrientationGame() {

      if (userDevice == 'Tablet' && game.renderType === Phaser.WEBGL && Math.abs(window.orientation) !== 0) {
        // Landscape
        refreshCoordinates();
        resizeCanvas();
        tabletOrientation = 'Landscape';
      } else if (userDevice == 'Tablet' && game.renderType === Phaser.WEBGL && Math.abs(window.orientation) == 0) {
        // Portrait
        refreshCoordinates();
        resizeCanvas();
        tabletOrientation = 'Portrait';
      }
    }

    window.onorientationchange = readDeviceOrientationGame;

  },
  resize: function () {

    refreshCoordinates();

    backButton.x = gameWidth * .10;
    backButton.y = gameHeight * .75;

    this.gameBkg.x = centerX;
    this.gameBkg.y = centerY;

    backButton.x = gameWidth * .2;
    backButton.y = gameHeight * .8;
    backButtonTxt.x = gameWidth * .2;
    backButtonTxt.y = gameHeight * .8;

    //espera a poder hacer rezise al fondo
    if (canResize) {
      algaRight.x = gameWidth - 90;
      algaRight.y = gameHeight + 5;
      prof1.x = centerX;
      prof1.y = centerY;
      prof2.x = centerX;
      prof2.y = centerY;
      prof3.x = centerX;
      prof3.y = centerY;
      prof4.x = centerX;
      prof4.y = centerY;
    }

    //espera a hacer resize a la interfaz

    if (uiVisible) {
      cardNumber.x = gameWidth * .08;
      cardNumber.y = gameHeight * .055;
      movementChecker.x = gameWidth * .08;
      movementChecker.y = gameHeight * .1;
      aciertos.x = gameWidth * .73;
      aciertos.y = gameHeight * .055
    }


    if (showControls && userDevice == "Smartpone") {
      buttonUp.x = centerX;
      buttonDown.x = centerX;
      buttonLeft.x = centerX - 71;
      buttonRight.x = centerX + 71;
    }

    if (showControls && userDevice == "Tablet") {

      if (tabletOrientation == "Portrait") {
        upKeyX = game.world.centerX;
        upKeyY = game.world.height * .8;
        buttonUp.x = upKeyX;
        buttonUp.y = upKeyY;
        buttonDown.x = upKeyX;
        buttonDown.y = upKeyY + 71;
        buttonLeft.x = upKeyX - 71;
        buttonLeft.y = upKeyY + 71;
        buttonRight.x = upKeyX + 71;
        buttonRight.y = upKeyY + 71
      } else if (tabletOrientation == "Landscape") {
        upKeyX = gameWidth * .8;
        upKeyY = gameHeight * .7;
        buttonUp.x = upKeyX;
        buttonUp.y = upKeyY;
        buttonDown.x = upKeyX;
        buttonDown.y = upKeyY + 71;
        buttonLeft.x = upKeyX - 71;
        buttonLeft.y = upKeyY + 71;
        buttonRight.x = upKeyX + 71;
        buttonRight.y = upKeyY + 71;
      }
    }



    document.getElementById('debug').innerHTML = gameWidth;

  },
  update: function () {

    updateFish(fish1);
    updateFish(fish2);
    updateFish(fish3);
    updateFish(fish4);
    updateFish(fish5);
    updateFish(fish6);

  }
};


function startDataColector() {
  levelStats.cardId = index; //corregir
  levelStats.cardColor = testLevel[index].color;
  levelStats.viewDirection = testLevel[index].viewDir;
  levelStats.movementDirection = testLevel[index].movDir;
  levelStats.start = new Date();
}

function endDataColector(arrowPressed) {
  levelStats.userInput = arrowPressed;
  levelStats.end = new Date();
  levelStats.timeResponse = levelStats.end.getTime() - levelStats.start.getTime();

  console.log(userStats);
  userStats.push(levelStats);
  levelStats = new Object;
}

function refreshMovement() {
  directionOrdered = testLevel[index].movDir;
  viewDirection = testLevel[index].viewDir;
  rightMovement = testLevel[index].rightMov;
  color = testLevel[index].color;
}

function clearFishes() {
  fishFadeOut(fish1);
  fishFadeOut(fish2);
  fishFadeOut(fish3);
  fishFadeOut(fish4);
  fishFadeOut(fish5);
  fishFadeOut(fish6);
}

function drawFishes() {
  fishFadeIn(fish1);
  changeAngle(fish1, viewDirection);
  centerFish(fish1, 0, 0);
  fishFadeIn(fish2);
  changeAngle(fish2, viewDirection);
  centerFish(fish2, -100, -40);
  fishFadeIn(fish3);
  changeAngle(fish3, viewDirection);
  centerFish(fish3, 40, -100);
  fishFadeIn(fish4);
  changeAngle(fish4, viewDirection);
  centerFish(fish4, +110, +80);
  fishFadeIn(fish5);
  changeAngle(fish5, viewDirection);
  centerFish(fish5, -30, -80);
  fishFadeIn(fish6);
  changeAngle(fish6, viewDirection);
  centerFish(fish6, +80, 40);
}
function updateFish(elem) {
  moveFish(elem);
  movementLoop(elem);
}

function fishFadeIn(elem) {
  game.add.tween(elem).to({ alpha: 1 }, 1000, "Linear", true);
}

function fishFadeOut(elem) {
  game.add.tween(elem).to({ alpha: 0 }, 1000, "Linear", true);
}

function showCardNumber(idx) {
  cardNumber.setText(`Carta N ${++idx} de ${levelLenght}`);
}

function start() {
  gameVersion ? console.log('Version real inciada') : console.log('Version DEMO inciada');
  index = 0;
  cantAciertos = 0;
  levelLenght = testLevel.length;

  levelStats = new Object();

  var gameInit = setTimeout(function () {
    console.log("timeout // juego iniciado")
    gameStatus = true;
    canMove = true;
    refreshMovement(); //actualiza los datos de movimientos
    showCardNumber(index);
    uiVisible = true;
    changeColor(testLevel[index].color);
    drawFishes(); //center fishes
    startDataColector();

    fade = true;
  }, 500);
};

function goToNextMove(arrowPressed) { /*se ejecuta si el movimiento es correcto*/
  canMove = false;
  fade = false;
  directionOrdered = "quiet";
  endDataColector(arrowPressed);
  ++index;
  clearFishes();

  setTimeout(function () {
    if (index < testLevel.length) {
      canMove = true;
      showCardNumber(index);
      refreshMovement();
      changeColor(testLevel[index].color);
      drawFishes();
      startDataColector();
      fade = true;
    } else {
      console.log("juego terminado");
      gameStatus = false;
      canMove = false;
      endGame();
    }
  }, 1200)
}

function checkUserInput(direction) {
  console.log(direction);
  if (canMove && gameVersion) { //version real
    if (rightMovement == direction) cantAciertos++;
    goToNextMove(direction);
    showRightMovements(index)
  }
  if (canMove && !gameVersion) {
    showStats(direction);
    if (rightMovement == direction) {
      cantAciertos++;
      goToNextMove(direction);
      showRightMovements(index);
      showAlert(movAlert, 1)
    } else { showAlert(movAlert, 0) }
  }
}

function endGame() {
  game.add.tween(endGameTXT).to({ y: game.world.centerY - 40, alpha: 1 }, 1000, 'Bounce.easeOut', true, 0, 0, false);
}

function showAlert(elem, sprite) {
  this.alert = game.add.sprite(centerX, centerY, 'movementAlert');
  this.alert.frame = sprite;
  this.alert.alpha = 0;
  this.alert.scale.setTo(.1);
  this.alert.anchor.setTo(.5, .5);
  game.add.tween(this.alert).to({ alpha: 1 }, 250, 'Linear', true, 0, 0, false)
  game.add.tween(this.alert.scale).to({ x: .3, y: .3 }, 500, 'Bounce', true, 0, 0, false);
  game.add.tween(this.alert).to({ alpha: 0 }, 1000, 'Linear', true, 800, 0, false)
};


function pressUp() {
  checkUserInput('up');
  console.log("key up pressed");
};

function pressDown() {
  checkUserInput('down');
  console.log("key down pressed");
};

function pressLeft() {
  checkUserInput('left');
  console.log("key left pressed");
};

function pressRight() {
  checkUserInput('right');
};

/*

elem.animations.add(animName);
elem.animations.play(animName, 10, true);


 */

// function readDeviceOrientation() {

//   if (Math.abs(window.orientation) === 90) {
//       // Landscape
//       document.getElementById("orientation").innerHTML = "LANDSCAPE";
//   } else {
//     // Portrait
//     document.getElementById("orientation").innerHTML = "PORTRAIT";
//   }
// }

// window.onorientationchange = readDeviceOrientation;


/**
 * CORREGIR LINEA 229
 */