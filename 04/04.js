const fs = require("fs");
const value = fs.readFileSync("./input.txt", "utf8");

const inputMatrix = value.split("\n");

const totalPart1 = inputMatrix.reduce((acc, line) => {
  const [left, right] = line.split("|");
  const myNumbers = right.trim();
  const winningNumbers = left.split(":")[1].trim();

  const winningNumbersIOwn = winningNumbers
    .split(" ")
    .reduce((owned, number) => {
      if (number.trim()) {
        const isNumberWon = myNumbers.split(" ").includes(number) ? 1 : 0;
        return owned + isNumberWon;
      }

      return owned;
    }, 0);

  const delta =
    winningNumbersIOwn > 1
      ? Math.pow(2, winningNumbersIOwn - 1)
      : winningNumbersIOwn;

  return acc + delta;
}, 0);

console.log(totalPart1);
