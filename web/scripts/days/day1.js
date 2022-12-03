#! nodemon

const path = require("path");
const fs = require("fs");

const file = fs.readFileSync(
  path.resolve(__dirname, "../../src/testData/day1.txt"),
  "utf8"
);

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
const maxIndex = map.reduce((acc, curr, index) => {
  const sum = curr.reduce((a, c) => a + c, 0);
  const accSum = acc.sum ? acc.sum : acc.reduce((a, c) => a + c, 0);

  if (sum > accSum) {
    return { index, sum };
  }
  return acc;
});
const sumOfTopThree = orderedBySum.reduce((acc, curr) => acc + curr.sum, 0);
console.info("maxIndex", maxIndex);
console.info("orderedBySum", orderedBySum);
console.info("sumOfTopThree", sumOfTopThree);
