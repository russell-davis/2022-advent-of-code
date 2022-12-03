import { readTextFile } from "../utils/readTextFile";

export const day3 = () => {
  const day = 3;
  const file = readTextFile(`day${day}.txt`);
  // console.info(`day${day}`, file);

  const lines = file.split("\r\n").filter((line) => line.length > 0);
  // console.info(`day${day}`, lines);

  const score = (uniq) => {
    const isUpperCase = uniq === uniq.toUpperCase();
    return isUpperCase
      ? 26 + (uniq.charCodeAt(0) - 64)
      : uniq.charCodeAt(0) - 96;
  };

  const reducer = (sum: number, line: string, index: number) => {
    const firstHalf = line.slice(0, line.length / 2);
    const secondHalf = line.slice(line.length / 2);
    const charsAppearingInBothHalves = firstHalf
      .split("")
      .filter((char) => secondHalf.includes(char));
    const uniqueCharsAppearingInBothHalves = [
      ...new Set(charsAppearingInBothHalves),
    ];
    if (uniqueCharsAppearingInBothHalves.length == 0) {
      console.info(`day${day}`, `line ${index + 1} has no matching characters`);
    }
    if (uniqueCharsAppearingInBothHalves.length > 1) {
      console.info(index, line, uniqueCharsAppearingInBothHalves);
    }
    const uniq = uniqueCharsAppearingInBothHalves[0];
    const isUpperCase = uniq === uniq!.toUpperCase();
    const score = isUpperCase
      ? 26 + (uniq!.charCodeAt(0) - 64)
      : uniq!.charCodeAt(0) - 96;

    return score + sum;
  };

  const sumOfPriorities = [...lines].reduce(reducer, 0);

  // split into groups of 3 lines
  const groupsOf3Lines: string[][] = [];
  for (let i = 0; i < lines.length; i += 3) {
    groupsOf3Lines.push([...lines].slice(i, i + 3));
  }
  // console.info(`day${day}`, groupsOf3Lines);

  const q2 = groupsOf3Lines.reduce((acc, current, index, arr) => {
    const [line1, line2, line3] = current;
    if (!line1 || !line2 || !line3) {
      return acc;
    }
    const charsAppearingInAllLines = line1
      .split("")
      .filter((char) => line2.includes(char) && line3.includes(char));
    const uniqueCharsAppearingInAllLines = [
      ...new Set(charsAppearingInAllLines),
    ];
    const uniq = uniqueCharsAppearingInAllLines[0];
    const gScore = score(uniq);
    return acc + gScore;
  }, 0);

  return {
    question1: {
      sumOfPriorities: sumOfPriorities,
    },
    question2: {
      sumOfPriorities: q2,
    },
  };
};
