const { stdin, stdout } = process;
// stdin.on('data', data => stdout.write(data));

const conv = require('../atbash/atbash')
stdin.on('data', text => stdout.write(text))