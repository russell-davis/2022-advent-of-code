const args = process.argv.slice(2);
const nowDay = args[0] ?? new Date().getDate();

console.info(`Generating for day ${nowDay}`);
const fs = require("fs");
const path = require("path");

// create test file
const testFile = path.join(
  __dirname,
  "..",
  "src",
  "days",
  "data",
  `day${nowDay}.txt`
);
// if file already exists, do nothing
if (fs.existsSync(testFile)) {
  console.info("Test data file already exists, skipping...");
} else {
  fs.writeFileSync(testFile, "");
  console.info("Test File created!");
}

// create day command
const dayCommandTemplatePath = path.join(
  __dirname,
  "..",
  "src",
  "days",
  "_day.ts"
);
if (!fs.existsSync(dayCommandTemplatePath)) {
  console.error("Day command template not found!");
  process.exit(1);
}
// copy template to new file
const dayCommandPath = path.join(
  __dirname,
  "..",
  "src",
  "days",
  `day${nowDay}.ts`
);
if (fs.existsSync(dayCommandPath)) {
  console.error("Day command already exists, skipping...");
} else {
  fs.copyFileSync(dayCommandTemplatePath, dayCommandPath);
  console.info("Day command created!");

  // replace template with day number
  const dayCommand = fs.readFileSync(dayCommandPath, "utf8");
  const dayCommandUpdated = dayCommand
    .replace(/export const day =/g, `export const day${nowDay} =`)
    .replace(/const day = 0;/g, `const day = ${nowDay};`);

  fs.writeFileSync(dayCommandPath, dayCommandUpdated);
  console.info("Day command updated!");
}

// create router entry
const routerFile = path.join(
  __dirname,
  "..",
  "src",
  "server",
  "trpc",
  "router",
  "advent.ts"
);
if (!fs.existsSync(routerFile)) {
  console.error("Router file not found!");
  process.exit(1);
}
const newRouterImports = `import { day${nowDay} } from "../../../days/day${nowDay}";
// REPLACER:IMPORTS //`;
const newRouterEntry = `day${nowDay}: publicProcedure.query(() => {
    return day${nowDay}();
  }),
  // REPLACER:ENTRY //`;
const routerFileContent = fs.readFileSync(routerFile, "utf-8");
const newRouterFileContent = routerFileContent
  .replace("// REPLACER:IMPORTS //", newRouterImports)
  .replace("// REPLACER:ENTRY //", newRouterEntry);
// console.info("newRouterFileContent", newRouterFileContent);
if (routerFileContent.includes(`return day${nowDay}();`)) {
  console.error("Router file already updated, skipping...");
} else {
  fs.writeFileSync(routerFile, newRouterFileContent);
  console.info("Router file updated!");
}

// create component
const componentTemplatePath = path.join(
  __dirname,
  "..",
  "src",
  "components",
  "_day.tsx"
);
if (!fs.existsSync(componentTemplatePath)) {
  console.error("Component template not found!");
  process.exit(1);
}
const componentTemplateContent = fs.readFileSync(
  componentTemplatePath,
  "utf-8"
);
// console.info("componentTemplateContent", componentTemplateContent);
const newComponentContent = componentTemplateContent
  .replace("Day99", `Day${nowDay}`)
  .replace("day99", `day${nowDay}`)
  .replace("dayNumber99", `${nowDay}`);

// console.info("newComponentContent", newComponentContent);

const newComponentPath = path.join(
  __dirname,
  "..",
  "src",
  "components",
  `day${nowDay}.tsx`
);
if (fs.existsSync(newComponentPath)) {
  console.error("Component already exists, skipping...");
} else {
  fs.writeFileSync(newComponentPath, newComponentContent);
  console.info("Component created!");
}

// update index.tsx
const indexPath = path.join(__dirname, "..", "src", "pages", "index.tsx");
if (!fs.existsSync(indexPath)) {
  console.error("Index file not found!");
  process.exit(1);
}
const indexFileContent = fs.readFileSync(indexPath, "utf-8");

const newIndexFileContent = indexFileContent
  .replace(
    "// Replacer:imports //",
    `import { Day${nowDay} } from "../components/day${nowDay}";
    // Replacer:imports //`
  )
  .replace(
    "{/*// Replacer:day //*/}",
    `{activePage === ${nowDay} && <Day${nowDay} />}
        {/*// Replacer:day //*/}`
  );
// console.info("newIndexFileContent", newIndexFileContent);
if (indexFileContent.includes(`<Day${nowDay} />`)) {
  console.info("Index file already updated, skipping...");
} else {
  fs.writeFileSync(indexPath, newIndexFileContent);
}
