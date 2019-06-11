const KuzzleError = require('./kuzzleError');

class ForbiddenError extends KuzzleError {
  constructor(message, errorName, code) {
    super(message, 403, errorName, code);
  }

  get name () {
    return 'ForbiddenError';
  }
}

module.exports = ForbiddenError;
