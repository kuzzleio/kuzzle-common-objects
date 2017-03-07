const
  inherits = require('util').inherits,
  KuzzleError = require('./kuzzleError');

function PartialError(message, body) {
  KuzzleError.call(this, message, 206);
  if (body) {
    this.errors = body;
    this.count = body.length;
  }
}
inherits(PartialError, KuzzleError);
PartialError.prototype.name = 'PartialError';

PartialError.prototype.toJSON = function () {
  return {
    message: this.message,
    status: this.status,
    stack: this.stack,
    errors: this.errors,
    count: this.count
  };
};

module.exports = PartialError;
