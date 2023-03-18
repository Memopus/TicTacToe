const gameBoxes = document.querySelectorAll(".game-box");
const winAnnounce = document.querySelector(".winner");
const winDiv = document.querySelector(".win");
const Hwinner = document.querySelector(".winner");
const more = document.querySelector(".more");
const reset = document.querySelector(".reset");
const turn = document.querySelector(".sign");
let tie = 0;

let winnerFound = false;
winDiv.style.display = "none";

const winningAxe = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let winningAxes = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Player = (sign, name, turn) => {
  return { sign, name, turn };
};

const playerOne = Player("X", "Player One", true);
const playerTwo = Player("O", "Player Two", false);

let board = ["", "", "", "", "", "", "", "", ""];

window.addEventListener("click", (e) => {
  console.log(e);

  const gameBox = e.target;

  if (!gameBox.classList.contains("game-box")) {
    return;
  }

  if (gameBox.classList.contains("taken")) {
    return;
  }

  if (!playerOne.turn) turn.textContent = playerOne.sign;
  else if (!playerTwo.turn) turn.textContent = playerTwo.sign;

  if (winnerFound === false) {
    if (playerOne.turn) {
      gameBox.textContent = playerOne.sign;
      gameBox.classList.add("taken");
      playerOne.turn = false;
      playerTwo.turn = true;
    } else if (!playerOne.turn) {
      gameBox.textContent = playerTwo.sign;
      gameBox.classList.add("taken");
      playerTwo.turn = false;
      playerOne.turn = true;
    }
    board[gameBox.id - 1] = gameBox.textContent;
    console.log(board);
  }

  displayWinner(winningAxes, gameBox);
});

more.addEventListener("click", () => {
  resetBoard();
});

reset.addEventListener("click", () => {
  resetBoard();
});

function getWinner(winningAxes, gameBox) {
  for (let i = 0; i < winningAxes.length; i++) {
    for (let j = 0; j < winningAxes[i].length; j++) {
      if (gameBox.id - 1 === winningAxes[i][j])
        winningAxes[i][j] = gameBox.textContent;
      if (winningAxes[i].toString() === ["X", "X", "X"].toString()) {
        console.log(winningAxe[i]);
        let winningDivAxe = winningAxe[i];
        winAnnounce.textContent = "X Won";
        winnerFound = true;
        tie = 0;
        return { player: playerOne, winningDivAxe };
      } else if (winningAxes[i].toString() === ["O", "O", "O"].toString()) {
        console.log(winningAxe[i]);
        let winningDivAxe = winningAxe[i];
        winAnnounce.textContent = "O Won";
        winnerFound = true;
        tie = 0;
        return { player: playerTwo, winningDivAxe };
      }
    }
  }
  if (!board.includes("")) {
    return "none";
  }
}

function displayWinner(winningAxes, gameBox) {
  const win = getWinner(winningAxes, gameBox);

  if (win !== undefined && win !== "none") {
    const winner = getWinner(winningAxes, gameBox).player;
    const winningAxe = getWinner(winningAxes, gameBox).winningDivAxe;
    const winningDivs = [
      document.getElementById(`${winningAxe[0] + 1}`),
      document.getElementById(`${winningAxe[1] + 1}`),
      document.getElementById(`${winningAxe[2] + 1}`),
    ];

    console.log(winner);

    winningDivs.forEach((div) => {
      div.style.backgroundColor = "white";
      div.style.color = "black";

      setTimeout(() => {
        div.style.backgroundColor = "black";
        div.style.color = "white";
      }, 1000);
    });

    setTimeout(() => {
      winDiv.style.display = "flex";
    }, 1000);
    Hwinner.textContent = `${winner.name} (${winner.sign}) Won `;
  } else if (win === "none") {
    winDiv.style.display = "flex";
    Hwinner.textContent = `Tie`;
  }
}

function resetBoard() {
  board = ["", "", "", "", "", "", "", "", ""];

  winningAxes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  winDiv.style.display = "none";
  winnerFound = false;
  gameBoxes.forEach((gameBox) => {
    gameBox.textContent = "";
    gameBox.classList.remove("taken");
  });
  tie = 0;
}
