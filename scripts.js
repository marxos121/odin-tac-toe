const gameBoard = (function () {
  const _board = Array(9);
  let filled = 0;

  function check() {
    //Check rows and columns
    for (let i = 0; i != 3; ++i) {
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

    //Check diagonals
    let resLeftDiag = 0; // \
    let resRightDiag = 0; // /
    for (let i = 0; i != 3; ++i) {
      resLeftDiag +=
        _board[i * 3 + i] === " " ? 0 : _board[i * 3 + i] === "X" ? 1 : -1;
      resRightDiag +=
        _board[i * 3 + (2 - i)] === " "
          ? 0
          : _board[i * 3 + (2 - i)] === "X"
          ? 1
          : -1;
    }

    if (resLeftDiag === 3 || resRightDiag === 3) {
      return "X";
    } else if (resLeftDiag === -3 || resRightDiag === -3) {
      return "O";
    }

    if (filled === 9) {
      return "draw";
    } else {
      return "nc";
    }
  }

  function move(move, symbol) {
    if (_board[move] === " ") {
      _board[move] = symbol;
      ++filled;
      return true;
    } else {
      return false;
    }
  }

  function clear() {
    _board.fill(" ");
    filled = 0;
  }

  clear();
  return { move, check, clear };
})();
