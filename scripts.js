const gameBoard = (function () {
  const _board = Array(9);
  let _filled = 0;
  let _acceptInput = true;
  let _res = "nc";

  function check() {
    let resLeftDiag = 0; // \
    let resRightDiag = 0; // /

    for (let i = 0; i != 3; ++i) {
      if (!_acceptInput) {
        return _res;
      }
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
        _acceptInput = false;
        res = "X";
        return res;
      } else if (resLeftDiag === -3 || resRightDiag === -3) {
        _acceptInput = false;
        res = "O";
        return res;
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
          _acceptInput = false;
          _res = "X";
          return _res;
        } else if (resRow === -3 || resCol === -3) {
          _acceptInput = false;
          _res = "O";
          return _res;
        }
      }
    }

    if (_filled === 9) {
      _acceptInput = false;
      _res = "draw";
      return _res;
    }

    return _res;
  }

  function move(move, symbol) {
    if (_acceptInput) {
      return false;
    }

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
    _res = "nc";
    _acceptInput = true;
  }

  _board.fille(" ");
  return { move, check, clear };
})();
