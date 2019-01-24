function Player(game) {
  this.game = game;
 
  this.w = 150;
  this.h = 65;
  this.x = this.game.canvas.width * 0.5 - this.w/2;
  this.y = this.game.canvas.height * 0.3;
  this.vx = 0;
  this.vy = 0;
  
  this.surface = this.game.canvas.height/8

  this.img = new Image();
  this.img.src = "./img/dolphin.png";
  
 
  // número de imágenes diferentes
  this.img.frames = 3;
  this.img.frameIndex = 0;

};

Player.prototype.draw = function() {
  this.game.ctx.drawImage(
    this.img,
    this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
    0,
    Math.floor(this.img.width / this.img.frames),
    this.img.height,
    this.x,
    this.y,
    this.w,
    this.h
  );
};

Player.prototype.setListeners = function() {
  document.onkeydown = function(event) {
    if (event.keyCode === this.game.keys.ArrowUp) {
      this.vy = -2;
    } else if (event.keyCode === this.game.keys.ArrowDown){
      this.vy = 2;
    } else if (event.keyCode === this.game.keys.ArrowRight){
      this.vx = 2;
    } else if (event.keyCode === this.game.keys.ArrowLeft) {
      this.vx = -2;
    };
  }.bind(this);
};

Player.prototype.move = function() {
  var gravity = 0.01;
  this.vy += gravity
  this.y += this.vy;
  this.x += this.vx
 
};

Player.prototype.playerLimits = function(){
  if (this.y < this.surface) {
      this.y = this.surface;
  } else if (this.y > (this.game.canvas.height - this.h)){
      this.y = this.game.canvas.height - this.h;
  } else if (this.x < 0) {
      this.x = 0;
  } else if (this.x > (this.game.canvas.width - this.w)){
      this.x = this.game.canvas.width - this.w
  }
};

Player.prototype.animateImg = function() {
  // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
  if (this.game.framesCounter % 6 === 0) {
    this.img.frameIndex += 1;

    // Si el frame es el último, se vuelve al primero
    if (this.img.frameIndex > 2) this.img.frameIndex = 0;
  }
};

Player.prototype.breath = function(){
  if (this.y === this.surface) {
    this.game.air = 15;
  }
}
