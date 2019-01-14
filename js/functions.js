function changeState(i, stateName) {
    console.log(`State changed to ${stateName}`);
    game.state.start(stateName);
};

function backToMenu() {
    changeState(null, 'menu');
    console.log(`Back to menu\n` +
        `Game width: ${gameWidth} Game height: ${gameHeight}\n` +
        `tablet orientation: ${tabletOrientation}`)
};

function moveWithArrows() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        fish1.y -= gameSettings.velocity;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        fish1.y += gameSettings.velocity;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        fish1.x -= gameSettings.velocity;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        fish1.x += gameSettings.velocity;
    }
}

function moveFish(elem) {
    if (directionOrdered == "up") {
        elem.y -= gameSettings.velocity;
    }
    if (directionOrdered == "down") {
        elem.y += gameSettings.velocity;
    }
    if (directionOrdered == "left") {
        elem.x -= gameSettings.velocity;
    }
    if (directionOrdered == "right") {
        elem.x += gameSettings.velocity;
    }

}

function movementLoop(elem) {
    if (elem.x < (0 - 120)) {
        elem.x = gameWidth + 90;
    }
    if (elem.x > (gameWidth + 120)) {
        elem.x = -75;
    }
    if (elem.y < (0 - 120)) {
        elem.y = gameHeight + 90;
    }
    if (elem.y > gameHeight + 120) {
        elem.y = -75;
    }
}

function changeAngle(elem, direction) { //gira el sprite siguiendo el sentido que corresponda
    switch (direction) {
        case "left":
            elem.angle = 270;
            break;
        case "right":
            elem.angle = 90;
            break;
        case "up":
            elem.angle = 0;
            break;
        case "down":
            elem.angle = 180;
            break;
        default:
            console.log("Function 'changeAngle()' has failed");
            break;
    }
}

function changeColor(color) {
    if (color == 'blue') {
        fish1.animations.play('f1_blue');
        fish2.animations.play('f2_blue');
        fish3.animations.play('f3_blue');
        fish4.animations.play('f4_blue');
        fish5.animations.play('f5_blue');
        fish6.animations.play('f6_blue');
    }
    else {
        fish1.animations.play('f1_orange');
        fish2.animations.play('f2_orange');
        fish3.animations.play('f3_orange');
        fish4.animations.play('f4_orange');
        fish5.animations.play('f5_orange');
        fish6.animations.play('f6_orange');
    }
}

function fadeFish(elem) {
    game.add.tween(elem).to({ alpha: 0 }, 1000, "Linear", true, 0, 0)
}

function centerFish(elem, x, y) {
    elem.x = centerX + x;
    elem.y = centerY + y;
}

function showStats(key) { //funcion para mostrar información al jugador en el modo de prueba
    movementChecker.setText(`Color del pez: ${testLevel[index].color.toUpperCase()}\n` +
        `Tu movimiento: ${key}.\nMovimiento correcto: ${testLevel[index].rightMov.toUpperCase()}`);
}

function showRightMovements(idx) {
    console.log('showRightMovements');
    if (gameSettings.showRightMovements) {
        aciertos.setText(`Aciertos ${cantAciertos}/${idx}`)
    }
}

function resizeCanvas() {

    if (userDevice == 'Tablet' && game.renderType === Phaser.WEBGL && Math.abs(window.orientation) !== 0) {
        game.renderer.resize(800, 450);
        tabletOrientation = 'Landscape';
    } else if (userDevice == 'Tablet' && game.renderType === Phaser.WEBGL && Math.abs(window.orientation) == 0){
        game.renderer.resize(800, 600);
        tabletOrientation = 'Portrait';
    }
}

function refreshCoordinates(){
    centerX = game.world.width / 2;
    centerY = game.world.height / 2;
    gameWidth = game.world.width;
    gameHeight = game.world.height;
  };


///previene al usuario de abandonar la página
window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = "\o/";

    e.returnValue = confirmationMessage;     // Gecko and Trident
    return confirmationMessage;              // Gecko and WebKit
});

window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = 'It looks like you have been editing something. '
        + 'If you leave before saving, your changes will be lost.';
    (e || window.event).returnValue = confirmationMessage; //Gecko + IE

    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
});