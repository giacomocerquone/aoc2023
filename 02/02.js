const fs = require("fs");
const value = fs.readFileSync("./input.txt", "utf8");

const availableCubes = {
  red: 12,
  green: 13,
  blue: 14,
};

const totalPart1 = value.split("\n").reduce((acc, line) => {
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

const totalPart2 = value.split("\n").reduce((acc, line) => {
  const [, rest] = line.split(":");

  const sets = rest.split(";");

  let maxCubesByColor = {
    red: 0,
    green: 0,
    blue: 0,
  };

  sets.forEach((set) => {
    const cubes = set.split(", ");

    cubes.forEach((cube) => {
      const [number, color] = cube.trim().split(" ");

      if (+number > maxCubesByColor[color]) {
        maxCubesByColor[color] = +number;
      }
    });
  });

  const power =
    maxCubesByColor.red * maxCubesByColor.green * maxCubesByColor.blue;

  maxCubesByColor = {
    red: 0,
    green: 0,
    blue: 0,
  };

  return acc + power;
}, 0);

console.log(totalPart1);
console.log(totalPart2);
