// export {Game};

const Color = {
  Blank: 0,
  Yellow: 1, // player1
  Red: 2, // player2
};

class Game {

  constructor(game_id, col, row) {
    this.col = col;
    this.row = row;
    this.currentPlayerColor = Color.Yellow;
    this.gameOver = false;

    // create main grid
    this.grid = new Array(row);
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i] = new Array(col).fill(Color.Blank);
    }

    // Create UI
    for (let r = 0; r < row; r++) {
      for (let c = 0; c < col; c++) {
        let tile = document.createElement("div");
        tile.id = r.toString() + "-" + c.toString();
        tile.classList.add("tile");
        tile.addEventListener("click", () => {
          this.playOnColumn(c);
        });
        document.getElementById("board").append(tile);
      }
    }
  }

  playOnColumn(col) {
    if (!this.canPlay(col) || this.gameOver) {
      return;
    }

    // put the piece in the board
    var playedRow = 0;
    for (var i = 0; i < this.grid.length; i++) {
      // Last row
      if (this.grid[i][col] != Color.Blank) {
        this.grid[i - 1][col] = this.currentPlayerColor;
        playedRow = i - 1;
        break;
      } else if (i == this.grid.length - 1) {
        this.grid[i][col] = this.currentPlayerColor;
        playedRow = i;
      }
    }

    // Place in the UI
    let tile = document.getElementById(
      playedRow.toString() + "-" + col.toString()
    );
    let displayPlayer = document.getElementById("currentPlayer");
    if (this.currentPlayerColor == Color.Red) {
      tile.classList.add("red-piece");
      displayPlayer.innerHTML = "Player 2";
      displayPlayer.style.color = "#f5d000";
    } else {
      tile.classList.add("yellow-piece");
      displayPlayer.innerHTML = "Player 1";
      displayPlayer.style.color = "#910000";
    }

    var result = this.checkWinCondition(col, playedRow);
    if (result == true) {
      console.log("Game over !");
    }
    this.switchPlayer();
  }

  checkWinCondition(col, row) {
    // write in all conditions to win : horizontally, vertically and diagonals
    if (
      this.checkRowWin(row) ||
      this.checkColWin(col) ||
      this.checkDiagLeftWin() ||
      this.checkDiagRightWin()
    ) {
      let winner = document.getElementById("winner");
      winner.innerText =
        this.currentPlayerColor == Color.Red ? "Red Wins" : "Yellow Wins";
      this.gameOver = true;
      return true;
    }
    return false;
  }

  checkRowWin(row) {
    var counterRed = 0;
    var counterYellow = 0;

    for (var i = 0; i < this.grid[row].length; i++) {
      if (this.grid[row][i] == Color.Blank) {
        counterRed = 0;
        counterYellow = 0;
      } else if (this.grid[row][i] == Color.Red) {
        counterRed++;
        counterYellow = 0;
      } else {
        counterRed = 0;
        counterYellow++;
      }

      if (counterYellow == 4 || counterRed == 4) {
        return true;
      }
    }
    return false;
  }

  checkColWin(col) {
    var counterRed = 0;
    var counterYellow = 0;

    for (var i = 0; i < this.grid.length; i++) {
      if (this.grid[i][col] == Color.Blank) {
        counterRed = 0;
        counterYellow = 0;
      } else if (this.grid[i][col] == Color.Red) {
        counterRed++;
        counterYellow = 0;
      } else {
        counterRed = 0;
        counterYellow++;
      }
      if (counterYellow == 4 || counterRed == 4) {
        return true;
      }
    }
    return false;
  }

  checkDiagLeftWin() {
    // anti-diagonal
    for (let r = 0; r < this.grid.length - 3; r++) {
      for (let c = 0; c < this.grid[0].length - 3; c++) {
        if (
          this.grid[r][c] != Color.Blank &&
          this.grid[r][c] == this.grid[r + 1][c + 1] &&
          this.grid[r + 1][c + 1] == this.grid[r + 2][c + 2] &&
          this.grid[r + 2][c + 2] == this.grid[r + 3][c + 3]
        ) {
          return true;
        }
      }
    }
  }

  checkDiagRightWin() {
    // diagonal
    for (let r = 3; r < this.grid.length; r++) {
      for (let c = 0; c < this.grid[0].length - 3; c++) {
        if (
          this.grid[r][c] != Color.Blank &&
          this.grid[r][c] == this.grid[r - 1][c + 1] &&
          this.grid[r - 1][c + 1] == this.grid[r - 2][c + 2] &&
          this.grid[r - 2][c + 2] == this.grid[r - 3][c + 3]
        ) {
          return true;
        }
      }
    }
  }

  canPlay(col) {
    return this.grid[0][col] == Color.Blank;
  }

  switchPlayer() {
    //
    if (this.currentPlayerColor == Color.Yellow) {
      this.currentPlayerColor = Color.Red;
    } else {
      this.currentPlayerColor = Color.Yellow;
    }
  }

  resetGame() {
    for (let r = 0; r < this.row; r++) {
      for (let c = 0; c < this.col; c++) {
        this.grid[r][c] = Color.Blank;

        let tile = document.getElementById(r.toString() + "-" + c.toString());
        tile.classList.remove("red-piece");
        tile.classList.remove("yellow-piece");
      }
    }

    // Yellow always first to play
    this.currentPlayerColor = Color.Yellow;
    // Reset Game State
    this.gameOver = false;

    let displayPlayer = document.getElementById("currentPlayer");
    displayPlayer.innerHTML = "";
  }
}

let game;
window.onload = function () {
  game = new Game("#board", 7, 6);
  resetBtn = document.getElementById("reset_btn");
  resetBtn.addEventListener("click", () => {
    game.resetGame();
    const whoIsWinner = document.getElementById("winner");
    const whoIsPLayer = document.getElementById("currentPlayer");
    whoIsWinner.innerHTML = " ";
    whoIsPLayer.innerHTML = " ";
  });
};
