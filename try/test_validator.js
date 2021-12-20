const Validator = require("../validators/argValidator.js");

const ERR = require("../errors.json");

let arguments = process.argv.slice(2);
let commands = undefined;
let source = undefined;
let destination = undefined;

// check '-c', '--config' arguments;
const configValidator = new Validator('-c', '--config', arguments, true);
if (configValidator.isValid() == false) {
    console.error('=== Program exit because there is a mistake in arguments');
    process.exit(1);
} else {
    commands = configValidator.getNextArg();
    if (commands == undefined) {
        console.error('=== No commands was founded');
        process.exit(1)
    }
};

let arrCommands = commands.split("-");
console.log(arrCommands);


const inputValidator = new Validator('-i', '--input', arguments);
let rezult = inputValidator.isValid();
if ( rezult == false) {
    console.error('=== Program exit because there is a mistake in arguments: -i or --input');
    process.exit(1);
} 
else if (rezult == null) {
    // stdin
    
}
else {
    source = inputValidator.getNextArg();
    if (source == undefined) {
        console.error('=== No source file was defined:  "-i[| --input] inputFile"');
        process.exit(1)
    }
};

console.log(source)

const outputValidator = new Validator('-o', '--output', arguments);
if (outputValidator.isValid() == false) {
    console.error('=== Program exit because there is a mistake in arguments: "-o" or "--output"');
    process.exit(1);
}
else {
    destination = outputValidator.getNextArg();
    if (destination == undefined) {
        console.error('=== No destination file was defined:  -o[| --output] "outputFile"');
        process.exit(1)
    }
};

console.log(destination)