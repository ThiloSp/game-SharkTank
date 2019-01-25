function Fish(game) {
  this.game = game;
  this.y = this.game.canvas.height - (Math.floor(Math.random() * (this.game.canvas.height/2 - 50) + 50));
  this.img = new Image();
  
  this.w = 30; 
  this.h = 15; 
  // number of pics
  this.img.frames = 8;
  this.img.frameIndex = 0;

  this.dx = Math.floor(Math.random() * (5 - 1) + 1);
};
Fish.prototype.draw = function() {
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
Fish.prototype.animateImg = function() {
  if (this.game.framesCounter % 4 === 0) {
    this.img.frameIndex += 1;

    if (this.img.frameIndex > 7) this.img.frameIndex = 0;
  }
};

// FISH from left side

function FishLeft(game) {
  Fish.apply(this,[game])
  this.x = 0;
  this.img.src = "img/fishLeft.png";
};
FishLeft.prototype = Object.create(Fish.prototype);
FishLeft.prototype.constructor = FishLeft;
FishLeft.prototype.move = function() {
  this.x += this.dx;
};

// FISH from right side

function FishRight(game) {
  Fish.apply(this,[game])
  this.x = this.game.canvas.width;
  this.img.src = "img/fishRight.png";
};
FishRight.prototype = Object.create(Fish.prototype);
FishRight.prototype.constructor = FishRight;
FishRight.prototype.move = function() {
  this.x -= this.dx;
};