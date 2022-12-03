import { readTextFile } from "../utils/readTextFile";

export const day2 = () => {
  const day = 2;
  let file = readTextFile(`day${day}.txt`);
  console.info(`day${day}`, file);

  return {
    question1: {},
    question2: {},
  };
};
