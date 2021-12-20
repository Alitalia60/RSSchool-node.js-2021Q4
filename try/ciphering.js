const a = require("./atbash");
const c = require("./caesar");
const r = require("./rot8");

// let input ='This is secret. Message about "_" symbol!'
// let input = "ZXW"

//cesaer
// let input = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// let input_back = "BCDEFGHIJKLMNOPQRSTUVWXYZA";
//rot8
// let input = "ABCDEFGHIjklMNOPQRSTUVWXYZ"; //IJKLMNOPQRSTUVWXYZABCDEFGH
// let input_back = "IJKLMNOPQRSTUVWXYZABCDEFGH";
//ATBASH 
let input = "ABCDEFGHIjklMNOPQRSTUVWXYZ"; // ZYXWVUTSRqpoNMLKJIHGFEDCBA
let input_back = "ZYXWVUTSRqpoNMLKJIHGFEDCBA"; //ABCDEFGHijkLMNOPQRSTUVWXY

console.clear;
// console.log("ROT8   =", r.convert(input));
// console.log("ROT8   =", r.convert(input_back, 1));
//  console.log("CESAER =", c.convert(input));
//  console.log("CESAER =", c.convert(input_back, 1));
 console.log("ATBASH =", a.convert(input));
 console.log("ATBASH =", a.convert(input_back));


