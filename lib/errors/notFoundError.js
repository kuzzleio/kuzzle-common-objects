const KuzzleError = require('./kuzzleError');

class NotFoundError extends KuzzleError {
  constructor(message, errorName, code) {
    super(message, 404, errorName, code);
  }

  get name () {
    return 'NotFoundError';
  }
}

module.exports = NotFoundError;
