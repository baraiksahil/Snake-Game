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
  ]; // [head, head, tail]

  let dx = cellSize;
  let dy = 0;
  let intervalId;
  let gameSpeed = 200;

  function moveFood() {
    let newX, newY;
    do {
      newX = Math.floor(Math.random() * 30) * cellSize;
      newY = Math.floor(Math.random() * 30) * cellSize;
    } while (
      snake.some((snakeCell) => snakeCell.x === newX && newY === snakeCell.y)
    );

    food = { x: newX, y: newY };
  }

  function isGameOver() {
    // body collision
    for (let i = 1; i < snake.length; i++) {
      if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
        return true;
      }
    }
    // wall collision
    const hitLeftWall = snake[0].x < 0; // snake[0] -> head
    const hitRightWall = snake[0].x > arenaSize - cellSize;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > arenaSize - cellSize;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
  }

  function updateSnake() {
    const newHead = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(newHead); // adding new head of the snake

    // check if collison
    if (newHead.x === food.x && newHead.y === food.y) {
      score += 10;
      moveFood();
      if (gameSpeed > 50) {
        clearInterval(intervalId);
        gameSpeed -= 10;
        gameLoop();
      }
    } else {
      snake.pop(); // remove head
    }
  }

  function changeDirection(event) {
    console.log("Key Pressed", event);

    const isGoingUp = dy === -cellSize;
    const isGoingDown = dy === cellSize;
    const isGoingRight = dx === cellSize;
    const isGoingLeft = dx === -cellSize;

    if (event.key === "ArrowUp" && !isGoingDown) {
      dx = 0;
      dy = -cellSize;
    } else if (event.key === "ArrowDown" && !isGoingUp) {
      dx = 0;
      dy = cellSize;
    } else if (event.key === "ArrowLeft" && !isGoingRight) {
      dx = -cellSize;
      dy = 0;
    } else if (event.key === "ArrowRight" && !isGoingLeft) {
      dx = cellSize;
      dy = 0;
    }
  }

  function drawDiv(x, y, className) {
    const divElement = document.createElement("div");
    divElement.classList.add(className);
    divElement.style.left = `${x}px`;
    divElement.style.top = `${y}px`;
    return divElement;
  }

  function drawScoreBoard() {
    const scoreBoard = document.getElementById("score-board");
    scoreBoard.textContent = `Score ${score}`;
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

  function gameLoop() {
    intervalId = setInterval(() => {
      if (isGameOver()) {
        clearInterval(intervalId);
        gameStarted = false;
        return;
      }
      updateSnake();
      drawFoodAndSnake();
      drawScoreBoard();
    }, gameSpeed);
  }

  function runGame() {
    if (!isGameOver()) {
      gameStarted = true;
      gameLoop();
      document.addEventListener("keydown", changeDirection);
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
