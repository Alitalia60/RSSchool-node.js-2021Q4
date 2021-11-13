//module cipherAtbash.js
//checked = OK 11/11/21

module.exports.convert = function (in_data) {
  //const convertor = function(in_data) {
  const PLAIN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const n = PLAIN.length - 1;

  let out_data = "";

  for (let index = 0; index < in_data.length; index++) {
    let letter = in_data.substr(index, 1);
    let place = PLAIN.indexOf(letter.toUpperCase());

    if (place == -1) {
      //any  other symbols in input chunk
      out_data += letter;
    } else if (isUpper(letter)) {
      //if letter is in upper case
      out_data += PLAIN.substr(n - place , 1);
    } else {
      //if letter is in lower case
      out_data += PLAIN.substr(n  - place , 1).toLowerCase();
    }
  }
  return out_data;
};

const isUpper = function (symbol) {
  return symbol == symbol.toUpperCase();
};
