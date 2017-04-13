var
  inherits = require('util').inherits,
  util = require('util');

/**
 * @param message
 * @param status
 * @constructor
 */
function KuzzleError(message, status) {
  this.status = status;
  if (util.isError(message)) {
    this.message = message.message;
    this.stack = message.stack;
  } else {
    this.message = message;
    this.stack = (new Error()).stack;
  }
}
inherits(KuzzleError, Error);

KuzzleError.prototype.name = 'KuzzleError';

KuzzleError.prototype.toJSON = function () {
  return {
    message: this.message,
    status: this.status,
    stack: this.stack
  };
};

/**
 * @type {KuzzleError}
 */
module.exports = KuzzleError;
