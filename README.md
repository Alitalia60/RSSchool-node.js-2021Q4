# node.js-ciphering-cli-tool
https://github.com/rolling-scopes-school/basic-nodejs-course/blob/master/descriptions/ciphering-cli-tool.md

14-11-2021
deadline 14-11-2021
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

****************************************************
All other arguments call Error message and close programm

results of testing 19-11-21

---------------|---------|----------|---------|---------|-------------------
File           | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
---------------|---------|----------|---------|---------|-------------------
All files      |   91.13 |     87.5 |    92.3 |    90.9 |                  
 ciphers       |     100 |    86.66 |     100 |     100 |                  
  ciphers.js   |     100 |    86.66 |     100 |     100 | 16-19            
 errors        |   76.92 |      100 |      75 |   76.92 |                  
  myError.js   |   76.92 |      100 |      75 |   76.92 | 34-36            
 validators    |    90.9 |       88 |     100 |   90.69 |                  
  argCheck.js  |   88.88 |     90.9 |     100 |   88.46 | 18,22,36         
  cmdCheck.js  |   88.88 |      100 |     100 |   88.88 | 17               
  fileCheck.js |     100 |        0 |     100 |     100 | 15               
---------------|---------|----------|---------|---------|-------------------

Test Suites: 4 passed, 4 total
Tests:       47 passed, 47 total
Snapshots:   0 total


