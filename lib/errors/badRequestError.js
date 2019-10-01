const KuzzleError = require('./kuzzleError');

class BadRequestError extends KuzzleError {
  constructor(message, id, code) {
    super(message, 400, id, code);
  }

  get name() {
    return 'BadRequestError';
  }
}

module.exports = BadRequestError;
