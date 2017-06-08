const KuzzleError = require('./kuzzleError');

class UnauthorizedError extends KuzzleError {
  constructor (message) {
    super(message, 401);
  }

  get name () {
    return 'UnauthorizedError';
  }

  get subCodes () {
    return {
      TokenExpired: 1,
      JsonWebTokenError: 2,
      AuthenticationError: 3
    };
  }
}

module.exports = UnauthorizedError;
