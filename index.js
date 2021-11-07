const fs = require('fs');
const path = require('path');

const CAESAR = require('./caesar/caesar');
const ATBASH = require('./atbash/atbash');
const ROT8 = require('./rot8/rot8');
const ERR = require('./errors/errors.json');
const { stdout, stderr } = require('process');
const Validator = require('./validate/validator')

// get array of arguments
let arguments = process.argv.splice(2);

const validatorConfig = new Validator("-c", "--config", true);
const commands = validatorConfig.isValid(arguments);

const validatorInput = new Validator("-i", "--input");
const inputFile = validatorInput.isValid(arguments);
//если входной файл = null, то ввод stdin

const validatorOutput = new Validator("-o", "--output");
const outputFile = validatorOutput.isValid(arguments);
//если выходной файл = null, то вывод в stdout



commands.forEach(element => {
    if (["A", "C0", "C1", "R0", "R1"].indexOf(element) == -1) {
        console.error(`${element} ${ERR[4]}`);
        process.exit(1);
    }
});
if (commands.length == 0) {
    //nothing to do
    console.error(`${ERR[5]}`);
    process.exit(1);
}




// ..создание списка команд шифрования
commands.forEach(element => {
switch (element.splice(0, 1)) {
    case "A":
        ATBASH.convert(chunk)
        break;
    case "C":
        CAESAR.convert(chunk, element.slice(1, 1))
        break;
    case "R":
        ROT8.convert(chunk, element.slice(1, 1))
        break;

    default:
        break;
}
})
);