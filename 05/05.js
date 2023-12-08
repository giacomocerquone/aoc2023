const fs = require("fs");
const value = fs.readFileSync("./input.txt", "utf8");

Array.prototype.toNumbers = function () {
  return this.map((el) => +el);
};

const inputMatrix = value.split("\n");
const seeds = inputMatrix[0].split(":")[1].trim().split(" ").toNumbers();
const maps = [];

const isNumberInRange = (number, min, max) => {
  return number >= min && number <= max;
};

const getDestinationRangeByCategory = (number, category) => {
  return maps[category].filter((line) => {
    return isNumberInRange(number, line[1], line[1] + (line[2] - 1));
  });
};

const moveForward = (number, category) => {
  if (category === 7) {
    return number;
  }

  let newNumber;

  const destRange = getDestinationRangeByCategory(number, category);

  if (destRange.length) {
    const range = destRange[0];
    newNumber = range[0] - range[1] + number;
  } else {
    newNumber = number;
  }

  return moveForward(newNumber, category + 1);
};

let mapIndex = -1;

inputMatrix.slice(1).forEach((line) => {
  if (/[a-z]/.test(line)) {
    return;
  } else if (line === "") {
    mapIndex++;
    maps[mapIndex] = [];
  } else {
    maps[mapIndex].push(line.split(" ").toNumbers());
  }
});

// const totalPart1 = seeds.slice(1).reduce((acc, seed) => {
//   return Math.min(moveForward(seed, 0), acc);
// }, moveForward(seeds[0], 0));

let minimumLocation = moveForward(seeds[0], 0);

for (let i = 0; i < seeds.length; i += 2) {
  for (let j = seeds[i]; j < seeds[i] + seeds[i + 1] - 1; j++) {
    minimumLocation = Math.min(moveForward(j, 0), minimumLocation);
  }
}

console.log(minimumLocation);
