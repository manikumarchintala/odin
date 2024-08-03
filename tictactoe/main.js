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
    gameboard: new Array(9),
  };
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
    console.log(item.getAttribute("value"));
    let dum = signdecider(GameBoard.count);
    GameBoard.gameboard[item.getAttribute("value") - 1] = dum;
    item.innerText = dum;
  });
  function validator(arr) {}
  //Don't change this;
});
