const { commandsError } = require("../errors/myError");
const cmdCheck = require("../validators/cmdCheck");

const badCommands =[["A1-R-C0"],
["C2"],
["U0-Y1"],
["A-A0-R0"],
["A-A0 R0"],
["C1-C1-C1-C1-C1-C8"]];

test.each(badCommands)("Commands test on %sitem", (item)=>{
    expect(() => cmdCheck(item)).toThrowError(commandsError);
    // expect(cmdCheck("A-A")).toBe(true);
})

const goodCommands = [["A-R1-C0"],
["C1"],
["A"],
["A-A-R0"],
["C1-C1-C1-C1-C1-C0"]];

test.each(goodCommands)("Commands test on %sitem", (item) => {
    expect(() => cmdCheck(item)).not.toThrow();
})