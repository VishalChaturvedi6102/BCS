const board = document.getElementById("board");
const diceResult = document.getElementById("dice-result");
const playerPosText = document.getElementById("player-position");

let playerPosition = 1;

const snakes = {
  99: 54,
  70: 55,
  52: 42,
  25: 2,
  95: 72
};

const ladders = {
  6: 25,
  11: 40,
  17: 69,
  46: 90,
  60: 85
};

for (let row = 9; row >= 0; row--) {
  for (let col = 0; col < 10; col++) {
    let cellNum;
    if (row % 2 === 0) {
      cellNum = row * 10 + col + 1;
    } else {
      cellNum = row * 10 + (9 - col) + 1;
    }
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.id = `cell-${cellNum}`;
    cell.innerText = cellNum;
    board.appendChild(cell);
  }
}

function rollDice() {
  const dice = Math.floor(Math.random() * 6) + 1;
  diceResult.textContent = `Dice: ${dice}`;
  let nextPos = playerPosition + dice;
  if (nextPos > 100) return;
  if (snakes[nextPos]) {
    nextPos = snakes[nextPos];
    alert("🐍 Oh no! Bitten by a snake!");
  } else if (ladders[nextPos]) {
    nextPos = ladders[nextPos];
    alert("🎉 Yay! Climbed a ladder!");
  }
  updatePlayer(nextPos);
  if (nextPos === 100) {
    alert("🎊 You won!");
  }
}

function updatePlayer(newPosition) {
  const prevCell = document.getElementById(`cell-${playerPosition}`);
  if (prevCell) {
    const prevToken = prevCell.querySelector(".player");
    if (prevToken) prevToken.remove();
  }
  const newCell = document.getElementById(`cell-${newPosition}`);
  const playerToken = document.createElement("div");
  playerToken.className = "player";
  newCell.appendChild(playerToken);
  playerPosition = newPosition;
  playerPosText.textContent = `Player Position: ${playerPosition}`;
}

updatePlayer(playerPosition);
