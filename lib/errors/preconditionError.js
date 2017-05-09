var
  inherits = require('util').inherits,
  KuzzleError = require('./kuzzleError');

function PreconditionError(message) {
  KuzzleError.call(this, message, 412);
}
inherits(PreconditionError, KuzzleError);
PreconditionError.prototype.name = 'Precondition Failed';

module.exports = PreconditionError;
