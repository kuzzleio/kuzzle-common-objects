const { KuzzleError } = require('./kuzzleError');

class InternalError extends KuzzleError {
  constructor(message, id, code) {
    super(message, 500, id, code);
  }
}

module.exports = InternalError;
