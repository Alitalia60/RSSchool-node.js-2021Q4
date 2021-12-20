const { argumentsError, commandsError } = require("../lib/errors/myError");
const { checkArgs, getNextArg } = require("../lib/validators/argCheck")

describe("Test on correct arguments", () => {

    const arrayCorrectCommands = [
        "-c C1-C1-A-R0",
        "-c A -i someFileName.txt",
        "-c C1-C1-A-R0 -o someFileName.txt",
        "-i someFileName.txt -c C1-C1-A-R0 -o output.txt",
        "--config A -i someFileName.txt",
        "-c C1-C1-A-R0 --output someFileName.txt",
        "-i someFileName.txt -c C1-C1-A-R0 -o output.txt"];
    test.each(arrayCorrectCommands)(`testing on %sitem`, (item) => {
        expect(() => checkArgs(item.split(" "))).not.toThrow(argumentsError);
    });
});


describe("Test on duplexing of arguments", () => {
    const arrayOfDuplexArgs =
        ["-c C1-C1-A-R0 --config A-A",
            "-c A -i someFileName.txt --input",
            "--output RRR.txt -c C1-C1-A-R0 -o someFileName.txt",
            "--config A -i someFileName.txt -c R0",
            "-c C1-C1-A-R0 -c R1-A --output someFileName.txt"];
    test.each(arrayOfDuplexArgs)(`testing on %sitem`, (item) => {
        expect(() => checkArgs(item.split(" "))).toThrow('duplicated');
    });
})

describe("Test if there is no required arguments", () => {
    const arrayOfDuplexArgs =
        ["C1-C1-A-R0 -i someFileName.txt",
            "-i someFile.txt --output someFileName.txt"];
    test.each(arrayOfDuplexArgs)(`testing on %sitem`, (item) => {
        expect(() => checkArgs(item.split(" "))).toThrow('is not found');
    });
})

describe('Test getting commands argument -c --config', () => {
    const arrayCorrectCommands = [
        ["-c C1-C1-A-R0", "C1-C1-A-R0"],
        ["-c A -i someFileName.txt", "A"],
        ["-c C1-C0-A-R0 -o someFileName.txt", "C1-C0-A-R0"],
        ["-i someFileName.txt -c R1-C1-A-R0 -o output.txt", "R1-C1-A-R0"],
        ["--config R0 -i someFileName.txt", "R0"],
        ["-c C1-C1-A-R1-C1-C1-A-R1 --output someFileName.txt", "C1-C1-A-R1-C1-C1-A-R1"],
        ["-i someFileName.txt -c C1-C1-A-R0 -o output.txt", "C1-C1-A-R0"]
    ];
    test.each(arrayCorrectCommands)('should ', (str, result) => {

        expect(getNextArg(str.split(" "), "-c")).toEqual(result)
    });
})


describe('Test getting file name -i, -o, --input,--output', () => {
    const arrayCorrectCommands = [
        ["-i", "-c C1-C1-A-R0 -i someFile", "someFile"],
        ["-i", "-c A -i someFileName.txt", "someFileName.txt"],
        ["-o", "--config C1-C0-A-R0 -o someFileName.txt", "someFileName.txt"],
        ["-i", "-c R1-C1-A-R0 -o output.txt", undefined],
        ["-i", "--config R0", undefined],
        ["-o", "-c C1-C1-A-R1-C1-C1-A-R1 --output someFileName.txt", "someFileName.txt"],
        ["-o", "-c C1-C1-A-R0", undefined]
    ];

    test.each(arrayCorrectCommands)('Test on %sstr', (key, str, result) => {
        expect(getNextArg(str.split(" "), key)).toEqual(result)
    });
})

const arrArg = [
    ["-i someFile.txt C1-C0-R1-A --output someFile.txt -c"],
    ["-i someFile.txt -o someFile.txt C1-C0-R1-A --config"],
];
test.each(arrArg)('There is no passed commands after "-c', (item) => {
    expect(() => getNextArg(item.split(" "), "-c")).toThrow(commandsError)
});

