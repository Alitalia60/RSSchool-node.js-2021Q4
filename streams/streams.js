const stream = require("stream");
const convert = require("../ciphers/ciphers").convert;

class AtbashTransform extends stream.Transform {
    constructor(options) {
        super(options);
    }
    _transform(chunk, encoding, callback) {
        this.push(convert(chunk.toString(), "A"));
        callback();
    }
}

class CaesarTransform extends stream.Transform {
    constructor(toEncrypt, options) {
        super(options);
        this.toEncrypt = toEncrypt;
    }
    _transform(chunk, encoding, callback) {
        this.push(convert(chunk.toString(), "C", this.toEncrypt));
        callback();
    }
}

class ROT8Transform extends stream.Transform {
    constructor(toEncrypt, options) {
        super(options);
        this.toEncrypt = toEncrypt;
    }
    _transform(chunk, encoding, callback) {

        this.push(convert(chunk.toString(), "R", this.toEncrypt));
        callback();
    }
}

function createQueueOfCiphering(queueOfCmd) {
    const arrCipherStream = [];
    arrCipherStream.push();
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

module.exports = { AtbashTransform, CaesarTransform, ROT8Transform, createQueueOfCiphering }