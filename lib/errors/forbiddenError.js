const KuzzleError = require('./kuzzleError');

class ForbiddenError extends KuzzleError {
  constructor (message) {
    super(message, 403);
  }

  get name () {
    return 'ForbiddenError';
  }
}

module.exports = ForbiddenError;
