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

    this.fps = 60;

    this.reset();

       
    this.intervalAir = setInterval(function () {
      this.air--;
      if (this.air === -1){
        this.gameOver();
      }
    }.bind(this), 1000);
       
    this.interval = setInterval(function () {
      this.clear(); 
      this.framesCounter++;
      
      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      };

      if (this.framesCounter % 300 === 0) {
        this.generateAll();
      };
    //  if (this.score != 0 && this.showOrca && this.framesCounter % this.orcaFrq == 0) {
    //    this.generateOrca();
    //    this.showOrca = false;
    //  }

    this.drawAll(); 
    this.moveAll();
     if(this.score >= 2 && this.score < 10){
       this.orca.draw();
       this.orca.move(this.player);
     };  
                
      this.clearAll();

      //todo: consider refactoring through code unification
      //this.catchFish("left")

      this.catchFishLeft();
      this.catchFishRight();
      
      if (this.sharkBiteLeft() || this.sharkBiteRight() || this.orcaBite()) {
        this.gameOver();
      }
    
    }.bind(this), 1000 / this.fps);
  },
    
  stop: function () {
    clearInterval(this.interval);
    clearInterval(this.intervalAir);
  },
  gameOver: function () {
    this.stop();
    this.gameOverSound.play();
    this.drawGameOverTitle();
  },

  drawGameOverTitle: function () {
    var textLength= 200;
    this.ctx.font = '70px Arial';
    this.ctx.fillText('Game Over', this.canvas.width/2-textLength, this.canvas.height/2);
  },
  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  generateAll: function () {
    this.enemiesLeft.push(new SharkLeft(this));
    this.enemiesRight.push(new SharkRight(this));
    this.fishLeft.push(new FishLeft(this));
    this.fishRight.push(new FishRight(this));
    this.ovals.push(new Oval(this));
      },
  generateOrca: function (){
    this.orcas.push(new Orca(this));
  },
  
  //todo: consider unifying repeated code
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

  //todo: replace hardcoded values with meaningful variables
  sharkBiteRight: function (/* xoffset, yoffset */) {
    return this.enemiesRight.some(function (enemy) {
      return (
        ((this.player.x + this.player.w) >= enemy.x + 20 &&
          this.player.x < (enemy.x + enemy.w - (enemy.w/3)) &&
          this.player.y + this.player.h >= enemy.y + 40) &&
          (enemy.y + enemy.h - 40) >= this.player.y
      );
    }.bind(this));
  },

  orcaBite: function () {
    return ((this.player.x + this.player.w) >= this.orca.x+(this.orca.w/3) &&
    this.player.x < (this.orca.x + this.orca.w - 20) &&
    this.player.y + this.player.h >= this.orca.y + 40 &&
    (this.orca.y + this.orca.h - 40) >= this.player.y);
  },



  //todo: write DRY code dont repeat yourself
  //  catchFish("fishLeft")
  catchFishLeft: function(){
     this.fishLeft.forEach(function (fish, i) {
      if ((this.player.x + this.player.w) >= fish.x+20 &&
          (this.player.x + 2*this.player.w/3) < (fish.x + fish.w) &&
          this.player.y + this.player.h >= fish.y &&
          (fish.y + fish.h) >= this.player.y) {
            this.fishLeft.splice(i, 1);
            this.score++;
            this.fishBiteSound.play();
          }  
    }.bind(this));
  },
  catchFishRight: function(){
    this.fishRight.forEach(function (fish, i) {
     if ((this.player.x + this.player.w) >= fish.x+20 &&
         (this.player.x + 2*this.player.w/3) < (fish.x + fish.w) &&
         this.player.y + this.player.h >= fish.y &&
         (fish.y + fish.h) >= this.player.y) {
           this.fishRight.splice(i, 1);
           this.score++;
           this.fishBiteSound.play();
         }  
   }.bind(this));
 },

  reset: function () {
    this.background = new DrawBackground(this);
    this.player = new Player(this);
    this.orca = new Orca (this)
    this.framesCounter = 0;
    this.enemiesLeft = [];
    this.enemiesRight = [];
    this.fishLeft = [];
    this.fishRight = [];
    this.scoreBoard = ScoreBoard;
    this.score = 0;
    this.airBoard = AirBoard;
    this.air = 210;
    this.ovals = [];
    this.breathSound = new Audio ("audio/breath.mp3");
    this.gameOverSound = new Audio ("audio/gameOver.mp3");
    this.fishBiteSound = new Audio ("audio/fishbite.mp3")
     
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
    }.bind(this));
    this.fishRight = this.fishRight.filter(function (enemy) {
      return enemy.x >= -200;
    });
    if (this.ovals.length > 1){
       this.ovals.shift()
    };
  },

  drawAll: function () {
    this.background.draw();
    this.drawScore();
    this.drawAir();
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
    if (this.air > 12) {
      this.ovals.forEach(function (oval) {
        oval.draw();
      });
    }; 
    this.player.draw();
  },
  moveAll: function () {
    this.player.breath();
    this.player.animateImg();
    this.player.move();
    this.player.setListeners();
    this.player.playerLimits();
    this.enemiesLeft.forEach(function (enemy) { enemy.move(); });
    this.enemiesRight.forEach(function (enemy) { enemy.move(); });
    this.fishLeft.forEach(function (fish) { fish.move(); });
    this.fishRight.forEach(function (fish) { fish.move(); });
    if (this.air > 12){
    this.ovals.forEach(function(oval){ oval.move(this.player);}.bind(this));
    };
  },

  drawScore: function () {
    this.scoreBoard.update(this.score, this.ctx)
  },
  drawAir: function () {
    this.airBoard.update(this.air, this.ctx)
  },
};
