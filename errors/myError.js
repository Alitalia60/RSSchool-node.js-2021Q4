//module myError.js
/* by conditions of task: module contains 4 error classes
1.  argumentsError - for errors when checking arguments of CLI
2.  commandError - for checking commands sfter -c or --config: C0, C1, R0,R1, A
3.  fileError - for test existing & accessing input & output files, as pointed after -i (--input), -o(--output)
4.  streamError - getting errors during streamming processes
*/
class argumentsError extends Error {
  constructor(message, type) {
    super(message);
    this.message = message;
    this.name = "Arguments error";
    console.error(`\n ${this.name}: ${this.message}\n `);
    process.exit(1);
  }
}

class commandsError extends Error {
  constructor(message, type) {
    super(message);
    this.message = message;
    this.name = "Commands error";
    console.error(`\n ${this.name} : ${this.message}\n `);
    process.exit(1);
  }
}

class fileError extends Error {
  constructor(message, type) {
    super(message);
    this.message = message;
    this.name = "File check error";
    console.error(`\n ${this.name}: ${this.message}\n `);
    process.exit(1);
  }
}

class streamError extends Error {
  constructor(message, type) {
    super(message);
    this.message = message;
    this.name = "Stream error";
    console.error(`\n ${this.name}: ${this.message}\n `);
    process.exit(1);
  }
}

module.exports = { argumentsError, commandsError, fileError, streamError };
