document.addEventListener("DOMContentLoaded", () => {
  class player {
    constructor(name, symbol) {
      this.name = name;
      this.symbol = symbol;
    }
  }
  const GameBoard = {
    player1: new player("mani", "X"),
    player2: new player("sai", "O"),
    count: 0,
    gameboard: new Array(9).fill(""),
    reset() {
      this.gameboard = new Array(9).fill("");
      this.count = 0;
      document
        .querySelectorAll(".cell")
        .forEach((cell) => (cell.innerText = ""));
      console.log(GameBoard);
    },
  };
  let player1 = document.getElementById("player1");
  player1.innerText = GameBoard.player1.name;
  let player2 = document.getElementById("player2");
  player2.innerText = GameBoard.player2.name;
  let game = document.getElementById("newgame");
  game.addEventListener("click", GameBoard.reset);
  function signdecider(i) {
    let innersymbol;
    if (i % 2 === 0) {
      innersymbol = "X";
      GameBoard.count++;
    } else {
      innersymbol = "O";
      GameBoard.count++;
    }
    return innersymbol;
  }
  let middle = document.getElementById("middle");
  middle.addEventListener("click", (event) => {
    const item = event.target.closest(".cell");
    if (item && !item.innerText) {
      console.log(item.getAttribute("value"));
      let dum = signdecider(GameBoard.count);
      GameBoard.gameboard[item.getAttribute("value") - 1] = dum;
      item.innerText = dum;
      console.log(GameBoard.gameboard);
      if (validator(GameBoard.gameboard)) {
        alert(`${dum} wins!`);
      } else if (!GameBoard.gameboard.includes("")) {
        alert("It's a draw!");
      }
    }
  });
  function validator(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] && arr[i] === arr[i + 1] && arr[i + 1] === arr[i + 2]) {
        console.log("_");
        return true;
      }
    }
    for (let i = 0; i < 3; i++) {
      if (arr[i] && arr[i] === arr[i + 3] && arr[i + 3] === arr[i + 6]) {
        console.log("!");
        return true;
      }
    }
    if (arr[0] && arr[0] === arr[4] && arr[4] === arr[8]) {
      console.log("|");
      return true;
    }
    if (arr[2] && arr[2] === arr[4] && arr[4] === arr[6]) {
      console.log("/");
      return true;
    }
    return false;
  }
  //Don't change this;
});
