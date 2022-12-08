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
  // console.info(`day${day}`, file);

  const rows: number[][] = [];
  for (const line of lines) {
    const chars = line.split("");
    const numbers = chars.map((c) => parseInt(c));
    rows.push(numbers);
  }

  const seenFromOutside: { row: number; col: number }[] = [];

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

  return {
    question1: {
      numberOfTreesVisibleFromOutsideOfGrid: seenFromOutside.length,
      totalNumberOfTrees: _.sum(rows.map((row) => row.length)),
    },
    question2: {},
  };
};
