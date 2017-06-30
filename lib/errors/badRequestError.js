const KuzzleError = require('./kuzzleError');

class BadRequestError extends KuzzleError {
  constructor(message) {
    super(message, 400);
  }

  get name() {
    return 'BadRequestError';
  }
}

module.exports = BadRequestError;
