
const { checkArgs, getNextArg } = require("./lib/validators/argCheck");
const cmdCheck = require("./lib/validators/cmdCheck");
const isAccessible = require("./lib/validators/fileCheck");
const { createQueueOfCiphering } = require("./lib/streams/queueStreams")
const fs = require("fs");
const stream = require("stream");
const { fileError, streamError} = require("./lib/errors/myError");

pack_json = require("./package.json");

console.clear();
console.log(`\n***  ${pack_json.name} ver.${pack_json.version} ${pack_json.date}  ***`);

try {
  checkArgs(process.argv.slice(2));
} catch (error) {
  process.stderr.write(`${error.name}: ${error.message}`);
  process.exit(1);
}

try {
  commands = getNextArg(process.argv.slice(2), "-c");
  cmdCheck(commands);
} catch (error) {
  process.stderr.write(`${error.name}: ${error.message}`);
  process.exit(1);
}

source = getNextArg(process.argv.slice(2), "-i");
if (source) {
  try {
    isAccessible(source);
  } catch (error) {
    process.stderr.write(`${error.name}: ${error.message}`);
    process.exit(1);
  }
}

target = getNextArg(process.argv.slice(2), "-o");
if (target) {
  try {
    isAccessible(target, fs.constants.W_OK);
  } catch (error) {
    process.stderr.write(`${error.name}: ${error.message}`);
    process.exit(1);
  }
}

arrCipherStream = createQueueOfCiphering(commands);

let rs = source == undefined ? process.stdin : fs.createReadStream(source, { "encoding": "utf-8" });
let ws = target == undefined ? process.stdout : fs.createWriteStream(target, { "flags":"a+" }, { "encoding": "utf-8" });

stream.pipeline(rs, ...arrCipherStream, ws, (err) => {
  if (err) {
    throw new streamError(`Error streaming "${source}" -> "${target}"`);
  }
});

if (target == undefined) {
  process.stdout.write("\n")
}
else{
  fs.writeFile(target, "\n", {"flag":"a"}, (err)=>{
    if (err) {
      throw fileError(`error writing to ${target}`)
    }
  })
};