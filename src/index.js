document.addEventListener("DOMContentLoaded", () => {
  let gameBoard = [];
  let BOMBS_COUNT = 10;
  let WIDTH = 8;
  let HEIGTH = 8;
  const state = {
    gameOver: false,
  };
  const easy = document.querySelector("#easy");
  const medium = document.querySelector("#medium");
  const hard = document.querySelector("#Hard");
  const newGame = document.querySelector(".smile");
  const smile = document.querySelector(".smileImg");

  newGame.addEventListener("click", () => {
    gameBoard = [];
    generateBoard(WIDTH, HEIGTH);
    genarateBombs();
    setNumbersInCell();
    paintBoard();
  });
  easy.addEventListener("click", () => {
    WIDTH = 8;
    HEIGTH = 8;
    BOMBS_COUNT = 10;
    gameBoard = [];
    generateBoard(WIDTH, HEIGTH);
    genarateBombs();
    setNumbersInCell();
    paintBoard();
  });
  medium.addEventListener("click", () => {
    WIDTH = 12;
    HEIGTH = 12;
    BOMBS_COUNT = 15;
    gameBoard = [];
    generateBoard(WIDTH, HEIGTH);
    genarateBombs();
    setNumbersInCell();
    paintBoard();
  });
  hard.addEventListener("click", () => {
    WIDTH = 16;
    HEIGTH = 16;
    BOMBS_COUNT = 22;
    gameBoard = [];
    generateBoard(WIDTH, HEIGTH);
    genarateBombs();
    setNumbersInCell();
    paintBoard();
  });

  function generateBoard(width, heigth) {
    state.gameOver = false;
    smile.src = "src/assets/smile.png";
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
          // winCondition(cell)
          if (paintCell.innerHTML == "🚩") {
            paintCell.removeEventListener();
          }
          if (state.gameOver == true) {
            paintCell.removeEventListener();
          }
          handleClick(cell, indexRow, indexColumn);
        });
        paintCell.addEventListener(
          "contextmenu",
          (e) => {
            e.preventDefault();
            if (state.gameOver == true) {
              paintCell.removeEventListener();
            }
            if (paintCell.innerHTML == "🚩") {
              cell.isFlagged = false;
              paintCell.innerHTML = "";
              return false;
            }
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
          paintCell.innerHTML = "💣";
        }
        if (cell.number && !cell.isBombed && cell.isOpened) {
          paintCell.innerHTML = cell.number;
        }
        if (cell.isOpened) {
          paintCell.style.backgroundColor = "white";
        }
        if (cell.isBombed && cell.number) {
          cell.number = 0;
        }
        switch (cell.number) {
          case 1:
            paintCell.style.color = "blue";
            break;
          case 2:
            paintCell.style.color = "green";
            break;
          case 3:
            paintCell.style.color = "red";
            break;
          case 4:
            paintCell.style.color = "darkblue";
            break;
          case 5:
            paintCell.style.color = "brown";
            break;
          case 6:
            paintCell.style.color = "turquoise";
            break;
          case 7:
            paintCell.style.color = "black";
            break;
          case 8:
            paintCell.style.color = "burlywood";
            break;
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
  // function winCondition(cell) {
  //   if(cell.isFlagged && cell.isBombed){
  //     alert('Success!!')
  //   }
  // }

  generateBoard(WIDTH, HEIGTH);
  genarateBombs();
  setNumbersInCell();
  paintBoard();

  function handleClick(cell, y, x) {
    console.log(cell);
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
      state.gameOver = true;
      if (state.gameOver == true) {
        smile.src = "src/assets/deadsmile.png";
      }
      paintBoard();
      return;
    }
    if (cell.number == 0 && !cell.isOpened) {
      cell.isOpened = true;
      if (gameBoard[y][x + 1]) {
        handleClick(gameBoard[y][x + 1], y, x + 1);
        // проверка вправо
      }
      if (gameBoard[y][x - 1]) {
        handleClick(gameBoard[y][x - 1], y, x - 1);
        // проверка влево
      }
      if (gameBoard[y - 1] && gameBoard[y - 1][x]) {
        // проверка вверх
        handleClick(gameBoard[y - 1][x], y - 1, x);
      }
      if (gameBoard[y + 1] && gameBoard[y + 1][x]) {
        // проверка вниз
        handleClick(gameBoard[y + 1][x], y + 1, x);
      }
      if (gameBoard[y + 1] && gameBoard[y + 1][x + 1]) {
        // проверка вниз-вправо
        handleClick(gameBoard[y + 1][x + 1], y + 1, x + 1);
      }
      if (gameBoard[y - 1] && gameBoard[y - 1][x + 1]) {
        // проверка вверх-вправо
        handleClick(gameBoard[y - 1][x + 1], y - 1, x + 1);
      }
      if (gameBoard[y + 1] && gameBoard[y + 1][x - 1]) {
        // проверка вниз-влево
        handleClick(gameBoard[y + 1][x - 1], y + 1, x - 1);
      }
      if (gameBoard[y - 1] && gameBoard[y - 1][x - 1]) {
        // проверка вверх-влево
        handleClick(gameBoard[y - 1][x - 1], y - 1, x - 1);
      }

      paintBoard();
    }
  }
});
