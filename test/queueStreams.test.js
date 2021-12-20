const { createQueueOfCiphering } = require("../lib/streams/queueStreams");
const { AtbashTransform, CaesarTransform, ROT8Transform } = require("../lib/streams/streamClasses");

jest.mock("../lib/streams/streamClasses");


beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    AtbashTransform.mockClear();
    CaesarTransform.mockClear();
    ROT8Transform.mockClear();
});

const commands = [
    ['C1-C1-R1-A-C1-R0', 1, 3, 2],
    ['R-R-R-C1-R1-A-A-A-C1-R0', 3, 2, 5],
    ['C1-C1-R1-C1-R0', 0, 3, 2],
    ['C1', 0, 1, 0]
];
// beforeEach(() => {queueOfStreams = []});
test.each(commands)('Test pushing ciphering method to a queue (array)', (cmd, a, c, r) => {
    createQueueOfCiphering(cmd);
    expect(AtbashTransform).toHaveBeenCalledTimes(a);
    expect(CaesarTransform).toHaveBeenCalledTimes(c);
    expect(ROT8Transform).toHaveBeenCalledTimes(r);
});