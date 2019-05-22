const KuzzleError = require('./kuzzleError');

class ExternalServiceError extends KuzzleError {
  
  constructor(message, name = 'Undocumented error', code = 0) {
    super(message, 500, name, code);
  }
  
  get name() {
    return "ExternalServiceError";
  }
}

module.exports = ExternalServiceError;
