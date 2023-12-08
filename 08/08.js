const fs = require("fs");
const value = fs.readFileSync("./input.txt", "utf8");

const inputMatrix = value.split("\n");

const instructions = inputMatrix[0].split("");

const map = inputMatrix.slice(2).reduce((acc, line, idx) => {
  const [key, secondPart] = line.split("=");
  const actualKey = key.trim();
  const secondPart2 = secondPart.replace(" (", "").replace(")", "").split(", ");

  acc[actualKey] = {
    L: secondPart2[0],
    R: secondPart2[1],
  };

  return acc;
}, {});

let IAmAtKey = "AAA";
let index = 0;

while (IAmAtKey !== "ZZZ") {
  const currentInstructionIndex = index % instructions.length;
  const currInstr = instructions[currentInstructionIndex];

  IAmAtKey = map[IAmAtKey][currInstr];

  index++;
}

console.log(index);
