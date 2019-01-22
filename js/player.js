function Player(game) {
  this.game = game;
 
  this.x = this.game.canvas.width * 0.3;
  this.y = this.game.canvas.height * 0.5;
  
  this.img = new Image();
  this.img.src = "./img/dolphin.png";
  
  // medidas de la imagen a representar en el canvas
  this.w = 150;
  this.h = 65;
  // número de imágenes diferentes
  this.img.frames = 3;
  this.img.frameIndex = 0;


  this.setListeners();
};

Player.prototype.draw = function() {
  this.game.ctx.drawImage(
    this.img,
    this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
    0,
    Math.floor(this.img.width / this.img.frames),
    this.img.height,
   /*  0,
    0,
    1456,
    200, */
    this.x,
    this.y,
    this.w,
    this.h
  );
  
  this.animateImg();

};

Player.prototype.setListeners = function() {
  document.onkeydown = function(event) {
    if (event.keyCode === this.game.keys.ArrowUp) {
      this.y -= 10;
    } else if (event.keyCode === this.game.keys.ArrowDown){
      this.y += 10;
    } else if (event.keyCode === this.game.keys.ArrowRight){
      this.x += 10;
    } else if (event.keyCode === this.game.keys.ArrowLeft) {
      this.x -= 10;
    };
  }.bind(this);
};

Player.prototype.move = function() {
   var gravity = 0.5;

    this.y += gravity

};

Player.prototype.animateImg = function() {
  // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
  if (this.game.framesCounter % 6 === 0) {
    this.img.frameIndex += 1;

    // Si el frame es el último, se vuelve al primero
    if (this.img.frameIndex > 2) this.img.frameIndex = 0;
  }
};
