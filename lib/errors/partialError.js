const KuzzleError = require('./kuzzleError');

class PartialError extends KuzzleError {
  constructor (message, body = []) {
    super(message, 206);

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
      count: this.count
    };
  }
}

module.exports = PartialError;
