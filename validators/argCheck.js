// module argChecker
/*
    validate if correct arguments -c(--config), -i(--input), -o(--output)
*/

const { argumentsError, commandsError } = require("../errors/myError");

function checkArgs(arrArgs) {
    let arrOptions = [
        ["-c", "--config", true],
        ["-i", "--input", false],
        ["-o", "--output", false]
    ];
    arrOptions.forEach((item) => {
        let countOption = arrArgs.filter(arg => arg == item[0] || arg == item[1]).length;
        if (countOption == 0 && item[2]) {
            throw new argumentsError(` argument ${item.slice(0, 2)} is not found\n`);
            return false
        }
        if (countOption > 1) {
            throw new argumentsError(` arguments ${item.slice(0, 2)} are duplicated\n`);
            return false
        }
    });
    return true
}

function getNextArg(arrArgs, arrOption) {
    if (arrOption == "-c") {
        let ind = Math.max(arrArgs.indexOf("-c"), arrArgs.indexOf("--config"))
        if (ind != -1) {
            if (arrArgs[ind + 1]) {
                return arrArgs[ind + 1]
            }
            else {
                throw new commandsError('There is no command specified after "-c" ("--config")\n');
            }
        }
    }

    if (arrOption == "-i") {
        let ind = Math.max(arrArgs.indexOf("-i"), arrArgs.indexOf("--input"))
        if (ind != -1) {
            return arrArgs[ind + 1]
        }
    }

    if (arrOption == "-o") {
        let ind = Math.max(arrArgs.indexOf("-o"), arrArgs.indexOf("--output"))
        if (ind != -1) {
            return arrArgs[ind + 1]
        }
    }

}
module.exports = { checkArgs, getNextArg };
