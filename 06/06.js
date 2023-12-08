const fs = require("fs");
const value = fs.readFileSync("./input.txt", "utf8");

const inputMatrix = value.split("\n");

const times = [...inputMatrix[0].matchAll(/\b\d+\b/g)].flatMap((el) => +el);
const distances = [...inputMatrix[1].matchAll(/\b\d+\b/g)].flatMap((el) => +el);

const totalPart1 = times.reduce((acc, time, idx) => {
  let winWays = 0;
  const maxHoldTime = {
    holdTime: undefined,
    totalTravel: undefined,
  };

  for (let i = 1; i < time; i++) {
    let holdTime = i;

    const totalTravel = (time - holdTime) * holdTime;

    if (totalTravel > distances[idx]) {
      winWays += 1;

      maxHoldTime.holdTime = holdTime;
      maxHoldTime.totalTravel = totalTravel;
    } else if (maxHoldTime.holdTime) {
      break;
    }
  }

  return acc * winWays;
}, 1);

console.log(totalPart1);
