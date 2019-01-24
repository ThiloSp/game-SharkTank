var ScoreBoard = {
  update: function (score, ctx) {
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.fillText("Fish: "+Math.floor(score), 30, 30);
  }
}

var AirBoard = {
  update: function (air, ctx) {
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Breath: "+Math.floor(air)+ " s", 30, 70);
}
}