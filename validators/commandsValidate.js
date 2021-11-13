//module commandsValidate.js

/*
  validate array of commands e.g. ["A0", "C0", "R", "C0",....]
  Returns <Boolean>
*/
const allowedCommands = ["A", "C0", "C1", "R0", "R1"];

module.exports = function commandsValidate(arrCommands) {
  let result = true;
  arrCommands.forEach((item) => {
    if (allowedCommands.indexOf(item) == -1) {
      // console.log(item);
      result = false;
    }
  });
  return result;
};
