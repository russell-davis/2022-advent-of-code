import { readTextFile } from "../utils/readTextFile";

type Directory = {
  dirName: string;
  dirs: Directory[];
  files: { name: string; size: number }[];
  dirSize: number;
};

export const day7 = () => {
  const day = 7;
  let file = readTextFile(`day${day}.txt`);
  // console.info(`day${day}`, file);

  const io = file.split("\r\n");
  const dirMap: Map<string, Directory> = new Map();
  let currentPath = "";
  let totalSize = 0;

  for (const line of io) {
    if (line === "") {
      continue;
    }
    const isCmd = line.startsWith("$");
    const isDir = line.startsWith("dir");
    const isFile = !isCmd && !isDir;

    if (isCmd) {
      // perform a command
      const isCd = line.startsWith("$ cd");
      const isLs = line.startsWith("$ ls");
      if (isCd) {
        const dirName = line.split(" ")[2];
        // console.info("cmd cd:", dirName);
        if (dirName === "..") {
          // go up a level
          const newPath = currentPath.split("/").slice(0, -1).join("/");
          currentPath = newPath === "" ? "/" : newPath;
          // console.info("cd ..", { newpath: currentPath });
          continue;
        } else {
          // go down a level
          currentPath =
            currentPath === ""
              ? "/"
              : currentPath === "/"
              ? `/${dirName}`
              : `${currentPath}/${dirName}`;
          // console.info(`cd: ${currentPath}`, { newpath: currentPath });
          continue;
        }
      }
      if (isLs) {
        // console.info("cmd ls:", currentPath);
        continue;
      }
    }
    if (isDir) {
      // listing a directory name
      const dirName = line.split(" ")[1]!;
      const dirPath =
        currentPath === "/" ? `/${dirName}` : `${currentPath}/${dirName}`;
      if (!dirMap.has(dirPath)) {
        dirMap.set(dirPath, {
          dirName,
          dirs: [],
          files: [],
          dirSize: 0,
        });
        // console.info("Added dir:", dirPath);
      } else {
        // console.info("already exists", dirPath);
      }

      continue;
    }
    if (isFile) {
      // listing a file name
      const fileSize = parseInt(line.split(" ")[0]!);
      const fileName = line.split(" ")[1]!;
      // console.info("File:", { name: fileName, size: fileSize });
      if (dirMap.has(currentPath)) {
        const dir = dirMap.get(currentPath)!;
        dir.files.push({ name: fileName, size: fileSize });
        dir.dirSize += fileSize;
        totalSize += fileSize;
      }
      continue;
    }
  }

  let root: Directory = {
    dirName: "/",
    dirs: [],
    files: [],
    dirSize: 0,
  };
  dirMap.forEach((value, key, map) => {
    // split up the key into property names
    const path = key.split("/").filter((p) => p !== "");
    // console.info("path", path);
    // get the root object
    let obj = root;
    // loop through the path
    for (let i = 0; i < path.length; i++) {
      // get the current property name
      const p = path[i]!;
      // if the property doesn't exist, create it
      const hasPath = obj.dirs.find((d) => d.dirName === p);
      if (!hasPath) {
        obj.dirs.push(value);
      }

      obj = hasPath ? hasPath : value;
    }
  });

  // find directories with size <= 100000
  const findDirs = (dir: Directory): Directory[] => {
    const dirs = dir.dirs.filter((d) => d.dirSize <= 100000);
    const subDirs = dir.dirs
      .map((d) => findDirs(d))
      .reduce((acc, curr) => [...acc, ...curr], []);
    return [...dirs, ...subDirs];
  };
  const under100k = findDirs(root);

  const total = 70000000;
  const availableSpace = total - totalSize;
  const neededSpace = 30000000 - availableSpace;

  // find directories with size big enough to fit the needed space
  const findDirs2 = (dir: Directory): Directory[] => {
    const dirs = dir.dirs.filter((d) => d.dirSize >= neededSpace);
    const subDirs = dir.dirs
      .map((d) => findDirs2(d))
      .reduce((acc, curr) => [...acc, ...curr], []);
    return [...dirs, ...subDirs];
  };
  const overNeeded = findDirs2(root);
  const smallestOverNeeded = overNeeded[0];

  return {
    question1: {
      sumOfDirectoriesOver100k: under100k.reduce(
        (acc, d) => acc + d.dirSize,
        0
      ),
      // total: calcDirSize(root),
    },
    question2: {
      total,
      availableSpace,
      neededSpace,
      smallestOverNeeded: smallestOverNeeded?.dirSize,
    },
  };
};
