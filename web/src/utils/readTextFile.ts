import fs from "fs";
import path from "path";

export const readTextFile = (fileName: string) => {
  // read the file
  const p = path.join(process.cwd(), "src", "days", "data", fileName);
  const data = fs.readFileSync(p, "utf8");
  return data;
};
