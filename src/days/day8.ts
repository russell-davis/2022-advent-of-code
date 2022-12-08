import { readTextFile } from "../utils/readTextFile";
import _ from "lodash";

const onEdge = (x: number, y: number, width: number, height: number) => {
  return x === 0 || y === 0 || x === width - 1 || y === height - 1;
};

const isVisible = (rowIndex, columnIndex, rows) => {
  const currentValue = rows[rowIndex][columnIndex];
  const toLeft = rows[rowIndex].slice(0, columnIndex);
  const largerThanValuesToLeft = toLeft.every((size) => currentValue > size);
  const toRight = rows[rowIndex].slice(columnIndex + 1);
  const largerThanValuesToRight = toRight.every((size) => currentValue > size);
  const toTop = rows.slice(0, rowIndex).map((row) => row[columnIndex]);
  const largerThanValuesToTop = toTop.every((size) => currentValue > size);
  const toBottom = rows.slice(rowIndex + 1).map((row) => row[columnIndex]);
  const largerThanValuesToBottom = toBottom.every(
    (size) => currentValue > size
  );

  return (
    largerThanValuesToLeft ||
    largerThanValuesToRight ||
    largerThanValuesToTop ||
    largerThanValuesToBottom
  );
};

export const day8 = () => {
  const day = 8;
  const file = readTextFile(`day${day}.txt`);
  const lines = file.split("\r\n").filter((line) => line.length > 0);

  const rows: number[][] = [];
  for (const line of lines) {
    const chars = line.split("");
    const numbers = chars.map((c) => parseInt(c));
    rows.push(numbers);
  }

  const seenFromOutside: { row: number; col: number }[] = [];

  // Q1
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];
    if (row === undefined) {
      continue;
    }
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const column = row[columnIndex];
      if (column === undefined) {
        continue;
      }
      const isOnEdge = onEdge(columnIndex, rowIndex, row.length, rows.length);
      if (isOnEdge) {
        seenFromOutside.push({ row: rowIndex, col: columnIndex });
        continue;
      }
      const visible = isVisible(rowIndex, columnIndex, rows);
      if (visible) {
        seenFromOutside.push({ row: rowIndex, col: columnIndex });
      }
    }
  }

  // Q2
  const calcScenicScore = (
    toLeft: number,
    toRight: number,
    toTop: number,
    toBottom: number
  ) => {
    return toLeft * toRight * toTop * toBottom;
  };

  const scenicScores: { row: number; col: number; score: number }[] = [];
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];
    if (row === undefined) {
      continue;
    }
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const column = row[columnIndex];
      if (column === undefined) {
        continue;
      }
      if (onEdge(columnIndex, rowIndex, row.length, rows.length)) {
        continue;
      }

      // current val larger or equal to how many values to left in row
      const currentVal = rows[rowIndex]![columnIndex]!;

      const toLeft = rows[rowIndex]!.slice(0, columnIndex);
      const toTop = rows.slice(0, rowIndex).map((row) => row[columnIndex]!);
      const toRight = rows[rowIndex]!.slice(columnIndex + 1);
      const toBottom = rows.slice(rowIndex + 1).map((row) => row[columnIndex]!);

      const reducerKeeper = (list: number[]) => {
        let isDone = false;
        const reducer = (acc, size) => {
          if (isDone) {
            return acc;
          }
          if (size >= currentVal) {
            isDone = true;
            return acc + 1;
          }
          if (size < currentVal) {
            return acc + 1;
          }
          return acc;
        };
        return list.reduce(reducer, 0) as number;
      };
      const canSeeValuesToLeft = reducerKeeper(toLeft.reverse());
      const canSeeValuesToTop = reducerKeeper(toTop.reverse());
      const canSeeValuesToRight = reducerKeeper(toRight);
      const canSeeValuesToBottom = reducerKeeper(toBottom);

      const score = calcScenicScore(
        canSeeValuesToLeft,
        canSeeValuesToTop,
        canSeeValuesToRight,
        canSeeValuesToBottom
      );
      // console.info(`[${rowIndex}, ${columnIndex}] = ${score}`);
      scenicScores.push({ row: rowIndex, col: columnIndex, score });
    }
  }

  return {
    question1: {
      numberOfTreesVisibleFromOutsideOfGrid: seenFromOutside.length,
      totalNumberOfTrees: _.sum(rows.map((row) => row.length)),
    },
    question2: {
      maxScenicScore: _.maxBy(scenicScores, (s) => s.score),
    },
  };
};
