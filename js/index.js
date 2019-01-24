// window.onload = function() {
//   Game.start("canvasID");
// };

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    var x = document.getElementById("start-div")
    x.style.display = "none";
    Game.start("canvasID");
  };
};
