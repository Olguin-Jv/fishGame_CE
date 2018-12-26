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

},
  create: function(){
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.title = game.add.text(50, 60, this.titulo, {fontSize: '40px', font: 'Montserrat'})
    this.title.resolution = 1;

    this.texto1 = game.add.text(50, 140, this.txt1, {fontSize: '24px'})
    this.texto2 = game.add.text(50, 140, this.txt2, {fontSize: '24px'});

    this.keyUp = game.add.image(this.upKeyOriginX, this.upkeyOriginY, 'upKey').anchor.setTo(.5,.5);
    this.keyDown = game.add.image(this.upKeyOriginX, this.upkeyOriginY + 100, 'downKey').anchor.setTo(.5,.5);
    this.keyLeft = game.add.image(this.upKeyOriginX - 95, this.upkeyOriginY + 100, 'leftKey');
    this.keyLeft.anchor.setTo(.5,.5);
    
    this.keyRight = game.add.image(this.upKeyOriginX + 95, this.upkeyOriginY + 100, 'rightKey')
    this.keyRight.anchor.setTo(.5,.5);

    this.fish = game.add.sprite(game.world.centerX + 200, game.world.centerY + 20, 'fish');
    this.fish.anchor.setTo(.5,.5);
    this.fish.scale.setTo(.8);


  }
}