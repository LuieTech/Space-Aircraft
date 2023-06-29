const canvasId = "main-canvas";
const canvas = document.getElementById(canvasId);
const startBtn = document.getElementById("start-btn");

const game = new Game(canvasId);

window.addEventListener("keydown", (event) => {
  game.onKeyDown(event);
});

window.addEventListener("keyup", (event) => {
  game.onKeyUp(event);
});

canvas.style.display = "none";
startBtn.focus();

document.getElementById("start-btn").onclick = () => {
  startBtn.remove();
  canvas.style.display = "block";

  game.start();
};