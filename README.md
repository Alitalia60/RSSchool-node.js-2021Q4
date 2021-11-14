# node.js-ciphering-cli-tool
programm to encripting / decrypting text using Abash, Caesar or ROT-8 method

##usage
from command line:
  node index -c[--config] "C0-A1-R...-A1" [[-i]|[--input]] [inputFileName]] [[-o]|[--output]] [outputFileName]] 

arguments of command line:
1. -c or --config  = required before list of commands of encrypting/decrypting methods: 
2. list or queue of commands as:
 XY
X: С = Caesar; R = ROT8; A = Atbash.
Y: 0 = to encrypt; 1 = to decrypt 

 Commands, e.g. "C1-A0-R" must be divided by symbol "-"

3. -i or --input = if specified, and "inputFileName" exist input is from  file. If not specified, input from console
4. -o or --output =  if specified, and "outputFileName" exist  output is to  file. If not specified, output to console

All other arguments call Error message and close programm

