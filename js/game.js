var Game = {
  canvas: undefined,
  ctx: undefined,
  fps: 60,
  keys: {
    ArrowUp : 38,
    ArrowDown: 40,
    ArrowRight: 39,
    ArrowLeft: 37
  },
 

  start: function (canvasSelector) {
    this.canvas = document.getElementById(canvasSelector);
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight

    this._setCanvasDimensions;
    this.fps = 60;

    this.reset();
       
    this.interval = setInterval(function () {
      this.clear(); 
      this.framesCounter++;

      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }

      if (this.framesCounter % 300 === 0) {
        this.generateAll();
      }

      this.drawAll(); 
      this.moveAll();
      this.clearAll();

      if (this.sharkBiteLeft() || this.sharkBiteRight()) {
        this.gameOver();
      }
    }.bind(this), 1000 / this.fps);
    },

  stop: function () {
    clearInterval(this.interval);
  },
  gameOver: function () {
    this.stop();
  },
  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  generateAll: function () {
    this.enemiesLeft.push(new SharkLeft(this));
    this.enemiesRight.push(new SharkRight(this));
    this.fishLeft.push(new FishLeft(this));
    this.fishRight.push(new FishRight(this));
  },

  sharkBiteLeft: function () {
    return this.enemiesLeft.some(function (enemy) {
      return (
        ((this.player.x + this.player.w) >= enemy.x+(enemy.w/3) &&
          this.player.x < (enemy.x + enemy.w - 20) &&
          this.player.y + this.player.h >= enemy.y + 40) &&
          (enemy.y + enemy.h - 40) >= this.player.y
      );
    }.bind(this));
   },
   sharkBiteRight: function () {
    return this.enemiesRight.some(function (enemy) {
      return (
        ((this.player.x + this.player.w) >= enemy.x + 20 &&
          this.player.x < (enemy.x + enemy.w - (enemy.w/3)) &&
          this.player.y + this.player.h >= enemy.y + 40) &&
          (enemy.y + enemy.h - 40) >= this.player.y
      );
    }.bind(this));
   },

  reset: function () {
    this.background = new DrawBackground(this);
    this.player = new Player(this);
    this.framesCounter = 0;
    this.enemiesLeft = [];
    this.enemiesRight = [];
    this.fishLeft = [];
    this.fishRight = [];
  
  },
  clearAll: function () {
    this.enemiesLeft = this.enemiesLeft.filter(function (enemy) {
      return enemy.x <= this.canvas.width;
    }.bind(this));
    this.enemiesRight = this.enemiesRight.filter(function (enemy) {
      return enemy.x >= -200;
    });
    this.fishLeft = this.fishLeft.filter(function (enemy) {
      return enemy.x <= this.canvas.width;
    });
    this.fishRight = this.fishRight.filter(function (enemy) {
      return enemy.x >= -200;
    });
  },

  drawAll: function () {
    this.background.draw();
    this.player.draw();
    this.enemiesLeft.forEach(function (enemy) {
      enemy.draw();
    });
    this.enemiesRight.forEach(function (enemy) {
      enemy.draw();
    });
    this.fishLeft.forEach(function (fish) {
      fish.draw();
    });
    this.fishRight.forEach(function (fish) {
      fish.draw();
    });
  },
  moveAll: function () {
    this.player.animateImg();
    this.player.move();
    this.player.playerLimits();
    this.enemiesLeft.forEach(function (enemy) { enemy.move(); });
    this.enemiesRight.forEach(function (enemy) { enemy.move(); });
    this.fishLeft.forEach(function (fish) { fish.move(); });
    this.fishRight.forEach(function (fish) { fish.move(); });
  },

};