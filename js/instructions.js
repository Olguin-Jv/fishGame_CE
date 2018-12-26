demo.instructions = function(){

    this.upKeyOriginX = 250;
    this.upkeyOriginY = 400;

    this.fish;
    this.titulo = "Instrucciones";
    this.txt1 = "Este pez tiene un frente,\ny una cola";
    this.txt2 = "Cada vez que vea el pez azul\ndeberá presionar la flecha\nindicando hacia donde está el frente.";
};
demo.instructions.prototype = {
  preload: function(){

    game.load.spritesheet('fish', gameSettings.fishSprite, 110, 347, 2);
    game.load.image('upKey', gameSettings.upKey);
    game.load.image('downKey', gameSettings.downKey);
    game.load.image('leftKey', gameSettings.leftKey);
    game.load.image('rightKey', gameSettings.rightKey);
    game.load.image('blueArrow', gameSettings.blueArrow);
},
  create: function(){
    
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.title = game.add.text(50, 60, this.titulo, {fontSize: '40px', font: 'Montserrat'});
    this.title.resolution = 1;

    this.texto1 = game.add.text(50, 140, this.txt1, {fontSize: '24px'});

    this.texto2 = game.add.text(50, 140, this.txt2, {fontSize: '24px'});
    this.texto2.alpha = 0;

    this.keyUp = game.add.image(this.upKeyOriginX, this.upkeyOriginY, 'upKey');
    this.keyUp.anchor.setTo(.5,.5);
    this.keyUp.scale.setTo(.7);

    this.keyDown = game.add.image(this.upKeyOriginX, this.upkeyOriginY + 70, 'downKey');
    this.keyDown.anchor.setTo(.5,.5);
    this.keyDown.scale.setTo(.7);
    
    this.keyLeft = game.add.image(this.upKeyOriginX - 66, this.upkeyOriginY + 70, 'leftKey');
    this.keyLeft.anchor.setTo(.5,.5);
    this.keyLeft.scale.setTo(.7);

    this.keyRight = game.add.image(this.upKeyOriginX + 66, this.upkeyOriginY + 70, 'rightKey')
    this.keyRight.anchor.setTo(.5,.5);
    this.keyRight.scale.setTo(.7);

    this.blueArrowUp = game.add.image(game.world.centerX + 208, game.world.centerY - 180, 'blueArrow');
    this.blueArrowUp.anchor.setTo(.5,.5);
    this.blueArrowUp.angle = 90;
    this.blueArrowUp.scale.setTo(.1);

    this.blueArrowDown = game.add.image(game.world.centerX + 208, game.world.centerY + 210, 'blueArrow')
    this.blueArrowDown.anchor.setTo(.5,.5);
    this.blueArrowDown.angle = -90;
    this.blueArrowDown.scale.setTo(.1);    

    this.fish = game.add.sprite(game.world.centerX + 200, game.world.centerY + 20, 'fish');
    this.fish.anchor.setTo(.5,.5);
    this.fish.scale.setTo(.8);
  }
}