//fondo
var prof1,
  prof2,
  prof3,
  prof4,
  algaLeft,
  algaRight;

//sprites
var arrow,
  fish1,
  fish2,
  fish3,
  fish4;

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
  cantAciertos;
//text style
var txtInfoStyle,
  style;


demo.demoMode = function () { };

demo.demoMode.prototype = {
  preload: function () {

    game.load.image('algaLeft', './assets/view/alga2.png');
    game.load.image('algaRight', './assets/view/alga.png');
    game.load.image('prof1', './assets/view/profundidad1.png');
    game.load.image('prof2', './assets/view/profundidad2.png');
    game.load.image('prof3', './assets/view/profundidad3.png');
    game.load.image('prof4', './assets/view/profundidad4.png');
    game.load.image('backButton', gameSettings.backButton);

    game.load.spritesheet('fish', gameSettings.fishSprite, 110, 347, 2);

    txtInfoStyle = { fontFamily: 'Verdana', fontSize: '16px', fill: '#FFFFFF' }
  },

  create: function () {
    this.stage.disableVisibilityChange = true;

    algaLeft = game.add.image(90, 0, 'algaLeft');
    algaLeft.anchor.setTo(0.5, 0);
    algaLeft.scale.setTo(0.3, 0.3);

    var algaLeftIn = game.add.tween(algaLeft).from({ x: -200 }, 1000, "Bounce");
    algaLeftIn.onComplete.add(algaLeftOn, this);
    algaLeftIn.start();
    function algaLeftOn() {
      game.add.tween(algaLeft).to({ x: '+12', angle: -6 }, 3500, 'Bounce.easeInOut', true, 0, -1, true);
    }

    algaRight = game.add.image(gameWidth - 90, gameHeight + 5, 'algaRight');
    algaRight.anchor.setTo(0.5, 1);
    algaRight.scale.setTo(0.35, 0.35);

    var algaRightIn = game.add.tween(algaRight);
    algaRightIn.from({ x: gameSettings.gameWidth + 200 }, 1000, "Bounce");
    algaRightIn.onComplete.add(algaRightOn, this);
    algaRightIn.start();
    function algaRightOn() {
      game.add.tween(algaRight).to({ x: '-10', angle: -6 }, 4000, 'Bounce.easeInOut', true, 0, -1, true);
    }

    prof1 = game.add.image(centerX, centerY, 'prof1');
    prof1.alpha = 0;
    prof1.anchor.setTo(0.5, 0.5);
    var prof1In = game.add.tween(prof1).to({ alpha: 1 }, 1000, "Linear", false, 500, 0, false);
    prof1In.onComplete.add(prof1_move, this);
    prof1In.start();
    function prof1_move() {
      game.add.tween(prof1).to({ x: '-10', y: '-10' }, 15000, "Bounce.easeInOut", true, 0, -1, true)
    }

    prof2 = game.add.image(centerX, centerY, 'prof2');
    prof2.alpha = 0;
    prof2.anchor.setTo(0.5, 0.5);
    var prof2In = game.add.tween(prof2).to({ alpha: 1 }, 1000, "Linear", false, 1000, 0, false);
    prof2In.onComplete.add(prof2_move, this);
    prof2In.start();
    function prof2_move() {
      game.add.tween(prof2).to({ x: '-10', y: '-10' }, 15000, "Bounce.easeInOut", true, 1000, -1, true)
    }

    prof3 = game.add.image(centerX, centerY, 'prof3');
    prof3.alpha = 0;
    prof3.anchor.setTo(0.5, 0.5);
    var prof3In = game.add.tween(prof3).to({ alpha: 1 }, 1000, "Linear", false, 1500, 0, false);
    prof3In.onComplete.add(prof3_move, this);
    prof3In.start();
    function prof3_move() {
      game.add.tween(prof3).to({ x: '-20', y: '+15' }, 15000, "Bounce.easeInOut", true, 2000, -1, true)
    }
    prof4 = game.add.image(centerX, centerY, 'prof4');
    prof4.alpha = 0;
    prof4.anchor.setTo(0.5, 0.5);
    var prof4In = game.add.tween(prof4).to({ alpha: 1 }, 1000, "Linear", false, 2000, 0, false);
    prof4In.onComplete.add(prof4_move, this);
    prof4In.start();
    function prof4_move() {
      game.add.tween(prof4).to({ x: '-10', y: '-10' }, 15000, "Bounce.easeInOut", true, 3000, -1, true);
    }

    fish1 = game.add.sprite(centerX, centerY, 'fish');
    fish1.alpha = 0;
    fish1.anchor.setTo(.5, .5);
    fish1.scale.setTo(.5);

    fish2 = game.add.sprite(centerX, centerY, 'fish');
    fish2.alpha = 0;
    fish2.anchor.setTo(.5, .5);
    fish2.scale.setTo(.2);

    fish3 = game.add.sprite(centerX, centerY, 'fish');
    fish3.alpha = 0;
    fish3.anchor.setTo(.5, .5);
    fish3.scale.setTo(.4);

    fish4 = game.add.sprite(centerX, centerY, 'fish');
    fish4.alpha = 0;
    fish4.anchor.setTo(.5, .5);
    fish4.scale.setTo(.3);

    fish5 = game.add.sprite(centerX, centerY, 'fish');
    fish5.alpha = 0;
    fish5.anchor.setTo(.5, .5);
    fish5.scale.setTo(.3);

    fish6 = game.add.sprite(centerX, centerY, 'fish');
    fish6.alpha = 0;
    fish6.anchor.setTo(.5, .5);
    fish6.scale.setTo(.4);

    cardNumber = game.add.text(16, 16, '', txtInfoStyle);
    aciertos = game.add.text(550, 16, '', txtInfoStyle);

    backButton = game.add.button(90, gameHeight - 90, 'backButton', backToMenu);
    backButton.scale.setTo(.6, .6);
    backButton.anchor.setTo(0.5, 0.5);
  },

  update: function () {

    //moveWithArrows();
    updateFish(fish1);
    updateFish(fish2);
    updateFish(fish3);
    updateFish(fish4);
    updateFish(fish5);
    updateFish(fish6);

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && canMove) {
      if (rightMovement == "left") cantAciertos++;
      goToNextMove('left');
      showRightMovements(index)
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && canMove) {
      if (rightMovement == "right") cantAciertos++;
      goToNextMove('right');
      showRightMovements(index)
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && canMove) {
      if (rightMovement == "up") cantAciertos++;
      goToNextMove('up');
      showRightMovements(index)
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && canMove) {
      if (rightMovement == "down") cantAciertos++;
      goToNextMove('down');
      showRightMovements(index)
    }

  }
};

