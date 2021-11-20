const ciphers = require("../lib/ciphers/ciphers");
const encrypt = true;
const decrypt = false;

describe('Test english example', () => {
    const exampleEnglish = 'This is secret. Message about "_" symbol!';
    const dataEnglish = [
        ['C', encrypt, 'Uijt jt tfdsfu. Nfttbhf bcpvu "_" tzncpm!'],
        ['C', decrypt, 'Sghr hr rdbqds. Ldrrzfd zants "_" rxlank!'],
        ['R', encrypt, 'Bpqa qa amkzmb. Umaaiom ijwcb "_" agujwt!'],
        ['R', decrypt, 'Lzak ak kwujwl. Ewkksyw stgml "_" kqetgd!'],
        ['A', encrypt,'Gsrh rh hvxivg. Nvhhztv zylfg "_" hbnylo!'],
    ];
    test.each(dataEnglish)('should ', (cipher, action ,answer) => {
        expect(ciphers(exampleEnglish, cipher, action)).toEqual(answer)

    });
});
describe('Test other example', () => {
    const exampleNonEnglish = '123456789-()^&--абвгдеЁЖЗКЛмнопр';
    const dataNonEnglish = ['A', 'C', 'R'];
    test.each(dataNonEnglish)('should ', (cipher) => {
        expect(ciphers(exampleNonEnglish, cipher)).toEqual(exampleNonEnglish)

    });
});