interface GameTypes {
  state: boolean;
  gameBoard: Array<Tile[]>;
  smile: HTMLImageElement;
  BOMBS_COUNT: number;
  flagsCount: number;
  WIDTH: number;
  HEIGHT: number;
}
interface Tile {
  isBombed: boolean;
  number: number;
  isFlagged: boolean;
  isOpened: boolean;
}
export class Game implements GameTypes {
  state = false;
  gameBoard: Array<Tile[]> = [];
  smile = document.querySelector(".smileImg") as HTMLImageElement;
  BOMBS_COUNT;
  flagsCount;
  WIDTH;
  HEIGHT;
  constructor(bombs_count: number, WIDTH: number, HEIGHT: number) {
    this.BOMBS_COUNT = bombs_count;
    this.flagsCount = bombs_count;
    this.WIDTH = WIDTH;
    this.HEIGHT = HEIGHT;
  }
  render() {
    this.gameBoard = [];
    this.generateBoard();
    this.generateBombs();
    this.setNumbersInCell();
    this.paintBoard();
    this.flagsCount = this.BOMBS_COUNT;
    this.paintFlags();
  }
  generateBoard() {
    this.state = false;
    this.smile.src = "src/assets/smile.png";
    for (let row = 0; row < this.HEIGHT; row++) {
      const rows = [];
      for (let column = 0; column < this.WIDTH; column++) {
        rows.push({
          isBombed: false,
          number: 0,
          isOpened: false,
          isFlagged: false,
        });
      }
      this.gameBoard.push(rows);
    }
  }
  addListenersForCell(
    paintCell: HTMLDivElement,
    cell: Tile,
    indexRow: number,
    indexColumn: number
  ) {
    paintCell.addEventListener("click", () => {
      if (paintCell.innerHTML === "🚩") {
        paintCell.removeEventListener("click", () =>
          this.addListenersForCell(paintCell, cell, indexRow, indexColumn)
        );
      }
      if (this.state === true) {
        paintCell.removeEventListener("click", () =>
          this.addListenersForCell(paintCell, cell, indexRow, indexColumn)
        );
      }
      this.handleClick(cell, indexRow, indexColumn);
    });
  }
  paintBoard() {
    document.getElementById("board")?.remove();
    const board = document.createElement("div");
    board.setAttribute("id", "board");
    this.gameBoard.forEach((row, indexRow) => {
      const paintRow = document.createElement("div");
      paintRow.id = "row";
      row.forEach((cell, indexColumn) => {
        let paintCell = document.createElement("div");
        paintCell.id = "cell";
        this.addListenersForCell(paintCell, cell, indexRow, indexColumn);
        paintCell.addEventListener("click", () => {
          if (paintCell.innerHTML === "🚩") {
            //@ts-ignore
            paintCell.removeEventListener("click");
          }
          if (this.state === true) {
            //@ts-ignore
            paintCell.removeEventListener();
          }
          this.handleClick(cell, indexRow, indexColumn);
        });
        paintCell.addEventListener(
          "contextmenu",
          (e) => {
            e.preventDefault();
            if (this.state === true) {
              //@ts-ignore
              paintCell.removeEventListener();
            }
            if (paintCell.innerHTML === "🚩") {
              cell.isFlagged = false;
              paintCell.innerHTML = "";
              this.paintFlags();
              return false;
            }
            if (!cell.isOpened) {
              if (this.flagsCount === 0) {
                return;
              }
              cell.isFlagged = true;
              paintCell.innerHTML = "🚩";
              this.paintFlags();
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
          paintCell.innerHTML = String(cell.number);
        }
        if (cell.isOpened) {
          paintCell.style.backgroundColor = "white";
        }
        if (cell.isBombed && cell.number) {
          cell.number = 0;
        }
        if (cell.isFlagged && cell.isBombed && !cell.isOpened && !cell.number) {
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

  generateBombs() {
    let bombsRemaining = this.BOMBS_COUNT;
    while (bombsRemaining > 0) {
      const randomRowIndex = Math.floor(Math.random() * this.gameBoard.length);
      const randomColumnIndex = Math.floor(
        Math.random() * this.gameBoard[0].length
      );
      let cell = this.gameBoard[randomRowIndex][randomColumnIndex];
      if (!cell.isBombed) {
        cell.isBombed = true;
        bombsRemaining -= 1;
      }
    }
  }

  setNumbersInCell() {
    this.gameBoard.forEach((row, indexRow) => {
      row.forEach((cell, indexColumn) => {
        if (cell.isBombed) {
          if (
            this.gameBoard[indexRow - 1] &&
            this.gameBoard[indexRow - 1][indexColumn - 1]
          ) {
            this.gameBoard[indexRow - 1][indexColumn - 1].number += 1;
          }
          if (
            this.gameBoard[indexRow - 1] &&
            this.gameBoard[indexRow - 1][indexColumn]
          ) {
            this.gameBoard[indexRow - 1][indexColumn].number += 1;
          }
          if (
            this.gameBoard[indexRow - 1] &&
            this.gameBoard[indexRow - 1][indexColumn + 1]
          ) {
            this.gameBoard[indexRow - 1][indexColumn + 1].number += 1;
          }
          if (
            this.gameBoard[indexRow] &&
            this.gameBoard[indexRow][indexColumn - 1]
          ) {
            this.gameBoard[indexRow][indexColumn - 1].number += 1;
          }
          if (
            this.gameBoard[indexRow] &&
            this.gameBoard[indexRow][indexColumn + 1]
          ) {
            this.gameBoard[indexRow][indexColumn + 1].number += 1;
          }
          if (
            this.gameBoard[indexRow + 1] &&
            this.gameBoard[indexRow + 1][indexColumn - 1]
          ) {
            this.gameBoard[indexRow + 1][indexColumn - 1].number += 1;
          }
          if (
            this.gameBoard[indexRow + 1] &&
            this.gameBoard[indexRow + 1][indexColumn]
          ) {
            this.gameBoard[indexRow + 1][indexColumn].number += 1;
          }
          if (
            this.gameBoard[indexRow + 1] &&
            this.gameBoard[indexRow + 1][indexColumn + 1]
          ) {
            this.gameBoard[indexRow + 1][indexColumn + 1].number += 1;
          }
        }
      });
    });
  }

  paintFlags() {
    let flagsWithBombs = [];
    let flags = [];
    this.gameBoard.forEach((e) => {
      e.forEach((cell) => {
        if (cell.isFlagged && !cell.isOpened) {
          flags.push("1");
        }
        if (cell.isBombed && cell.isFlagged) flagsWithBombs.push("2");
      });
    });
    if (flagsWithBombs.length === this.BOMBS_COUNT) {
      const modalWin = document.createElement("div");
      modalWin.classList.add("modalWin");
      modalWin.innerHTML = `<div class='wrapper'>
          <p>Вы победили!</p>
          <button class='winBtn'>Начать заново</button>
    </div>`;
      document.body.append(modalWin);
      const restart = document.querySelector(".winBtn");
      modalWin.classList.add("active");
      if (restart) {
        restart.addEventListener("click", () => {
          document.querySelector(".modalWin")!.remove();
          this.render();
        });
      }
    }
    document.getElementById("flags")?.remove();
    const flagsNumber = document.createElement("div");
    flagsNumber.setAttribute("id", "flags");
    this.flagsCount = this.BOMBS_COUNT - flags.length;
    flagsNumber.innerHTML = ` 🚩 ${this.flagsCount}/${this.BOMBS_COUNT}`;
    document.body.prepend(flagsNumber);
  }

  handleClick(cell: Tile, y: number, x: number) {
    if (cell.number) {
      cell.isOpened = true;
      this.paintFlags();
      this.paintBoard();
      return;
    }
    if (cell.isBombed) {
      this.gameBoard.forEach((y) => {
        y.forEach((x) => {
          if (x.isBombed) {
            x.isOpened = true;
          }
        });
      });
      this.state = true;
      if (this.state === true) {
        this.smile.src = "src/assets/deadsmile.png";
      }
      this.paintFlags();
      this.paintBoard();
      return;
    }
    if (cell.number === 0 && !cell.isOpened) {
      cell.isOpened = true;
      cell.isFlagged = false;
      this.paintFlags();
      if (this.gameBoard[y][x + 1]) {
        this.handleClick(this.gameBoard[y][x + 1], y, x + 1);
        // проверка вправо
      }
      if (this.gameBoard[y][x - 1]) {
        this.handleClick(this.gameBoard[y][x - 1], y, x - 1);
        // проверка влево
      }
      if (this.gameBoard[y - 1] && this.gameBoard[y - 1][x]) {
        // проверка вверх
        this.handleClick(this.gameBoard[y - 1][x], y - 1, x);
      }
      if (this.gameBoard[y + 1] && this.gameBoard[y + 1][x]) {
        // проверка вниз
        this.handleClick(this.gameBoard[y + 1][x], y + 1, x);
      }
      if (this.gameBoard[y + 1] && this.gameBoard[y + 1][x + 1]) {
        // проверка вниз-вправо
        this.handleClick(this.gameBoard[y + 1][x + 1], y + 1, x + 1);
      }
      if (this.gameBoard[y - 1] && this.gameBoard[y - 1][x + 1]) {
        // проверка вверх-вправо
        this.handleClick(this.gameBoard[y - 1][x + 1], y - 1, x + 1);
      }
      if (this.gameBoard[y + 1] && this.gameBoard[y + 1][x - 1]) {
        // проверка вниз-влево
        this.handleClick(this.gameBoard[y + 1][x - 1], y + 1, x - 1);
      }
      if (this.gameBoard[y - 1] && this.gameBoard[y - 1][x - 1]) {
        // проверка вверх-влево
        this.handleClick(this.gameBoard[y - 1][x - 1], y - 1, x - 1);
      }

      this.paintBoard();
    }
  }
}
