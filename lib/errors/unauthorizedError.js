const KuzzleError = require('./kuzzleError');

class UnauthorizedError extends KuzzleError {
  constructor(message, id, code) {
    super(message, 401, id, code);
  }

  get name () {
    return 'UnauthorizedError';
  }
}

module.exports = UnauthorizedError;
