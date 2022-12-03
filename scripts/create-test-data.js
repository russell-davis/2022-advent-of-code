#! node
const path = require("path");
const fs = require("fs");

export const create = (day) => {
  const currentLocation = process.cwd();
  const testDataDir = path.join(currentLocation, "..", "src", "testData");
  console.info(`Creating test data for day ${day}`);
  const newTestFile = path.join(testDataDir, `day${day}.js`);
  if (fs.existsSync(newTestFile)) {
    console.error(`Test file ${newTestFile} already exists`);
    process.exit(1);
  }
  const newTestFileContent = "";

  fs.writeFileSync(newTestFile, newTestFileContent);
  console.info(`Created test file ${newTestFile}`);
};
