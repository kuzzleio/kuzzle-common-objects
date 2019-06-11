const KuzzleError = require('./kuzzleError');

class InternalError extends KuzzleError {
  constructor(message, errorName, code) {
    super(message, 500, errorName, code);
  }

  get name () {
    return 'InternalError';
  }
}

module.exports = InternalError;
