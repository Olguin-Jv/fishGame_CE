var gameX,
	gameY,
	showControls = false;

var userDevice = WURFL.form_factor;

if ( userDevice === 'Desktop') {
	gameX = 800;
	gameY = 600;
}
if (userDevice === "Smartphone") {
	showControls = true;
	gameX = 400;
	gamey = 500;
	showRotate();
}
if(userDevice === 'Tablet'){
	showControls = true;
	gameX = 600;
	gamey = 400;
	// alert('is tablet');
}

function showRotate(){
    var rotate = document.getElementById('rotate');
        rotate.classList.add('rotate');
    var p = document.createElement('p');
        p.innerHTML = 'Por favor rota el dispositivo';
    rotate.appendChild(p);
};

var game = new Phaser.Game(gameX, gameY, Phaser.AUTO);
game.parent = 'game-container';
game.transparent = true;

//this cause issues in mobile devices
game.resolution = window.devicePixelRatio / window.devicePixelRatio;

var gameSettings = {
	showRightMovements: true,
	fishSprite: './assets/player/fishSprite.png',
	fishDemo: './assets/player/fish_spritesheet.png',
	fishHeight: 110,
	fishWidth: 347,
	//UI
	btn_orange: './assets/view/btn_orange.png',
	btn_blue: './assets/view/btn_blue.png',
	backButton: './assets/view/back-button.png',
	white_arrow: './assets/view/white_arrow.png',
	upKey: './assets/view/upKey.png',
	downKey: './assets/view/downKey.png',
	leftKey: './assets/view/leftKey.png',
	rightKey: './assets/view/rightKey.png',
	blueArrow: './assets/view/blueArrow.png',
	background: './assets/view/fullBkg.jpg',
	gameBackground: './assets/view/gameBkg.jpg',
	tutorialArrow: './assets/view/arrowInfo.png',
	blueButton: './assets/view/button2.png',
	movementAlert: './assets/view/01_640x332.png',
	//key buttons
	blueKeyUp: './assets/view/blueKeyUp.png',
	blueKeyDown: './assets/view/blueKeyDown.png',
	blueKeyLeft: './assets/view/blueKeyLeft.png',
	blueKeyRight: './assets/view/blueKeyRight.png',
	orangeKeyUp: './assets/view/orangeKeyUp.png',
	orangeKeyDown: './assets/view/orangeKeyDown.png',
	orangeKeyLeft: './assets/view/orangeKeyLeft.png',
	orangeKeyRight: './assets/view/orangeKeyRight.png',
	//GAME SETTINGS
	velocity: 1,
	gameWidth: 800,
	gameHeight: 600
}

game.state.add('menu', demo.menu);
game.state.add('instructions', demo.instructions);
game.state.add('playGame', demo.playGame);
game.state.add('pruebas', demo.pruebas);
game.state.start('menu');


// function readDeviceOrientation() {
                 		
//     if (Math.abs(window.orientation) === 90) {
//         // Landscape
//         alert('landscape')
//     } else {
//     	// Portrait
//     	alert("portrait")
//     }
// }

// window.onorientationchange = readDeviceOrientation;


