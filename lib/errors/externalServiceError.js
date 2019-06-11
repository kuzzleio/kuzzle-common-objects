const KuzzleError = require('./kuzzleError');

class ExternalServiceError extends KuzzleError {
  
  constructor(message, errorName, code) {
    super(message, 500, errorName, code);
  }
  
  get name() {
    return 'ExternalServiceError';
  }
}

module.exports = ExternalServiceError;
