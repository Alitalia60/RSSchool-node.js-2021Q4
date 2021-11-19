const ciphers = require("../ciphers/ciphers").convert;
describe('Test english example', () => {
    const exampleEnglish = 'This is secret. Message about "_" symbol!';
    const dataEnglish = [
        ['C', 'Uijt jt tfdsfu. Nfttbhf bcpvu "_" tzncpm!'],
        ['R', 'Bpqa qa amkzmb. Umaaiom ijwcb "_" agujwt!'],
        ['A', 'Gsrh rh hvxivg. Nvhhztv zylfg "_" hbnylo!'],
    ];
    test.each(dataEnglish)('should ', (cipher, answer) => {
        expect(ciphers(exampleEnglish, cipher)).toEqual(answer)

    });
});
describe('Test other example', () => {
    const exampleNonEnglish = '123456789-()^&--абвгдеЁЖЗКЛмнопр';
    const dataNonEnglish = ['A', 'C', 'R'];
    test.each(dataNonEnglish)('should ', (cipher) => {
        expect(ciphers(exampleNonEnglish, cipher)).toEqual(exampleNonEnglish)

    });
});