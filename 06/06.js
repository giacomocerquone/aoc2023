const fs = require("fs");
const value = fs.readFileSync("./input.txt", "utf8");

const inputMatrix = value.split("\n");

const times = [...inputMatrix[0].matchAll(/\b\d+\b/g)].flatMap((el) => +el);
const distances = [...inputMatrix[1].matchAll(/\b\d+\b/g)].flatMap((el) => +el);

const totalPart1 = times.reduce((acc, time, idx) => {
  let winWays = new Array(time + 1).fill(1).reduce((acc, _, holdTime) => {
    // console.log(
    //   time - holdTime,
    //   holdTime,
    //   (time - holdTime) * holdTime,
    //   distances[idx]
    // );

    if ((time - holdTime) * holdTime > distances[idx]) {
      return acc + 1;
    }

    return acc;
  }, 0);

  // console.log(winWays);

  return acc * winWays;
}, 1);

console.log(totalPart1);
