const KuzzleError = require('./kuzzleError');

class PartialError extends KuzzleError {
  constructor(message, body = [], errorName, code) {
    super(message, 206, errorName, code);

    this.errors = body;
    this.count = body.length;
  }

  get name () {
    return 'PartialError';
  }

  toJSON () {
    return {
      message: this.message,
      status: this.status,
      stack: this.stack,
      errors: this.errors,
      count: this.count,
      code: this.code,
      errorName: this.errorName
    };
  }
}

module.exports = PartialError;
