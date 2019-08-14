const util = require('util');

/**
 * @param message
 * @param status
 * @constructor
 */
class KuzzleError extends Error {

  constructor(message, status, errorName = 'internal.errorsManager.undocumented_error', code = 0) {
    super(message);

    this.status = status;

    this.code = code;
    
    this.domain = errorName.split('.')[0];
    this.subdomain = errorName.split('.')[1];
    this.error = errorName.split('.')[2];

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
      code: this.code,
      domain: this.domain,
      subdomain: this.subdomain,
      error: this.error,
    };
  }
}

/**
 * @type {KuzzleError}
 */
module.exports = KuzzleError;
