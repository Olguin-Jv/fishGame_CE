/*revisar paginacion del menú de instrucciones*/

demo.instructions = function () {

    this.fish;
    this.titulo = "INSTRUCCIONES";
    this.txt1 = "Este pez tiene un frente";
    this.txt1_2 = "y una cola."
    this.txt2 = "Cada vez que vea el pez azul deberá presionar la flecha indicando hacia donde está el frente.";
    this.txt3 = "Si aparece el pez Rojo, debera presionar la flecha que indique hacia donde se está moviendo."

};

var pageNum = 1;

demo.instructions.prototype = {
    preload: function () {

        this.load.spritesheet('fish', gameSettings.fishSprite, 110, 347, 2);
        this.load.image('upKey', gameSettings.upKey);
        this.load.image('downKey', gameSettings.downKey);
        this.load.image('leftKey', gameSettings.leftKey);
        this.load.image('rightKey', gameSettings.rightKey);
        this.load.image('blueArrow', gameSettings.blueArrow);
        this.load.image('background', gameSettings.background);
        this.load.image('button', gameSettings.tutorialArrow);
        this.load.image('homeButton', './assets/view/button2.png');

    },
    create: function () {

        refreshCoordinates();

        this.upKeyOriginX = gameWidth / 3;
        this.upkeyOriginY = 340;

        this.stage.disableVisibilityChange = true;

        this.background = this.add.image(centerX, centerY, 'background');
        this.background.alpha = 0;
        this.background.anchor.setTo(.5);
        this.bgIn = this.add.tween(this.background).to({ alpha: 1 }, 1000, 'Linear', true, 0, 0, false);

        this.titleStyle = { fontSize: '30px', fontWeight: 'bold', font: 'Lato', fill: '#fff', align: 'center' };
        this.txtStyle = { fontSize: '24px', font: 'Montserrat', fill: '#fff', align: 'left', wordWrap: true, wordWrapWidth: gameWidth * .9 };
        this.buttonStyle = { fontSize: '24px', font: 'Montserrat' };
        this.buttonStyleMobile = { fontSize: '20px', font: 'Montserrat' };

        /*fonts en blanco,
        font Lato
        titulo en italica, mayuscula
        resto en minuscula y regular
         */

        title = this.add.text(centerX + 40, 45, this.titulo, this.titleStyle);
        title.alpha = 0;
        title.anchor.setTo(.5);
        title.resolution = 1;

        texto1 = this.add.text(centerX * .2, 90, this.txt1, this.txtStyle);
        texto1.alpha = 0;

        texto1_2 = this.add.text(centerX * .2, 120, this.txt1_2, this.txtStyle);
        texto1_2.alpha = 0;

        texto2 = this.add.text(centerX * .2, 90, this.txt2, this.txtStyle);
        texto2.alpha = 0;

        texto3 = this.add.text(centerX * .2, 90, this.txt3, this.txtStyle);
        texto3.alpha = 0;

        keyUp = this.add.image(this.upKeyOriginX, this.upkeyOriginY, 'upKey');
        keyUp.anchor.setTo(.5, .5);
        keyUp.scale.setTo(.7);
        keyUp.alpha = 0;

        keyDown = this.add.image(this.upKeyOriginX, this.upkeyOriginY + 70, 'downKey');
        keyDown.anchor.setTo(.5, .5);
        keyDown.scale.setTo(.7);
        keyDown.alpha = 0;

        keyLeft = this.add.image(this.upKeyOriginX - 66, this.upkeyOriginY + 70, 'leftKey');
        keyLeft.anchor.setTo(.5, .5);
        keyLeft.scale.setTo(.7);
        keyLeft.alpha = 0;

        keyRight = this.add.image(this.upKeyOriginX + 66, this.upkeyOriginY + 70, 'rightKey')
        keyRight.anchor.setTo(.5, .5);
        keyRight.scale.setTo(.7);
        keyRight.alpha = 0;

        blueArrowUp = this.add.image(game.world.centerX, game.world.centerY - 100, 'blueArrow');
        blueArrowUp.anchor.setTo(.5, .5);
        blueArrowUp.scale.setTo(.05);
        blueArrowUp.angle = 90;
        blueArrowUp.alpha = 0;

        blueArrowDown = game.add.image(game.world.centerX, game.world.centerY + 130, 'blueArrow')
        blueArrowDown.anchor.setTo(.5, .5);
        blueArrowDown.scale.setTo(.05);
        blueArrowDown.angle = -90;
        blueArrowDown.alpha = 0;

        fish = this.add.sprite(game.world.centerX + 25, game.world.centerY + 20, 'fish');
        fish.anchor.setTo(.5, .5);
        fish.scale.setTo(.5);
        fish.alpha = 0;

        fish2 = this.add.sprite(gameWidth * .666, game.world.centerY + 20, 'fish');
        fish2.anchor.setTo(.5, .5);
        fish2.scale.setTo(.5);
        fish2.alpha = 0;
        fish2.frame = 1;

        this.siguiente = this.add.button(gameWidth * .9, 550, 'button', nextPage);
        this.siguiente.anchor.setTo(.5, .5);
        this.siguiente.scale.setTo(.3);

        this.anterior = this.add.button(gameWidth * .1, 550, 'button', prevPage);
        this.anterior.anchor.setTo(.5, .5);
        this.anterior.scale.setTo(.3);
        this.anterior.angle = -180;

        //cambio la posición de los botones según el dispositivo    
        if (userDevice == "Smartphone") {
            this.homeButton = this.add.button(centerX, gameHeight - 25, 'homeButton', backToMenu);
            this.add.text(centerX, gameHeight - 25, 'Volver al menú', this.buttonStyleMobile).anchor.setTo(.5, .5);
            this.homeButton.scale.setTo(.7);

            this.demoButton = this.add.button(centerX, gameHeight - 75, 'homeButton', goDemoMode);
            this.add.text(centerX, gameHeight - 75, 'Jugar prueba', this.buttonStyleMobile).anchor.setTo(.5, .5)
            this.demoButton.scale.setTo(.7);

        } else {
            this.homeButton = this.add.button(centerX * .666, 550, 'homeButton', backToMenu);
            this.homeButton.scale.setTo(.8);

            this.demoButton = this.add.button(centerX * 1.333, 550, 'homeButton', goDemoMode);
            this.demoButton.scale.setTo(.8);

            this.demoBtnTxt = this.add.text(centerX * 1.333, 550, 'Jugar prueba', this.buttonStyle).anchor.setTo(.5, .5)
            this.homeBtnTxt = this.add.text(centerX * .666, 550, 'Volver al menú', this.buttonStyle).anchor.setTo(.5, .5);
        }
        this.homeButton.anchor.setTo(.5, .5);

        this.demoButton.anchor.setTo(.5, .5);



        function goDemoMode() {
            game.state.start('playGame');
            gameVersion = false;
        };

        function prevPage() {
            scroll = false;
            clearInterval(interval);
            switch (pageNum) {
                case 1:
                    console.log('no existe página previa');
                    return;
                    break;
                case 2:
                    txt1_in.start();
                    txt1_in.resume();
                    txt1_2_in.start();
                    txt1_2_in.resume();
                    moveLeft(fish)
                    blueArrowDown.x -= 25;
                    blueArrowUp.x -= 25;
                    blueArrowDown_In.start();
                    blueArrowDown_In.resume();
                    blueArrowUp_In.start();
                    blueArrowUp_In.resume();
                    fadeOut(texto2);
                    fadeOut(keyUp);
                    fadeOut(keyDown);
                    fadeOut(keyLeft);
                    fadeOut(keyRight);

                    pageNum--;
                    break;
                case 3:
                    fadeIn(texto2, 0);
                    keyUp.scale.setTo(.7);
                    rightKeyPressed.pause();
                    upKeyPressed.start();
                    upKeyPressed.resume();

                    fadeIn(fish);
                    orangeFishToRight.pause();
                    orangeFishOut.pause();
                    orangeFishIn.pause();
                    fadeOutFish2.start();
                    fadeOut(texto3);

                    pageNum--;
                    break;

                default:
                    break;
            }
            console.log('en página: ' + pageNum)
            console.log('algo');
        };

        function nextPage() {

            scroll = true;
            if (!scroll) autoScroll();

            switch (pageNum) {
                case 0:
                    fadeIn(title, 0);
                    fadeIn(texto1, 0);
                    fadeIn(fish, 0);
                    console.log(pageNum);
                    break;
                case 1:

                    txt1_in.pause();
                    txt1_2_in.pause();
                    fadeOut(texto1);
                    fadeOut(texto1_2);

                    moveRight(fish);

                    blueArrowUp_In.pause();
                    fadeOut(blueArrowUp)
                    blueArrowDown_In.pause();
                    fadeOut(blueArrowDown);

                    fadeIn(texto2, 0);
                    fadeIn(keyUp, 0);
                    fadeIn(keyDown, 0);
                    fadeIn(keyLeft, 0);
                    fadeIn(keyRight, 0);

                    upKeyPressed.start();
                    upKeyPressed.resume();

                    pageNum++;
                    break;
                case 2:
                    fadeOut(texto2);

                    fadeOut(fish);
                    upKeyPressed.pause();
                    rightKeyPressed.start();
                    rightKeyPressed.resume();
                    fish2In.start();
                    orangeFishToRight.resume();
                    orangeFishOut.resume();
                    orangeFishIn.resume();
                    fadeIn(texto3);

                    pageNum++
                    break;
                case 3:

                    break;
                default:
                    console.log("invalid to go next page");
                    break;
            }
            console.log("en página: " + pageNum);
        }


        var txt1_in = game.add.tween(texto1).to({ alpha: 1, x: '-25' }, 500, 'Linear', false, 500, 0, false);
        var txt1_2_in = game.add.tween(texto1_2).to({ alpha: 1, x: '-25' }, 500, 'Linear', false, 3500, 0, false);

        var blueArrowUp_In = game.add.tween(blueArrowUp).to({ alpha: 1 }, 750, 'Linear', false, 500, 0, true);
        var blueArrowDown_In = game.add.tween(blueArrowDown).to({ alpha: 1 }, 750, 'Linear', false, 3500, 0, true);



        function pulse(elem, delay) {
            var elemPulse = game.add.tween(elem).to({ alpha: 1 }, 750, 'Linear', true, delay, 0, true);
        }

        function pressButton(elem, scaleFx, delay) {
            var elemPressed = game.add.tween(elem.scale).to({ x: scaleFx, y: scaleFx }, 750, 'Linear', true, delay, -1, true);
        };

        var upKeyPressed = game.add.tween(keyUp.scale).to({ x: .6, y: .6 }, 750, 'Linear', false, 0, -1, true);
        var rightKeyPressed = game.add.tween(keyRight.scale).to({ x: .6, y: .6 }, 750, 'Linear', false, 0, -1, true);

        function fadeIn(elem, delay) {
            var elemIn = game.add.tween(elem).to({ alpha: 1, x: '-25' }, 500, 'Linear', true, delay, 0, false);
        }

        function fadeOut(elem) {
            var elemOut = game.add.tween(elem).to({ alpha: 0, x: '+25' }, 500, 'Linear', true, 0, 0, false);
        }

        function moveLeft(elem) {
            var toLeft = game.add.tween(elem).to({ x: centerX }, 500, 'Linear', true, 0, 0, false);
        }

        function moveRight(elem) {
            var toRight = game.add.tween(elem).to({ x: gameWidth * .666 }, 500, 'Linear', true, 0, 0, false);
        }

        var fadeOutFish2 = game.add.tween(fish2).to({ alpha: 0, x: '+25' }, 250, 'Linear', false, 0, 0, false);
        fadeOutFish2.onComplete.add(fadeFish2, this);
        function fadeFish2() {
            fish2.x = game.world.centerX + 225;
        }

        var fish2In = game.add.tween(fish2).to({ alpha: 1, x: '-25' }, 250, 'Linear', false, 0, 0, false);
        fish2In.onComplete.add(startAnimation, this);
        function startAnimation() {
            orangeFishToRight.start();
        }
        var orangeFishToRight = game.add.tween(fish2).to({ x: '+80' }, 4000, 'Linear', false, 0, 0, false);
        orangeFishToRight.onComplete.add(vanishOrangeFish, this);
        function vanishOrangeFish() {
            orangeFishOut.start();
        }
        var orangeFishOut = game.add.tween(fish2).to({ alpha: 0 }, 500, 'Linear', false, 0, 0, false);
        orangeFishOut.onComplete.add(backToInitialPosition, this);
        function backToInitialPosition() {
            fish2.x -= 80;
            orangeFishIn.start();
        }
        var orangeFishIn = game.add.tween(fish2).to({ alpha: 1 }, 500, 'Linear', false, 0, 0, false);
        orangeFishIn.onComplete.add(restartMove, this);
        function restartMove() {
            orangeFishToRight.start();
        }
        var scroll = true;

        function autoScroll() {

            interval = setInterval(function () {
                if (scroll) nextPage();
                console.log("next page");
            }, 10000);

        }
        autoScroll();

        fadeIn(title, 0);
        fadeIn(fish, 0);
        txt1_in.start();
        txt1_2_in.start();
        blueArrowUp_In.start();
        blueArrowDown_In.start();

    },
    resize: function () {
        refreshCoordinates();

        this.background.x = centerX;

        blueArrowUp.x = centerX;
        blueArrowDown = centerY;

        this.siguiente.x = gameWidth * .9;
        this.anterior.x = gameWidth * .1;

        this.homeBtnTxt.x = centerX * .666;
        this.demoBtnTxt.x = centerX * 1.333;

        this.homeButton.x = centerX * .666;
        this.demoButton.x = centerX * 1.333;

    }
}

