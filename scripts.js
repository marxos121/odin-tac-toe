const gameBoard = (function () {
  const _board = Array(9);
  let _filled = 0;

  function check() {
    let resLeftDiag = 0; // \
    let resRightDiag = 0; // /

    for (let i = 0; i != 3; ++i) {
      //Check diagonals
      resLeftDiag +=
        _board[i * 3 + i] === " " ? 0 : _board[i * 3 + i] === "X" ? 1 : -1;
      resRightDiag +=
        _board[i * 3 + (2 - i)] === " "
          ? 0
          : _board[i * 3 + (2 - i)] === "X"
          ? 1
          : -1;

      if (resLeftDiag === 3 || resRightDiag === 3) {
        return "X";
      } else if (resLeftDiag === -3 || resRightDiag === -3) {
        return "O";
      }

      //Check rows and columns
      let resRow = 0;
      let resCol = 0;
      for (let j = 0; j != 3; ++j) {
        resRow +=
          _board[i * 3 + j] === " " ? 0 : _board[i * 3 + j] === "X" ? 1 : -1;
        resCol +=
          _board[j * 3 + i] === " " ? 0 : _board[j * 3 + i] === "X" ? 1 : -1;

        if (resRow === 3 || resCol === 3) {
          return "X";
        } else if (resRow === -3 || resCol === -3) {
          return "O";
        }
      }
    }

    if (_filled === 9) {
      return "draw";
    }

    return "nc";
  }

  function move(move, symbol) {
    if (_board[move] === " ") {
      _board[move] = symbol;
      ++_filled;
      return true;
    } else {
      return false;
    }
  }

  function clear() {
    _board.fill(" ");
    _filled = 0;
  }

  function print() {
    _board.forEach((cell) => console.log(cell));
  }

  _board.fill(" ");
  return { move, check, clear, print };
})();

const game = (function () {
  let _currentPlayer = "O";
  let _acceptInput = true;
  let _res = "nc";

  function play(cell) {
    if (!_acceptInput || !gameBoard.move(cell, _currentPlayer)) {
      return;
    }

    _res = gameBoard.check();
    _updateDisplay(cell);
    if (_res != "nc") {
      _acceptInput = false;
    }
    _currentPlayer = _currentPlayer === "O" ? "X" : "O";
  }

  function _updateDisplay(cell) {
    const button = document.querySelector(`.board :nth-child(${cell + 1}`);
    button.textContent = _currentPlayer;
  }

  function startNew() {
    _currentPlayer = "O";
    _acceptInput = true;
    _res = "nc";
    gameBoard.clear();
  }

  return { play, startNew };
})();

const cells = document.querySelectorAll(".cell");
let it = 0;
cells.forEach((cell) => {
  const index = it++;
  cell.addEventListener("click", () => {
    game.play(index);
  });
});
