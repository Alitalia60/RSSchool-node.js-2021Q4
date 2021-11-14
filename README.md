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

самооценка:
В README.md должно быть описано, как можно запустить программу из командной строки, описаны аргументы, которые можно передать приложению плюс 10 баллов.

Gереданы все аргументы и они корректны, приложение читает из файла и записывает в файл преобразованный текст, при этом предыдущие записи не удаляются плюс 20 баллов

Приложение работает в соответствии с описанными в задании примерами плюс 30 баллов

Аргументы input и/или output ведут к несуществующему файлу либо директории,приложение передает соответствующее сообщение в process.stderr и прoцесс завершается с кодом, 
отличным от 0 плюс 10 баллов

Если любой из аргументов дублируется, приложение передает соответствующее сообщение в process.stderr и прoцесс завершается с кодом, отличным от 0 плюс 10 баллов

Если config невалиден или отсутствует, приложение передает соответствующее сообщение в process.stderr и прoцесс завершается с кодом, отличным от 0 плюс 20 баллов.

Если не передан аргумент с путем до файла на чтение, то чтение осуществляется из process.stdin плюс 10 баллов

Если не передан аргумент с путем до файла на запись, то вывод осуществляется в process.stdout плюс 10 баллов

Шифруются/дешифруются только латинские буквы, регистр сохраняется, остальные символы не изменяются плюс 20 баллов

Если текст вводится из консоли, то программа не должна завершаться после выполнения шифровки/дешифровки введенного текста, т.е. должна быть возможность ввести еще текст плюс 10 баллов

Кодовая база не находится в одном файле, а разделена на файлы в соответствии с выполняемыми задачами (например - функция, преобразующая строку, в отдельном файле, код, создающий transform стрим, в отдельном файле, функция для парсинга и валидации аргументов в отдельном файле и т.п.) плюс 10 баллов

итого 180
