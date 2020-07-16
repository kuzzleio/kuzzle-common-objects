const { KuzzleError } = require('./kuzzleError');

class TooManyRequestsError extends KuzzleError {
  constructor(message, id, code) {
    super(message, 429, id, code);
  }
}

module.exports = TooManyRequestsError;
