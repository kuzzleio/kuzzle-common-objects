const { KuzzleError } = require('./kuzzleError');

class ExternalServiceError extends KuzzleError {

  constructor(message, id, code) {
    super(message, 500, id, code);
  }
}

module.exports = ExternalServiceError;
