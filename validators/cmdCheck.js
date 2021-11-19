//module commandsValidate.js

const { commandsError } = require("../errors/myError");

/*
  validate array of commands e.g.: arrCommands = ["A0", "C0", "R", "C0",....]
  Returns <Boolean>
*/
const allowedCommands = ["A", "C0", "C1", "R0", "R1"];

function cmdCheck(cmd) {

  let result = true;
  cmd.split("-").forEach((item) => {
    if (!allowedCommands.includes(item)) {
      throw new commandsError(`Wrong command ${item}. Try ${allowedCommands}\n`)
      result = false;
    }
  });
  return result;
};

module.exports = cmdCheck;
