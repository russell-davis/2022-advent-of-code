import { readTextFile } from "../utils/readTextFile";

export const day6 = () => {
  const day = 6;
  let file = readTextFile(`day${day}.txt`);
  console.info(`day${day}`, file);

  const index = file.split("").reduce(
    (acc, curr, index, arr) => {
      if (index < 4) {
        return acc;
      }
      const lastFour = arr.slice(index - 4, index);
      const allUniq = lastFour.every((c, i, a) => a.indexOf(c) === i);
      if (allUniq && acc.firstUniqIndex === -1) {
        acc.firstUniqIndex = index;
      }
      if (index < 14) {
        return acc;
      }
      const lastFourteen = arr.slice(index - 14, index);
      const all14Uniq = lastFourteen.every((c, i, a) => a.indexOf(c) === i);
      if (all14Uniq && acc.first14UniqIndex === -1) {
        acc.first14UniqIndex = index;
      }
      return acc;
    },
    { firstUniqIndex: -1, first14UniqIndex: -1 }
  );
  console.info(index);

  return {
    question1: { index },
    question2: { index },
  };
};
