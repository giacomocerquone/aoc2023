const fs = require("fs");
const value = fs.readFileSync("./input.txt", "utf8");

const inputMatrix = value.split("\n");

// console.log = () => {};

const total = inputMatrix.reduce((acc, line, lineIdx) => {
  const digits = /\b\d+\b/g;
  const numberMatches = line.matchAll(digits);

  let delta = 0;

  for (const match of numberMatches) {
    const [number] = match;
    const symbols = /[^0-9.]+/g;

    const isSymbolAbove =
      lineIdx > 0 &&
      new Array(number.length + 2).fill(1).some((el, index) => {
        if (inputMatrix[lineIdx - 1][match.index - 1 + index] === undefined)
          return false;

        return symbols.test(inputMatrix[lineIdx - 1][match.index - 1 + index]);
      });

    const isSymbolBelow =
      !!inputMatrix[lineIdx + 1] &&
      new Array(number.length + 2).fill(1).some((el, index) => {
        if (inputMatrix[lineIdx + 1][match.index - 1 + index] === undefined)
          return false;

        return symbols.test(inputMatrix[lineIdx + 1][match.index - 1 + index]);
      });

    if (
      (line[match.index - 1] !== undefined &&
        symbols.test(line[match.index - 1])) ||
      (line[match.index + number.length] !== undefined &&
        symbols.test(line[match.index + number.length]))
    ) {
      // console.log("near", number);

      delta += +number;
    } else if (isSymbolAbove) {
      // console.log("above", number);

      delta += +number;
    } else if (isSymbolBelow) {
      // console.log("below", number);

      delta += +number;
    }
  }

  return acc + delta;
}, 0);

console.warn(total);
