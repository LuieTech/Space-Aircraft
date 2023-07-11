const canvasId = "main-canvas";
const canvas = document.getElementById(canvasId);
const canvasContainer = document.getElementById("canvas")
const startBtn = document.getElementById("start-btn");
const introScreen = document.getElementById("intro-screen")

const game = new Game(canvasId);

window.addEventListener("keydown", (event) => {
  game.onKeyDown(event);
});

window.addEventListener("keyup", (event) => {
  game.onKeyUp(event);
});


document.getElementById("start-btn").onclick = () => {
  
  introScreen.remove()
  canvasContainer.classList.remove("hidden");

  game.start();
};