function start() {

  index = 0;
  cantAciertos = 0;
  levelLenght = testLevel.length;

  levelStats = new Object();

  var gameInit = setTimeout(function () {
    console.log("start Game")
    gameStatus = true;
    canMove = true;
    refreshMovement(); //actualiza los datos de movimientos
    showCardNumber(index);

    drawFishes(); //center fishes
    startDataColector();

    fade = true;
  }, 4000);
}

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

function clearFishes(){
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
  changeColor(fish1, testLevel[index].color);
  fishFadeIn(fish2);
  changeAngle(fish2, viewDirection);
  centerFish(fish2, -100, -40);
  changeColor(fish2, testLevel[index].color);
  fishFadeIn(fish3);
  changeAngle(fish3, viewDirection);
  centerFish(fish3, 40, -100 );
  changeColor(fish3, testLevel[index].color);
  fishFadeIn(fish4);
  changeAngle(fish4, viewDirection);
  centerFish(fish4, +110, +80);
  changeColor(fish4, testLevel[index].color);
  fishFadeIn(fish5);
  changeAngle(fish5, viewDirection);
  centerFish(fish5, -30, -80);
  changeColor(fish5, testLevel[index].color);
  fishFadeIn(fish6);
  changeAngle(fish6, viewDirection);
  centerFish(fish6, +80, 40);
  changeColor(fish6, testLevel[index].color);
}
function updateFish(elem) {
  moveFish(elem);
  movementLoop(elem);
}

function fishFadeIn(elem) {
  game.add.tween(elem).to({ alpha: 1}, 1000, "Linear", true);
}

function fishFadeOut(elem) {
  game.add.tween(elem).to({ alpha: 0 }, 1000, "Linear", true);
}

function showCardNumber(idx) {
  cardNumber.setText(`Carta n°${++idx} de ${levelLenght}`);
}

start();

