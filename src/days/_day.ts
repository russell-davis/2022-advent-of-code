import { readTextFile } from "../utils/readTextFile";

export const day = () => {
  const day = 0;
  let file = readTextFile(`day${day}.txt`);
  console.info(`day${day}`, file);

  return {
    question1: {},
    question2: {},
  };
};
