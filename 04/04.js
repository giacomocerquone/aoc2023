const fs = require("fs");
const value = fs.readFileSync("./input.txt", "utf8");

const inputMatrix = value.split("\n");
const scratchcardsInventory = inputMatrix.reduce((map, _, idx) => {
  map[idx] = 1;
  return map;
}, {});

const totalPart1 = inputMatrix.reduce((acc, line, idx) => {
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

  new Array(winningNumbersIOwn).fill(1).forEach((_, nextGamesId) => {
    const clonedGameId = idx + (nextGamesId + 1);

    scratchcardsInventory[clonedGameId] =
      scratchcardsInventory[clonedGameId] + (scratchcardsInventory[idx] || 1);
  });

  const delta =
    winningNumbersIOwn > 1
      ? Math.pow(2, winningNumbersIOwn - 1)
      : winningNumbersIOwn;

  return acc + delta;
}, 0);

const totalPart2 = Object.values(scratchcardsInventory).reduce((acc, card) => {
  return acc + card;
}, 0);

console.log(totalPart1);
console.log(totalPart2);
