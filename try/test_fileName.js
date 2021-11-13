const { access, constants, accessSync } = require('fs');
const { fileError } = require('../errors/myError');

const source = "./text.txt";

/* access(source, constants.R_OK, (err) => {
    if (err) {
        throw new fileError('mistake')
        console.log(`${source} ${err ? 'is not readable' : 'is readable'}`);
    }

}); 
*/
try {
    
    accessSync(source, constants.F_OK);
} catch (error) {
    console.log('ewrror....')
}
