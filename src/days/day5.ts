import { readTextFile } from "../utils/readTextFile";
import _ from "lodash";

export const day5 = () => {
  const day = 5;
  let file = readTextFile(`day${day}.txt`);
  // console.info(`day${day}`, file);

  // Q1 - which crates end up on top of the stack?
  const lines = file.split("\r\n");
  // console.info(`lines`, lines);
  const crateStartingPositions = lines
    .slice(0, 10)
    .filter((line) => line.length > 0);
  // console.info(`crateStartingPositions`, crateStartingPositions);

  const crateStartingPositionsMap = crateStartingPositions.reverse().reduce(
    (acc, line, index) => {
      if (index === 0) {
        return acc;
      }
      const cratesOnRow = line.split(" ");
      const indexesOfCratesWithSpaces = cratesOnRow
        .map((c, i) => (c === "" ? i : null))
        .filter((c) => c !== null);

      if (indexesOfCratesWithSpaces.length === 4) {
        cratesOnRow.splice(indexesOfCratesWithSpaces[0]!, 3);
      } else if (indexesOfCratesWithSpaces.length === 8) {
        cratesOnRow.splice(indexesOfCratesWithSpaces[0]!, 6);
      } else if (indexesOfCratesWithSpaces.length === 12) {
        cratesOnRow.splice(indexesOfCratesWithSpaces[0]!, 9);
      }

      cratesOnRow.forEach((crate, index) => {
        const stack = acc.stacks.find((stack) => stack.id === index + 1);
        if (stack && crate !== "") {
          stack.crates.push(crate);
        }
      });
      return acc;
    },
    {
      stacks: Array.from({ length: 9 }, (_, i) => i + 1).map((id) => ({
        id,
        crates: [] as string[],
      })),
    }
  );
  const stacks = _.cloneDeep(crateStartingPositionsMap.stacks);
  const moves = lines
    .slice(10)
    .filter((line) => line.length > 0)
    .map((line) => {
      const syntax = "move {number} from {number} to {number}";
      const regex = /move (\d+) from (\d+) to (\d+)/;
      const matches = line.match(regex);
      if (matches) {
        return {
          amount: parseInt(matches[1]!, 10),
          from: parseInt(matches[2]!, 10),
          to: parseInt(matches[3]!, 10),
        };
      }
    });

  const movedStacks = [...moves].reduce(
    (acc, move) => {
      if (move && acc) {
        const fromCrate = acc[move.from - 1];
        const toCrate = acc[move.to - 1];
        if (fromCrate && toCrate) {
          for (let i = 0; i < move.amount; i++) {
            const crate = fromCrate.crates.pop();
            if (crate) {
              toCrate.crates.push(crate);
            }
          }
        }
      }
      return acc;
    },
    [...stacks]
  );

  const topOfEachStack = movedStacks.map(
    (stack) => stack.crates[stack.crates.length - 1]
  );
  const answer1 = topOfEachStack.join("").replace(/\[/g, "").replace(/]/g, "");
  console.info(`answer1`, answer1);

  // Q2 - refactor the moving
  const movedStacks2 = _.cloneDeep(moves).reduce((acc, move) => {
    if (move && acc) {
      const fromCrate = acc[move.from - 1];
      const toCrate = acc[move.to - 1];
      if (fromCrate && toCrate) {
        if (move.amount === 1) {
          const crate = fromCrate.crates.pop();
          if (crate) {
            toCrate.crates.push(crate);
          }
        } else {
          const cratesFromTop = fromCrate.crates.splice(
            fromCrate.crates.length - move.amount,
            move.amount
          );
          toCrate.crates.push(...cratesFromTop);
        }
      }
    }
    return acc;
  }, _.cloneDeep(crateStartingPositionsMap.stacks));
  const topOfEachStack2 = movedStacks2.map(
    (stack) => stack.crates[stack.crates.length - 1]
  );
  const answer2 = topOfEachStack2.join("").replace(/\[/g, "").replace(/]/g, "");
  console.info(`answer2`, answer2);

  return {
    question1: { answer1 },
    question2: { answer2 },
  };
};
