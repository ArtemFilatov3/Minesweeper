let matrix = [];

function createMatrix(heigth = 8, width = 8, bombsCount = 10) {
  let matrix = Array.from({ length: heigth }, () =>
    Array.from({ length: width }, () => 0)
  );
  return matrix;
}

function startGame() {
    createMatrix()
}
startGame();



console.log(createMatrix());
