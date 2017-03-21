const
  inherits = require('util').inherits,
  KuzzleError = require('./kuzzleError');

function ExternalServiceError(message) {
  KuzzleError.call(this, message, 500);
}
inherits(ExternalServiceError, KuzzleError);
ExternalServiceError.prototype.name = 'ExternalServiceError';

module.exports = ExternalServiceError;
