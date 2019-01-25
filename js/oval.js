function Oval (game) {
  this.game = game;
  this.centerX  
  this.centerY = this.game.canvas.height/8 
  this.radiusx = 30;
  this.radiusY= 15;
  this.radius1 = 15;
  this.radiusY1 = 7;
  this.radius2 = 2.5;
  this.radiusY2 = 1;
  this.transparency = 0.9;
}

Oval.prototype.draw = function () {
  this.transparency -= 0.01;
  this.radiusx +=1
  this.radiusY += 0.5
  this.radius1 += 1;
  this.radiusY1 += 0.5;
  this.radius2 += 1;
  this.radiusY2 += 0.5;
  
  if (this.radiusx < 100) {
  this.game.ctx.beginPath();
/*            ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]); */
  this.game.ctx.ellipse(this.centerX, this.centerY, this.radiusx, this.radiusY, 0, 0, 2 * Math.PI);
  this.game.ctx.fillStyle = 'rgba(255, 255, 255, '+this.transparency+')';
  this.game.ctx.fill();
  this.game.ctx.save();
  this.game.ctx.lineWidth = 1;
  this.game.ctx.strokeStyle = 'rgba(255, 255, 255,'+this.transparency+')';
  this.game.ctx.save();
  this.game.ctx.stroke();

  this.game.ctx.beginPath();
/*            ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]); */
  this.game.ctx.ellipse(this.centerX, this.centerY, this.radiusx/1.5, this.radiusY/1.5, 0, 0, 2 * Math.PI);
  this.game.ctx.fillStyle = 'rgba(255, 255, 255,'+this.transparency+')';
  this.game.ctx.fill();
  this.game.ctx.restore();
  this.game.ctx.save();
  this.game.ctx.stroke();

  this.game.ctx.beginPath();
  /*            ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]); */
  this.game.ctx.ellipse(this.centerX, this.centerY, this.radiusx/3, this.radiusY/3, 0, 0, 2 * Math.PI);
  this.game.ctx.fillStyle = 'rgba(255, 255, 255,'+this.transparency+')';
  this.game.ctx.fill();
  this.game.ctx.restore();
  this.game.ctx.stroke();

  };
};

Oval.prototype.move = function (player){
  if (player.y === player.surface){
    this.centerX = player.x + 2*player.w/3
    this.game.breathSound.play();
  }
};