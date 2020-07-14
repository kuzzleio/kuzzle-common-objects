const { KuzzleError } = require('./kuzzleError');

class InternalError extends KuzzleError {
  constructor(message, id, code) {
    super(message, 500, id, code);
  }

  get name () {
    return 'InternalError';
  }
}

module.exports = InternalError;
