//module fileCheck.js
/*
  test existing & accessing "fileName"
  typeOfAccess = type of accessing file: 
            to read =constants.R_OK
            to write =constants.W_OK
            ... etc.
*/

const fs = require('fs');
const path = require('path');
const { fileError } = require('../errors/myError');


function isAccessible(fileName, typeOfAccess = fs.constants.R_OK) {

    let fullName = path.resolve(fileName);
    try {
        fs.accessSync(fullName, typeOfAccess);
    } catch (err) {
        throw new fileError(
            `No such file or access permission denied: ${fileName}\n`)
    }
};

module.exports = isAccessible;
