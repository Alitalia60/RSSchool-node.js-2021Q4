const arrCommands = ["C", "A", "R", "C", "A", "R"];
const arrCipherStream = [];
const { createReadStream, createWriteStream } = require("fs");
const { Transform } = require("stream");

const SOURCE = "./text.txt";
const DESTINATION = "./out_text.txt";

class CipheringStream extends Transform {
  constructor(method) {
    super(options);
    this.method = method;
  }
  create() {
    switch (method) {
      //Atbash
      case "A": return 
        break;
      case "C": //Caesar
        break;
      case "R": //ROT8
        break;

      default:
        break;
    }
  }
}

arrCommands.forEach((element) => {
  arrCipherStream.push(new CipheringStream(DESTINATION, method));
});

const sourceStream = createReadStream(SOURCE, "utf-8");
const destStream = createWriteStream(DESTINATION);

pipeline(sourceStream, arrCipherStream, destStream, (err) => {
  if (err) {
    console.error("Pipeline failed.", err);
  } else {
    console.log("Pipeline succeeded.");
  }
});
