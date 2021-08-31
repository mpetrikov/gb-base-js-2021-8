import {
  tickPerSecond,
  gameFieldWidth,
  gameFieldHeight,
  CELL_TYPE,
  bombExplositonTime,
  bombStopTime,
} from "./constants.js";

let gameField;
const gameState = {
  bomberman: {
    position: {
      rowNumber: 0,
      columnNumber: 0,
    },
  },
  // {rowNumber, columnNumber, startTimeMs}
  bombs: [],
  bombExplodeSize: 3,
  bombExploseCells: {
    // i,j: time of start explode
  },
  gameTickHandler: null,
};

const htmlPositionAttributeName = "cell-position";

const createGameField = () => {
  //   gameField = [];

  //   for (let i = 0; i < gameFieldHeight; i++) {
  //     gameField.push([]);
  //     for (let j = 0; j < gameFieldWidth; j++) {
  //       gameField[i].push(null);
  //     }
  //   }

  const gameFieldRows = new Array(gameFieldHeight).fill(null);

  gameField = gameFieldRows.map(() => {
    return new Array(gameFieldWidth).fill(null);
  });
};

const setDomTreeAttributes = () => {
  const allCells = document.querySelectorAll(".cell");
  for (let i = 0; i < allCells.length; i++) {
    const numberOfRow = Math.floor(i / gameFieldHeight);
    const numberOfColumn = i % gameFieldWidth;

    allCells[i].id = generateCellId(numberOfRow, numberOfColumn);
  }
};

const generateCellId = (rowNumber, columnNumber) => {
  return `${htmlPositionAttributeName}${rowNumber},${columnNumber}`;
};

const getCellDomElement = (rowNumber, columnNumber) => {
  return document.getElementById(generateCellId(rowNumber, columnNumber));
};

const getPositionById = (cellElement) => {
  const cellId = cellElement.id;
  const arrayOfPosition = cellId
    .replace(htmlPositionAttributeName, "")
    .split(",");

  return {
    rowNumber: arrayOfPosition[0],
    columnNumber: arrayOfPosition[1],
  };
};

const setBombPosition = (rowNumber, columnNumber) => {
  gameField[rowNumber][columnNumber] = CELL_TYPE.BOMB;

  gameState.bombs.push({ rowNumber, columnNumber, startTimeMs: Date.now() });

  const startBombermanElement = getCellDomElement(rowNumber, columnNumber);
  startBombermanElement.classList.add(CELL_TYPE.BOMB);
};

const setBombermanPosition = (rowNumber, columnNumber) => {
  gameState.bomberman.position.rowNumber = rowNumber;
  gameState.bomberman.position.columnNumber = columnNumber;

  const currentBombermanPositionElement = document.querySelector(
    `.${CELL_TYPE.BOMBERMAN}`
  );
  if (currentBombermanPositionElement !== null) {
    const bombermanPosition = getPositionById(currentBombermanPositionElement);
    gameField[bombermanPosition.rowNumber][bombermanPosition.columnNumber] =
      null;

    currentBombermanPositionElement.classList.remove(CELL_TYPE.BOMBERMAN);
  }

  gameField[rowNumber][columnNumber] = CELL_TYPE.BOMBERMAN;

  const startBombermanElement = getCellDomElement(rowNumber, columnNumber);
  startBombermanElement.classList.add(CELL_TYPE.BOMBERMAN);
};

export const initializeGameField = () => {
  createGameField();
  setDomTreeAttributes();
  setBombermanPosition(0, 0);
};

export const setUpKeyboardHandlers = () => {
  document.body.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowLeft":
        if (gameState.bomberman.position.columnNumber > 0) {
          setBombermanPosition(
            gameState.bomberman.position.rowNumber,
            gameState.bomberman.position.columnNumber - 1
          );
        }
        break;
      case "ArrowRight":
        if (gameState.bomberman.position.columnNumber < gameFieldWidth - 1) {
          setBombermanPosition(
            gameState.bomberman.position.rowNumber,
            gameState.bomberman.position.columnNumber + 1
          );
        }
        break;
      case "ArrowDown":
        if (gameState.bomberman.position.rowNumber < gameFieldHeight - 1) {
          setBombermanPosition(
            gameState.bomberman.position.rowNumber + 1,
            gameState.bomberman.position.columnNumber
          );
        }
        break;
      case "ArrowUp":
        if (gameState.bomberman.position.rowNumber > 0) {
          setBombermanPosition(
            gameState.bomberman.position.rowNumber - 1,
            gameState.bomberman.position.columnNumber
          );
        }
        break;
      case " ":
        // поставить бомбу
        setBombPosition(
          gameState.bomberman.position.rowNumber,
          gameState.bomberman.position.columnNumber
        );
        break;
    }
  });
};

const explodeBomb = (i) => {
  // удаление иконки бомбы
  const explodedBomb = gameState.bombs.splice(i, 1)[0];

  const elementWithBomb = getCellDomElement(
    explodedBomb.rowNumber,
    explodedBomb.columnNumber
  );
  elementWithBomb.classList.remove(CELL_TYPE.BOMB);

  // рисование взрыва
  for (let i = 0; i < gameState.bombExplodeSize * 2 - 1; i++) {
    const explodeRowNumber =
      explodedBomb.rowNumber - (gameState.bombExplodeSize - 1) + i;
    if (explodeRowNumber < 0 || explodeRowNumber >= gameFieldHeight) {
      continue;
    }
    const cellForExplode = getCellDomElement(
      explodeRowNumber,
      explodedBomb.columnNumber
    );
    cellForExplode.classList.add(CELL_TYPE.EXPLOSION);
    gameState.bombExploseCells[
      `${explodeRowNumber},${explodedBomb.columnNumber}`
    ] = Date.now();
  }

  for (let i = 0; i < gameState.bombExplodeSize * 2 - 1; i++) {
    const explodeColumnNumber =
      explodedBomb.columnNumber - (gameState.bombExplodeSize - 1) + i;
    if (explodeColumnNumber < 0 || explodeColumnNumber >= gameFieldWidth) {
      continue;
    }
    const cellForExplode = getCellDomElement(
      explodedBomb.rowNumber,
      explodeColumnNumber
    );
    cellForExplode.classList.add(CELL_TYPE.EXPLOSION);
    gameState.bombExploseCells[
      `${explodedBomb.rowNumber},${explodeColumnNumber}`
    ] = Date.now();
  }
};

const checkBombsExplosion = () => {
  const currentTime = Date.now();
  for (let i = gameState.bombs.length - 1; i >= 0; i--) {
    const bomb = gameState.bombs[i];
    if (currentTime - bomb.startTimeMs > bombExplositonTime) {
      // взорвать бомбу
      explodeBomb();
    }
  }
};

const checkBombsStop = () => {
  const currentTime = Date.now();
  for (const explodeCellKey in gameState.bombExploseCells) {
    if (
      currentTime - gameState.bombExploseCells[explodeCellKey] >=
      bombStopTime
    ) {
      // удалить из gameState.bombExploseCells поле
      delete gameState.bombExploseCells[explodeCellKey];

      // убрать из DOM класс
      const [explodeCellRow, explodeCellColumn] = explodeCellKey.split(",");
      const explodeCell = getCellDomElement(explodeCellRow, explodeCellColumn);
      explodeCell.classList.remove(CELL_TYPE.EXPLOSION);
    }
  }
};

export const startGame = () => {
  gameState.gameTickHandler = setInterval(() => {
    checkBombsExplosion();
    checkBombsStop();
  }, 1000 / tickPerSecond);
};

export const stopGame = () => {
  clearInterval(gameState.gameTickHandler);
};
