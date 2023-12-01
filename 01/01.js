const fs = require("fs");
const value = fs.readFileSync("./input.txt", "utf8");

const total = value.split("\n").reduce((acc, line) => {
  const first = line.search(/\d/);
  const reversed = line.split("").reverse().join("");
  const second = reversed.search(/\d/);

  if (first !== -1) {
    return (
      acc + parseInt(`${line.charAt(first)}${reversed.charAt(second)}`, 10)
    );
  }

  return acc;
}, 0);

console.log(total);
