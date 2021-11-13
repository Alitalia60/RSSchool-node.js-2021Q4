const { access, constants } = require('fs');
const { fileError } = require('../errors/myError');

exports.isAccessible = (inputFileName, typeOfAccess = constants.R_OK) => {
    access(this.inputFileName, constants.R_OK, (err) => {
        if (err) {
            throw new fileError('mistake')
            console.log(`${source} ${err ? 'is not readable' : 'is readable'}`);
        }

    });

};