const util = require('util');

/**
 * @param message
 * @param status
 * @constructor
 */
class KuzzleError extends Error {

  constructor (message, status, code = '0000-0000') {
    super(message);

    this.status = status;

    this.errorCode = code;

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
      stack: this.stack,
      code: this.code
    };
  }
}

/**
 * @type {KuzzleError}
 */
module.exports = KuzzleError;
