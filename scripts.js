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
      return "tie";
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

  _board.fill(" ");
  return { move, check, clear };
})();

const game = (function () {
  let players = [_player("", "O"), _player("", "X")];
  let _currentPlayer = 0;
  let _acceptInput = true;
  let _res = "nc";
  const cells = document.querySelectorAll(".cell");
  const resultDisplay = document.querySelector(".result");

  function _player(name, sign) {
    return { name, sign };
  }

  function _init() {
    let it = 0;
    cells.forEach((cell) => {
      const index = it++;
      cell.addEventListener("click", () => {
        play(index);
      });
    });

    document.querySelector("#new-game").addEventListener("click", startNew);
  }

  function play(cell) {
    if (!_acceptInput || !gameBoard.move(cell, players[_currentPlayer].sign)) {
      return;
    }

    _res = gameBoard.check();
    _updateDisplay(cell);
    if (_res != "nc") {
      _acceptInput = false;

      if (_res === "tie") {
        resultDisplay.textContent = "It's a tie!";
      } else {
        let temp =
          players[_currentPlayer].name === ""
            ? players[_currentPlayer].sign
            : players[_currentPlayer].name;
        resultDisplay.textContent = `${temp} wins!`;
      }
    }

    _currentPlayer = _currentPlayer === 0 ? 1 : 0;
  }

  function _updateDisplay(cell) {
    const button = document.querySelector(`.board :nth-child(${cell + 1}`);
    button.textContent = players[_currentPlayer].sign;
  }

  function _clearDisplay() {
    cells.forEach((cell) => {
      cell.textContent = "";
    });
    resultDisplay.textContent = "";
  }

  function startNew() {
    _currentPlayer = 0;
    _acceptInput = true;
    _res = "nc";
    _clearDisplay();
    gameBoard.clear();
  }

  _init();
  return { players, play, startNew };
})();

document.querySelector("#settings").addEventListener("click", () => {
  const settingsScreen = document.querySelector("#settings-screen");
  if (settingsScreen.classList.contains("invisible")) {
    settingsScreen.classList.remove("invisible");
  } else {
    settingsScreen.classList.add("invisible");
  }
});

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    game.players[+form.getAttribute("data-player")].name =
      form.querySelector(`input[name="name"]`).value;
  });
});
