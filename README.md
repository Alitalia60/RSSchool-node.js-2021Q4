# node.js-ciphering-cli-tool
programm to encripting / decrypting text using Abash, Caesar or ROT-8 method

##usage
from command line:
  node index -c[--config] "C0-A1-R...-A1" [[-i]|[--input]] [inputFile]] [[-o]|[--output]] [outputFile]] 

arguments of command line:
1. -c or --config  = required before list of commands of encrypting/decrypting methods: 
2. list or queue of commands:
First symbols: С = Caesar; R = ROT8; A = Atbash.
Second symbol: 0 = to encrypt; 1 = to decrypt 

 Commands, e.g. "C1-A0-R" must be divided by symbol "-"

3. -i or --input = if exist, input text from "inputFile". If not exist, input from console
4. -o or --output = if exist, output text to "outputFile". If not exist, output to console

