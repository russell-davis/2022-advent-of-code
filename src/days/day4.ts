import { readTextFile } from "../utils/readTextFile";

export const day4 = () => {
  const day = 4;
  const file = readTextFile(`day${day}.txt`);
  // console.info(`day${day}`, file);

  const lines = file.split("\r\n").filter((line) => line.length > 0);
  // console.info(`day${day}`, lines);

  const pairs = lines.map((line) => {
    return {
      a: line
        .split(",")[0]
        ?.split("-")
        .map((x) => parseInt(x)),
      b: line
        .split(",")[1]
        ?.split("-")
        .map((x) => parseInt(x)),
    } as { a: number[]; b: number[] };
  });
  // console.info(`day${day}`, pairs);

  const rangeContainsRange = (a: number[], b: number[]) => {
    if (a.length !== 2 || b.length !== 2) {
      throw new Error("Invalid range");
    }
    if (
      a[0] === undefined ||
      a[1] === undefined ||
      b[0] === undefined ||
      b[1] === undefined
    ) {
      throw new Error("Invalid range");
    }
    return a[0] <= b[0] && a[1] >= b[1];
  };

  const oneContainsTheOther = pairs
    .filter((pair) => {
      return (
        rangeContainsRange(pair.a, pair.b) || rangeContainsRange(pair.b, pair.a)
      );
    })
    .map((pair) => {
      return {
        ...pair,
        contains: rangeContainsRange(pair.a, pair.b)
          ? "a contains b"
          : "b contains a",
      };
    });
  // console.info(`oneContainsTheOther`, oneContainsTheOther.length);

  const rangesOverlap = (a: number[], b: number[]) => {
    if (
      a[0] === undefined ||
      a[1] === undefined ||
      b[0] === undefined ||
      b[1] === undefined
    ) {
      throw new Error("Invalid range");
    }

    const aStart = a[0];
    const aEnd = a[1];
    const bStart = b[0];
    const bEnd = b[1];
    return (
      (aStart <= bStart && aEnd >= bStart) ||
      (aStart <= bEnd && aEnd >= bEnd) ||
      (bStart <= aStart && bEnd >= aStart) ||
      (bStart <= aEnd && bEnd >= aEnd)
    );
  };

  const overlap = pairs.filter((pair) => {
    return rangesOverlap(pair.a, pair.b);
  });

  // console.info(`overlap`, overlap.length);

  return {
    question1: {
      fullyContainsAnother: oneContainsTheOther.length,
    },
    question2: {
      overlap: overlap.length,
    },
  };
};
