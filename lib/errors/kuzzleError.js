const util = require('util');

/**
 * @param message
 * @param status
 * @constructor
 */
class KuzzleError extends Error {
  constructor(message, status, id, code) {
    super(message);

    this.status = status;
    this.code = code;
    this.id = id;

    if (util.isError(message)) {
      this.message = message.message;
      this.stack = message.stack;
    }
    else {
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
      id: this.id,
      code: this.code
    };
  }
}

/**
 * @type {KuzzleError}
 */
module.exports = KuzzleError;
