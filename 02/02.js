const fs = require("fs");
const value = fs.readFileSync("./input.txt", "utf8");

const availableCubes = {
  red: 12,
  green: 13,
  blue: 14,
};

const total = value.split("\n").reduce((acc, line) => {
  const [gameIDString, rest] = line.split(":");

  const gameID = parseInt(gameIDString.replace("Game ", "").trim(), 10);
  const sets = rest.split(";");

  if (
    sets.every((set) => {
      const cubes = set.split(", ");

      return cubes.every((cube) => {
        const [number, color] = cube.trim().split(" ");

        return +number <= availableCubes[color];
      });
    })
  ) {
    return acc + gameID;
  }

  return acc;
}, 0);

console.log(total);
