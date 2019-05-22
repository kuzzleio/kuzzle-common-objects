const KuzzleError = require('./kuzzleError');

class ExternalServiceError extends KuzzleError {
  
  constructor(message, errorName = 'Undocumented error', code = 0) {
    super(message, 500, errorName, code);
  }
  
  get name() {
    return "ExternalServiceError";
  }
}

module.exports = ExternalServiceError;
