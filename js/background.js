function DrawBackground(game) {
  this.game = game;

  this.img = new Image();
  this.img.src = './img/bg.png';

  this.x = 0;
  this.y = 0;

}

DrawBackground.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.game.canvas.width, this.game.canvas.height);
};