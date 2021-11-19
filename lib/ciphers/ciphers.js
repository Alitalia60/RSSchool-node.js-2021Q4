//module ciphers.js
//checked = OK 11/11/21
/*
function encrypt "in_data", if "toEncrypt" = true (or decrypt "in_data" if "toEncrypt" = false)
and return encrypted(decrypted) "in_data"
*/

module.exports.convert = function (in_data, cipher, toEncypt = true) {
  //const convertor = function(in_data) {
  const PLAIN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let n = PLAIN.length;
  let shift = 1;

  switch (cipher) {
    case "C":
      shift = toEncypt ? 1 : -1; //shift
      break;
    case "R":
      shift = toEncypt ? 8 : -8; //shift
      break;
  }

  let out_data = "";

  for (let index = 0; index < in_data.length; index++) {
    let letter = in_data.substr(index, 1);
    let place = PLAIN.indexOf(letter.toUpperCase());

    if (place == -1) {
      //any  other symbols in input chunk
      out_data += letter;
    } else if (isUpper(letter)) {
      //if letter is in upper case
      out_data += cipher == "A" ? PLAIN.substr(n - 1 - place, 1) : PLAIN.substr((place + shift) % n, 1);
    } else {
      //if letter is in lower case
      out_data += (cipher == "A" ? PLAIN.substr(n - 1 - place, 1) : PLAIN.substr((place + shift) % n, 1)).toLowerCase();
    }
  }
  return out_data;
};

const isUpper = function (symbol) {
  return symbol == symbol.toUpperCase();
};
