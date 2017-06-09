const KuzzleError = require('./kuzzleError');

class PreconditionError extends KuzzleError {
  constructor (message) {
    super(message, 412);
  }

  get name () {
    return 'Precondition Failed';
  }
}

module.exports = PreconditionError;
