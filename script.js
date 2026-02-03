document.addEventListener("DOMContentLoaded", function () {
  const gameArena = document.getElementById("game-arena");
  const arenaSize = 600;
  const cellSize = 20;
  let score = 0;
  let gameStarted = false;
  let food = { x: 300, y: 200 }; // {x: 15*20, y:10*20} -> cell coordinate in pixels
  let snake = [
    { x: 160, y: 200 },
    { x: 140, y: 200 },
    { x: 120, y: 200 },
  ];

  function drawDiv(x, y, className) {
    const divElement = document.createElement("div");
    divElement.classList.add(className);
    divElement.style.left = `${x}px`;
    divElement.style.top = `${y}px`;
    return divElement;
  }

  function drawFoodAndSnake() {
    gameArena.innerHTML = ""; // clear the game arena

    // redraw with new position

    snake.forEach((snakeCell) => {
      const snakeElement = drawDiv(snakeCell.x, snakeCell.y, "snake");
      gameArena.appendChild(snakeElement);
    });

    const foodElement = drawDiv(food.x, food.y, "food");
    gameArena.appendChild(foodElement);
  }

  function runGame() {
    if (!gameStarted) {
      gameStarted = true;
      // gameLoop();

      drawFoodAndSnake();
    }
  }

  function initiateGame() {
    const scoreBoard = document.createElement("div");
    scoreBoard.id = "score-board";

    document.body.insertBefore(scoreBoard, gameArena); // it will insert before the game arena

    const startButton = document.createElement("button");
    startButton.textContent = "Start Game";
    startButton.classList.add("start-button");
    document.body.appendChild(startButton); // this will append the child after the script

    startButton.addEventListener("click", function startGame() {
      startButton.style.display = "none";

      runGame();
    });
  }

  initiateGame();
});
