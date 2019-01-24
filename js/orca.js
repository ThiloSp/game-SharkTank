function Orca (game) {
  this.game = game;

  this.w = 400; 
  this.h = this.w/2;
  this.y = this.game.canvas.height/8 + (Math.floor(Math.random() * ((this.game.canvas.height - 2*this.h)- this.game.canvas.height/8) + this.game.canvas.height/8));
  this.x = -this.w;
  this.img = new Image();
  this.img.src = "img/orcaFirstLine.png";
  // número de imágenes diferentes
  this.img.frames = 3;
  this.img.frameIndex = 0;

  this.dx = 1.5;
};

Orca.prototype.draw = function() {

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
  this.animateImg();
};

Orca.prototype.animateImg = function() {
  if (this.game.framesCounter % 12 === 0) {
    this.img.frameIndex += 1;

    if (this.img.frameIndex > 2) this.img.frameIndex = 0;
  }
};
// Orca.prototype.move = function() {
//   this.x += this.dx;
// };

Orca.prototype.move = function (player){
    if (player.y > this.y) {
    this.y += this.dx;
  }  if (player.y < this.y) {
    this.y -= this.dx;
  }   if (player.x > this.x) {
    this.x += this.dx;
  }   if (player.x < this.x) {
    this.x -= this.dx;
  }
};
