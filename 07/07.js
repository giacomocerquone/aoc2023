const fs = require("fs");
const value = fs.readFileSync("./input.txt", "utf8");

const inputMatrix = value.split("\n");

const cardsStrong2Weak = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];

const getHandRank = (hand) => {
  const cardGroups = [];

  hand.split("").forEach((card) => {
    const groupFound = cardGroups.findIndex((group) => group.includes(card));

    if (groupFound !== -1) {
      cardGroups[groupFound].push(card);
    } else {
      cardGroups.push([card]);
    }
  });

  if (cardGroups.length === 1) {
    return 0;
  }

  if (
    cardGroups.length === 2 &&
    (cardGroups[0].length === 4 || cardGroups[0].length === 1)
  ) {
    return 1;
  }

  if (
    cardGroups.length === 2 &&
    (cardGroups[0].length === 3 || cardGroups[0].length === 2)
  ) {
    return 2;
  }

  if (
    cardGroups.length === 3 &&
    !cardGroups.some((group) => group.length === 2)
  ) {
    return 3;
  }

  if (cardGroups.length === 3) {
    return 4;
  }

  if (cardGroups.length === 4) {
    return 5;
  }

  if (cardGroups.length === 5) {
    return 6;
  }

  return cardGroups;
};

const orderedHands = inputMatrix.sort((a, b) => {
  const handA = a.split(" ")[0];
  const handB = b.split(" ")[0];

  const rankHandA = getHandRank(handA);
  const rankHandB = getHandRank(handB);

  if (rankHandA === rankHandB) {
    for (let i = 0; i < 5; i++) {
      const rankCardA = cardsStrong2Weak.indexOf(handA[i]);
      const rankCardB = cardsStrong2Weak.indexOf(handB[i]);

      if (rankCardA === rankCardB) {
        continue;
      }

      return rankCardA - rankCardB;
    }
  }

  return rankHandA - rankHandB;
});

const totalPart1 = orderedHands.reverse().reduce((acc, line, idx) => {
  const bid = line.split(" ")[1].trim();

  return acc + (idx + 1) * +bid;
}, 0);

console.log(totalPart1);
