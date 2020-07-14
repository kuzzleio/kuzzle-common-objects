const { KuzzleError } = require('./kuzzleError');

class PreconditionError extends KuzzleError {
  constructor(message, id, code) {
    super(message, 412, id, code);
  }

  get name () {
    return 'PreconditionError';
  }
}

module.exports = PreconditionError;
