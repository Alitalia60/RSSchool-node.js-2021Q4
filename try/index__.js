const arrCommands = ["C0", "A0", "R", "C0", "A1", "R"];
const arrCipherStream = [];
const { createReadStream, createWriteStream } = require("fs");
const { stdin, stdout } = require("process");
const { pipeline, Transform } = require("stream");

const convertCasaer = require("../cipherCasaer").convert;
const convertAtbash = require("../cipherAtbash").convert;
const convertROT8 = require("../cipherRot8").convert;

const SOURCE = "./text.txt";
const DESTINATION = "./out_text.txt";

/* const caesarTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(convertCasaer(chunk.toString()));
    callback();
  },
});
 */
//**********************
class AtbashTransform extends Transform {
  constructor(options, direction) {
    super(options);
    this.direction = direction;
  }
  _transform(chunk, encoding, callback) {
    this.push(convertAtbash(chunk.toString(), this.direction));
    callback();
  }
}
//**********************
class CaesarTransform extends Transform {
  constructor(options, direction) {
    super(options);
    this.direction = direction;
  }
  _transform(chunk, encoding, callback) {
    this.push(convertCasaer(chunk.toString(), this.direction));
    callback();
  }
}
//**********************
class ROT8Transform extends Transform {
  constructor(options) {
    super(options);
  }
  _transform(chunk, encoding, callback) {
    this.push(convertROT8(chunk.toString()));
    callback();
  }
}

const caesarTransform = new CaesarTransform();
console.log(caesarTransform._transform);

arrCommands.forEach((element) => {
  switch (element.slice(0,1)) {
    case "A":
      arrCipherStream.push(new AtbashTransform(element.slice(1)));
      break;
    case "C":
      arrCipherStream.push(new CaesarTransform(element.slice(1)));
      break;
    case "R":
      arrCipherStream.push(new ROT8Transform());
      break;

    default:
      break;
  }
});

process.stdin.pipe(new CaesarTransform()).pipe(process.stdout);
// pipeline(stdin, cipheringStream, stdout);
