const fs = require("fs");
const value = fs.readFileSync("./input.txt", "utf8");

const PART_TWO = true;

const numsMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const parseLine = (rawLine) => {
  const firstReplaced = rawLine.replace(
    /(one|two|three|four|five|six|seven|eight|nine)/,
    (match, p1) => numsMap[p1.trim()]
  );

  const occurrences = Object.keys(numsMap).map((number) => {
    return { lastIndexOf: firstReplaced.lastIndexOf(number), number };
  });
  const lastOccurrence = occurrences.reduce(function (prev, current) {
    return prev.lastIndexOf > current.lastIndexOf ? prev : current;
  }, {});

  if (lastOccurrence?.lastIndexOf !== -1) {
    const lastReplaced =
      firstReplaced.slice(0, lastOccurrence.lastIndexOf) +
      numsMap[lastOccurrence.number] +
      firstReplaced.slice(
        lastOccurrence.lastIndexOf + lastOccurrence.number.length
      );

    // console.log(firstReplaced, lastReplaced);

    return lastReplaced;
  }

  return firstReplaced;
};

const total = value.split("\n").reduce((acc, rawLine) => {
  const line = PART_TWO ? parseLine(rawLine) : rawLine;
  const matches = line.match(/(\d)/g);

  if (matches.length > 0) {
    console.log(
      line,
      parseInt(`${matches[0]}${matches[matches.length - 1]}`, 10)
    );

    return acc + parseInt(`${matches[0]}${matches[matches.length - 1]}`, 10);
  }

  return acc;
}, 0);

console.log(total);
