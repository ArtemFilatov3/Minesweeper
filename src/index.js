document.addEventListener("DOMContentLoaded", () => {
  let gameBoard = [];
  let BOMBS_COUNT = 10;
  const WIDTH = 8;
  const HEIGTH = 8;
  const easy = document.querySelector("#easy");
  const medium = document.querySelector("#medium");
  const hard = document.querySelector("#Hard");
  easy.addEventListener("click", () => {
    BOMBS_COUNT = 3;
    gameBoard = [];
    generateBoard(WIDTH, HEIGTH);
    genarateBombs();
    setNumbersInCell();
    paintBoard();
  });
  medium.addEventListener("click", () => {
    BOMBS_COUNT = 5;
    gameBoard = [];
    generateBoard(WIDTH, HEIGTH);
    genarateBombs();
    setNumbersInCell();
    paintBoard();
  });
  hard.addEventListener("click", () => {
    BOMBS_COUNT = 10;
    gameBoard = [];
    generateBoard(WIDTH, HEIGTH);
    genarateBombs();
    setNumbersInCell();
    paintBoard();
  });
  //  🚩

  function generateBoard(width, heigth) {
    for (let row = 0; row < heigth; row++) {
      const rows = [];
      for (let column = 0; column < width; column++) {
        rows.push({
          isBombed: false,
          number: 0,
          isOpened: false,
          isFlagged: false,
        });
      }
      gameBoard.push(rows);
    }
  }

  function paintBoard() {
    document.getElementById("board")?.remove();
    const board = document.createElement("div");
    board.setAttribute("id", "board");

    gameBoard.forEach((row, indexRow) => {
      let paintRow = document.createElement("div");
      paintRow.id = "row";
      row.forEach((cell, indexColumn) => {
        let paintCell = document.createElement("div");
        paintCell.id = "cell";
        paintCell.addEventListener("click", () => {
          if (paintCell.innerHTML == "🚩") {
            paintCell.removeEventListener();
          }
          handleClick(cell, indexRow, indexColumn);
        });
        paintCell.addEventListener(
          "contextmenu",
          (e) => {
            e.preventDefault();
            if (!cell.isOpened) {
              cell.isFlagged = true;
              paintCell.innerHTML = "🚩";
              return false;
            }
          },
          false
        );  
        if (cell.isFlagged) {
          paintCell.innerHTML = "🚩";
        }
        if (cell.isBombed && cell.isOpened) {
          paintCell.innerHTML = "x";
        }
        if (cell.number && !cell.isBombed && cell.isOpened) {
          paintCell.innerHTML = cell.number;
        }
        if (cell.isOpened) {
          paintCell.style.backgroundColor = "white";
        }

        paintRow.append(paintCell);
      });
      board.append(paintRow);
    });

    document.body.append(board);
  }

  function genarateBombs() {
    let bombsRemaining = BOMBS_COUNT;
    while (bombsRemaining > 0) {
      const randomRowIndex = Math.floor(Math.random() * gameBoard.length);
      const randomColumnIndex = Math.floor(Math.random() * gameBoard[0].length);
      let cell = gameBoard[randomRowIndex][randomColumnIndex];
      if (!cell.isBombed) {
        cell.isBombed = true;
        bombsRemaining -= 1;
      }
    }
  }

  function setNumbersInCell() {
    gameBoard.forEach((row, indexRow) => {
      row.forEach((cell, indexColumn) => {
        if (cell.isBombed) {
          if (
            gameBoard[indexRow - 1] &&
            gameBoard[indexRow - 1][indexColumn - 1]
          ) {
            gameBoard[indexRow - 1][indexColumn - 1].number += 1;
          }
          if (gameBoard[indexRow - 1] && gameBoard[indexRow - 1][indexColumn]) {
            gameBoard[indexRow - 1][indexColumn].number += 1;
          }
          if (
            gameBoard[indexRow - 1] &&
            gameBoard[indexRow - 1][indexColumn + 1]
          ) {
            gameBoard[indexRow - 1][indexColumn + 1].number += 1;
          }
          if (gameBoard[indexRow] && gameBoard[indexRow][indexColumn - 1]) {
            gameBoard[indexRow][indexColumn - 1].number += 1;
          }
          if (gameBoard[indexRow] && gameBoard[indexRow][indexColumn + 1]) {
            gameBoard[indexRow][indexColumn + 1].number += 1;
          }
          if (
            gameBoard[indexRow + 1] &&
            gameBoard[indexRow + 1][indexColumn - 1]
          ) {
            gameBoard[indexRow + 1][indexColumn - 1].number += 1;
          }
          if (gameBoard[indexRow + 1] && gameBoard[indexRow + 1][indexColumn]) {
            gameBoard[indexRow + 1][indexColumn].number += 1;
          }
          if (
            gameBoard[indexRow + 1] &&
            gameBoard[indexRow + 1][indexColumn + 1]
          ) {
            gameBoard[indexRow + 1][indexColumn + 1].number += 1;
          }
        }
      });
    });
  }

  generateBoard(WIDTH, HEIGTH);
  genarateBombs();
  setNumbersInCell();
  paintBoard();

  function handleClick(cell, y, x) {
    if (cell.number) {
      cell.isOpened = true;
      paintBoard();
      return;
    }
    if (cell.isBombed) {
      gameBoard.forEach((y) => {
        y.forEach((x) => {
          if (x.isBombed) {
            x.isOpened = true;
          }
        });
      });
      alert("Game Over");
      paintBoard();
      return;
    }
    if (cell.number == 0 && !cell.isOpened) {
      cell.isOpened = true;
      if (gameBoard[y][x + 1]) {
        handleClick(gameBoard[y][x + 1], y, x + 1);
      }
      if (gameBoard[y][x - 1]) {
        handleClick(gameBoard[y][x - 1], y, x - 1);
      }
      if (gameBoard[y - 1] && gameBoard[y - 1][x]) {
        handleClick(gameBoard[y - 1][x], y - 1, x);
      }
      if (gameBoard[y + 1] && gameBoard[y + 1][x]) {
        handleClick(gameBoard[y + 1][x], y + 1, x);
      }
      paintBoard();
    }
  }
});
