const KuzzleError = require('./kuzzleError');

class BadRequestError extends KuzzleError {
  constructor(message, errorName, code) {
    super(message, 400, errorName, code);
  }

  get name() {
    return 'BadRequestError';
  }
}

module.exports = BadRequestError;
