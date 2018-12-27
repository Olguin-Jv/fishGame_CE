demo.instructions = function () {

    this.upKeyOriginX = 300;
    this.upkeyOriginY = 340;

    this.fish;
    this.titulo = "Instrucciones";
    this.txt1 = "Este pez tiene un frente";
    this.txt1_2 = "y una cola."
    this.txt2 = "Cada vez que vea el pez azul\ndeberá presionar la flecha\nindicando hacia donde está el frente.";
    this.txt3 = "Si aparece el Helicoptero Rojo,\ndebera presionar la flecha que\nindique hacia donde se está\nmoviendo."

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

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.stage.disableVisibilityChange = true;

        this.background = this.add.image(0, 0, 'background');
        this.background.alpha = 0;
        this.bgIn = this.add.tween(this.background).to({ alpha: 1 }, 1000, 'Linear', true, 0, 0, false);

        this.titleStyle = { fontSize: '40px', fontWeight: 'bold', font: 'Montserrat' }
        this.txtStyle = { fontSize: '24px', font: 'Montserrat' };
        this.buttonStyle = { fontSize: '24px', font: 'Montserrat' };

        title = this.add.text(155, 60, this.titulo, { fontSize: '40px', fontWeight: 'bold', font: 'Montserrat' });
        title.alpha = 0;
        title.resolution = 1;

        texto1 = this.add.text(190, game.world.centerY - 50, this.txt1, this.txtStyle);
        texto1.alpha = 0;

        texto1_2 = this.add.text(192, game.world.centerY - 20, this.txt1_2, this.txtStyle);
        texto1_2.alpha = 0;

        texto2 = this.add.text(155, 140, this.txt2, this.txtStyle);
        texto2.alpha = 0;

        texto3 = this.add.text(155, 140, this.txt3, this.txtStyle);
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

        blueArrowUp = this.add.image(game.world.centerX + 208, game.world.centerY - 130, 'blueArrow');
        blueArrowUp.anchor.setTo(.5, .5);
        blueArrowUp.scale.setTo(.1);
        blueArrowUp.angle = 90;
        blueArrowUp.alpha = 0;

        blueArrowDown = game.add.image(game.world.centerX + 208, game.world.centerY + 160, 'blueArrow')
        blueArrowDown.anchor.setTo(.5, .5);
        blueArrowDown.scale.setTo(.1);
        blueArrowDown.angle = -90;
        blueArrowDown.alpha = 0;

        arrowUp = game.add.image(700 + 25, game.world.centerY, 'blueArrow');
        arrowUp.anchor.setTo(.5, .5);
        arrowUp.scale.setTo(.1);
        arrowUp.angle = -90;
        arrowUp.alpha = 0;

        arrowLeft = game.add.image(game.world.centerX + 250, 140, 'blueArrow');
        arrowLeft.anchor.setTo(.5, .5);
        arrowLeft.scale.setTo(.1);
        // arrowLeft.angle = -90;
        arrowLeft.alpha = 0;


        fish = this.add.sprite(game.world.centerX + 225, game.world.centerY + 20, 'fish');
        fish.anchor.setTo(.5, .5);
        fish.scale.setTo(.6);
        fish.alpha = 0;

        fish2 = this.add.sprite(game.world.centerX + 225, game.world.centerY + 20, 'fish');
        fish2.anchor.setTo(.5, .5);
        fish2.scale.setTo(.6);
        fish2.alpha = 0;
        fish2.frame = 1;

        this.siguiente = this.add.button(700, 550, 'button', nextPage);
        this.siguiente.anchor.setTo(.5, .5);
        this.siguiente.scale.setTo(.3);

        this.anterior = this.add.button(100, 550, 'button', prevPage);
        this.anterior.anchor.setTo(.5, .5);
        this.anterior.scale.setTo(.3);
        this.anterior.angle = -180;

        this.homeButton = this.add.button(game.world.centerX -125, 550, 'homeButton', backToMenu);
        this.homeButton.anchor.setTo(.5, .5);
        this.homeButton.scale.setTo(.8);
        this.add.text(game.world.centerX -125, 550, 'Volver al menú', this.buttonStyle).anchor.setTo(.5,.5);

        this.demoButton = this.add.button(game.world.centerX +125, 550, 'homeButton', goDemoMode);
        this.demoButton.anchor.setTo(.5, .5);
        this.demoButton.scale.setTo(.8);
        this.add.text(game.world.centerX +125, 550, 'Jugar prueba', this.buttonStyle).anchor.setTo(.5,.5)

        function goDemoMode(){
            game.state.start('playGame');
            gameVersion = false;
        };

        function prevPage() {

            switch (pageNum) {
                case 1:
                    console.log('no existe página previa');
                    return;
                    break;
                case 2:
                    fadeIn(texto1, 0);
                    fadeIn(texto1_2, 1500);
                    blueArrowDown.x -= 25;
                    blueArrowUp.x -= 25;
                    pulse(blueArrowUp, 500);
                    pulse(blueArrowDown, 1500);
                    fadeOut(texto2);
                    fadeOut(keyUp);
                    fadeOut(keyDown);
                    fadeOut(keyLeft);
                    fadeOut(keyRight);

                    pulseArrowUp.pause();
                    fadeOut(arrowUp);
                    
                    pageNum--;
                    break;
                case 3:
                    fadeIn(texto2, 0);
                    keyUp.scale.setTo(.7);
                    rightKeyPressed.pause();
                    upKeyPressed.start();
                    upKeyPressed.resume();
                    fadeIn(arrowUp);
                    pressButton(arrowUp, .15, 0);
                    fadeIn(fish);
                    orangeFishToRight.pause();
                    orangeFishOut.pause();
                    orangeFishIn.pause();
                    fadeOutFish2.start();
                    fadeOut(texto3);

                    fadeOut(arrowLeft);// ARROW LEFT OUT
                    pulseArrowLeft.pause();

                    pageNum--;
                    break;

                default:
                    break;
            }
            console.log('en página: ' + pageNum)
            console.log('algo');
        };

        function nextPage() {

            switch (pageNum) {
                case 0:
                    fadeIn(title, 0);
                    fadeIn(texto1, 0);
                    fadeIn(fish, 0);
                    console.log(pageNum);
                    break;
                case 1:
                    fadeOut(texto1);
                    fadeOut(texto1_2);
                    fadeOut(blueArrowDown);
                    fadeOut(blueArrowUp)
                    fadeIn(texto2, 0);
                    fadeIn(keyUp, 0);
                    fadeIn(keyDown, 0);
                    fadeIn(keyLeft, 0);
                    fadeIn(keyRight, 0);

                    upKeyPressed.start();
                    upKeyPressed.resume();

                    fadeIn(arrowUp);
                    pulseArrowUp.start();
                    pulseArrowUp.resume();
                    // pressButton(arrowUp, .15, 0);
                    pageNum++;
                    break;
                case 2:
                    fadeOut(texto2);
                    pulseArrowUp.pause();
                    fadeOut(arrowUp);
                    fadeOut(fish);
                    upKeyPressed.pause();
                    rightKeyPressed.start();
                    rightKeyPressed.resume();
                    fish2In.start();
                    orangeFishToRight.resume();
                    orangeFishOut.resume();
                    orangeFishIn.resume();
                    fadeIn(texto3);

                    fadeIn(arrowLeft);//ARROW LEFT IN
                    pulseArrowLeft.start();
                    pulseArrowLeft.resume();

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

        fadeIn(title, 0);
        fadeIn(texto1, 1500);
        fadeIn(texto1_2, 2500);
        fadeIn(fish, 0);
        pulse(blueArrowUp, 1500);
        pulse(blueArrowDown, 2500);

        function pulse(elem, delay) {
            var elemPulse = game.add.tween(elem).to({ alpha: 1 }, 750, 'Linear', true, delay, 0, true);
        }

        function pressButton(elem, scaleFx, delay) {
            var elemPressed = game.add.tween(elem.scale).to({ x: scaleFx, y: scaleFx }, 750, 'Linear', true, delay, -1, true);
        };
        
        var upKeyPressed = game.add.tween(keyUp.scale).to({ x: .6, y: .6 }, 750, 'Linear', false, 0, -1, true);
        var rightKeyPressed = game.add.tween(keyRight.scale).to({ x: .6, y: .6 }, 750, 'Linear', false, 0, -1, true);
        var pulseArrowUp = game.add.tween(arrowUp.scale).to({ x: .15, y: .15 }, 750, 'Linear', false, 0, -1, true);
        var pulseArrowLeft = game.add.tween(arrowLeft.scale).to({ x: .15, y: .15 }, 750, 'Linear', false, 0, -1, true);


        function fadeIn(elem, delay) {
            var elemIn = game.add.tween(elem).to({ alpha: 1, x: '-25' }, 250, 'Linear', true, delay, 0, false);
        }

        function fadeOut(elem) {
            var elemOut = game.add.tween(elem).to({ alpha: 0, x: '+25' }, 250, 'Linear', true, 0, 0, false);
        }


        var fadeOutFish2 = game.add.tween(fish2).to({ alpha: 0, x: '+25' }, 250, 'Linear', false, 0, 0, false);
        fadeOutFish2.onComplete.add(fadeFish2, this);
        function fadeFish2(){
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
    }
}

