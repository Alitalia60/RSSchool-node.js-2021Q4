// module argChecker
/*
    validate if correct arguments -c(--config), -i(--input), -o(--output)
*/


const { argumentsError } = require("../errors/myError");

// function checkArgs(arrArgs, optAlias, optFull, nextArgument, isRequired = false) {
module.exports.checkArgs = function (arrArgs, optAlias, optFull, isRequired = false) {
    let countConfig = arrArgs.filter((item) => (item == optAlias) || (item == optFull)).length;
    if (countConfig == 0) {
        if (isRequired) {
            throw new argumentsError(`"${optAlias}" or ${optFull} not found`);
            return false;
        }
        else {
            return true;
        }
    }
    else if (countConfig > 1) {
        throw new argumentsError(`Duplicate argument: "${optAlias}" or "${optFull}"`);
        return false;
    }
    else {
        // correct number
        let indexOfNextArg = Math.max(arrArgs.indexOf(optAlias), arrArgs.indexOf(optFull)) + 1;
        nextArgument = arrArgs[indexOfNextArg];

        if (nextArgument == undefined) {
            throw new argumentsError(`There is no argument after "${optAlias}" or "${optFull}"`);
            return false
        }
        else {
            if (["-c", "--config", "-i", "--input", "-o", "--output"].indexOf(nextArgument) >= 0) {
                throw new argumentsError(`Wrong argument(s) <${nextArgument}> after "${optAlias}"`);
                return false
            }
            else {
                // let el_to_remove1 = arrArgs[indexOfNextArg - 1];
                // let el_to_remove2 = arrArgs[indexOfNextArg];
                // arrArgs.splice(arrArgs.indexOf(el_to_remove1), 1);
                // arrArgs.splice(arrArgs.indexOf(el_to_remove2), 1);
                arrArgs.splice(indexOfNextArg - 1, 2);

                return true;
            }
        }
    }
}

module.exports.getNexArg = function (arrArgs, optAlias, optFull, isRequired = false) {
    let index = Math.max(arrArgs.indexOf(optAlias), arrArgs.indexOf(optFull));
    if (index == -1) {
        return null
    }
    else {
        return arrArgs[index + 1]
    }
}
