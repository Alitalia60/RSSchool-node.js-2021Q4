//module myError.js
/* by conditions of task: module contains 4 error classes
1.  argumentsError - for errors when checking arguments of CLI
2.  commandError - for checking commands sfter -c or --config: C0, C1, R0,R1, A
3.  fileError - for test existing & accessing input & output files, as pointed after -i (--input), -o(--output)
4.  streamError - getting errors during streamming processes
*/
class argumentsError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = "Arguments error";
  }
}

class commandsError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = "Commands error";
  }
}

class fileError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = "File check error";
  }
}

class streamError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = "Stream error";
  }
}

module.exports = { argumentsError, commandsError, fileError, streamError };
