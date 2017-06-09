const KuzzleError = require('./kuzzleError');

class ExternalServiceError extends KuzzleError {
  constructor(message) {
    super(message, 500);
  }

  get name () {
    return 'ExternalServiceError';
  }
}

module.exports = ExternalServiceError;
