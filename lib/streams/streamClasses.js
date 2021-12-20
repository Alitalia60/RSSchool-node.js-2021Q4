const stream = require("stream");
const convert = require("../ciphers/ciphers");

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

module.exports = { AtbashTransform, CaesarTransform, ROT8Transform }