// module fileValidator.js;
/*
validate if file fileName exsist

Parameters:
    
  fileName      = path + file name to check if exist and accessible
  typeOfAccess  = Node File system constants

 Returns nothing
*/

const { access, constants } = require('fs');
const { fileError } = require("../errors/myError");

let result = false;

exports.isAccessible = (inputFileName, typeOfAccess = constants.R_OK) => {
  const source = "./tex___t.txt";
  // console.log(inputFileName);
  access(source, constants.F_OK, (err) => {
    console.log(`${source} ${err ? 'is not readable' : 'is readable'}`);
    // if (err) {
    //   if (err.code == "ENOENT" || err.code == "EACCES") {
    //     throw new fileError(
    //       `no such file or access Permission denied: ${inputFileName}`
    //     );
    //   }
    // }
  }
  )
}