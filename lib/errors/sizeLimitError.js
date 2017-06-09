const KuzzleError = require('./kuzzleError');

class SizeLimitError extends KuzzleError {
  constructor (message) {
    super(message, 413);
  }

  get name () {
    return 'SizeLimitError';
  }
}

module.exports = SizeLimitError;
