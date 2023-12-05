const fs = require("fs");
const value = fs.readFileSync("./input.txt", "utf8");

const inputMatrix = value.split("\n");

const isNumberInRange = (number, min, max) => {
  return number >= min && number <= max;
};

const totalPart1 = inputMatrix.reduce((acc, line, lineIdx) => {
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
      delta += +number;
    } else if (isSymbolAbove) {
      delta += +number;
    } else if (isSymbolBelow) {
      delta += +number;
    }
  }

  return acc + delta;
}, 0);

const totalPart2 = inputMatrix.reduce((acc, line, lineIdx) => {
  const star = /[*]/g;
  const starMatches = line.matchAll(star);

  let delta = 0;

  for (const starMatch of starMatches) {
    const starIndex = starMatch.index;

    const digits = /\b\d+\b/g;

    const digitsMatchesInline = Array.from(line.matchAll(digits));
    const digitsMatchesAboveLine =
      lineIdx > 0 ? Array.from(inputMatrix[lineIdx - 1].matchAll(digits)) : [];
    const digitsMatchesBelowLine = inputMatrix[lineIdx + 1]
      ? Array.from(inputMatrix[lineIdx + 1].matchAll(digits))
      : [];

    const digitsNearStar = [
      ...digitsMatchesInline,
      ...digitsMatchesAboveLine,
      ...digitsMatchesBelowLine,
    ].filter((digitMatch) => {
      return isNumberInRange(
        starIndex,
        digitMatch.index > 0 ? digitMatch.index - 1 : digitMatch.index,
        digitMatch.index + digitMatch[0].length
      );
    });

    if (digitsNearStar.length === 2) {
      delta += +digitsNearStar[0][0] * +digitsNearStar[1][0];
    }

    // wanted to make sure there were no sneaky cases where a star would touch more than just two numbers. Luckily it wasn't the case
    if (digitsNearStar.length > 2) {
      console.log("WARNING");
    }
  }

  return acc + delta;
}, 0);

console.log(totalPart1);
console.log(totalPart2);
