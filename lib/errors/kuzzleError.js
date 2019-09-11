const util = require('util');

/**
 * @param message
 * @param status
 * @constructor
 */
class KuzzleError extends Error {

  constructor(message, status, errorName = 'Undocumented error', code = 0) {
    super(message);

    this.status = status;

    this.code = code;
    this.errorName = errorName;

    if (util.isError(message)) {
      this.message = message.message;
      this.stack = message.stack;
    } else {
      this.message = message;
      Error.captureStackTrace(this, KuzzleError);
    }
  }

  get name () {
    return 'KuzzleError';
  }

  toJSON () {
    return {
      message: this.message,
      status: this.status,
      stack: this.stack
    };
  }
}

/**
 * @type {KuzzleError}
 */
module.exports = KuzzleError;
