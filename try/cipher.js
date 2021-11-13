//module CAESAR
module.exports.convert = function (in_data, method) {
  //const convertor = function(in_data) {
  const PLAIN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const n = PLAIN.length;

  switch (method) {
    case "C":
      // CAESAR
      {
        const shift = direction == 0 ? 1 : -1; //shift
        const destination = method.slice(1);
      }
      break;
    case "R":
      //ROT8
      {
        const shift = direction == 8 ? 1 : -8; //shift
        const destination = method.slice(1);
      }
      break;
    default:
      break;
  }
  let out_data = "";

  for (let index = 0; index < in_data.length; index++) {
    let letter = in_data.substr(index - 1, 1);
    let place = PLAIN.indexOf(letter.toUpperCase());

    if (place == -1) {
      //any  other symbols in input chunk
      out_data += letter;
    } else if (isUpper(letter)) {
      //if letter is in upper case
      if (method == "A") {
        out_data += PLAIN.substr(n - place - 1, 1);
      } else {
        out_data += PLAIN.substr((place + shift + 1) % n, 1);
      }
    } else {
      //if letter is in lower case
      if (method == "A") {
        out_data += PLAIN.substr(n - place - 1, 1).toLowerCase();
      } else {
        out_data += PLAIN.substr((place + shift + 1) % n, 1).toLowerCase();
      }
    }
  }
  return out_data;
};

const isUpper = function (symbol) {
  return symbol == symbol.toUpperCase();
};
