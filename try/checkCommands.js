
const Validator = require('./validate/validator')

// get array of arguments
let arguments = process.argv.splice(2);

const validatorConfig = new Validator("-c", "--config", true);
const commands = validatorConfig.isValid(arguments);

if (checkCommands(commands)) {
    
}

const validatorInput = new Validator("-i", "--input");
const inputFile = validatorInput.isValid(arguments);
//если входной файл = null, то ввод stdin

const validatorOutput = new Validator("-o", "--output");
const outputFile = validatorOutput.isValid(arguments);
//если выходной файл = null, то вывод в stdout


// TODO  сделать проверку наличия пустого дефиса в конце например "C0-A1-"

