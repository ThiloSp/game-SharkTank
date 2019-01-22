// SHARK from left side

function SharkLeft(game) {
  this.game = game;

  this.x = -150;
  this.y = this.game.canvas.height - (Math.floor(Math.random() * (this.game.canvas.height - 50) + 50));
  
  this.img = new Image();
  this.img.src = "img/sharkLeft.png";
  
  // medidas de la imagen a representar en el canvas
  this.w = 150; 
  this.h = 60; 
  // número de imágenes diferentes
  this.img.frames = 2;
  this.img.frameIndex = 0;

  this.dx = Math.floor(Math.random() * (5 - 1) + 1);
};

SharkLeft.prototype.draw = function() {
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

SharkLeft.prototype.move = function() {
  this.x += this.dx;
};

SharkLeft.prototype.animateImg = function() {
  if (this.game.framesCounter % 4 === 0) {
    this.img.frameIndex += 1;

    if (this.img.frameIndex > 2) this.img.frameIndex = 0;
  }
};


// SHARK from right side

function SharkRight(game) {
  this.game = game;

  this.x = this.game.canvas.width;
  this.y = this.game.canvas.height - (Math.floor(Math.random() * (this.game.canvas.height - 50) + 50));
  
  this.img = new Image();
  this.img.src = "img/sharkRight.png";
  
  // medidas de la imagen a representar en el canvas
  this.w = 150; 
  this.h = 60; 
  // número de imágenes diferentes
  this.img.frames = 2;
  this.img.frameIndex = 0;

  this.dx = Math.floor(Math.random() * (5 - 1) + 1);
};

SharkRight.prototype.draw = function() {
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

SharkRight.prototype.move = function() {
  this.x -= this.dx;
};

SharkRight.prototype.animateImg = function() {
  if (this.game.framesCounter % 4 === 0) {
    this.img.frameIndex += 1;

    if (this.img.frameIndex > 2) this.img.frameIndex = 0;
  }
};