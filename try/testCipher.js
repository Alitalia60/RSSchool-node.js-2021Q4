const cipherAtbash = require("../cipherAtbash").convert;
const cipherCasaer = require("../cipherCasaer").convert;
const cipherRot8 = require("../cipherRot8").convert;

let a = "abcdefghijklmnopqrstuvwxyz";
// let a = "a";

console.log(a)
// console.log(cipherAtbash(a))
// console.log(cipherCasaer(a, 0))
console.log(cipherRot8(a, 0))