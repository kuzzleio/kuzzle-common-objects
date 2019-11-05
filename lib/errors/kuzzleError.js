const util = require('util');

/**
 * @param message
 * @param status
 * @constructor
 */
class KuzzleError extends Error {
  constructor(message, status = 500, id = null, code = -1) {
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

  // @deprecated use "id" instead
  get errorName () {
    return this.id;
  }

  toJSON () {
    const json = {
      message: this.message,
      status: this.status,
      stack: this.stack
    };

    // backward compatibility with older versions of kuzzle
    if (this.id !== null && this.code !== -1) {
      json.id = this.id;
      json.code = this.code;
    }

    return json;
  }
}

/**
 * @type {KuzzleError}
 */
module.exports = KuzzleError;
