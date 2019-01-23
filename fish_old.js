// FISH from left side

function FishLeft(game) {
  this.game = game;

  this.x = 0;
  this.y = this.game.canvas.height - (Math.floor(Math.random() * (this.game.canvas.height/2 - 50) + 50));
  
  this.img = new Image();
  this.img.src = "img/fishLeft.png";
  
  // medidas de la imagen a representar en el canvas
  this.w = 30; 
  this.h = 15; 
  // número de imágenes diferentes
  this.img.frames = 8;
  this.img.frameIndex = 0;

  this.dx = Math.floor(Math.random() * (5 - 1) + 1);
};

FishLeft.prototype.draw = function() {
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

FishLeft.prototype.move = function() {
  this.x += this.dx;
};

FishLeft.prototype.animateImg = function() {
  if (this.game.framesCounter % 4 === 0) {
    this.img.frameIndex += 1;

    if (this.img.frameIndex > 2) this.img.frameIndex = 0;
  }
};


// FISH from right side

function FishRight(game) {
  this.game = game;

  this.x = this.game.canvas.width;
  this.y = this.game.canvas.height - (Math.floor(Math.random() * (this.game.canvas.height/2 - 50) + 50));
  
  this.img = new Image();
  this.img.src = "img/fishRight.png";
  
  // medidas de la imagen a representar en el canvas
  this.w = 30; 
  this.h = 15; 
  // número de imágenes diferentes
  this.img.frames = 8;
  this.img.frameIndex = 0;

  this.dx = Math.floor(Math.random() * (5 - 1) + 1);
};

FishRight.prototype.draw = function() {
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

FishRight.prototype.move = function() {
  this.x -= this.dx;
};

FishRight.prototype.animateImg = function() {
  if (this.game.framesCounter % 4 === 0) {
    this.img.frameIndex += 1;

    if (this.img.frameIndex > 2) this.img.frameIndex = 0;
  }
};