const fs = require("fs");
const value = fs.readFileSync("./input.txt", "utf8");

const PART_TWO = true;

const numsMap = {
  one: "one1one",
  two: "two2two",
  three: "three3three",
  four: "four4four",
  five: "five5five",
  six: "six6six",
  seven: "seven7seven",
  eight: "eight8eight",
  nine: "nine9nine",
};

const parseLine = (rawLine) => {
  const occurrences = Object.keys(numsMap).map((number) => {
    return { lastIndexOf: rawLine.lastIndexOf(number), number };
  });
  const lastOccurrence = occurrences.reduce(function (prev, current) {
    return prev.lastIndexOf > current.lastIndexOf ? prev : current;
  }, {});

  let newLine = rawLine;

  if (lastOccurrence?.lastIndexOf > -1) {
    newLine =
      rawLine.slice(0, lastOccurrence.lastIndexOf) +
      numsMap[lastOccurrence.number] +
      rawLine.slice(lastOccurrence.lastIndexOf + lastOccurrence.number.length);
  }

  const firstReplaced = newLine.replace(
    /(one|two|three|four|five|six|seven|eight|nine)/,
    (match, p1) => numsMap[p1.trim()]
  );

  return firstReplaced;
};

const total = value.split("\n").reduce((acc, rawLine) => {
  const line = PART_TWO ? parseLine(rawLine) : rawLine;
  const matches = line.match(/(\d)/g);

  if (matches.length > 0) {
    return acc + parseInt(`${matches[0]}${matches[matches.length - 1]}`, 10);
  }

  return acc;
}, 0);

console.log(total);
