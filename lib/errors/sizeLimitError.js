const KuzzleError = require('./kuzzleError');

class SizeLimitError extends KuzzleError {
  constructor(message, errorName, code) {
    super(message, 413, errorName, code);
  }

  get name () {
    return 'SizeLimitError';
  }
}

module.exports = SizeLimitError;
