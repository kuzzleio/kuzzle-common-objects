const { KuzzleError } = require('./kuzzleError');

class ForbiddenError extends KuzzleError {
  constructor(message, id, code) {
    super(message, 403, id, code);
  }

  get name () {
    return 'ForbiddenError';
  }
}

module.exports = ForbiddenError;
