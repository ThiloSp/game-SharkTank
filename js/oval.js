function Oval (game) {
  this.game = game;
  this.centerX  
  this.centerY = this.game.canvas.height/8 
  this.radius = 80;
  this.radiusY= 35;
}

Oval.prototype.draw = function () {

  this.game.ctx.beginPath();
/*            ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]); */

  this.game.ctx.ellipse(this.centerX, this.centerY, this.radius, this.radiusY, 0, 0, 2 * Math.PI);


  // apply styling
  this.game.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  this.game.ctx.fill();
  this.game.ctx.lineWidth = 1;
  this.game.ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
  this.game.ctx.stroke();
};

Oval.prototype.move = function (player){
  if (player.y === player.surface){
    this.centerX = player.x + 2*player.w/3
  }
};