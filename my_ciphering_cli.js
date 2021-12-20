
const fs = require("fs");
const { access, constants } = require('fs');

const stream = require("stream");

// const argValidator = require("./validators/argValidator");
const { checkArgs, getNexArg } = require("./validators/argChecker");
const commandsValidate = require("./validators/commandsValidate");
const {
  argumentsError,
  commandsError,
  fileError,
  streamError,
} = require("./errors/myError");
const isAccessible = require("./validators/fileValidator").isAccessible;

let args = process.argv.slice(2);
let commands = undefined;
let source = undefined;
let target = undefined;
let encoding = true;


pack_json = require("./package.json");

console.log(`\n***  ${pack_json.name} ver.${pack_json.version} ver.${pack_json.date}  ***`);

// =================================1. parsing command line + args
checkArgs(args, "-c", "--config", true);
checkArgs(args, "-i", "--input");
checkArgs(args, "-o", "--output");

if (args.length > 0) {
  throw new argumentsError(`Too much or unknown argument(s) ${args}`);
}
commands = getNexArg(process.argv.slice(2), "-c", "--config", true);

//parse and validate array arrCommands after option -c or --config
let arrCommands = commands.split("-");
if (!commandsValidate(arrCommands)) {
  throw new commandsError(
    `Wrong command(s): <${arrCommands}>? after option "-c" or "--config". \n Allowed are: "A", "C0", "C1", "R0", "R1"`
  );
}

source = getNexArg(process.argv.slice(2), "-i", "--input");
if (source != null) {
  try {
    fs.accessSync(source, constants.R_OK);
  } catch (error) {
    throw new fileError(`no such file "${source}" or access permission denied.`);
  }
}
target = getNexArg(process.argv.slice(2), "-o", "--output");
if (target != null) {
  try {
    fs.accessSync(target, constants.W_OK);
  } catch (error) {
    throw new fileError(`no such file "${target}" or access permission denied.`);
  }
}

//========================================================

// const convertCasaer = require("./ciphers/cipherCasaer").convert;
// const convertAtbash = require("./ciphers/cipherAtbash").convert;
// const convertROT8 = require("./ciphers/cipherRot8").convert;
 const convert = require("./ciphers/ciphers").convert;
const { stdin, stdout } = require("process");

//========================================создание классов шифрования
//=============== stream&crypto class Atbash
class AtbashTransform extends stream.Transform {
  constructor(options) {
    super(options);
    this.encoding = encoding;
  }
  _transform(chunk, encoding, callback) {
    this.push(convert(chunk.toString(), "A", this.encoding));
    callback();
  }
}
//=============== stream&crypto class Caesar
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
//=============== stream&crypto class ROT8
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

// create array of ciphering stream 
const arrCipherStream = [];
arrCipherStream.push();
arrCommands.forEach((item) => {
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


let rs = source == null ? process.stdin : fs.createReadStream(source, { "encoding": "utf-8" });


if ((source != null) && (target != null) && (target == source)) {

  console.log('source =', source, '  target=', target);

  const tmpFileName = "text.tmp";
  let tmp = fs.createWriteStream(tmpFileName);
  stream.pipeline(rs, ...arrCipherStream, tmp, (err) => {
    if (err) {
      throw new streamError(`Error streaming`);
    } else {
      console.log('streaming to tmp = OK');
      // process.exit(0)
      fs.copyFile(tmpFileName, source, (err) => {
        if (err) {
          throw new streamError("Error copying in text.txt");
        }
        else {
          console.log('copy from tmp = OK');
          fs.rm(tmpFileName, (err) => {
            if (err) {
              throw new fileError(`Error deleting "${tmpFileName}"`);
            }
          });

        }
      });
    }


  }
  );
}

else {
  let ws = target == null ? process.stdout : fs.createWriteStream(target, { "encoding": "utf-8" });
  ws.on('finish', () => {
    console.log('All writes are now complete.');
  });

  stream.pipeline(rs, ...arrCipherStream, ws, (err) => {
    if (err) {
      throw new streamError(`Error streaming "${source}" -> "${target}"`);
    }
  });
}

console.log('')