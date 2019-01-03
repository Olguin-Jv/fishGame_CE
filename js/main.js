var gameX,
	gameY,
	showControls = false;

var userDevice = WURFL.form_factor;

if ( userDevice === 'Desktop') {
	gameX = 800;
	gameY = 600;
}
if (userDevice === "Smartphone") {
	gameX = 400;
	gamey = 500;
	showControls = true;
	showRotate();
}
if(userDevice === 'Tablet'){
	showControls = true;
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


