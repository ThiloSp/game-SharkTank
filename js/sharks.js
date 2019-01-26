function Shark(game) {
  this.game = game;

  this.w = 200; 
  this.h = 80;
  this.y = this.game.canvas.height/8 + (Math.floor(Math.random() * ((this.game.canvas.height - 2*this.h)- this.game.canvas.height/8) + this.game.canvas.height/8));
  this.img = new Image();
  // number of pics
  this.img.frames = 2;
  this.img.frameIndex = 0;

  this.dx = Math.floor(Math.random() * (5 - 1) + 1);
};

Shark.prototype.draw = function() {
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

Shark.prototype.animateImg = function() {
  if (this.game.framesCounter % 15 === 0) {
    this.img.frameIndex += 1;

    if (this.img.frameIndex > 1) this.img.frameIndex = 0;
  }
};

// SHARK from left side

function SharkLeft (game) {
  Shark.apply(this,[game]);
  this.x = -150;
  this.img.src = "img/sharkLeft.png";

};
SharkLeft.prototype = Object.create(Shark.prototype)
SharkLeft.prototype.constructor = SharkLeft;
SharkLeft.prototype.move = function() {
  this.x += this.dx;
};

// SHARK from right side

function SharkRight(game) {
  Shark.apply(this,[game]);
  this.x = this.game.canvas.width;
  this.img.src = "img/sharkRight.png";
};
SharkRight.prototype = Object.create(Shark.prototype)
SharkRight.prototype.constructor = SharkRight;
SharkRight.prototype.move = function() {
  this.x -= this.dx;
};