var
  inherits = require('util').inherits,
  KuzzleError = require('./kuzzleError');

function SizeLimitError(message) {
  KuzzleError.call(this, message, 413);
}
inherits(SizeLimitError, KuzzleError);
SizeLimitError.prototype.name = 'SizeLimitError';

module.exports = SizeLimitError;
