const
  KuzzleError = require('./kuzzleError');

class ExternalServiceError extends KuzzleError {
  constructor(message) {
    super(message, 500);
  }
}

ExternalServiceError.prototype.name = 'ExternalServiceError';

module.exports = ExternalServiceError;
