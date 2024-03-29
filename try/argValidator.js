//module argValidator.js

/*
   class accepts alias and full name arrOptions and test array of 'arguments'
    if they are duplicate or absent.

    optAlias =  short name of option: -c, -i, -o
    optFullName = full name of option: --config, --input, --output
    isRequired = false (default). If = true, option required otherwise return Error
  
  */

const { argumentsError } = require("../errors/myError");

module.exports = class argValidator {
  constructor(optAlias, optFullName, arrArgs, isRequired = false) {
    this.optAlias = optAlias;
    this.optFullName = optFullName;
    this.isRequired = isRequired;
    this.arrArgs = arrArgs;
  }
  isValid() {
    let arrOptions = this.arrArgs.filter(
      (item) =>
        item.startsWith(this.optAlias) || item.startsWith(this.optFullName)
    );

    let noErrorsOptions = true;
    arrOptions.forEach((item) => {
      if (item != this.optAlias && item != this.optFullName) {
        noErrorsOptions = false;
      }
    });
    if (!noErrorsOptions) {
      throw new argumentsError(`Wrong option(s): ${arrOptions}`);
    }

    if (arrOptions.length > 1) {
      // duplicate arrOptions
      throw new argumentsError(
        `Duplicate option(s): ${this.optAlias} or ${this.optFullName}`
      );

      return false;
    } else if (arrOptions.length < 1) {
      if (this.isRequired) {
        // option is absent but  required
        throw new argumentsError(
          `Option is absent: ${this.optAlias} or ${this.optFullName}`
        );
        return false;
      } else {
        // option is absent but not required
        return null;
      }
    }
    // option is found
    return true;
  }

  getNextArg() {
    //return argument as array after option -c or -i or -o
    let position = Math.max(
      this.arrArgs.indexOf(this.optAlias),
      this.arrArgs.indexOf(this.optFullName)
    );
    return this.arrArgs[position + 1];
  }
};
