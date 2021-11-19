const isAccessible = require("../lib/validators/fileCheck");
const fs = require('fs');
const path = require('path');
const { Console } = require("console");

const tmpFileExist = path.join(__dirname, 'testFile.txt')

    beforeAll(() => {
        fs.writeFile(tmpFileExist, 'Test file Content', 'utf8', (err) => { if (err) throw err});
    }, 5000);

    afterAll(() => {
        fs.rm(tmpFileExist, (err) => { if (err) throw err });

    }, 5000);

    
    test('Test of exist and accessible file', () => {
        expect(() => {
            isAccessible(tmpFileExist, fs.constants.W_OK)
        }).not.toThrow()

    });

const tmpFileNotExist = path.join(__dirname, 'test$$File.txt')
    test('Test on non existing or non accessiblity file', () => {
        expect(() => {
            isAccessible(tmpFileNotExist, fs.constants.W_OK)
        }).toThrow()

    });