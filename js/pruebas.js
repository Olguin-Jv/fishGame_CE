var centerX,
    centerY,
    gameWidth,
    gameHeight;

var fishDemo;

demo.pruebas = function () { };
demo.pruebas.prototype = {
    preload: function () {
        this.load.image('background', gameSettings.background);
        game.load.spritesheet('fishDemo', gameSettings.fishDemo, 347, 347, 12);
        game.load.spritesheet('02', './assets/player/01.png');
    },
    create: function () {

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        centerX = game.world.width / 2,
            centerY = game.world.height / 2,
            gameWidth = game.world.width,
            gameHeight = game.world.height;

        this.add.image(0, 0, 'background');

        fishDemo = game.add.sprite(centerX, centerY, 'fishDemo');
        fishDemo.anchor.setTo(.5)
        fishDemo.animations.add('blue',[0, 1, 2, 3, 4, 5], 10, true);
        fishDemo.animations.add('orange', [6, 7, 8, 9, 10, 11], 10, true);
        fishDemo.animations.play('orange');

        // var fishOne = game.add.sprite
    },
};


/*

mysprite.animations.add('left', [0, 1, 2, 3], 10, true);
mysprite.animations.add('right', [5, 6, 7, 8], 10, true);

mysprite.animations.play('left');

*/