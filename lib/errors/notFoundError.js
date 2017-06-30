const KuzzleError = require('./kuzzleError');

class NotFoundError extends KuzzleError {
  constructor (message) {
    super(message, 404);
  }

  get name () {
    return 'NotFoundError';
  }
}

module.exports = NotFoundError;
