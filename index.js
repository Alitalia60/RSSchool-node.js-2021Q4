
const fs = require("fs");
const { access, constants } = require('fs');

const stream = require("stream");

const argValidator = require("./validators/argValidator");
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

console.log(`\n***  ${pack_json.name} ver.${pack_json.version} ver.${pack_json.date}  ***\n`);


// =====================================================1. parsing command line + args

//TODO common checker for garbage
//e.g.  -c A0-R-C1 -i Text.txt -- -r -t -o Out_text.txt -- -r -t sd/flsa -rte

//==============================================
// check '-c', '--config' args;
const configValidator = new argValidator("-c", "--config", args, true);
if (configValidator.isValid() == false) {
  throw new argumentsError("Wrong argument(s)", "Arguments");
} else {
  commands = configValidator.getNextArg();
  if (commands == undefined) {
    throw new argumentsError(
      'No commands specified after option "-c" or "--config" was founded'
    );
  }
}

//parse and validate array arrCommands after option -c or --config
let arrCommands = commands.split("-");
if (!commandsValidate(arrCommands)) {
  throw new commandsError(
    `Error in the queue of commands after option "-c" or "--config":  "${arrCommands}"`
  );
}

//==============================================
// check '-i', '--input' args, if specified;
const inputValidator = new argValidator("-i", "--input", args);
let result = inputValidator.isValid();

if (result == null) {
  // stdin
  source = null;
} else {
  //check specified file after
  source = inputValidator.getNextArg();
  if (source == undefined) {
    throw new argumentsError(
      'Wrong or is absent argument after "-i" or "--input". File name expected'
    );
  } else {
    try {
      fs.accessSync(source, constants.R_OK);
    } catch (error) {
      throw new fileError(`no such file "${source}" or access permission denied.`);
    }
  }
}

//==============================================
// check '-o', '--output' args, if specified;
const outputValidator = new argValidator("-o", "--output", args);
result = outputValidator.isValid();
if (result == null) {
  // stdin
  target = null;
} else {
  target = outputValidator.getNextArg();
  if (target == undefined) {
    throw new argumentsError(
      'Wrong or is absent argument after "-o" or "--output". File name expected'
    );
  } else {
    try {
      fs.accessSync(target, constants.W_OK);
    } catch (error) {
      throw new fileError(`no such file "${target}" or access permission denied.`);
    }
  }
}

//========================================================
// создание массива потоков на шифрование из массива команд

const convertCasaer = require("./ciphers/cipherCasaer").convert;
const convertAtbash = require("./ciphers/cipherAtbash").convert;
const convertROT8 = require("./ciphers/cipherRot8").convert;
const { stdin, stdout } = require("process");

//========================================создание классов шифрования
//=============== stream&crypto class Atbash
class AtbashTransform extends stream.Transform {
  constructor(options) {
    super(options);
    this.encoding = encoding;
  }
  _transform(chunk, encoding, callback) {
    this.push(convertAtbash(chunk.toString(), this.encoding));
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
    this.push(convertCasaer(chunk.toString(), this.toEncrypt));
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

    this.push(convertROT8(chunk.toString(), this.toEncrypt));
    callback();
  }
}

const arrCipherStream = [];
arrCipherStream.push();
arrCommands.forEach((item) => {
  switch (item.slice(0, 1)) {
    case "A": {
      //   console.log(new AtbashTransform(item.slice(1)));
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
let ws = target == null ? process.stdout : fs.createWriteStream(target, { "encoding": "utf-8" });

if ((source != null) && (target != null) && (target == source)) {
  // inputFile -> tmpFile -> outputFile
  const tmpFileName = "./text.tmp";
  // let tmp = target == null ? process.stdout : fs.createWriteStream(tmpFileName);
  let tmp = fs.createWriteStream(tmpFileName);
  stream.pipeline(rs, ...arrCipherStream, tmp, (err) => {
    if (err) {
      throw new streamError(`Error streaming`);
    } else {
      // console.log("Pipeline 1 succeeded.");
      stream.pipeline(fs.createReadStream(tmpFileName), ...arrCipherStream, ws, (err) => {
        if (err) {
          throw new streamError("Error streaming in text.tmp");
        }
      });
    }
  });
}
else {
  console.log()
  stream.pipeline(rs, ...arrCipherStream, ws, (err) => {
    if (err) {
      throw new streamError("Error streaming");

    }
  })
}
