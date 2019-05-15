const KuzzleError = require('./kuzzleError');

class ExternalServiceError extends KuzzleError {
  /*************************/
  constructor(message, code = '0000-0000') {
    super(message, 500, code);
  }
  /*************************/
  get name() {
    return "ExternalServiceError";
  }
}

module.exports = ExternalServiceError;
