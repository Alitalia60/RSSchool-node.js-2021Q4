//module commandsValidate.js

const { stderr } = require("process");

//validate array of commands e.g. ["A0", "C0", "R", "C0",....]
const allowCommands = ["A0", "A1", "C0", "C1", "R"];
module.exports = function commandsValidate(arrCommands) {
  //   console.log(arrCommands);
  let result = true;

  arrCommands.forEach((element) => {
    if (allowCommands.indexOf(element) == -1) {
      result = false;
    }
  });

  if (!result) {
    // console.error(`...Wrong or empty command of queue`);
    process.stderr.write(`...Wrong or empty command of queue`);
  }
  return result;
};
