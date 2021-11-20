const convert = require("../ciphers/ciphers");
const {AtbashTransform, CaesarTransform, ROT8Transform} =require("./streamClasses");

function createQueueOfCiphering(queueOfCmd) {
    const arrCipherStream = [];
    // arrCipherStream.push();
    queueOfCmd.split("-").forEach((item) => {
        switch (item.slice(0, 1)) {
            case "A": {
                arrCipherStream.push(new AtbashTransform());
                break;
            }
            case "C": {
                toEncrypt = item.slice(1) == "1" ? true : false;
                arrCipherStream.push(new CaesarTransform(toEncrypt));
                break;
            }
            case "R": {
                toEncrypt = item.slice(1) == "1" ? true : false;
                arrCipherStream.push(new ROT8Transform(toEncrypt));
                break;
            }
        }
    });
    return arrCipherStream;
}

module.exports.createQueueOfCiphering = createQueueOfCiphering;