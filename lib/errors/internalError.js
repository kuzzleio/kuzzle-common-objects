const KuzzleError = require('./kuzzleError');

class InternalError extends KuzzleError {
  constructor (message) {
    super(message, 500);
  }

  get name () {
    return 'InternalError';
  }
}

module.exports = InternalError;
