document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = [];
  const BOMBS_COUNT = 10;
  const WIDTH = 8;
  const HEIGTH = 8;
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
      console.log(gameBoard)
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
          handleClick(cell, indexRow, indexColumn);
        });
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
          // 4-4
          if (
            gameBoard[indexRow - 1] &&
            gameBoard[indexRow - 1][indexColumn - 1]
          ) {
            gameBoard[indexRow - 1][indexColumn - 1].number += 1;
          }
          // 4-5
          if (gameBoard[indexRow - 1] && gameBoard[indexRow - 1][indexColumn]) {
            gameBoard[indexRow - 1][indexColumn].number += 1;
          }
          // 4-6
          if (
            gameBoard[indexRow - 1] &&
            gameBoard[indexRow - 1][indexColumn + 1]
          ) {
            gameBoard[indexRow - 1][indexColumn + 1].number += 1;
          }
          // 5-4
          if (gameBoard[indexRow] && gameBoard[indexRow][indexColumn - 1]) {
            gameBoard[indexRow][indexColumn - 1].number += 1;
          }
          // 5-6
          if (gameBoard[indexRow] && gameBoard[indexRow][indexColumn + 1]) {
            gameBoard[indexRow][indexColumn + 1].number += 1;
          }
          // 6-4
          if (
            gameBoard[indexRow + 1] &&
            gameBoard[indexRow + 1][indexColumn - 1]
          ) {
            gameBoard[indexRow + 1][indexColumn - 1].number += 1;
          }
          // 6-5
          if (gameBoard[indexRow + 1] && gameBoard[indexRow + 1][indexColumn]) {
            gameBoard[indexRow + 1][indexColumn].number += 1;
          }
          // 6-6
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

  function handleClick(cell, indexRow, indexColumn) {
    
      
    // gameBoard.forEach((Row, indexOfRows) => {
    //   Row.forEach((elem, indexOfElems) => {
    //     if (!elem.isBombed && !elem.isOpened && !elem.number) {
    //       elem.isOpened = true;
    //     }
    //   });
    // });  


    if (cell.isBombed) {
      gameBoard.forEach((indexRow) => {
        indexRow.forEach((indexColumn) => {
          if (indexColumn.isBombed) {
            indexColumn.isOpened = true;
          }
        });
      });
      alert("Game Over");
    } 
    else if(!gameBoard[indexRow][indexColumn].isBombed && (gameBoard[indexRow][indexColumn].number || gameBoard[indexRow][indexColumn].number === 0 )){ 
      cell.isOpened = true;
      handleClick(cell, indexRow + 1 , indexColumn + 1) 
    }else if(!gameBoard[indexRow][indexColumn].isBombed && (gameBoard[indexRow][indexColumn].number || gameBoard[indexRow][indexColumn].number === 0 )){
      cell.isOpened = true;
      handleClick(cell, indexRow , indexColumn + 1)
    }else if(!gameBoard[indexRow][indexColumn].isBombed && (gameBoard[indexRow][indexColumn].number || gameBoard[indexRow][indexColumn].number === 0 )){
      cell.isOpened = true;
      handleClick(cell, indexRow - 1, indexColumn + 1)
    }else if(!gameBoard[indexRow][indexColumn].isBombed && (gameBoard[indexRow][indexColumn].number || gameBoard[indexRow][indexColumn].number === 0 )){
      cell.isOpened = true;
      handleClick(cell, indexRow - 1, indexColumn - 1)
    }else if(!gameBoard[indexRow][indexColumn].isBombed && (gameBoard[indexRow][indexColumn].number || gameBoard[indexRow][indexColumn].number === 0 )){
      cell.isOpened = true;
      handleClick(cell, indexRow - 1, indexColumn)
    }else if(!gameBoard[indexRow][indexColumn].isBombed && (gameBoard[indexRow][indexColumn].number || gameBoard[indexRow][indexColumn].number === 0 )){
      cell.isOpened = true;
      handleClick(cell, indexRow + 1, indexColumn)
    }
    paintBoard();
    console.log(gameBoard[indexRow][indexColumn])
  }
});

//  использовать рекурсию, проверять каждую клетку вокруг, в параметрах поиграться с индексами колонок и столбцов
