module.exports = function (in_chunk, direction = 0) {
  //const convertor = function(in_chunk) {
  const PLAIN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const n = PLAIN.length;
  let newPlace = 0;
  let out_chunk = "";

  for (let index = 1; index <= in_chunk.length; index++) {
    let letter = in_chunk.substr(index - 1, 1);
    place = PLAIN.indexOf(letter.toUpperCase());
    if (place == -1) {
      //any  other symbols in input chunk
      out_chunk += letter;
    } else newPlace = n - place - 1;
    //if input is in upper case
    if (letter === letter.toUpperCase()) {
      out_chunk += PLAIN.substr(newPlace, 1);
    } else {
      //if inputs is in lower case
      out_chunk += PLAIN.substr(newPlace, 1).toLowerCase();
    }
  }

  return out_chunk;
};
