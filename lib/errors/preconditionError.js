const KuzzleError = require('./kuzzleError');

class PreconditionError extends KuzzleError {
  constructor(message, errorName, code) {
    super(message, 412, errorName, code);
  }

  get name () {
    return 'Precondition Failed';
  }
}

module.exports = PreconditionError;
