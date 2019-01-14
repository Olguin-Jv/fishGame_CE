/*revisar paginacion del menú de instrucciones*/

demo.instructions = function () {

    this.fish;
    this.titulo = "Instrucciones";
    this.txt1 = "Este pez tiene un frente\ny una cola";
    this.txt2 = "Cada vez que vea el pez azul\ndeberá presionar la flecha indicando\nhacia donde está el frente.";
    this.txt3 = "Cada vez que vea el pez naranja\ndeberá presionar la flecha indicando\nhacia donde se está moviendo."

};

var pageNum = 1;

demo.instructions.prototype = {
    preload: function () {

        this.load.spritesheet('fish', gameSettings.fishSprite, 110, 347, 2);
        this.load.image('blue_upKey', gameSettings.blueKeyUp);
        this.load.image('blue_downKey', gameSettings.blueKeyDown);
        this.load.image('blue_leftKey', gameSettings.blueKeyLeft);
        this.load.image('blue_rightKey', gameSettings.blueKeyRight);
        this.load.image('orange_upKey', gameSettings.orangeKeyUp);
        this.load.image('orange_downKey', gameSettings.orangeKeyDown);
        this.load.image('orange_leftKey', gameSettings.orangeKeyLeft);
        this.load.image('orange_rightKey', gameSettings.orangeKeyRight);
        this.load.image('background', gameSettings.background);
        this.load.image('button', gameSettings.white_arrow);
        this.load.image('homeButton', gameSettings.btn_blue);

    },
    create: function () {

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

        this.stage.disableVisibilityChange = true;

        this.background = this.add.image(centerX, centerY, 'background');
        this.background.alpha = 0;
        this.background.anchor.setTo(.5);
        this.bgIn = this.add.tween(this.background).to({ alpha: 1 }, 1000, 'Linear', true, 0, 0, false);

        this.txtStyle = { fontSize: '24px', font: 'Montserrat', fill: '#fff', align: 'left', wordWrap: true, wordWrapWidth: gameWidth * .9 };
        this.buttonStyle = { fontSize: '24px', font: 'Montserrat' };
        this.buttonStyleMobile = { fontSize: '20px', font: 'Montserrat' };

        title = this.add.text(centerX, 45, this.titulo, titleStyle);
        title.alpha = 0;
        title.anchor.setTo(.5, .4);
        title.resolution = 1;

        this.siguiente = this.add.button(centerX + 100, 45, 'button', nextPage);
        this.siguiente.anchor.setTo(.5, .5);
        this.siguiente.scale.setTo(.3);

        this.anterior = this.add.button(centerX - 100, 45, 'button', prevPage);
        this.anterior.anchor.setTo(.5, .5);
        this.anterior.scale.setTo(.3);
        this.anterior.angle = -180;

        if (userDevice == "Smartphone") {
            texto1 = this.add.text(centerX, centerY * .45, this.txt1, globalStyle);
            texto1.alpha = 0;
            texto1.anchor.setTo(.5);
    
            texto2 = this.add.text(centerX, centerY * .45, this.txt2, globalStyle);
            texto2.alpha = 0;
            texto2.anchor.setTo(.5);
            texto2.addColor('#272858', 55);
    
            texto3 = this.add.text(centerX, centerY * .45, this.txt3, globalStyle);
            texto3.alpha = 0;
            texto3.anchor.setTo(.5);
            texto3.addColor('#E79812', 58);            
        }
        if (userDevice !== "Smartphone") {
            texto1 = this.add.text(centerX * .38, (centerY * .6) + 25, this.txt1, globalStyle);
            texto1.alpha = 0;
    
            texto2 = this.add.text(centerX * .38, centerY * .666, this.txt2, globalStyle);
            texto2.alpha = 0;
            texto2.addColor('#272858', 55);
    
            texto3 = this.add.text(centerX * .38, centerY * .666, this.txt3, globalStyle);
            texto3.alpha = 0;
            texto3.addColor('#E79812', 58);
        }


        this.upKeyOriginX = centerX * .666;
        this.upkeyOriginY = gameHeight * .53;

        keyUp = this.add.image(this.upKeyOriginX, this.upkeyOriginY, 'blue_upKey');
        keyUp.anchor.setTo(.5, .5);
        keyUp.scale.setTo(.5);
        keyUp.alpha = 0;

        keyDown = this.add.image(this.upKeyOriginX, this.upkeyOriginY + 40, 'blue_downKey');
        keyDown.anchor.setTo(.5, .5);
        keyDown.scale.setTo(.5);
        keyDown.alpha = 0;

        keyLeft = this.add.image(this.upKeyOriginX - 40, this.upkeyOriginY + 40, 'blue_leftKey');
        keyLeft.anchor.setTo(.5, .5);
        keyLeft.scale.setTo(.5);
        keyLeft.alpha = 0;

        keyRight = this.add.image(this.upKeyOriginX + 40, this.upkeyOriginY + 40, 'blue_rightKey')
        keyRight.anchor.setTo(.5, .5);
        keyRight.scale.setTo(.5);
        keyRight.alpha = 0;

        // blueArrowUp = this.add.image(gameWidth * .73, game.world.centerY - 100, 'blueArrow');
        // blueArrowUp.anchor.setTo(.5, .5);
        // blueArrowUp.scale.setTo(.05);
        // blueArrowUp.angle = 90;
        // blueArrowUp.alpha = 0;

        // blueArrowDown = game.add.image(gameWidth * .73, game.world.centerY + 130, 'blueArrow')
        // blueArrowDown.anchor.setTo(.5, .5);
        // blueArrowDown.scale.setTo(.05);
        // blueArrowDown.angle = -90;
        // blueArrowDown.alpha = 0;

        orange_keyUp = this.add.image(this.upKeyOriginX, this.upkeyOriginY, 'orange_upKey');
        orange_keyUp.anchor.setTo(.5, .5);
        orange_keyUp.scale.setTo(.5);
        orange_keyUp.alpha = 0;

        orange_keyDown = this.add.image(this.upKeyOriginX, this.upkeyOriginY + 40, 'orange_downKey');
        orange_keyDown.anchor.setTo(.5, .5);
        orange_keyDown.scale.setTo(.5);
        orange_keyDown.alpha = 0;

        orange_keyLeft = this.add.image(this.upKeyOriginX - 40, this.upkeyOriginY + 40, 'orange_leftKey');
        orange_keyLeft.anchor.setTo(.5, .5);
        orange_keyLeft.scale.setTo(.5);
        orange_keyLeft.alpha = 0;

        orange_keyRight = this.add.image(this.upKeyOriginX + 40, this.upkeyOriginY + 40, 'orange_rightKey')
        orange_keyRight.anchor.setTo(.5, .5);
        orange_keyRight.scale.setTo(.5);
        orange_keyRight.alpha = 0;

        fish = this.add.sprite(gameWidth * .73, game.world.centerY, 'fish');
        fish.anchor.setTo(.5, .5);
        fish.scale.setTo(.5);
        fish.alpha = 1;

        fish2 = this.add.sprite(gameWidth * .73, game.world.centerY, 'fish');
        fish2.anchor.setTo(.5, .5);
        fish2.scale.setTo(.5);
        fish2.alpha = 0;
        fish2.frame = 1;


        //cambio la posición de los botones según el dispositivo    
        if (userDevice == "Smartphone") {
            this.homeButton = this.add.button(centerX, gameHeight - 25, 'homeButton', backToMenu);
            this.homeButtonTxt = this.add.text(centerX, gameHeight - 25, 'Volver al menú', globalStyle).anchor.setTo(.5, .5);
            this.homeButton.scale.setTo(.7);

            this.demoButton = this.add.button(centerX, gameHeight - 75, 'homeButton', goDemoMode);
            this.demoButtonTxt = this.add.text(centerX, gameHeight - 75, 'Jugar prueba', globalStyle).anchor.setTo(.5, .5)
            this.demoButton.scale.setTo(.7);

        } else {
            this.homeButton = this.add.button(centerX * .666, gameHeight - 50, 'homeButton', backToMenu);
            this.homeButton.scale.setTo(.8);

            this.demoButton = this.add.button(centerX * 1.333, gameHeight - 50, 'homeButton', goDemoMode);
            this.demoButton.scale.setTo(.8);

            this.homeButtonTxt = this.add.text(centerX * 1.333, gameHeight - 50, 'Jugar prueba', globalStyle).anchor.setTo(.5, .5)
            this.demoButtonTxt = this.add.text(centerX * .666, gameHeight - 50, 'Volver al menú', globalStyle).anchor.setTo(.5, .5);
        }
        this.homeButton.anchor.setTo(.5, .55);
        this.demoButton.anchor.setTo(.5, .55);



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
                    // blueArrowDown_In.start();
                    // blueArrowDown_In.resume();
                    // blueArrowUp_In.start();
                    // blueArrowUp_In.resume();
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

                    fadeOut(orange_keyUp);
                    fadeOut(orange_keyDown);
                    fadeOut(orange_keyLeft);
                    fadeOut(orange_keyRight);

                    fadeIn(fish);
                    orangeFishToRight.pause();
                    orangeFishOut.pause();
                    orangeFishIn.pause();
                    fadeOutFish2.start();
                    fadeOut(texto3);

                    fadeIn(texto2, 0);
                    fadeIn(keyUp, 0);
                    fadeIn(keyDown, 0);
                    fadeIn(keyLeft, 0);
                    fadeIn(keyRight, 0);

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
                    fadeOut(texto1);

                    // blueArrowUp_In.pause();
                    // fadeOut(blueArrowUp)
                    // blueArrowDown_In.pause();
                    // fadeOut(blueArrowDown);

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
                    fadeOut(keyUp);
                    fadeOut(keyDown);
                    fadeOut(keyLeft);
                    fadeOut(keyRight);

                    fadeIn(orange_keyUp, 0);
                    fadeIn(orange_keyDown, 0);
                    fadeIn(orange_keyLeft, 0);
                    fadeIn(orange_keyRight, 0);


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


        var txt1_in = game.add.tween(texto1).to({ alpha: 1 }, 500, 'Linear', false, 500, 0, false);

        // var blueArrowUp_In = game.add.tween(blueArrowUp).to({ alpha: 1 }, 750, 'Linear', false, 500, 0, true);
        // var blueArrowDown_In = game.add.tween(blueArrowDown).to({ alpha: 1 }, 750, 'Linear', false, 3500, 0, true);

        function pulse(elem, delay) {
            var elemPulse = game.add.tween(elem).to({ alpha: 1 }, 750, 'Linear', true, delay, 0, true);
        }

        function pressButton(elem, scaleFx, delay) {
            var elemPressed = game.add.tween(elem.scale).to({ x: scaleFx, y: scaleFx }, 750, 'Linear', true, delay, -1, true);
        };

        var upKeyPressed = game.add.tween(keyUp.scale).to({ x: .45, y: .45 }, 750, 'Linear', false, 0, -1, true);
        var rightKeyPressed = game.add.tween(orange_keyRight.scale).to({ x: .45, y: .45 }, 750, 'Linear', true, 0, -1, true);

        function fadeIn(elem, delay) {
            var elemIn = game.add.tween(elem).to({ alpha: 1 }, 500, 'Linear', true, delay, 0, false);
        }

        function fadeOut(elem) {
            var elemOut = game.add.tween(elem).to({ alpha: 0 }, 500, 'Linear', true, 0, 0, false);
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
        // blueArrowUp_In.start();
        // blueArrowDown_In.start();

    },
    resize: function () {
        refreshCoordinates();

        this.background.x = centerX;
        this.background.y = centerY;

        title.x = centerX;

        fish.x = gameWidth * .73;
        fish.y = centerY;

        fish2.x = gameWidth * .73;
        fish2.y = centerY;

        if (userDevice == "Smartphone") {
            texto1.x = centerX;
            texto1.y = centerY * .45;
    
            texto2.x = centerX;
            texto2.y = centerY * .45;
    
            texto3.x = centerX;
            texto3.y = centerY * .45;            
        }
        if (userDevice !== "Smartphone") {
            texto1.x = centerX * .38;
            texto1.y = (centerY * .6) + 25;
    
            texto2.x = centerX * .38;
            texto2.y = (centerY * .6) + 25;
    
            texto3.x = centerX * .38;
            texto3.y = (centerY * .6) + 25;        
        }


        this.upKeyOriginX = gameWidth / 3;
        this.upkeyOriginY = gameHeight * .666;

        this.siguiente.x = centerX + 100;
        this.anterior.x = centerX - 100;

        if (userDevice !== "Smartphone") {
            this.homeButton.x = centerX * .666;
            this.homeButton.y = gameHeight - 50;
            this.homeButtonTxt.x = centerX * .666;
            this.homeButtonTxt.y = gameHeight - 50;

            this.demoButton.x = centerX * 1.333;
            this.demoButton.y = gameHeight - 50;
            this.demoButtonTxt.x = centerX * 1.333;
            this.demoButtonTxt.y = gameHeight - 50;
        }

    }
}

