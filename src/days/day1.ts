import { readTextFile } from "../utils/readTextFile";

export const day1 = () => {
  const file = readTextFile("day1.txt");
  // separate by blank lines
  const lines = file.split("\r\n\r");
  // split each line into an array of numbers
  const map = lines.map((line) => {
    const nums = line.split("\r\n");
    return nums.map((num) => parseInt(num));
  });
  const orderedBySum = [...map]
    .sort((a, b) => {
      const sumA = a.reduce((acc, curr) => acc + curr, 0);
      const sumB = b.reduce((acc, curr) => acc + curr, 0);
      return sumB - sumA;
    })
    .slice(0, 3)
    .map((arr) => {
      return {
        sum: arr.reduce((acc, curr) => acc + curr, 0),
      };
    });
  // find the index of the array that has the max sum of numbers
  const maxIndex = map.reduce((acc: any, curr, index) => {
    const sum = curr.reduce((a, c) => a + c, 0);
    const accSum = acc.sum
      ? acc.sum
      : acc.reduce((a: number, c: number) => a + c, 0);

    if (sum > accSum) {
      return { index, sum };
    }
    return acc;
  }) as any as { index: number; sum: number };

  return {
    question1: {
      map,
      index: maxIndex.index,
      sum: maxIndex.sum,
    },
    question2: {
      orderedBySum,
      sumOfTop3: orderedBySum.reduce((acc, curr) => acc + curr.sum, 0),
    },
  };
};
