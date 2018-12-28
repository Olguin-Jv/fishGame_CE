function changeState(i, stateName) {
    console.log(`State changed to ${stateName}`);
    game.state.start(stateName);
};

function backToMenu() {
    changeState(null, 'menu');
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
        elem.x = gameSettings.gameWidth + 90;
    }
    if (elem.x > (gameSettings.gameWidth + 120)) {
        elem.x = -75;
    }
    if (elem.y < (0 - 120)) {
        elem.y = gameSettings.gameHeight + 90;
    }
    if (elem.y > gameSettings.gameHeight + 120) {
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

function changeColor(elem, color) {
    color == "blue" ? elem.frame = 0 : elem.frame = 1;
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
        aciertos.setText(`Has acertado: ${cantAciertos} de ${idx}`)
    }
}