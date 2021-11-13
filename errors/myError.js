//module myError.js

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
